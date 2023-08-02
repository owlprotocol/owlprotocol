// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

interface ITokenURI {
    /**
     * @dev returns uri for token metadata.
     * @param tokenId tokenId metadata to fetch
     * @return uri at which metadata is housed
     */
    function tokenURI(uint256 tokenId) external view returns (string memory);
}
