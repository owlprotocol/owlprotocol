// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import {StorageSlotUpgradeable} from "@openzeppelin/contracts-upgradeable/utils/StorageSlotUpgradeable.sol";
import {TokenConsumerAbstract} from "../TokenConsumer/TokenConsumerAbstract.sol";

import {IERC721MintableAutoId} from "../../assets/ERC721/IERC721MintableAutoId.sol";

abstract contract ERC721MinterAutoIdAbstract is TokenConsumerAbstract {
    using StorageSlotUpgradeable for bytes32;

    bytes32 internal constant MINTER_ROLE = keccak256("MINTER_ROLE");

    function __ERC721MinterAutoIdAbstract_init_unchained(address _minterRole) internal {
        _grantRole(MINTER_ROLE, _minterRole);
    }

    function _mint(address to) internal returns (uint256) {
        return IERC721MintableAutoId(token()).mint(to);
    }

    function _mintBatch(address[] memory to) internal returns (uint256[] memory) {
        address provider = token();

        try IERC721MintableAutoId(provider).mintBatch(to) returns (uint256[] memory result) {
            return result;
        } catch {}

        uint256[] memory tokenId = new uint256[](to.length);
        for (uint256 i = 0; i < to.length; i++) {
            tokenId[i] = IERC721MintableAutoId(provider).mint(to[i]);
        }
        return tokenId;
    }

    function _safeMint(address to) internal returns (uint256) {
        return IERC721MintableAutoId(token()).safeMint(to);
    }

    function _safeMintBatch(address[] memory to) internal returns (uint256[] memory) {
        address provider = token();

        try IERC721MintableAutoId(provider).safeMintBatch(to) returns (uint256[] memory result) {
            return result;
        } catch {}

        uint256[] memory tokenId = new uint256[](to.length);
        for (uint256 i = 0; i < to.length; i++) {
            tokenId[i] = IERC721MintableAutoId(provider).safeMint(to[i]);
        }
        return tokenId;
    }
}
