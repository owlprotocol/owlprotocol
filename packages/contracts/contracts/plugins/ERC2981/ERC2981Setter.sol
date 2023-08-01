// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import {ContextUpgradeable} from "@openzeppelin/contracts-upgradeable/utils/ContextUpgradeable.sol";

import {OwlBase} from "../../common/OwlBase.sol";
import {ERC2981SetterAbstract} from "./ERC2981SetterAbstract.sol";

/**
 * @dev ERC2981 with access control public functions
 */
contract ERC2981Setter is OwlBase, ERC2981SetterAbstract {
    /**
     * @dev Initializes a TokenURIBaseURI contract.
     *      Protected with `initializer` modifier.
     */
    function initialize(
        address _admin,
        string memory _contractUri,
        address _gsnForwarder,
        address _royaltyRole,
        address _royaltyReceiver,
        uint96 _feeNumerator
    ) external initializer {
        __ERC2981Setter_init(_admin, _contractUri, _gsnForwarder, _royaltyRole, _royaltyReceiver, _feeNumerator);
    }

    /**
     * @inheritdoc OwlBase
     */
    function _msgSender() internal view override(OwlBase, ContextUpgradeable) returns (address) {
        return OwlBase._msgSender();
    }

    /**
     * @inheritdoc OwlBase
     */
    function _msgData() internal view override(OwlBase, ContextUpgradeable) returns (bytes calldata) {
        return OwlBase._msgData();
    }

    /**
     * @dev ERC2981Setter chained initialization
     */
    function __ERC2981Setter_init(
        address _admin,
        string memory _contractUri,
        address _gsnForwarder,
        address _royaltyRole,
        address _royaltyReceiver,
        uint96 _feeNumerator
    ) internal {
        __ContractURI_init_unchained(_admin, _contractUri);
        __RouterReceiver_init_unchained(_gsnForwarder);
        __OwlBase_init_unchained(_admin);

        __ERC2981SetterAbstract_init_unchained(_royaltyRole, _royaltyReceiver, _feeNumerator);
    }

    function supportsInterface(
        bytes4 interfaceId
    ) public view virtual override(ERC2981SetterAbstract, OwlBase) returns (bool) {
        return OwlBase.supportsInterface(interfaceId);
    }
}
