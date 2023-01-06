//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface IAssetRouter {
    /**
     * @dev Event for adding a supported asset.
     * This enables filtering the blockchain for contracts that support an asset.
     * @param contractAddr Address of asset
     * @param tokenId TokenId of asset (for ERC1155, otherwise 0)
     * @param basketIdx Basket this asset is part of
     */
    event SupportsAsset(address indexed contractAddr, uint256 indexed tokenId, uint256 basketIdx);

    /**
     * @dev Event for tracking route events from user to output router
     * This enables filtering the blockchain for route events made by a user or to a specific target
     * @param from Address of user
     * @param to Target address
     * @param amount Amount of time used
     * @param basketIdx Basket index
     */
    event RouteBasket(address indexed from, address indexed to, uint256 indexed basketIdx, uint256 amount);
}
