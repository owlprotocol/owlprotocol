// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import {OwlBase} from '../common/OwlBase.sol';
import {ERC721DnaHelperLib} from '../helpers/ERC721DnaHelperLib.sol';

contract ERC721DnaHelperExample is OwlBase {

    function __ERC721DnaHelperExample_init(
        address _admin,
        string memory _initContractURI,
        address _forwarder
    ) internal {
        __ContractURI_init_unchained(_admin, _initContractURI);
        __RouterReceiver_init_unchained(_forwarder);

        __OwlBase_init_unchained(_admin);
    }

    function getHelloWorld() external view returns(string memory str){
        str = ERC721DnaHelperLib.getTest();
    }
}
