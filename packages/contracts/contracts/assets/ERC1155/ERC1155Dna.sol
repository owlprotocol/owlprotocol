// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import {IERC1155Upgradeable} from '@openzeppelin/contracts-upgradeable/token/ERC1155/IERC1155Upgradeable.sol';
import {IERC165Upgradeable} from '@openzeppelin/contracts-upgradeable/utils/introspection/IERC165Upgradeable.sol';

import {CountersUpgradeable} from '@openzeppelin/contracts-upgradeable/utils/CountersUpgradeable.sol';
import {AddressUpgradeable} from '@openzeppelin/contracts-upgradeable/utils/AddressUpgradeable.sol';
import {Base64Upgradeable} from '@openzeppelin/contracts-upgradeable/utils/Base64Upgradeable.sol';
import {EnumerableSetUpgradeable} from '@openzeppelin/contracts-upgradeable/utils/structs/EnumerableSetUpgradeable.sol';

import {ERC1155Mintable} from './ERC1155Mintable.sol';
import {IERC1155Dna} from './IERC1155Dna.sol';

/**
 * @dev ERC1155DNA
 */
contract ERC1155Dna is ERC1155Mintable, IERC1155Dna {
    using Base64Upgradeable for bytes;
    using AddressUpgradeable for address;
    using CountersUpgradeable for CountersUpgradeable.Counter;
    using EnumerableSetUpgradeable for EnumerableSetUpgradeable.AddressSet;

    bytes32 internal constant DNA_ROLE = keccak256('DNA_ROLE');

    // tokenId => dna
    mapping(uint256 => bytes) internal inherentDna;

    //https://docs.openzeppelin.com/contracts/4.x/upgradeable#storage_gaps
    uint256[49] private __gap;

    constructor() {}

    /**
     * @dev Initializes an ERC1155Mintable contract
     * @param _admin admin for contract
     * @param _initContractURI uri for contract metadata description
     * @param _gsnForwarder GSN Trusted forwarder
     * @param _uri URI for tokens
     * @param _feeReceiver address of receiver of royalty fees
     * @param _feeNumerator numerator of royalty fee percentage (numerator / 10000)
     */
    function initialize(
        address _admin,
        string calldata _initContractURI,
        address _gsnForwarder,
        string calldata _uri,
        address _feeReceiver,
        uint96 _feeNumerator
    ) external override initializer {
        __ERC1155Dna_init(_admin, _initContractURI, _gsnForwarder, _uri, _feeReceiver, _feeNumerator);
    }

    function proxyInitialize(
        address _admin,
        string calldata _initContractURI,
        address _gsnForwarder,
        string calldata _uri,
        address _feeReceiver,
        uint96 _feeNumerator
    ) external override onlyInitializing {
        __ERC1155Dna_init(_admin, _initContractURI, _gsnForwarder, _uri, _feeReceiver, _feeNumerator);
    }

    function __ERC1155Dna_init(
        address _admin,
        string memory _initContractURI,
        address _gsnForwarder,
        string memory _uri,
        address _feeReceiver,
        uint96 _feeNumerator
    ) internal {
        __ContractURI_init_unchained(_admin, _initContractURI);
        __RouterReceiver_init_unchained(_gsnForwarder);
        __OwlBase_init_unchained(_admin);

        __ERC1155_init_unchained(_uri);
        __ERC2981Setter_init_unchained(_admin, _feeReceiver, _feeNumerator);
        __ERC1155Base_init_unchained(_admin);
        __ERC1155Mintable_init_unchained(_admin);
        __ERC1155Dna_init_unchained(_admin);
    }

    function __ERC1155Dna_init_unchained(address _dnaRole) internal {
        _grantRole(DNA_ROLE, _dnaRole);
        if (AddressUpgradeable.isContract(ERC1820_REGISTRY)) {
            registry.updateERC165Cache(address(this), type(IERC1155Dna).interfaceId);
            registry.setInterfaceImplementer(address(this), type(IERC1155Dna).interfaceId | ONE, address(this));
        }
    }

    /**
     * inheritdoc IERC1155Dna
     */
    function updateDna(uint256 tokenId, bytes calldata dna) external onlyRole(DNA_ROLE) {
        inherentDna[tokenId] = dna;
    }

    /**
     * inheritdoc IERC1155Dna
     * //Todo: URI is hard coded to use token id. Adapter base uri endpoint should query DNA.
     */
    function getDna(uint256 tokenId) public view returns (bytes memory) {
        return inherentDna[tokenId];
    }

    /**
     * inheritdoc ERC1155
     */
    function supportsInterface(bytes4 interfaceId) public view virtual override returns (bool) {
        return interfaceId == type(IERC1155Dna).interfaceId || super.supportsInterface(interfaceId);
    }
}
