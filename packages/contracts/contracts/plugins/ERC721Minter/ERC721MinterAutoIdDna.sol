// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import {ContextUpgradeable} from "@openzeppelin/contracts-upgradeable/utils/ContextUpgradeable.sol";
import {TokenConsumerAbstract} from "../TokenConsumer/TokenConsumerAbstract.sol";
import {TokenDnaConsumerAbstract} from "../TokenDna/TokenDnaConsumerAbstract.sol";

import {OwlBase} from "../../common/OwlBase.sol";
import {IERC721MintableAutoId} from "../../assets/ERC721/IERC721MintableAutoId.sol";

import {IERC721MinterAutoIdDna} from "./IERC721MinterAutoIdDna.sol";
import {ERC721MinterAutoIdAbstract} from "./ERC721MinterAutoIdAbstract.sol";

/**
 * @dev ERC721 minter module for AutoId + DNA
 */
contract ERC721MinterAutoIdDna is
    ERC721MinterAutoIdAbstract,
    TokenDnaConsumerAbstract,
    OwlBase,
    IERC721MinterAutoIdDna
{
    function initialize(
        address _admin,
        string memory _contractUri,
        address _minterRole,
        address _token,
        address _dnaProvider
    ) external initializer {
        __ERC721MinterAutoIdDna_init(_admin, _contractUri, _minterRole, _token, _dnaProvider);
    }

    function __ERC721MinterAutoIdDna_init(
        address _admin,
        string memory _contractUri,
        address _minterRole,
        address _token,
        address _dnaProvider
    ) internal {
        __ContractURI_init_unchained(_admin, _contractUri);
        __OwlBase_init_unchained(_admin);

        __TokenConsumerAbstract_init_unchained(_admin, _token);
        __ERC721MinterAutoIdAbstract_init_unchained(_minterRole);
        __TokenDnaConsumerAbstract_init_unchained(_admin, _dnaProvider);
        __ERC721MinterAutoIdDna_init_unchained();
    }

    function __ERC721MinterAutoIdDna_init_unchained() internal {
        if (_registryExists()) {
            _registerInterface(type(IERC721MinterAutoIdDna).interfaceId);
        }
    }

    function mint(address to, bytes memory dna) external virtual onlyRole(MINTER_ROLE) returns (uint256) {
        uint256 tokenId = _mint(to);
        _setDna(tokenId, dna);

        return tokenId;
    }

    function mintBatch(
        address[] memory to,
        bytes[] memory dna
    ) external virtual onlyRole(MINTER_ROLE) returns (uint256[] memory) {
        uint256[] memory tokenId = _mintBatch(to);
        _setDnaBatch(tokenId, dna);

        return tokenId;
    }

    function safeMint(address to, bytes memory dna) external virtual onlyRole(MINTER_ROLE) returns (uint256) {
        uint256 tokenId = _safeMint(to);
        _setDna(tokenId, dna);

        return tokenId;
    }

    function safeMintBatch(
        address[] memory to,
        bytes[] memory dna
    ) external virtual onlyRole(MINTER_ROLE) returns (uint256[] memory) {
        uint256[] memory tokenId = _safeMintBatch(to);
        _setDnaBatch(tokenId, dna);

        return tokenId;
    }

    function supportsInterface(
        bytes4 interfaceId
    ) public view virtual override(TokenConsumerAbstract, TokenDnaConsumerAbstract, OwlBase) returns (bool) {
        return OwlBase.supportsInterface(interfaceId);
    }
}
