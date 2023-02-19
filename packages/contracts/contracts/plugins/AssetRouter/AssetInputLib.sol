//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import {AssetERC20, AssetERC721, AssetERC1155} from './AssetStructs.sol';
import {AssetERC20BalanceOfLib} from './AssetERC20BalanceOfLib.sol';
import {AssetERC20TransferLib} from './AssetERC20TransferLib.sol';
import {AssetERC721OwnerOfLib} from './AssetERC721OwnerOfLib.sol';
import {AssetERC721TransferLib} from './AssetERC721TransferLib.sol';
import {AssetERC721UseLib} from './AssetERC721UseLib.sol';
import {AssetERC1155BalanceOfLib} from './AssetERC1155BalanceOfLib.sol';
import {AssetERC1155TransferLib} from './AssetERC1155TransferLib.sol';

/**
 * @dev Represents a set of assets used as input. Inputs can have 3 types:
 *  - Unaffected: Check for ownership or minimum amount
 *  - Burn: Transfer to a `burnAddress` (Note: this might also be a regular address)
 *  - NTime: For [EIP-721] tokens, check for ownership and keep track of `usage < erc721NTimeMax`
 * Using the basket information the [IAssetRouterInput.md] can process the inputs and then call
 * another [IAssetRouterOutput.md] contract to trigger it.
 */
struct AssetBasketInput {
    address burnAddress;
    AssetERC20[] erc20Unaffected;
    AssetERC20[] erc20Burned;
    AssetERC721[] erc721Unaffected;
    AssetERC721[] erc721Burned;
    AssetERC721[] erc721NTime;
    uint256[] erc721NTimeMax;
    AssetERC1155[] erc1155Unaffected;
    AssetERC1155[] erc1155Burned;
}

/**
 * @dev A library for batched [EIP-20], [EIP-721], and [EIP-1155] interactions
 * such as transfers, mints, and ownership checks.
 * [IAsset.sol] is used by [IAssetRouterInput.md] and [IAssetRouterOutput.md]
 * to enable dynamic NFT mechanics that combine, mint, and burn NFTs with flexible logic.
 */
library AssetInputLib {
    event SupportsAsset(address indexed contractAddr, uint256 indexed tokenId, uint256 basketIdx);

    /**
     * @dev Emit SupportsAsset events for supported assets. Used for on-chain indexing.
     */
    function supportsBasket(AssetBasketInput memory basket, uint256 basketId) internal {
        for (uint256 j = 0; j < basket.erc20Unaffected.length; j++) {
            emit SupportsAsset(basket.erc20Unaffected[j].contractAddr, 0, basketId);
        }
        for (uint256 j = 0; j < basket.erc20Burned.length; j++) {
            emit SupportsAsset(basket.erc20Burned[j].contractAddr, 0, basketId);
        }
        for (uint256 j = 0; j < basket.erc721Unaffected.length; j++) {
            emit SupportsAsset(basket.erc721Unaffected[j].contractAddr, 0, basketId);
        }
        for (uint256 j = 0; j < basket.erc721Burned.length; j++) {
            emit SupportsAsset(basket.erc721Burned[j].contractAddr, 0, basketId);
        }
        for (uint256 j = 0; j < basket.erc721NTime.length; j++) {
            emit SupportsAsset(basket.erc721NTime[j].contractAddr, 0, basketId);
        }
        for (uint256 j = 0; j < basket.erc1155Unaffected.length; j++) {
            for (uint256 k = 0; k < basket.erc1155Unaffected[j].tokenIds.length; k++) {
                emit SupportsAsset(
                    basket.erc1155Unaffected[j].contractAddr,
                    basket.erc1155Unaffected[j].tokenIds[k],
                    basketId
                );
            }
        }
        for (uint256 j = 0; j < basket.erc1155Burned.length; j++) {
            for (uint256 k = 0; k < basket.erc1155Burned[j].tokenIds.length; k++) {
                emit SupportsAsset(basket.erc1155Burned[j].contractAddr, basket.erc1155Burned[j].tokenIds[k], basketId);
            }
        }
    }

    /**
     * @dev `AssetBasketInput` that checks token guards.
     * Called by the `user` interacting with an [AssetRouterInput.md] contract.
     * Each asset is checked for ownership or transferred accordingly depending on its type.
     * `NTime` [EIP-721] assets are also incremented by how many times the asset is used.
     * If any check fails the function throws as the input failed.
     * This could be because the `user` does not own the asset or hasn't given
     * transfer permissions to the contract.
     */
    function input(
        AssetBasketInput memory basket,
        uint256 amount,
        address from,
        uint256[][] memory erc721TokenIdsUnaffected,
        uint256[][] memory erc721TokenIdsNTime,
        uint256[][] memory erc721TokenIdsBurned,
        mapping(address => mapping(uint256 => uint256)) storage erc721NTime
    ) internal {
        AssetERC20BalanceOfLib.balanceOfERC20(basket.erc20Unaffected, amount, from);
        AssetERC20TransferLib.safeTransferFromERC20(basket.erc20Burned, amount, from, basket.burnAddress);

        AssetERC721OwnerOfLib.ownerOfERC721(basket.erc721Unaffected, amount, erc721TokenIdsUnaffected, from);
        AssetERC721UseLib.useERC721(
            basket.erc721NTime,
            amount,
            erc721TokenIdsNTime,
            from,
            basket.erc721NTimeMax,
            erc721NTime
        );
        AssetERC721TransferLib.safeTransferFromERC721(
            basket.erc721Burned,
            amount,
            erc721TokenIdsBurned,
            from,
            basket.burnAddress
        );

        AssetERC1155BalanceOfLib.balanceOfBatchERC1155(basket.erc1155Unaffected, amount, from);
        AssetERC1155TransferLib.safeBatchTransferFromERC1155(basket.erc1155Burned, amount, from, basket.burnAddress);
    }

    /**
     * @dev Same as input() but meant to be used post-ERC721 transfer for burn with single ERC721 input.
     * Uses AssetERC721TransferLib.safeTransferFromERC721 with address(this).
     * Assumptions:
     *    - amount = 1. If amount > 1, function will fail since user can only transfer 1 tokenId.
     * Requires:
     *    - basket.erc721Burned.length = 1. If length > 1, function will fail since only 1 contract can transfer.
     *    - Successful transfer of burn input to contract
     * Note: ERC1155 burn inputs CAN be used but user MUST use approval method.
     */
    function inputOnERC721Received(
        AssetBasketInput memory basket,
        address from,
        uint256[][] memory erc721TokenIdsUnaffected,
        uint256[][] memory erc721TokenIdsNTime,
        uint256[][] memory erc721TokenIdsBurned,
        mapping(address => mapping(uint256 => uint256)) storage erc721NTime
    ) internal {
        AssetERC20BalanceOfLib.balanceOfERC20(basket.erc20Unaffected, 1, from);
        AssetERC20TransferLib.safeTransferFromERC20(basket.erc20Burned, 1, from, basket.burnAddress);

        AssetERC721OwnerOfLib.ownerOfERC721(basket.erc721Unaffected, 1, erc721TokenIdsUnaffected, from);
        AssetERC721UseLib.useERC721(
            basket.erc721NTime,
            1,
            erc721TokenIdsNTime,
            from,
            basket.erc721NTimeMax,
            erc721NTime
        );
        AssetERC721TransferLib.safeTransferFromERC721(
            basket.erc721Burned,
            1,
            erc721TokenIdsBurned,
            address(this),
            basket.burnAddress
        );

        AssetERC1155BalanceOfLib.balanceOfBatchERC1155(basket.erc1155Unaffected, 1, from);
        AssetERC1155TransferLib.safeBatchTransferFromERC1155(basket.erc1155Burned, 1, from, basket.burnAddress);
    }

    /**
     * @dev Same as input() but meant to be used post-ERC1155 batch transfer for burn with single ERC1155 input.
     * Uses AssetERC1155TransferLib.safeBatchTransferFromERC1155 with address(this).
     * Recommended:
     *    - Amounts must be correctly computed to scale to exact burn amount or will be lost. For simplicity use amount=1.
     * Requires:
     *    - basket.erc721Burned.length = 1. If length > 1, function will fail since only 1 contract can transfer.
     *    - Successful transfer of burn input to contract
     * Note: ERC721 burn inputs CAN be used but user MUST use approval method.
     */
    function inputOnERC1155Received(
        AssetBasketInput memory basket,
        uint256 amount,
        address from,
        uint256[][] memory erc721TokenIdsUnaffected,
        uint256[][] memory erc721TokenIdsNTime,
        uint256[][] memory erc721TokenIdsBurned,
        mapping(address => mapping(uint256 => uint256)) storage erc721NTime
    ) internal {
        AssetERC20BalanceOfLib.balanceOfERC20(basket.erc20Unaffected, amount, from);
        AssetERC20TransferLib.safeTransferFromERC20(basket.erc20Burned, amount, from, basket.burnAddress);

        AssetERC721OwnerOfLib.ownerOfERC721(basket.erc721Unaffected, amount, erc721TokenIdsUnaffected, from);
        AssetERC721UseLib.useERC721(
            basket.erc721NTime,
            amount,
            erc721TokenIdsNTime,
            from,
            basket.erc721NTimeMax,
            erc721NTime
        );
        AssetERC721TransferLib.safeTransferFromERC721(
            basket.erc721Burned,
            amount,
            erc721TokenIdsBurned,
            from,
            basket.burnAddress
        );

        AssetERC1155BalanceOfLib.balanceOfBatchERC1155(basket.erc1155Unaffected, amount, from);
        AssetERC1155TransferLib.safeBatchTransferFromERC1155(
            basket.erc1155Burned,
            amount,
            address(this),
            basket.burnAddress
        );
    }
}
