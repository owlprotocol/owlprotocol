//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import {IAssetRouter} from './IAssetRouter.sol';
import {AssetBasketOutput} from './AssetOutputLib.sol';

/**
 * @dev [IAssetRouterOutput.sol] defines a contract that outputs assets.
 * All calls come from a set of trusted forwarders, usually [IAssetRouterInput.sol].
 * The [IAssetRouterOutput.sol] contract stores a set of `AssetOutputBasket` from
 * which the `forwarder` can chose from. Any basket in the contract can then be used
 * to mint assets.
 */
interface IAssetRouterOutput is IAssetRouter {
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
     * @dev Returns all outputs
     * @param basketIdx Index of selected output basket
     */
    function getOutputBasket(uint256 basketIdx) external view returns (AssetBasketOutput memory);

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
