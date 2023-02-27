//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import {AssetERC20, AssetERC721, AssetERC1155} from './AssetStructs.sol';
import {AssetERC20TransferLib} from './AssetERC20TransferLib.sol';
import {AssetERC20MintLib} from './AssetERC20MintLib.sol';
import {AssetERC721TransferLib} from './AssetERC721TransferLib.sol';
import {AssetERC721MintLib} from './AssetERC721MintLib.sol';
import {AssetERC1155TransferLib} from './AssetERC1155TransferLib.sol';
import {AssetERC1155MintLib} from './AssetERC1155MintLib.sol';

/**
 * @dev Represents a set of assets used as outputs. Inputs can have 3 types:
 *  - Transfer: Transferred to the output contract initially and then to the user when triggered. For [EIP-721] tokens. Transferred tokens are tracked in the `tokenIds` field of the `AssetERC721` and popped incrementally.
 *  - Mint: Minted directly from the output contract to the user when triggered
 *  - MintAutoId: For [EIP-721] tokens. Minted directly using autoId from the output contract to the user when triggered
 * The basket is also configured with an `outputableAmount` which defines how many baskets can be outputted.
 * Invariant: The `outputableAmount` MUST match the `tokenIds.length` for all `erc721Transfer` assets.
 */
struct AssetBasketOutput {
    uint256 outputableAmount;
    AssetERC20[] erc20Mint;
    AssetERC721[] erc721MintAutoId;
    AssetERC1155[] erc1155Mint;
}

error InvalidOutputableAmount(uint256 currAmount, uint256 requiredAmount);

/**
 * @dev A library for batched [EIP-20], [EIP-721], and [EIP-1155] interactions
 * such as transfers, mints, and ownership checks.
 * [IAsset.sol] is used by [IAssetRouterInput.md] and [IAssetRouterOutput.md]
 * to enable dynamic NFT mechanics that combine, mint, and burn NFTs with flexible logic.
 */
library AssetOutputLib {
    event SupportsOutputAsset(address indexed contractAddr, uint256 indexed tokenId, uint256 basketIdx);

    /**
     * @dev Emit SupportsOutputAsset events for supported assets. Used for on-chain indexing.
     */
    function supportsBasket(AssetBasketOutput memory basket, uint256 basketId) internal {
        for (uint256 j = 0; j < basket.erc20Mint.length; j++) {
            emit SupportsOutputAsset(basket.erc20Mint[j].contractAddr, 0, basketId);
        }
        for (uint256 j = 0; j < basket.erc721MintAutoId.length; j++) {
            emit SupportsOutputAsset(basket.erc721MintAutoId[j].contractAddr, 0, basketId);
        }
        for (uint256 j = 0; j < basket.erc1155Mint.length; j++) {
            for (uint256 k = 0; k < basket.erc1155Mint[j].tokenIds.length; k++) {
                emit SupportsOutputAsset(
                    basket.erc1155Mint[j].contractAddr,
                    basket.erc1155Mint[j].tokenIds[k],
                    basketId
                );
            }
        }
    }

    /**
     * @dev `AssetBasketOutput` that is incrementing its outputableAmount.
     * Called by `admin` looking to increase the output amount.
     * The `ouputableAmount` is increased, and `Transfer` assets are transferred
     * to the contract, sufficiently to cover the additional increase.
     * For mintable assets, no change is necessary.
     */
    function deposit(AssetBasketOutput storage basket, uint256 amount) internal {
        basket.outputableAmount += amount;
    }

    /**
     * @dev `AssetBasketOutput` that is decrementing its `outputableAmount`.
     * Called by `admin` looking to decrease the amount.
     * The `outputableAmount` is decreased, and `Transfer` assets are transferred
     * back to the `admin`.
     */
    function withdraw(AssetBasketOutput storage basket, uint256 amount) internal {
        if (basket.outputableAmount < amount) revert InvalidOutputableAmount(basket.outputableAmount, amount);
        basket.outputableAmount -= amount;
    }

    /**
     * @dev `AssetBasketOutput` that outputing assets to a `user`.
     * The `outputableAmount` is decreased, and `Transfer` assets are
     * transferred to the `user`, and `Mint` assets are minted to the `user`.
     */
    function output(
        AssetBasketOutput storage basket,
        uint256 amount,
        address to
    ) internal {
        if (basket.outputableAmount < amount) revert InvalidOutputableAmount(basket.outputableAmount, amount);

        basket.outputableAmount -= amount;

        AssetERC20MintLib.mintERC20(basket.erc20Mint, amount, to);
        AssetERC721MintLib.mintAutoIdERC721(basket.erc721MintAutoId, amount, to);
        AssetERC1155MintLib.mintERC1155(basket.erc1155Mint, amount, to);
    }

    /*
    function pushTokenIds(AssetERC721[] storage assets, uint256[][] memory tokenIds) internal {
        for (uint256 i = 0; i < assets.length; i++) {
            for (uint256 j = 0; j < tokenIds[i].length; j++) {
                assets[i].tokenIds.push(tokenIds[i][j]);
            }
        }
    }

    function popTokenIds(AssetERC721[] storage assets, uint256 amount) internal returns (uint256[][] memory) {
        uint256[][] memory tokenIds = new uint256[][](assets.length);

        for (uint256 i = 0; i < assets.length; i++) {
            tokenIds[i] = new uint256[](amount);
            uint256 tokenIdsLen = assets[i].tokenIds.length;

            for (uint256 j = 0; j < amount; j++) {
                tokenIds[i][j] = assets[i].tokenIds[tokenIdsLen - 1 - j];
                assets[i].tokenIds.pop();
            }
        }

        return tokenIds;
    }
    */
}
