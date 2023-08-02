// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

interface ITokenURIBaseURI {
    /**
     * @dev Returns collection-wide URI-accessible metadata
     */
    function baseURI() external view returns (string memory);

    /**
     * @dev Set baseURI
     */
    function setTokenURIBaseURI(string memory uri) external;
}
