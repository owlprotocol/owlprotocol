//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import {IERC20Upgradeable} from '@openzeppelin/contracts-upgradeable/token/ERC20/IERC20Upgradeable.sol';
import {SafeERC20Upgradeable} from '@openzeppelin/contracts-upgradeable/token/ERC20/utils/SafeERC20Upgradeable.sol';

import {AssetERC20} from './AssetStructs.sol';

library AssetERC20TransferLib {
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
}
