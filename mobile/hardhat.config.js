/**
 * @type import('hardhat/config').HardhatUserConfig
 */
require("@nomiclabs/hardhat-waffle");
require("dotenv/config");

const { HARDHAT_PORT } = process.env;

module.exports = {
  solidity: "0.7.3",
  networks: {
    localhost: { url: `http://127.0.0.1:${HARDHAT_PORT}` },
    hardhat: {
      accounts: [{"privateKey":"0x0e8de03fe869e5ee77ebd8b2c0edd903b362026cf7d9d974ebfc31cae6ae5de6","balance":"1000000000000000000000"},{"privateKey":"0x6a93d25d2e4494d1caba059933596c78210730693ed6e4f84e2c0b4d6b56e98b","balance":"1000000000000000000000"},{"privateKey":"0xd8b4527b45dbe17ccf443611f4f12f2f9c7e54010b029abbb2284b9876e35167","balance":"1000000000000000000000"},{"privateKey":"0x1bba79a5ddeaa0dee9c92b8499e4cefabc389657eef43452e7f3f71b9aab52b2","balance":"1000000000000000000000"},{"privateKey":"0xdfd22e209e940c568565286ecb31b315ea0b6c73dd90feed3076584c38dd8d83","balance":"1000000000000000000000"},{"privateKey":"0x1028321209b2a331153ac9eee5766dda864b3ddee76b912d32466a0df728470a","balance":"1000000000000000000000"},{"privateKey":"0x05230ac4f8d58db3cf69571ff95f56a370b0e3bca5879d7ffe992a9f30f8f4f6","balance":"1000000000000000000000"},{"privateKey":"0x6d30f95286c249f55e45d1d37b819ffb91d2643378e855dd4d46605a4df656aa","balance":"1000000000000000000000"},{"privateKey":"0xa55cb0b812f9400db3adcf91dbf71ab98cd179bfe9e82d2d62ea431a3c932d1d","balance":"1000000000000000000000"},{"privateKey":"0x6de5eafd22fce53aee27589a49e30c9c227cf322740061c8f4fadff9f8466b0e","balance":"1000000000000000000000"}]
    },
  },
  paths: {
    sources: './contracts',
    tests: './__tests__/contracts',
    cache: './cache',
    artifacts: './artifacts',
  },
};