// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
import { run, ethers } from "hardhat";
const hre = require("hardhat");
const payment = "300000000000000000000"; // 300 LINK

async function main() {
  // Hardhat always runs the compile task when running scripts with its command
  // line interface.
  //
  // If this script is run directly using `node` you may want to call compile
  // manually to make sure everything is compiled
  await run("compile");

  // We get the contract to deploy
  const LuxurifyWatchSignalsClient = await hre.ethers.getContractFactory("LuxurifyWatchSignalsClient");
  // Network: Rinkeby
  const luxurifyClient = await LuxurifyWatchSignalsClient.deploy(
    "https://luxurify.herokuapp.com" // clientApiEndpoint
  );
  await luxurifyClient.deployed();

  const token = await hre.ethers.getContractAt("LinkTokenInterface", "0x01BE23585060835E02B77ef475b0Cc51aA1e0709");
  console.log("Funding LuxurifyClient contract: ", luxurifyClient.address);
  const tx = await token.transfer(luxurifyClient.address, payment);
  console.log("Txn: ", tx);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
