// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface ICallee {
    function increment(int num) external pure returns(int result); 
}