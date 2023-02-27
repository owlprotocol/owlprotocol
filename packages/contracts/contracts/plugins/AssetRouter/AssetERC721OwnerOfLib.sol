//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import {IERC721Upgradeable} from '@openzeppelin/contracts-upgradeable/token/ERC721/IERC721Upgradeable.sol';
import {AssetERC721} from './AssetStructs.sol';

library AssetERC721OwnerOfLib {
    error InvalidERC721TokenIds(AssetERC721 asset, uint256 currTokenIdsLen, uint256 requiredTokenIdsLen);
    error InvalidERC721TokenIdsDuplicate(AssetERC721 asset, uint256 preTokenId, uint256 curTokenId);
    error InvalidERC721OwnerOf(AssetERC721 asset, address currOwner, address requiredOwner);

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

            uint256 prevTokenId = 0;
            for (uint256 j = 0; j < tokenIds[i].length; j++) {
                if (tokenIds[i][j] < prevTokenId) {
                    //Verify uniqueness, assumes tokenIds are sorted linearly
                    revert InvalidERC721TokenIdsDuplicate(assets[i], prevTokenId, tokenIds[i][j]);
                }
                address currOwner = IERC721Upgradeable(assets[i].contractAddr).ownerOf(tokenIds[i][j]);
                if (currOwner != from) {
                    revert InvalidERC721OwnerOf(assets[i], currOwner, from);
                }
                prevTokenId = tokenIds[i][j];
            }
        }
    }
}
