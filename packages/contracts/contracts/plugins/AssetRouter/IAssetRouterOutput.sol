//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import {AssetBasketOutput} from './IAsset.sol';

/**
 * @dev [IAssetRouterOutput.sol] defines a contract that outputs assets.
 * All calls come from a set of trusted forwarders, usually [IAssetRouterInput.sol].
 * The [IAssetRouterOutput.sol] contract stores a set of `AssetOutputBasket` from
 * which the `forwarder` can chose from. Any basket in the contract can then be used
 * to mint assets.
 */
interface IAssetRouterOutput {
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
     * @param from Address input router
     * @param to Target address
     * @param amount Amount of time used
     * @param basketIdx Basket index
     */
    event RouteBasket(address indexed from, address indexed to, uint256 indexed basketIdx, uint256 amount);

    /**
     * @dev Event for tracking basket updates (deposit/withdrawals)
     * @param basketIdx Basket index
     * @param amountChange Change + for deposit, - for withdrawal
     */
    event UpdateBasket(uint256 indexed basketIdx, int256 amountChange);


    /**
     * @dev Returns all inputs
     * @param basketIdx Index of selected input basket
     */
    function getBasket(uint256 basketIdx) external view returns (AssetBasketOutput memory);

    /**
     * @notice Must be `DEFAULT_ADMIN_ROLE`. Automatically sends from
     * `_msgSender()`
     * @dev Used to deposit configuration outputs.
     * @param amount How many more times the configuration should be
     * craftable
     * @param erc721TokenIdsTransfer 2D-array transfers ERC721s
     * @param erc721TokenIdsMint 2D-array mint ERC721s
     * ```
     */
    function deposit(
        uint256 amount,
        uint256 basketIdx,
        uint256[][] calldata erc721TokenIdsTransfer,
        uint256[][] calldata erc721TokenIdsMint
    ) external;

    /**
     * @notice Must be `DEFAULT_ADMIN_ROLE`
     * @dev Used to withdraw configuration outputs out of contract to the
     * caller. Will also decrease `craftableAmount`
     * @param amount How many sets of outputs should be withdrawn
     * @param basketIdx Index of selected output basket
     */
    function withdraw(uint256 amount, uint256 basketIdx) external;

    /**
     * @notice Output `amount`
     * @dev Outputs assets.
     * @param to Receiver
     * @param amount How many times to craft
     * @param basketIdx Index of selected output basket
     */
    function output(
        address to,
        uint256 amount,
        uint256 basketIdx
    ) external;
}
