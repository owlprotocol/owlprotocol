// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import {ContextUpgradeable} from "@openzeppelin/contracts-upgradeable/utils/ContextUpgradeable.sol";
import {TokenConsumerAbstract} from "../TokenConsumer/TokenConsumerAbstract.sol";
import {TokenDnaConsumerAbstract} from "../TokenDna/TokenDnaConsumerAbstract.sol";

import {OwlBase} from "../../common/OwlBase.sol";
import {IERC721Mintable} from "../../assets/ERC721/IERC721Mintable.sol";

import {IERC721MinterDna} from "./IERC721MinterDna.sol";
import {ERC721MinterAbstract} from "./ERC721MinterAbstract.sol";

/**
 * @dev ERC721 minter module for DNA
 */
contract ERC721MinterDna is ERC721MinterAbstract, TokenDnaConsumerAbstract, OwlBase, IERC721MinterDna {
    function initialize(
        address _admin,
        string memory _contractUri,
        address _gsnForwarder,
        address _minterRole,
        address _token,
        address _dnaProvider
    ) external initializer {
        __ERC721MinterDna_init(_admin, _contractUri, _gsnForwarder, _minterRole, _token, _dnaProvider);
    }

    function __ERC721MinterDna_init(
        address _admin,
        string memory _contractUri,
        address _gsnForwarder,
        address _minterRole,
        address _token,
        address _dnaProvider
    ) internal {
        __ContractURI_init_unchained(_admin, _contractUri);
        __RouterReceiver_init_unchained(_gsnForwarder);
        __OwlBase_init_unchained(_admin);

        __TokenConsumerAbstract_init_unchained(_admin, _token);
        __ERC721MinterAbstract_init_unchained(_minterRole);
        __TokenDnaConsumerAbstract_init_unchained(_admin, _dnaProvider);
        __ERC721MinterDna_init_unchained();
    }

    function __ERC721MinterDna_init_unchained() internal {
        if (_registryExists()) {
            _registerInterface(type(IERC721MinterDna).interfaceId);
        }
    }

    function mint(address to, uint256 tokenId, bytes memory dna) external virtual onlyRole(MINTER_ROLE) {
        _mint(to, tokenId);
        _setDna(tokenId, dna);
    }

    function mintBatch(
        address[] memory to,
        uint256[] memory tokenId,
        bytes[] memory dna
    ) external virtual onlyRole(MINTER_ROLE) {
        _mintBatch(to, tokenId);
        _setDnaBatch(tokenId, dna);
    }

    function safeMint(address to, uint256 tokenId, bytes memory dna) external virtual onlyRole(MINTER_ROLE) {
        _safeMint(to, tokenId);
        _setDna(tokenId, dna);
    }

    function safeMintBatch(
        address[] memory to,
        uint256[] memory tokenId,
        bytes[] memory dna
    ) external virtual onlyRole(MINTER_ROLE) {
        _safeMintBatch(to, tokenId);
        _setDnaBatch(tokenId, dna);
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

    function supportsInterface(
        bytes4 interfaceId
    ) public view virtual override(TokenConsumerAbstract, TokenDnaConsumerAbstract, OwlBase) returns (bool) {
        return OwlBase.supportsInterface(interfaceId);
    }
}
