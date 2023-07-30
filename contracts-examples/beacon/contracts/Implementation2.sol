// SPDX-License-Identifier: Unlicense

pragma solidity ^0.8.0;

import "./Implementation1.sol";

contract Implementation2 is Implementation1 {
    
    function getContractVersion() pure external override returns(uint){
        return 2;
    }

    function substract(uint factor) external {
        count = count - factor;
    }
}

