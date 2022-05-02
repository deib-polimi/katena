// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./ICallee.sol";

contract Callee is ICallee {
    function increment(int num) external pure returns(int result){
        return 1 + num;
    }
}
