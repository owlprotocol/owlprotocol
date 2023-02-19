//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import {IERC20Mintable} from '../../assets/ERC20/IERC20Mintable.sol';
import {AssetERC20} from './AssetStructs.sol';

library AssetERC20MintLib {
    /**
     * @dev Mint batch of AssetERC20
     */
    function mintERC20(
        AssetERC20[] memory assets,
        uint256 amount,
        address to
    ) internal {
        for (uint256 i = 0; i < assets.length; i++) {
            IERC20Mintable(assets[i].contractAddr).mint(to, assets[i].amount * amount);
        }
    }
}
