import { config as dotEnvConfig } from "dotenv";
dotEnvConfig();

import { HardhatUserConfig } from "hardhat/config";
import { task } from "hardhat/config";

import "@nomiclabs/hardhat-waffle";
import "@typechain/hardhat";
import "solidity-coverage";

task("accounts", "Prints the list of accounts", async (args, hre) => {
  const accounts = await hre.ethers.getSigners();
  for (const account of accounts) {
    console.log(await account.address);
  }
});

const config: HardhatUserConfig = {
  solidity: "0.8.10",
  paths: {
    artifacts: "./src/artifacts",
  },
  networks: {
    hardhat: {
      chainId: 1337,
    },
    ropsten: {
      url: "http://127.0.0.1:8545/",
      accounts: [`0x29e4909e3e29c2ed59d7899cbe34edbec271ff8a4b909e01e7d8f631bedb3c7d`],
    },
    local: {
      url: "http://127.0.0.1:8545/",
      accounts: [`0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80`],
    },
  },
};
export default config;
