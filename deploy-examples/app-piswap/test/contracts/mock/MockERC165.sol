// SPDX-License-Identifier: AGPL-3.0-only
pragma solidity 0.8.11;

import "@openzeppelin/contracts/utils/introspection/ERC165.sol";

contract MockERC165 is ERC165 {
    constructor() ERC165() {}
}
