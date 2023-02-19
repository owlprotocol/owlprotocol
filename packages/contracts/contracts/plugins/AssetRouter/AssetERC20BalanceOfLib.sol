//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import {IERC20Upgradeable} from '@openzeppelin/contracts-upgradeable/token/ERC20/IERC20Upgradeable.sol';
import {AssetERC20} from './AssetStructs.sol';

error InvalidERC20BalanceOf(AssetERC20 asset, uint256 currBalance, uint256 requiredBalance);

library AssetERC20BalanceOfLib {
    /**
     * @dev Check balance of AssetERC20 scaled up by amount
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
}
