//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import {IERC20Upgradeable} from '@openzeppelin/contracts-upgradeable/token/ERC20/IERC20Upgradeable.sol';
import {IERC721Upgradeable} from '@openzeppelin/contracts-upgradeable/token/ERC721/IERC721Upgradeable.sol';
import {IERC1155Upgradeable} from '@openzeppelin/contracts-upgradeable/token/ERC1155/IERC1155Upgradeable.sol';
import {SafeERC20Upgradeable} from '@openzeppelin/contracts-upgradeable/token/ERC20/utils/SafeERC20Upgradeable.sol';

import {IERC20Mintable} from '../../assets/ERC20/IERC20Mintable.sol';
import {IERC721Mintable} from '../../assets/ERC721/IERC721Mintable.sol';
import {IERC721MintableAutoId} from '../../assets/ERC721/IERC721MintableAutoId.sol';
import {IERC1155Mintable} from '../../assets/ERC1155/IERC1155Mintable.sol';

import {IERC20Mintable} from '../../assets/ERC20/IERC20Mintable.sol';

// Unaffected inputs of this type are unaffected by the crafting process.
// DOES NOT APPLY TO ERC 721 INPUTS, USE NTime INSTEAD.
// Burned inputs of this type are burned during the crafting process/
// NTime inputs of this type are not burned, but can only be used N times in
// the same recipe; Only available for ERC721 TokenType
enum ConsumableType {
    unaffected,
    burned,
    NTime
}

// Current set of support token types as assets
enum TokenType {
    erc20,
    erc721,
    erc1155
}

/**
 * Represents an [EIP-20] token and its amount.
 */
struct AssetERC20 {
    address contractAddr;
    uint256 amount;
}

/**
 * @dev Represents a set of [EIP-721] tokens or
 * an entire collection (when `tokenIds.length` = 0).
 */
struct AssetERC721 {
    address contractAddr;
    uint256[] tokenIds;
}

/**
 * @dev Represents a set of [EIP-1155] tokens, and associated amounts.
 * Invariant: `amounts.length == tokenIds.length`
 */
struct AssetERC1155 {
    address contractAddr;
    uint256[] amounts;
    uint256[] tokenIds;
}

struct AssetBasket {
    AssetERC20[] erc20;
    AssetERC721[] erc721;
    AssetERC1155[] erc1155;
}

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
 * @dev Represents a set of assets used as outputs. Inputs can have 3 types:
 *  - Transfer: Transferred to the output contract initially and then to the user when triggered. For [EIP-721] tokens. Transferred tokens are tracked in the `tokenIds` field of the `AssetERC721` and popped incrementally.
 *  - Mint: Minted directly from the output contract to the user when triggered
 *  - MintAutoId: For [EIP-721] tokens. Minted directly using autoId from the output contract to the user when triggered
 * The basket is also configured with an `outputableAmount` which defines how many baskets can be outputted.
 * Invariant: The `outputableAmount` MUST match the `tokenIds.length` for all `erc721Transfer` assets.
 */
struct AssetBasketOutput {
    uint256 outputableAmount;
    AssetERC20[] erc20Transfer;
    AssetERC20[] erc20Mint;
    AssetERC721[] erc721Transfer;
    AssetERC721[] erc721Mint;
    AssetERC721[] erc721MintAutoId;
    AssetERC1155[] erc1155Transfer;
    AssetERC1155[] erc1155Mint;
}

error InvalidERC20BalanceOf(AssetERC20 asset, uint256 currBalance, uint256 requiredBalance);
error InvalidERC721OwnerOf(AssetERC721 asset, address currOwner, address requiredOwner);
error InvalidERC721TokenIds(AssetERC721 asset, uint256 currTokenIdsLen, uint256 requiredTokenIdsLen);
error InvalidERC721NTime(AssetERC721 asset, uint256 currNTime, uint256 maxNTime);
error InvalidERC1155BalanceOfBatch(AssetERC1155 asset, uint256 tokenId, uint256 currBalance, uint256 requiredBalance);
error InvalidOutputableAmount(uint256 currAmount, uint256 requiredAmount);

/**
 * @dev A library for batched [EIP-20], [EIP-721], and [EIP-1155] interactions
 * such as transfers, mints, and ownership checks.
 * [IAsset.sol] is used by [IAssetRouterInput.md] and [IAssetRouterOutput.md]
 * to enable dynamic NFT mechanics that combine, mint, and burn NFTs with flexible logic.
 */
library AssetLib {
    /**
     * @dev `AssetBasketOutput` that is incrementing its outputableAmount.
     * Called by `admin` looking to increase the output amount.
     * The `ouputableAmount` is increased, and `Transfer` assets are transferred
     * to the contract, sufficiently to cover the additional increase.
     * For mintable assets, no change is necessary.
     */
    function deposit(
        AssetBasketOutput storage basket,
        uint256 amount,
        address from,
        uint256[][] memory erc721TokenIdsTransfer,
        uint256[][] memory erc721TokenIdsMint
    ) internal {
        basket.outputableAmount += amount;
        pushTokenIds(basket.erc721Transfer, erc721TokenIdsTransfer);
        pushTokenIds(basket.erc721Mint, erc721TokenIdsMint);

        safeTransferFromERC20(basket.erc20Transfer, amount, from, address(this));
        safeTransferFromERC721(basket.erc721Transfer, amount, erc721TokenIdsTransfer, from, address(this));
        safeBatchTransferFromERC1155(basket.erc1155Transfer, amount, from, address(this));
    }

    /**
     * @dev `AssetBasketOutput` that is decrementing its `outputableAmount`.
     * Called by `admin` looking to decrease the amount.
     * The `outputableAmount` is decreased, and `Transfer` assets are transferred
     * back to the `admin`.
     */
    function withdraw(
        AssetBasketOutput storage basket,
        uint256 amount,
        address to
    ) internal {
        if (basket.outputableAmount < amount) revert InvalidOutputableAmount(basket.outputableAmount, amount);

        basket.outputableAmount -= amount;
        uint256[][] memory erc721TokenIdsTransfer = popTokenIds(basket.erc721Transfer, amount);
        popTokenIds(basket.erc721Mint, amount);

        safeTransferERC20(basket.erc20Transfer, amount, to);
        safeTransferFromERC721(basket.erc721Transfer, amount, erc721TokenIdsTransfer, address(this), to);
        safeBatchTransferFromERC1155(basket.erc1155Transfer, amount, address(this), to);
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
        uint256[][] memory erc721TokenIdsTransfer = popTokenIds(basket.erc721Transfer, amount);
        uint256[][] memory erc721TokenIdsMint = popTokenIds(basket.erc721Mint, amount);

        safeTransferERC20(basket.erc20Transfer, amount, to);
        mintERC20(basket.erc20Mint, amount, to);

        safeTransferFromERC721(basket.erc721Transfer, amount, erc721TokenIdsTransfer, address(this), to);
        mintERC721(basket.erc721Mint, amount, erc721TokenIdsMint, to);
        mintAutoIdERC721(basket.erc721MintAutoId, amount, to);

        safeBatchTransferFromERC1155(basket.erc1155Transfer, amount, address(this), to);
        mintERC1155(basket.erc1155Mint, amount, to);
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
        AssetBasketInput storage basket,
        uint256 amount,
        address from,
        uint256[][] memory erc721TokenIdsUnaffected,
        uint256[][] memory erc721TokenIdsNTime,
        uint256[][] memory erc721TokenIdsBurned,
        mapping(address => mapping(uint256 => uint256)) storage erc721NTime
    ) internal {
        balanceOfERC20(basket.erc20Unaffected, amount, from);
        safeTransferFromERC20(basket.erc20Burned, amount, from, basket.burnAddress);

        ownerOfERC721(basket.erc721Unaffected, amount, erc721TokenIdsUnaffected, from);
        ownerOfERC721(basket.erc721NTime, amount, erc721TokenIdsNTime, from);
        useERC721(basket.erc721NTime, basket.erc721NTimeMax, erc721TokenIdsNTime, erc721NTime);
        safeTransferFromERC721(basket.erc721Burned, amount, erc721TokenIdsBurned, from, basket.burnAddress);

        balanceOfBatchERC1155(basket.erc1155Unaffected, amount, from);
        safeBatchTransferFromERC1155(basket.erc1155Burned, amount, from, basket.burnAddress);
    }

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

    /**
     * @dev Checks if balance of ERC20 is below minimum required for each AssetERC20
     */
    function balanceOfERC20(
        AssetERC20[] memory assets,
        uint256 amount,
        address from
    ) internal view {
        for (uint256 i = 0; i < assets.length; i++) {
            uint256 currBalance = IERC20Upgradeable(assets[i].contractAddr).balanceOf(from);
            uint256 requiredBalance = assets[i].amount * amount;
            if (currBalance < requiredBalance) {
                revert InvalidERC20BalanceOf(assets[i], currBalance, requiredBalance);
            }
        }
    }

    /**
     * @dev Checks ownership of ERC721 tokenIds for each AssetERC721
     * and tracks `erc721NTime` usage. Throws if asset is not owned or
     * has been used more than `erc721NTimeMax`.
     */
    function useERC721(
        AssetERC721[] memory assets,
        uint256[] memory erc721NTimeMax,
        uint256[][] memory tokenIds,
        mapping(address => mapping(uint256 => uint256)) storage erc721NTime
    ) internal {
        for (uint256 i = 0; i < assets.length; i++) {
            for (uint256 j = 0; j < tokenIds[i].length; j++) {
                uint256 currNTime = erc721NTime[assets[i].contractAddr][tokenIds[i][j]];
                uint256 maxNTime = erc721NTimeMax[i];
                if (currNTime >= maxNTime) {
                    revert InvalidERC721NTime(assets[i], currNTime, maxNTime);
                }

                erc721NTime[assets[i].contractAddr][tokenIds[i][j]] = currNTime + 1;
            }
        }
    }

    /**
     * @dev Checks ownership of ERC721 tokenIds for each AssetERC721.
     * Throws if asset is not owned.
     */
    function ownerOfERC721(
        AssetERC721[] memory assets,
        uint256 amount,
        uint256[][] memory tokenIds,
        address from
    ) internal view {
        for (uint256 i = 0; i < assets.length; i++) {
            if (tokenIds[i].length != amount) revert InvalidERC721TokenIds(assets[i], tokenIds[i].length, amount);

            for (uint256 j = 0; j < tokenIds[i].length; j++) {
                address currOwner = IERC721Upgradeable(assets[i].contractAddr).ownerOf(tokenIds[i][j]);
                if (currOwner != from) {
                    revert InvalidERC721OwnerOf(assets[i], currOwner, from);
                }
            }
        }
    }

    /**
     * @dev Checks if batch balance of ERC1155 is below minimum required for each AssetERC1155
     */
    function balanceOfBatchERC1155(
        AssetERC1155[] memory assets,
        uint256 amount,
        address from
    ) internal view {
        for (uint256 i = 0; i < assets.length; i++) {
            //this is unaffected consumable type, as ensured by input validations
            uint256[] memory amounts = new uint256[](assets[i].amounts.length);
            address[] memory accounts = new address[](assets[i].amounts.length);
            for (uint256 j = 0; j < assets[i].amounts.length; j++) {
                amounts[j] = assets[i].amounts[j] * amount;
                accounts[j] = from;
            }

            uint256[] memory balances = IERC1155Upgradeable(assets[i].contractAddr).balanceOfBatch(
                accounts,
                assets[i].tokenIds
            );
            for (uint256 j = 0; j < balances.length; j++) {
                if (balances[j] < amounts[j]) {
                    revert InvalidERC1155BalanceOfBatch(assets[i], assets[i].tokenIds[j], balances[j], amounts[j]);
                }
            }
        }
    }

    /**
     * @dev Transfer AssetERC20 scaled up by amount
     */
    function safeTransferFromERC20(
        AssetERC20[] memory assets,
        uint256 amount,
        address from,
        address to
    ) internal {
        for (uint256 i = 0; i < assets.length; i++) {
            SafeERC20Upgradeable.safeTransferFrom(
                IERC20Upgradeable(assets[i].contractAddr),
                from,
                to,
                assets[i].amount * amount
            );
        }
    }

    /**
     * @dev Transfer AssetERC20 scaled up by amount
     */
    function safeTransferERC20(
        AssetERC20[] memory assets,
        uint256 amount,
        address to
    ) internal {
        for (uint256 i = 0; i < assets.length; i++) {
            SafeERC20Upgradeable.safeTransfer(IERC20Upgradeable(assets[i].contractAddr), to, assets[i].amount * amount);
        }
    }

    function safeTransferFromERC721(
        AssetERC721[] memory assets,
        uint256 amount,
        uint256[][] memory tokenIds,
        address from,
        address to
    ) internal {
        for (uint256 i = 0; i < assets.length; i++) {
            if (tokenIds[i].length != amount) revert InvalidERC721TokenIds(assets[i], tokenIds[i].length, amount);

            for (uint256 j = 0; j < amount; j++) {
                IERC721Upgradeable(assets[i].contractAddr).safeTransferFrom(from, to, tokenIds[i][j]);
            }
        }
    }

    function safeBatchTransferFromERC1155(
        AssetERC1155[] memory assets,
        uint256 amount,
        address from,
        address to
    ) internal {
        for (uint256 i = 0; i < assets.length; i++) {
            uint256[] memory amounts = new uint256[](assets[i].amounts.length);
            for (uint256 j = 0; j < assets[i].amounts.length; j++) {
                amounts[j] = assets[i].amounts[j] * amount;
            }

            IERC1155Upgradeable(assets[i].contractAddr).safeBatchTransferFrom(
                from,
                to,
                assets[i].tokenIds,
                amounts,
                new bytes(0)
            );
        }
    }

    function mintERC20(
        AssetERC20[] memory assets,
        uint256 amount,
        address to
    ) internal {
        for (uint256 i = 0; i < assets.length; i++) {
            IERC20Mintable(assets[i].contractAddr).mint(to, assets[i].amount * amount);
        }
    }

    function mintERC721(
        AssetERC721[] memory assets,
        uint256 amount,
        uint256[][] memory tokenIds,
        address to
    ) internal {
        for (uint256 i = 0; i < assets.length; i++) {
            if (tokenIds[i].length != amount) revert InvalidERC721TokenIds(assets[i], tokenIds[i].length, amount);

            for (uint256 j = 0; j < tokenIds[i].length; j++) {
                IERC721Mintable(assets[i].contractAddr).mint(to, tokenIds[i][j]);
            }
        }
    }

    function mintAutoIdERC721(
        AssetERC721[] memory assets,
        uint256 amount,
        address to
    ) internal {
        for (uint256 i = 0; i < assets.length; i++) {
            for (uint256 j = 0; j < amount; j++) {
                IERC721MintableAutoId(assets[i].contractAddr).mint(to);
            }
        }
    }

    function mintERC1155(
        AssetERC1155[] memory assets,
        uint256 amount,
        address to
    ) internal {
        for (uint256 i = 0; i < assets.length; i++) {
            uint256[] memory amounts = new uint256[](assets[i].amounts.length);
            for (uint256 j = 0; j < assets[i].amounts.length; j++) {
                amounts[j] = assets[i].amounts[j] * amount;
            }

            IERC1155Mintable(assets[i].contractAddr).mintBatch(to, assets[i].tokenIds, amounts, new bytes(0));
        }
    }
}
