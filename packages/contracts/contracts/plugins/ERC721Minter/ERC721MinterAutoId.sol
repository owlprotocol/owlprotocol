// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import {ContextUpgradeable} from "@openzeppelin/contracts-upgradeable/utils/ContextUpgradeable.sol";
import {TokenConsumerAbstract} from "../TokenConsumer/TokenConsumerAbstract.sol";

import {OwlBase} from "../../common/OwlBase.sol";

import {IERC721MinterAutoId} from "./IERC721MinterAutoId.sol";
import {ERC721MinterAutoIdAbstract} from "./ERC721MinterAutoIdAbstract.sol";

/**
 * @dev ERC721 minter module for AutoId
 */
contract ERC721MinterAutoId is ERC721MinterAutoIdAbstract, OwlBase, IERC721MinterAutoId {
    function initialize(
        address _admin,
        string memory _contractUri,
        address _minterRole,
        address _token
    ) external initializer {
        __ERC721MinterAutoId_init(_admin, _contractUri, _minterRole, _token);
    }

    function __ERC721MinterAutoId_init(
        address _admin,
        string memory _contractUri,
        address _minterRole,
        address _token
    ) internal {
        __ContractURI_init_unchained(_admin, _contractUri);
        __OwlBase_init_unchained(_admin);

        __TokenConsumerAbstract_init_unchained(_admin, _token);
        __ERC721MinterAutoIdAbstract_init_unchained(_minterRole);
        __ERC721MinterAutoId_init_unchained();
    }

    function __ERC721MinterAutoId_init_unchained() internal {
        if (_registryExists()) {
            _registerInterface(type(IERC721MinterAutoId).interfaceId);
        }
    }

    function mint(address to) external virtual onlyRole(MINTER_ROLE) returns (uint256) {
        return _mint(to);
    }

    function mintBatch(address[] memory to) external virtual onlyRole(MINTER_ROLE) returns (uint256[] memory) {
        return _mintBatch(to);
    }

    function safeMint(address to) external virtual onlyRole(MINTER_ROLE) returns (uint256) {
        return _safeMint(to);
    }

    function safeMintBatch(address[] memory to) external virtual onlyRole(MINTER_ROLE) returns (uint256[] memory) {
        return _safeMintBatch(to);
    }

    function supportsInterface(
        bytes4 interfaceId
    ) public view virtual override(TokenConsumerAbstract, OwlBase) returns (bool) {
        return OwlBase.supportsInterface(interfaceId);
    }
}
