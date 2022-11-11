//SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

/**
 * @dev IBaseURI defines metadata for a contract's assets. A 1:N relationship between contract address + id and metadata uri. Used by standards such as ERC721, ERC1155
 */
interface IBaseURI {
    function baseURI() external view returns (string memory);
    function setBaseURI(string memory uri) external;
}
