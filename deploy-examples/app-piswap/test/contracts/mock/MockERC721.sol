// SPDX-License-Identifier: AGPL-3.0-only
pragma solidity 0.8.11;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract MockERC721 is ERC721 {
    string private assetUrl;

    constructor(
        string memory _name,
        string memory _symbol,
        string memory _assetUrl
    ) ERC721(_name, _symbol) {
        assetUrl = _assetUrl;
        _mint(_msgSender(), 0);
        _mint(_msgSender(), 1);
    }

    function tokenURI(uint256) public view override returns (string memory) {
        return assetUrl;
    }
}

contract MockERC721Royalty is MockERC721 {
    constructor(
        string memory _name,
        string memory _symbol,
        string memory _assetUrl
    ) MockERC721(_name, _symbol, _assetUrl) {}

    function royaltyInfo(uint256, uint256 _salePrice) external view returns (address receiver, uint256 royaltyAmount) {
        receiver = address(this);
        royaltyAmount = _salePrice / 10;
    }

    function supportsInterface(bytes4 interfaceId) public view override returns (bool) {
        return interfaceId == 0x2a55205a || super.supportsInterface(interfaceId);
    }
}
