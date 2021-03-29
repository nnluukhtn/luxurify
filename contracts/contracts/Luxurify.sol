//SPDX-License-Identifier: Unlicense
pragma solidity ^0.7.0;

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
  // rinkeby: 0xb3dCcb4Cf7a26f6cf6B120Cf5A73875B7BBc655B
  address public LinkToken;
  // rinkeby: 0x01BE23585060835E02B77ef475b0Cc51aA1e0709a

  struct Watch {
    uint256 id;
    string name;
    string watchname;
    string watchimage;
    string referencenumber;
    string watchmodel;
    uint256 powerreserve;
    uint256 casediameter;
    uint256 waterresistanceatm;
    string inner_image;
    string movementname;
    string braceletcolorname;
    string dialcolorname;
    string gendername;
    string bucklename;
    string glassname;
    string brandname;
    string casematerialname;
    string braceletmaterialname;
    string bucketmaterialname;
  }

  Watch[] public watches;

  /**
    * Constructor inherits VRFConsumerBase
    *
    * Network: Rinkeby
    * Chainlink VRF Coordinator address: 0xb3dCcb4Cf7a26f6cf6B120Cf5A73875B7BBc655B
    * LINK token address:                0x01BE23585060835E02B77ef475b0Cc51aA1e0709
    * Key Hash: 0x2ed0feb3e7fd2022120aa84fab1945545a9f2ffc9076fd6156fa96eaff4c1311
    */
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
}
