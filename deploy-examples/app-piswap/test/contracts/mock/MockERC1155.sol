// SPDX-License-Identifier: AGPL-3.0-only
pragma solidity 0.8.11;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/token/ERC1155/extensions/ERC1155Supply.sol";

contract MockERC1155 is ERC1155 {
    constructor() ERC1155("") {
        _mint(_msgSender(), 0, 2, "");
        _mint(_msgSender(), 1, 2, "");
    }
}

contract MockERC1155Royalty is MockERC1155, ERC1155Supply {
    constructor() MockERC1155() {}

    function royaltyInfo(uint256, uint256 _salePrice) external view returns (address receiver, uint256 royaltyAmount) {
        receiver = address(this);
        royaltyAmount = _salePrice / 5;
    }

    function supportsInterface(bytes4 interfaceId) public view override returns (bool) {
        return interfaceId == 0x2a55205a || super.supportsInterface(interfaceId);
    }

    function _beforeTokenTransfer(
        address operator,
        address from,
        address to,
        uint256[] memory ids,
        uint256[] memory amounts,
        bytes memory data
    ) internal virtual override(ERC1155, ERC1155Supply) {
        ERC1155Supply._beforeTokenTransfer(operator, from, to, ids, amounts, data);
    }
}
