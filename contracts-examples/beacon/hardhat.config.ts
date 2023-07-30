import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "@openzeppelin/hardhat-upgrades";
import "@typechain/hardhat";


const config: HardhatUserConfig = {
  solidity: {
    version: "0.8.18",
    settings: {
    optimizer: {
      enabled: true,
      runs: 200 },
    },
  },
  defaultNetwork: "localhost",
};

export default config;