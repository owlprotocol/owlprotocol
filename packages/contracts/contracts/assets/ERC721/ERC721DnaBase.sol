// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import {IERC721Upgradeable} from '@openzeppelin/contracts-upgradeable/token/ERC721/IERC721Upgradeable.sol';
import {IERC165Upgradeable} from '@openzeppelin/contracts-upgradeable/utils/introspection/IERC165Upgradeable.sol';

import {CountersUpgradeable} from '@openzeppelin/contracts-upgradeable/utils/CountersUpgradeable.sol';
import {AddressUpgradeable} from '@openzeppelin/contracts-upgradeable/utils/AddressUpgradeable.sol';
import {Base64UrlUpgradeable} from '../../utils/Base64UrlUpgradeable.sol';
import {EnumerableSetUpgradeable} from '@openzeppelin/contracts-upgradeable/utils/structs/EnumerableSetUpgradeable.sol';

import {ERC721Base} from './ERC721Base.sol';
import {IERC721Dna} from './IERC721Dna.sol';

/**
 * @dev ERC721DNA
 */
abstract contract ERC721DnaBase is ERC721Base, IERC721Dna {
    using Base64UrlUpgradeable for bytes;
    using AddressUpgradeable for address;
    using CountersUpgradeable for CountersUpgradeable.Counter;
    using EnumerableSetUpgradeable for EnumerableSetUpgradeable.AddressSet;

    bytes32 internal constant MINTER_ROLE = keccak256('MINTER_ROLE');
    bytes32 internal constant DNA_ROLE = keccak256('DNA_ROLE');

    // Auto-incrementing tokenIds
    CountersUpgradeable.Counter internal nextId; //1 slot
    // tokenId => dna
    mapping(uint256 => bytes) internal inherentDna; //1 slot

    //https://docs.openzeppelin.com/contracts/4.x/upgradeable#storage_gaps
    uint256[48] private __gap;

    constructor() {}

    /**
     * Initialize ERC721Dna
     * @param _minterRole minter permissions
     * @param _dnaRole dna permissions
     */
    function __ERC721DnaBase_init_unchained(address _minterRole, address _dnaRole) internal {
        _grantRole(MINTER_ROLE, _minterRole);
        _grantRole(DNA_ROLE, _dnaRole);

        if (AddressUpgradeable.isContract(ERC1820_REGISTRY)) {
            registry.updateERC165Cache(address(this), type(IERC721Dna).interfaceId);
            registry.setInterfaceImplementer(address(this), type(IERC721Dna).interfaceId | ONE, address(this));
        }

        //Start at 1
        nextId.increment();
    }

    /***** Minting *****/
    /**
     * inheritdoc IERC721Dna
     */
    function mintWithDna(address to, bytes memory dna) external onlyRole(MINTER_ROLE) returns (uint256) {
        uint256 tokenId = nextId.current();
        nextId.increment();
        inherentDna[tokenId] = dna;
        _mint(to, tokenId);
        return tokenId;
    }

    /**
     * inheritdoc IERC721Dna
     */
    function safeMintWithDna(address to, bytes memory dna) external onlyRole(MINTER_ROLE) returns (uint256) {
        uint256 tokenId = nextId.current();
        nextId.increment();
        inherentDna[tokenId] = dna;
        _safeMint(to, tokenId, dna);
        return tokenId;
    }

    /**
     * inheritdoc IERC721Dna
     */
    function updateDna(uint256 tokenId, bytes memory dna) external virtual onlyRole(DNA_ROLE) {
        inherentDna[tokenId] = dna;

        emit MetadataUpdate(tokenId);
    }

    /**
     * inheritdoc IERC721Dna
     */
    function getDna(uint256 tokenId) public view virtual returns (bytes memory) {
        _requireMinted(tokenId);
        return inherentDna[tokenId];
    }

    /***** Dna *****/
    /**
     * @dev returns uri for token metadata. If no baseURI, returns Dna as string
     * @param tokenId tokenId metadata to fetch
     * @return uri at which metadata is housed
     */
    function tokenURI(uint256 tokenId) public view virtual override returns (string memory) {
        string memory baseURI = _baseURI();
        bytes memory dnaRaw = getDna(tokenId);
        string memory dnaString = dnaRaw.encode();
        return bytes(baseURI).length > 0 ? string(abi.encodePacked(baseURI, dnaString)) : dnaString;
    }

    /**
     * inheritdoc ERC721Dna
     */
    function supportsInterface(bytes4 interfaceId) public view virtual override returns (bool) {
        return interfaceId == type(IERC721Dna).interfaceId || super.supportsInterface(interfaceId);
    }
}
