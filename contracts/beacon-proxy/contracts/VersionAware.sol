// SPDX-License-Identifier: Unlicense

pragma solidity ^0.8.18;

abstract contract VersionAware {
    string public versionAwareContractName;
    
    function getContractNameWithVersion() external pure virtual returns (string memory);
}