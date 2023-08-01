//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import {OwlBase} from "../../common/OwlBase.sol";
import {StorageSlotString} from "../../utils/StorageSlotString.sol";

import {ITokenURI} from "./ITokenURI.sol";

/**
 * @dev TokenURI with hard-coded uri that returns same uri for all token ids.
 * Commonly used by ERC1155 as it uses a string template `api.com/{id}`
 */
contract TokenURI is OwlBase, ITokenURI {
    bytes32 internal constant TOKEN_URI_ROLE = keccak256("TOKEN_URI_ROLE");
    bytes32 internal constant _TOKEN_URI_SLOT = keccak256("TOKEN_URI");

    /**
     * @dev Initializes a TokenURI contract.
     *      Protected with `initializer` modifier.
     */
    function initialize(
        address _admin,
        string memory _contractUri,
        address _gsnForwarder,
        address _uriRole,
        string memory _uri
    ) external initializer {
        __TokenURI_init(_admin, _contractUri, _gsnForwarder, _uriRole, _uri);
    }

    /**
     * @dev TokenURI chained initialization
     */
    function __TokenURI_init(
        address _admin,
        string memory _contractUri,
        address _gsnForwarder,
        address _uriRole,
        string memory _uri
    ) internal {
        __ContractURI_init_unchained(_admin, _contractUri);
        __RouterReceiver_init_unchained(_gsnForwarder);
        __OwlBase_init_unchained(_admin);

        __TokenURI_init_unchained(_uriRole, _uri);
    }

    function __TokenURI_init_unchained(address _uriRole, string memory _uri) internal {
        _grantRole(TOKEN_URI_ROLE, _uriRole);
        StorageSlotString.getStringSlot(_TOKEN_URI_SLOT).value = _uri;

        if (_registryExists()) {
            _registerInterface(type(ITokenURI).interfaceId);
        }
    }

    /**
     * @dev Set contract uri
     */
    function setTokenURI(string memory uri) external onlyRole(TOKEN_URI_ROLE) {
        StorageSlotString.getStringSlot(_TOKEN_URI_SLOT).value = uri;
    }

    function tokenURI(uint256 tokenId) public view returns (string memory) {
        return StorageSlotString.getStringSlot(_TOKEN_URI_SLOT).value;
    }
}
