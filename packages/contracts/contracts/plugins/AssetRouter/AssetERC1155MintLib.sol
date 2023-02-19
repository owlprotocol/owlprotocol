//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import {IERC1155Mintable} from '../../assets/ERC1155/IERC1155Mintable.sol';
import {AssetERC1155} from './AssetStructs.sol';

library AssetERC1155MintLib {
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
