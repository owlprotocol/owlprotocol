//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import {IERC721Upgradeable} from '@openzeppelin/contracts-upgradeable/token/ERC721/IERC721Upgradeable.sol';
import {AssetERC721} from './AssetStructs.sol';

library AssetERC721TransferLib {
    error InvalidERC721TokenIds(AssetERC721 asset, uint256 currTokenIdsLen, uint256 requiredTokenIdsLen);

    /**
     * @dev Transfer AssetERC721 scaled up by amount
     */
    function transferFromERC721(
        AssetERC721[] memory assets,
        uint256 amount,
        uint256[][] memory tokenIds,
        address from,
        address to
    ) internal {
        for (uint256 i = 0; i < assets.length; i++) {
            if (tokenIds[i].length != amount) revert InvalidERC721TokenIds(assets[i], tokenIds[i].length, amount);

            for (uint256 j = 0; j < amount; j++) {
                IERC721Upgradeable(assets[i].contractAddr).transferFrom(from, to, tokenIds[i][j]);
            }
        }
    }

    /**
     * @dev Transfer AssetERC721 scaled up by amount
     */
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
}
