import "@nomicfoundation/hardhat-toolbox";
import "@nomicfoundation/hardhat-ethers";

const config: any = {
  solidity: {
    version: "0.8.10",
    settings: {
      optimizer: {
        enabled: true,
        runs: 10,
      },
    },
  },
  paths: {
    cache: "cache-hardhat",
    sources: "./contracts",
    tests: "./integration",
  },
  gasReporter: {
    currency: "USD",
    gasPrice: 77,
    excludeContracts: ["src/test"],
    // API key for CoinMarketCap. https://pro.coinmarketcap.com/signup
    coinmarketcap: process.env.CMC_KEY ?? "",
  },
  network:  {
    localhost: {
      url: "https//:localhost:8545",
    }
  }
};

export default config;
