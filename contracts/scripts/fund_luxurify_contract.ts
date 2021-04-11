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
  const Luxurify = await hre.ethers.getContractFactory("Luxurify");
  // Network: Rinkeby
  const luxurify = await Luxurify.deploy(
    "0xb3dCcb4Cf7a26f6cf6B120Cf5A73875B7BBc655B", // _VRFCoordinator
    "0x8A753747A1Fa494EC906cE90E9f37563A8AF630e", // _ethUsdPriceFeedAddress
    "0x01BE23585060835E02B77ef475b0Cc51aA1e0709", // _LinkToken
    "0x2ed0feb3e7fd2022120aa84fab1945545a9f2ffc9076fd6156fa96eaff4c1311" // _keyhash
  );
  await luxurify.deployed();

  const tokenAddress = await luxurify.LinkToken();
  console.log("Chainlink Token Address: ", tokenAddress);
  const token = await hre.ethers.getContractAt("LinkTokenInterface", tokenAddress);
  console.log("Funding contract: ", luxurify.address);
  const tx = await token.transfer(luxurify.address, payment);
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
