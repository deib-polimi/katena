# PiSwapRegistry Libraries

## Owned (Upgradeable)

This library is based on the upgradeable `Ownable` contract by [openzeppelin](https://github.com/OpenZeppelin/openzeppelin-contracts-upgradeable/blob/v4.5.0/contracts/access/OwnableUpgradeable.sol). It was modified by replacing the `transferOwnership` and `renounceOwnership` functions with the `proposeOwner` and `claimOwnership` functions. This ensures that the ownership is not accidentally transferred to a wrong address. To renounce ownership ownership needs to be transferred to a smart contract that can claim the ownership but not propose a new owner.

## Beacon (Upgradeable)

The registry contract as well as the market contracts are upgradeable and utilize the beacon proxy pattern. The `BeaconUpgradeable` contract used for the registry contract is based on the [UpgradeableBeacon](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/v4.5.0/contracts/proxy/beacon/UpgradeableBeacon.sol) contract by openzeppelin. The `constructor` was replaced with an initialization function, as required by the upgradeable registry contract. 

## Beacon Proxy (Optimized)

The Beacon Proxy contract is deployed for every market. It proxies all calls to the implementation contract. The address of the implementation contract is stored in the registry (beacon) contract, this way the market implementation can be upgraded. The `BeaconProxyOptimized` contract is based on the [BeaconProxy](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/v4.5.0/contracts/proxy/beacon/BeaconProxy.sol) contract by openzeppelin. The following optimizations were made to save gas costs when deploying markets and interacting with the contract after deployment:

1. the beacon address was made immutable, this way it doesn't take up a storage slot and is cheaper to read. The beacon (registry) address will not change in the future.
2. Non essential functions were removed (e.g., receive function, as the market contract does not hold any ETH).