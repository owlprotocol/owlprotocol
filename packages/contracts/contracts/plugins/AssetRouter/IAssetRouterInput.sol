//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import {IAssetRouter} from './IAssetRouter.sol';
import {AssetBasketInput} from './IAsset.sol';

/**
 * @dev [IAssetRouterInput.sol] defines a contract that guards calls
 * requiring users to deposit or prove ownership of assets to then call
 * an underlying contract. It can then be paired with any  [IAssetRouterOutput.sol]
 * contract to trigger minting or other mechanics.
 *
 * The [IAssetRouterInput.sol] contract stores a set of `AssetInputBasket` from
 * which the user can chose from. Any basket in the contract can then be used
 * to forward calls to an [IAssetRouterOutput.sol]. The output contract is configured
 * to **only** accepts calls from the input or a set of valid input contracts to
 * trigger arbitrary logic though the current implementation is meant
 * for token transfers & mints.
 *
 * The general flow of a transaction can be visualized as such:
 * `user` -> `IAssetRouterInput` -> `AssetInputBasket` assets ([EIP-20], [EIP-721], [EIP-1155])
 * -> `IAssetRouterOutput` -> Arbitrary logic.
 */
interface IAssetRouterInput is IAssetRouter {
    /**
     * @dev Returns all input
     * @param basketIdx Index of selected input basket
     */
    function getBasket(uint256 basketIdx) external view returns (AssetBasketInput memory);

    /**
     * @notice Call `target` address with `amount` parameter using
     * `AssetInputBasket` stored at index `basketIdx`. Called by `user`.
     * @dev Used to trigger a routed call. Amount parameter enables down-level iteration that consumes N inputs.
     * @param target Target Address
     * @param amount Down-level iteration parameter
     * @param basketIdx Index of selected input basket
     * @param erc721TokenIdsUnaffected 2D-Array of tokenIds that serve as unlimited token-gating
     * @param erc721TokenIdsNTime 2D-Array of tokenIds to use
     * @param erc721TokenIdsBurned 2D-Array of tokenIds to burn
     * @param outBasketIdx Index of selected output basket
     * ```
     */
    function input(
        address target,
        uint256 amount,
        uint256 basketIdx,
        uint256[][] calldata erc721TokenIdsUnaffected,
        uint256[][] calldata erc721TokenIdsNTime,
        uint256[][] calldata erc721TokenIdsBurned,
        uint256 outBasketIdx
    ) external;
}
