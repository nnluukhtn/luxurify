//SPDX-License-Identifier: Unlicense
pragma solidity ^0.6.6;

import "hardhat/console.sol";
import "@chainlink/contracts/src/v0.6/ChainlinkClient.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

contract LuxurifyWatchSignalsClient is ChainlinkClient {
  using Strings for string;

  string internal clientApiEndpoint;
  address internal oracle;
  bytes32 internal jobId;
  uint256 internal fee;
  uint256 public avgPrice;

  event requestWatchInfoByReferenceNumberFulfilled(
    bytes32 indexed requestId,
    uint256 indexed avgPrice
  );

  /**
    * Network: Rinkeby
    * Oracle: 0x3A56aE4a2831C3d3514b5D7Af5578E45eBDb7a40
    * Job ID: 3b7ca0d48c7a4b2da9268456665d11ae
    * Fee: 0.1 LINK
    */
  constructor(
    string memory _clientApiEndpoint
  ) public {
    clientApiEndpoint = _clientApiEndpoint;
    setChainlinkToken(0x01BE23585060835E02B77ef475b0Cc51aA1e0709);
    oracle = 0x3A56aE4a2831C3d3514b5D7Af5578E45eBDb7a40;
    jobId = "3b7ca0d48c7a4b2da9268456665d11ae";
    fee = 0.01 * 10 ** 18;
  }

  function getWatchInfoByReferenceNumberUri(string memory referenceNumber) public view returns (string memory uri) {
    string memory uriPrefix = string(abi.encodePacked("/watch_signals/watch/reference_number/", referenceNumber));
    return string(abi.encodePacked(clientApiEndpoint, uriPrefix));
  }

  /**
    * Create a Chainlink request to retrieve API response, find the target
    * data, then multiply by 1000000000000000000 (to remove decimal places from data).
    */
  function requestWatchInfoByReferenceNumber(string memory referenceNumber) public returns (bytes32 requestId)
  {
    Chainlink.Request memory request = buildChainlinkRequest(jobId, address(this), this.fulfill.selector);

    // Set the URL to perform the GET request on
    string memory url = getWatchInfoByReferenceNumberUri(referenceNumber);
    request.add("get", url);

    // Set the path to find the desired data in the API response, where the response format is:
    // {
    //   "data": [
    //     {
    //       "avg_price": "40589.98"
    //     }
    //   ]
    // }
    request.add("path", "data.0.avg_price");

    // Sends the request
    return sendChainlinkRequestTo(oracle, request, fee);
  }

  /**
    * Receive the response in the form of uint256
    */
  function fulfill(bytes32 _requestId, uint256 _avgPrice) public recordChainlinkFulfillment(_requestId)
  {
    emit requestWatchInfoByReferenceNumberFulfilled(_requestId, _avgPrice);
    avgPrice = _avgPrice;
  }
}
