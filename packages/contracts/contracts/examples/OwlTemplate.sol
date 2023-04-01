// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import {ContextUpgradeable} from '@openzeppelin/contracts-upgradeable/utils/ContextUpgradeable.sol';

import {OwlBase} from '../common/OwlBase.sol';
import {OwlTemplateHelperLib} from '../helpers/OwlTemplateHelperLib.sol';

/**
 * @dev This implements the OwlBase standard base smart contract.
 * This contract and the associated Lib are an example of deploying additional
 * implementations after the common implementations/proxies.
 * Initializations happens through initializers for compatibility with a
 * EIP1167 minimal-proxy deployment strategy.
 */
contract OwlTemplate is OwlBase {
    //https://docs.openzeppelin.com/contracts/4.x/upgradeable#storage_gaps
    uint256[50] private __gap;

    function __OwlTemplate_init(
        address _admin,
        string memory _initContractURI,
        address _forwarder
    ) internal {
        __ContractURI_init_unchained(_admin, _initContractURI);
        __RouterReceiver_init_unchained(_forwarder);

        __OwlBase_init_unchained(_admin);
    }

    /***** Getters *****/
    function exampleHelloWorld() external view returns(string memory str){
        str = OwlTemplateHelperLib.getHelloWorld();
    }
}
