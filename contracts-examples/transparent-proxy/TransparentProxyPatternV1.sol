// SPDX-License-Identifier: Unlicense

pragma solidity ^0.8.0;

import {
    ERC1967UpgradeUpgradeable
    } from "@openzeppelin/contracts-upgradeable/proxy/ERC1967/ERC1967UpgradeUpgradeable.sol";
import {
    VersionAware
    } from "../VersionAware.sol";

contract TransparentProxyPatternV1 is ERC1967UpgradeUpgradeable, VersionAware {
    
    constructor() {
        /*
        Implementation contracts should not have a constructor, 
        they are abstract clases with the state at the procy

        _disableInitializers method in the constructor makes the implementation contract 
        not initializable which is much safer than leaving the implementation without
        a constructor and not initialized.
        */
        _disableInitializers();
    }
    
    // initializer: the function is called only once
    function initialize() external initializer {
        versionAwareContractName = "Transparent Proxy Pattern: V1";
    }
    
    function getContractNameWithVersion() public pure override returns(string memory) {
        return "Transparent Proxy Pattern: V1";
    }
}