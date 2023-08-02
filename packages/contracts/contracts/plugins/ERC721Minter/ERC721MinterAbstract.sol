// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import {StorageSlotUpgradeable} from "@openzeppelin/contracts-upgradeable/utils/StorageSlotUpgradeable.sol";
import {TokenConsumerAbstract} from "../TokenConsumer/TokenConsumerAbstract.sol";

import {IERC721Mintable} from "../../assets/ERC721/IERC721Mintable.sol";

/**
 * @dev Basic ERC721 minter module for ERC721 with mint function that requires specifying token id.
 * not very useful but example of how to build similar contracts that can store minting logic separately from ERC721 contract.
 */
abstract contract ERC721MinterAbstract is TokenConsumerAbstract {
    using StorageSlotUpgradeable for bytes32;

    bytes32 internal constant MINTER_ROLE = keccak256("MINTER_ROLE");

    function __ERC721MinterAbstract_init_unchained(address _minterRole) internal {
        _grantRole(MINTER_ROLE, _minterRole);
    }

    function _mint(address to, uint256 tokenId) internal {
        IERC721Mintable(token()).mint(to, tokenId);
    }

    function _mintBatch(address[] memory to, uint256[] memory tokenId) internal {
        address provider = token();

        try IERC721Mintable(provider).safeMintBatch(to, tokenId) {
            return;
        } catch {}

        //TODO: check if contract supports direct batch mint
        for (uint256 i = 0; i < to.length; i++) {
            IERC721Mintable(provider).mint(to[i], tokenId[i]);
        }
    }

    function _safeMint(address to, uint256 tokenId) internal {
        IERC721Mintable(token()).safeMint(to, tokenId);
    }

    function _safeMintBatch(address[] memory to, uint256[] memory tokenId) internal {
        address provider = token();

        try IERC721Mintable(provider).safeMintBatch(to, tokenId) {
            return;
        } catch {}

        for (uint256 i = 0; i < to.length; i++) {
            IERC721Mintable(provider).safeMint(to[i], tokenId[i]);
        }
    }
}
