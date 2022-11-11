//SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import { IAccessControlUpgradeable } from '@openzeppelin/contracts-upgradeable/access/IAccessControlUpgradeable.sol';
import { IContractURI } from './IContractURI.sol';
import { IRouterReceiver } from './IRouterReceiver.sol';

/**
 * IOwlBase interface
 */
interface IOwlBase is IAccessControlUpgradeable, IContractURI, IRouterReceiver {
    function version() external pure returns (string memory);
}
