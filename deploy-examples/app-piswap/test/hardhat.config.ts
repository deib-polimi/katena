import '@nomiclabs/hardhat-etherscan';
import '@nomiclabs/hardhat-waffle';
import '@openzeppelin/hardhat-upgrades';
import '@typechain/hardhat';
import 'hardhat-gas-reporter';
import { HardhatUserConfig, task } from 'hardhat/config';
import 'solidity-coverage';
require('dotenv').config();
require('hardhat-contract-sizer');

const config: HardhatUserConfig =
  process.env.ENV === 'dev'
    ? {
        defaultNetwork: 'hardhat',
        networks: {
          ganache: {
            url: 'https://127.0.0.1',
            accounts: {
              mnemonic: process.env.GANACHE as string,
            },
          },
          rinkeby: {
            url: 'https://rinkeby.infura.io/v3/' + process.env.INFURA_TOKEN,
            accounts: {
              mnemonic: process.env.MNEMONIC as string,
            },
          },
          goerli: {
            url: 'https://goerli.infura.io/v3/' + process.env.INFURA_TOKEN,
            accounts: {
              mnemonic: process.env.MNEMONIC as string,
            },
          },
          mumbai: {
            url: 'https://polygon-mumbai.infura.io/v3/' + process.env.INFURA_TOKEN,
            accounts: {
              mnemonic: process.env.MNEMONIC as string,
            },
            gasPrice: 8000000000,
          },
          hardhat: {},
        },
        solidity: {
          compilers: [
            {
              version: '0.8.11',
              settings: {
                optimizer: {
                  enabled: true,
                  runs: 200,
                },
              },
            },
          ],
        },
        gasReporter: {
          currency: 'USD',
          gasPrice: 100,
          enabled: process.env.REPORT_GAS === 'true',
          excludeContracts: [
            'ProxyTest',
            'MockERC165',
            'ERC721',
            'MockERC721',
            'MockERC721Royalty',
            'MockERC1155',
            'MockERC1155Royalty',
            'UpgradeTestA',
            'UpgradeTestB',
            'WETH9',
          ],
        },
        etherscan: {
          apiKey: process.env.ETHERSCAN_TOKEN,
        },
        mocha: {
          timeout: 100000,
        },
        typechain: {
          alwaysGenerateOverloads: true,
        },
      }
    : {
        defaultNetwork: 'hardhat',
        networks: {
          hardhat: {},
        },
        solidity: {
          compilers: [
            {
              version: '0.8.11',
              settings: {
                optimizer: {
                  enabled: true,
                  runs: 200,
                },
              },
            },
          ],
        },
        gasReporter: {
          currency: 'USD',
          gasPrice: 100,
          enabled: true,
          excludeContracts: [
            'ProxyTest',
            'MockERC165',
            'ERC721',
            'MockERC721',
            'MockERC721Royalty',
            'MockERC1155',
            'MockERC1155Royalty',
            'UpgradeTestA',
            'UpgradeTestB',
            'WETH9',
          ],
        },
        mocha: {
          timeout: 100000,
        },
      };

task('accounts', 'Prints the list of accounts', async (args, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(await account.address);
  }
});

export default config;
