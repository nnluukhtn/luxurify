// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
import { run, ethers } from "hardhat";
const hre = require("hardhat");
async function main() {
  // Hardhat always runs the compile task when running scripts with its command
  // line interface.
  //
  // If this script is run directly using `node` you may want to call compile
  // manually to make sure everything is compiled
  await run("compile");

  const address = process.env.CLIENT_CONTRACT_ADDRESS
  const LuxurifyWatchSignalsClient = await ethers.getContractFactory("LuxurifyWatchSignalsClient");
  const luxurifyClient = await LuxurifyWatchSignalsClient.attach(address);

  console.log("Query data for contract: ", luxurifyClient.address);
  const refNum = "116189PAVEL";
  const txn = await luxurifyClient.requestWatchInfoByReferenceNumber(refNum);
  console.log("requestId txn: ", txn);

  luxurifyClient.on("requestWatchInfoByReferenceNumberFulfilled", (requestId, avgPrice) => {
    console.log(requestId, avgPrice);
  });
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
