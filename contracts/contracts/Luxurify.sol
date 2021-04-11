//SPDX-License-Identifier: Unlicense
pragma solidity ^0.6.6;

import "hardhat/console.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@chainlink/contracts/src/v0.6/VRFConsumerBase.sol";
import "@chainlink/contracts/src/v0.6/interfaces/AggregatorV3Interface.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

contract Luxurify is ERC721, VRFConsumerBase {
  using SafeMath for uint256;
  using Strings for string;

  bytes32 internal keyHash;
  uint256 internal fee;
  uint256 public randomResult;
  address public VRFCoordinator;
  address public LinkToken;

  enum PriceType { DYNAMIC, FIXED }
  enum Currency { ETH, USD }

  struct Watch {
    uint256 randomId; // Use for QR Code generation
    string name;
    string referenceNumber;
    PriceType priceType;
    Currency priceUnit;
    uint256 priceFixed;
    uint256 priceDynamic;
    uint256 priceToBeSold;
  }

  Watch[] public watches;

  mapping(bytes32 => address) private tokenOwners;
  mapping(bytes32 => string) private watchNames;
  mapping(bytes32 => string) private watchReferenceNumbers;
  mapping(bytes32 => PriceType) private watchPriceTypes;
  mapping(bytes32 => Currency) private watchPriceUnits;
  mapping(bytes32 => uint256) private watchPriceFixeds;
  mapping(bytes32 => uint256) private watchPriceDynamics;
  mapping(bytes32 => uint256) private watchPriceToBeSolds;
  mapping(bytes32 => uint256) private requestToTokenIds;

  AggregatorV3Interface internal ethUsdPriceFeed;

  event newWatchClaimed(
    uint256 indexed _watchId,
    address indexed _owner,
    uint256 _randomId,
    string _name,
    string _referenceNumber,
    PriceType _priceType,
    Currency _priceUnit,
    uint256 _priceFixed,
    uint256 _priceDynamic,
    uint256 _priceToBeSold
  );

  constructor(
    address _VRFCoordinator,
    address _ethUsdPriceFeedAddress,
    address _LinkToken,
    bytes32 _keyhash
  )
    public
    VRFConsumerBase(_VRFCoordinator, _LinkToken)
    ERC721("Luxurify", "LXY")
  {
    VRFCoordinator = _VRFCoordinator;
    LinkToken = _LinkToken;
    keyHash = _keyhash;
    fee = 0.1 * 10**18; // 0.1 LINK
    ethUsdPriceFeed = AggregatorV3Interface(_ethUsdPriceFeedAddress);
  }

  function claimNewWatch(
    uint256 userProvidedSeed,
    string memory name,
    string memory referenceNumber,
    PriceType priceType,
    Currency priceUnit,
    uint256 priceFixed,
    uint256 priceDynamic
  ) public returns (bytes32) {
    require(
      LINK.balanceOf(address(this)) >= fee,
      "Not enough LINK - fill contract with faucet"
    );
    bytes32 requestId = requestRandomness(keyHash, fee, userProvidedSeed);
    watchNames[requestId] = name;
    watchReferenceNumbers[requestId] = referenceNumber;
    watchPriceTypes[requestId] = priceType;
    watchPriceUnits[requestId] = priceUnit;
    watchPriceFixeds[requestId] = priceFixed;
    watchPriceDynamics[requestId] = priceDynamic;
    tokenOwners[requestId] = msg.sender;
    return requestId;
  }

  function fulfillRandomness(bytes32 requestId, uint256 randomNumber)
    internal
    override
  {
    uint256 newId = watches.length;

    watches.push(
      Watch(
        randomNumber,
        watchNames[requestId],
        watchReferenceNumbers[requestId],
        watchPriceTypes[requestId],
        watchPriceUnits[requestId],
        watchPriceFixeds[requestId],
        watchPriceDynamics[requestId],
        0 // Default price to be sold is 0
      )
    );
    _safeMint(tokenOwners[requestId], newId);
    newWatchClaimed(
      newId,
      tokenOwners[requestId],
      randomNumber,
      watchNames[requestId],
      watchReferenceNumbers[requestId],
      watchPriceTypes[requestId],
      watchPriceUnits[requestId],
      watchPriceFixeds[requestId],
      watchPriceDynamics[requestId],
      0
    );
  }

  /**
    * Returns the latest ETHUSD price
    */
  function getEthUsdPrice() public view returns (int) {
    (
      uint80 roundID,
      int price,
      uint startedAt,
      uint timeStamp,
      uint80 answeredInRound
    ) = ethUsdPriceFeed.latestRoundData();
    // If the round is not complete yet, timestamp is 0
    require(timeStamp > 0, "Round not complete");
    return price;
  }


  function getWatchInfo(uint256 tokenId)
    public
    view
    returns (
      uint256,
      string memory,
      string memory,
      PriceType,
      Currency,
      uint256,
      uint256,
      uint256
    )
  {
    Watch memory watch = watches[tokenId];
    uint256 priceToBeSold = 0;

    if (watch.priceType == Luxurify.PriceType.FIXED) {
      if (watch.priceUnit == Luxurify.Currency.ETH) {
        priceToBeSold = watch.priceFixed;
      } else if (watch.priceUnit == Luxurify.Currency.USD) {
        int ethUsdPrice = getEthUsdPrice();
        priceToBeSold = (watch.priceFixed * 1 ether / uint(ethUsdPrice));
      }
    } else if (watch.priceType == Luxurify.PriceType.DYNAMIC) {
      // Assume USD currency
      int ethUsdPrice = getEthUsdPrice();
      priceToBeSold = (watch.priceDynamic * 1 ether / uint(ethUsdPrice));
    }

    return (
      watch.randomId,
      watch.name,
      watch.referenceNumber,
      watch.priceType,
      watch.priceUnit,
      watch.priceFixed,
      watch.priceDynamic,
      priceToBeSold
    );
  }

  function getTokenURI(uint256 tokenId) public view returns (string memory) {
    return tokenURI(tokenId);
  }

  function setTokenURI(uint256 tokenId, string memory _tokenURI) public {
    require(
      _isApprovedOrOwner(_msgSender(), tokenId),
      "ERC721: transfer caller is not owner nor approved"
    );
    _setTokenURI(tokenId, _tokenURI);
  }
}
