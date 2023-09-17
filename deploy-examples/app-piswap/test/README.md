# <img src="./img/logo.png" alt="PiSwap" height="64px">

# PiSwap-core

[![CI Status](https://github.com/PiSwapProtocol/PiSwap-core/actions/workflows/tests.yml/badge.svg)](https://github.com/PiSwapProtocol/PiSwap-core/actions)
[![License](https://img.shields.io/badge/License-AGPLv3-green.svg)](https://www.gnu.org/licenses/agpl-3.0)

This smart contract contains the core smart contracts for the PiSwap protocol. For a high level design specification, see the [whitepaper](https://docs.google.com/document/d/1B69RdEEovy2JXgLP8avUy09hAtH2--_dTBaSLMzqoIs/).

## Build and Test

On the project root, run:

```
$ npm i                 # install dependencies
$ npm run compile       # compile contracts and generate typechain
$ npm test              # run tests
```
optional:
```
$ npm run coverage      # run test coverage tool
```

## Structure

The documentation for all components of the core smart contracts is available in their respective directories.

```
├── contracts                   # Core smart contracts of the protocol
    ├── interfaces              # Core smart contract interfaces
    ├── mock                    # Mock smart contracts used exclusively for unit tests
    └── lib                     # Libraries used by core smart contracts
├── test                        # Unit tests
├── .env                        # Environment variables
└── hardhat.config.ts           # Hardhat configuration
```

## Licensing

The primary license for the PiSwap Core smart contracts is the GNU Affero General Public License v3.0, see [`LICENSE`](./LICENSE).

### Exceptions

- All files based on the `openzeppelin` library (`BeaconProxyOptimized`, `BeaconUpgradeable`, `OwnedUpgradeable`) are licensed under the MIT license.
- The `Math` library is based on the UniSwap-v2 license and is licensed under the GNU General Public License Version 3
