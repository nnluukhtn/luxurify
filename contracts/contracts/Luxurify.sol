//SPDX-License-Identifier: Unlicense
pragma solidity ^0.6.6;

import "hardhat/console.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@chainlink/contracts/src/v0.6/VRFConsumerBase.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

contract Luxurify is ERC721, VRFConsumerBase, Ownable {
  using SafeMath for uint256;
  using Strings for string;

  bytes32 internal keyHash;
  uint256 internal fee;
  uint256 public randomResult;
  address public VRFCoordinator;
  address public LinkToken;

  struct Watch {
    uint256 randomId; // Use for QR Code generation
    string name;
    string referenceNumber;
  }

  Watch[] public watches;

  mapping(bytes32 => address) private tokenOwners;
  mapping(bytes32 => string) private watchNames;
  mapping(bytes32 => string) private watchReferenceNumbers;

  event newWatchClaimed(uint256 indexed _watchId, address indexed _owner, uint256 _randomId, string _name, string _referenceNumber);

  constructor(address _VRFCoordinator, address _LinkToken, bytes32 _keyhash)
    public
    VRFConsumerBase(_VRFCoordinator, _LinkToken)
    ERC721("Luxurify", "LXY")
  {
    VRFCoordinator = _VRFCoordinator;
    LinkToken = _LinkToken;
    keyHash = _keyhash;
    fee = 0.1 * 10**18; // 0.1 LINK
  }

  function claimNewWatch(
    uint256 userProvidedSeed,
    string memory name,
    string memory referenceNumber
  ) public returns (bytes32) {
    require(
      LINK.balanceOf(address(this)) >= fee,
      "Not enough LINK - fill contract with faucet"
    );
    bytes32 requestId = requestRandomness(keyHash, fee, userProvidedSeed);
    watchNames[requestId] = name;
    watchReferenceNumbers[requestId] = referenceNumber;
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
        watchReferenceNumbers[requestId]
      )
    );
    _safeMint(tokenOwners[requestId], newId);
    newWatchClaimed(newId, tokenOwners[requestId], randomNumber, watchNames[requestId], watchReferenceNumbers[requestId]);
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
