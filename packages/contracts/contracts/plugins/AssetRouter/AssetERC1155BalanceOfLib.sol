//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import {IERC1155Upgradeable} from '@openzeppelin/contracts-upgradeable/token/ERC1155/IERC1155Upgradeable.sol';
import {AssetERC1155} from './AssetStructs.sol';

error InvalidERC1155BalanceOfBatch(AssetERC1155 asset, uint256 tokenId, uint256 currBalance, uint256 requiredBalance);

library AssetERC1155BalanceOfLib {
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
}
