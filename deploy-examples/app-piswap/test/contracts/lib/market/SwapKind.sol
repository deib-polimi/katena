//SPDX-License-Identifier:AGPL-3.0-only
pragma solidity 0.8.11;

/// GIVEN_IN if amount of tokens sending to the pool is known
/// GIVEN_OUT if amount of tokens received from the pool is known
enum SwapKind {
    GIVEN_IN,
    GIVEN_OUT
}

library SwapKindLib {
    function givenIn(SwapKind _kind) internal pure returns (bool) {
        return _kind == SwapKind.GIVEN_IN;
    }
}
