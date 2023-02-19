//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import {IERC721Mintable} from '../../assets/ERC721/IERC721Mintable.sol';
import {IERC721MintableAutoId} from '../../assets/ERC721/IERC721MintableAutoId.sol';

import {AssetERC721} from './AssetStructs.sol';

error InvalidERC721TokenIds(AssetERC721 asset, uint256 currTokenIdsLen, uint256 requiredTokenIdsLen);

library AssetERC721MintLib {
    /**
     * @dev Mint AssetERC721 scaled up by amount
     */
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

    /**
     * @dev Mint AssetERC721 scaled up by amount
     */
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
}
