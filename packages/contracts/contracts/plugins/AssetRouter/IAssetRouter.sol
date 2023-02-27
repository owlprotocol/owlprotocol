//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface IAssetRouter {
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
