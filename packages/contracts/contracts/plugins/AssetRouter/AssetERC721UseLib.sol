//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import {IERC721Upgradeable} from '@openzeppelin/contracts-upgradeable/token/ERC721/IERC721Upgradeable.sol';
import {AssetERC721} from './AssetStructs.sol';
import {AssetERC721OwnerOfLib} from './AssetERC721OwnerOfLib.sol';

error InvalidERC721NTime(AssetERC721 asset, uint256 currNTime, uint256 maxNTime);

library AssetERC721UseLib {
    /**
     * @dev Checks ownership of ERC721 tokenIds for each AssetERC721
     * and tracks `erc721NTime` usage. Throws if asset is not owned or
     * has been used more than `erc721NTimeMax`. Requires `{amount}` tokenIds per asset
     */
    function useERC721(
        AssetERC721[] memory assets,
        uint256 amount,
        uint256[][] memory tokenIds,
        address from,
        uint256[] memory erc721NTimeMax,
        mapping(address => mapping(uint256 => uint256)) storage erc721NTime
    ) internal {
        AssetERC721OwnerOfLib.ownerOfERC721(assets, amount, tokenIds, from);
        useERC721_no_ownership_check(assets, tokenIds, erc721NTimeMax, erc721NTime);
    }

    /**
     * @dev For each AssetERC721 tracks `erc721NTime` usage. Throws if asset
     * has been used more than `erc721NTimeMax`. Unsafe version that does not check ownership.
     */
    function useERC721_no_ownership_check(
        AssetERC721[] memory assets,
        uint256[][] memory tokenIds,
        uint256[] memory erc721NTimeMax,
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
}
