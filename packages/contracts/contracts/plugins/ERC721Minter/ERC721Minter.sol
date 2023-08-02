// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import {ContextUpgradeable} from "@openzeppelin/contracts-upgradeable/utils/ContextUpgradeable.sol";
import {TokenConsumerAbstract} from "../TokenConsumer/TokenConsumerAbstract.sol";

import {OwlBase} from "../../common/OwlBase.sol";

import {IERC721Minter} from "./IERC721Minter.sol";
import {ERC721MinterAbstract} from "./ERC721MinterAbstract.sol";

/**
 * @dev ERC721 minter module
 */
contract ERC721Minter is ERC721MinterAbstract, OwlBase, IERC721Minter {
    function initialize(
        address _admin,
        string memory _contractUri,
        address _minterRole,
        address _token
    ) external initializer {
        __ERC721Minter_init(_admin, _contractUri, _minterRole, _token);
    }

    function __ERC721Minter_init(
        address _admin,
        string memory _contractUri,
        address _minterRole,
        address _token
    ) internal {
        __ContractURI_init_unchained(_admin, _contractUri);
        __OwlBase_init_unchained(_admin);

        __TokenConsumerAbstract_init_unchained(_admin, _token);
        __ERC721MinterAbstract_init_unchained(_minterRole);
        __ERC721Minter_init_unchained();
    }

    function __ERC721Minter_init_unchained() internal {
        if (_registryExists()) {
            _registerInterface(type(IERC721Minter).interfaceId);
        }
    }

    function mint(address to, uint256 tokenId) external virtual onlyRole(MINTER_ROLE) {
        _mint(to, tokenId);
    }

    function mintBatch(address[] memory to, uint256[] memory tokenId) external virtual onlyRole(MINTER_ROLE) {
        _mintBatch(to, tokenId);
    }

    function safeMint(address to, uint256 tokenId) external virtual onlyRole(MINTER_ROLE) {
        _safeMint(to, tokenId);
    }

    function safeMintBatch(address[] memory to, uint256[] memory tokenId) external virtual onlyRole(MINTER_ROLE) {
        _safeMintBatch(to, tokenId);
    }

    function supportsInterface(
        bytes4 interfaceId
    ) public view virtual override(TokenConsumerAbstract, OwlBase) returns (bool) {
        return OwlBase.supportsInterface(interfaceId);
    }
}
