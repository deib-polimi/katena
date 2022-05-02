// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./ICallee.sol";

contract Caller {
    ICallee private callee;

    function setCallee(address _newCallee) external {
        callee = ICallee(_newCallee);   
    }
    
    function getCallee() external view returns(address) {
        return address(callee);
    }

    function call(int _number) external view returns(int) {
        return callee.increment(_number);
    }

}