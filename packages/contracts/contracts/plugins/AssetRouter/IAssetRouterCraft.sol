//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import {IAssetRouter} from './IAssetRouter.sol';
import {AssetBasketInput} from './AssetInputLib.sol';
import {AssetBasketOutput} from './AssetOutputLib.sol';

/**
 * @dev
 */
interface IAssetRouterCraft is IAssetRouter {
    /**
     * @dev Event for adding a supported asset.
     * This enables filtering the blockchain for contracts that support an asset.
     * @param contractAddr Address of asset
     * @param tokenId TokenId of asset (for ERC1155, otherwise 0)
     * @param basketIdx Basket this asset is part of
     */
    event SupportsInputAsset(address indexed contractAddr, uint256 indexed tokenId, uint256 basketIdx);

    /**
     * @dev Event for adding a supported asset.
     * This enables filtering the blockchain for contracts that support an asset.
     * @param contractAddr Address of asset
     * @param tokenId TokenId of asset (for ERC1155, otherwise 0)
     * @param basketIdx Basket this asset is part of
     */
    event SupportsOutputAsset(address indexed contractAddr, uint256 indexed tokenId, uint256 basketIdx);

    /**
     * @dev Event for tracking basket updates (deposit/withdrawals)
     * @param basketIdx Basket index
     * @param amountChange Change + for deposit, - for withdrawal
     */
    event UpdateBasket(uint256 indexed basketIdx, int256 amountChange);

    /**
     * @dev Returns all input
     * @param basketIdx Index of selected input basket
     */
    function getInputBasket(uint256 basketIdx) external view returns (AssetBasketInput memory);

    /**
     * @dev Returns all outputs
     * @param basketIdx Index of selected output basket
     */
    function getOutputBasket(uint256 basketIdx) external view returns (AssetBasketOutput memory);

    /**
     * @notice Call `target` address with `amount` parameter using
     * `AssetInputBasket` stored at index `basketIdx`. Called by `user`.
     * @dev Used to trigger a routed call. Amount parameter enables down-level iteration that consumes N inputs.
     * @param amount Down-level iteration parameter
     * @param basketIdx Index of selected input basket
     * @param erc721TokenIdsUnaffected 2D-Array of tokenIds that serve as unlimited token-gating
     * @param erc721TokenIdsNTime 2D-Array of tokenIds to use
     * @param erc721TokenIdsBurned 2D-Array of tokenIds to burn
     * @param outBasketIdx Index of selected output basket
     * ```
     */
    function craft(
        uint256 amount,
        uint256 basketIdx,
        uint256[][] calldata erc721TokenIdsUnaffected,
        uint256[][] calldata erc721TokenIdsNTime,
        uint256[][] calldata erc721TokenIdsBurned,
        uint256 outBasketIdx
    ) external;

    /**
     * @notice Must be `DEFAULT_ADMIN_ROLE`. Automatically sends from
     * `_msgSender()`
     * @dev Used to deposit configuration outputs.
     * @param amount How many more times the configuration should be
     * craftable
     * ```
     */
    function deposit(uint256 amount, uint256 basketIdx) external;

    /**
     * @notice Must be `DEFAULT_ADMIN_ROLE`
     * @dev Used to withdraw configuration outputs out of contract to the
     * caller. Will also decrease `craftableAmount`
     * @param amount How many sets of outputs should be withdrawn
     * @param basketIdx Index of selected output basket
     */
    function withdraw(uint256 amount, uint256 basketIdx) external;
}
