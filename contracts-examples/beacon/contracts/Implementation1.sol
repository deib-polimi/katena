// SPDX-License-Identifier: Unlicense

pragma solidity ^0.8.0;


import "@openzeppelin/contracts/proxy/utils/Initializable.sol";

contract Implementation1 is Initializable {
    uint public count;

    function initialize(uint initial_count) public initializer {
        count = initial_count;
    }
    
    function getContractVersion() virtual external pure returns(uint){
        return 1;
    }

    function getCount() external view returns(uint){
        return count;
    }

    function add(uint factor) external {
        count = count + factor;
    }
}

