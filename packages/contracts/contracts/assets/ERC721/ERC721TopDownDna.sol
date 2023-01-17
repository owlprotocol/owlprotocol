// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import {IERC721Upgradeable} from '@openzeppelin/contracts-upgradeable/token/ERC721/IERC721Upgradeable.sol';
import {IERC165Upgradeable} from '@openzeppelin/contracts-upgradeable/utils/introspection/IERC165Upgradeable.sol';

import {CountersUpgradeable} from '@openzeppelin/contracts-upgradeable/utils/CountersUpgradeable.sol';
import {AddressUpgradeable} from '@openzeppelin/contracts-upgradeable/utils/AddressUpgradeable.sol';
import {Base64Upgradeable} from '@openzeppelin/contracts-upgradeable/utils/Base64Upgradeable.sol';
import {EnumerableSetUpgradeable} from '@openzeppelin/contracts-upgradeable/utils/structs/EnumerableSetUpgradeable.sol';

import {ERC721TopDown} from './ERC721TopDown.sol';
import {Unauthorized, AddressNotChild} from './ERC721TopDownLib.sol';
import {ERC721TopDownDnaLib} from './ERC721TopDownDnaLib.sol';
import {IERC721Dna} from './IERC721Dna.sol';

/**
 * @dev ERC721TopDownDNA
 */
contract ERC721TopDownDna is ERC721TopDown, IERC721Dna {
    using Base64Upgradeable for bytes;
    using AddressUpgradeable for address;
    using CountersUpgradeable for CountersUpgradeable.Counter;
    using EnumerableSetUpgradeable for EnumerableSetUpgradeable.AddressSet;

    bytes32 internal constant MINTER_ROLE = keccak256('MINTER_ROLE');
    bytes32 internal constant DNA_ROLE = keccak256('DNA_ROLE');

    // Auto-incrementing tokenIds
    CountersUpgradeable.Counter private nextId; //1 slot
    // tokenId => dna
    mapping(uint256 => bytes) internal inherentDna;

    //https://docs.openzeppelin.com/contracts/4.x/upgradeable#storage_gaps
    uint256[48] private __gap;

    constructor() {}

    /**
     * @dev Initializes an ERC721MintableAutoId contract.
     *      Protected with `initializer` modifier.
     * @param _admin admin for contract
     * @param _initContractURI uri for contract metadata description
     * @param _gsnForwarder GSN Trusted forwarder
     * @param _name name for contract
     * @param _symbol symbol for contract
     * @param _initBaseURI base URI for contract
     * @param _feeReceiver address of receiver of royalty fees
     * @param _feeNumerator numerator of royalty fee percentage (numerator / 10000)
     * @param _childContracts721 child ERC721nDNA contracts
     * @param _childContracts1155 child ERC1155DNA contracts
     */
    function initialize(
        address _admin,
        string calldata _initContractURI,
        address _gsnForwarder,
        string calldata _name,
        string calldata _symbol,
        string calldata _initBaseURI,
        address _feeReceiver,
        uint96 _feeNumerator,
        address[] calldata _childContracts721,
        address[] calldata _childContracts1155
    ) external initializer {
        __ERC721TopDownDna_init(
            _admin,
            _initContractURI,
            _gsnForwarder,
            _name,
            _symbol,
            _initBaseURI,
            _feeReceiver,
            _feeNumerator,
            _childContracts721,
            _childContracts1155
        );
    }

    /**
     * @dev Same as initialize but designed for usage with proxies.
     *      Protected with `onlyInitializing` modifier.
     */
    function proxyInitialize(
        address _admin,
        string calldata _initContractURI,
        address _gsnForwarder,
        string calldata _name,
        string calldata _symbol,
        string calldata _initBaseURI,
        address _feeReceiver,
        uint96 _feeNumerator,
        address[] calldata _childContracts721,
        address[] calldata _childContracts1155
    ) external onlyInitializing {
        __ERC721TopDownDna_init(
            _admin,
            _initContractURI,
            _gsnForwarder,
            _name,
            _symbol,
            _initBaseURI,
            _feeReceiver,
            _feeNumerator,
            _childContracts721,
            _childContracts1155
        );
    }

    /**
     * @dev Initialize ERC721TopDownDna + dependencies
     */
    function __ERC721TopDownDna_init(
        address _admin,
        string memory _initContractURI,
        address _gsnForwarder,
        string memory _name,
        string memory _symbol,
        string memory _initBaseURI,
        address _feeReceiver,
        uint96 _feeNumerator,
        address[] memory _childContracts721,
        address[] memory _childContract1155
    ) internal {
        __ContractURI_init_unchained(_admin, _initContractURI);
        __RouterReceiver_init_unchained(_gsnForwarder);
        __OwlBase_init_unchained(_admin);

        __ERC721_init_unchained(_name, _symbol);
        __BaseURI_init_unchained(_admin, _initBaseURI);
        __ERC2981Setter_init_unchained(_admin, _feeReceiver, _feeNumerator);
        __ERC721Base_init_unchained();

        __ERC721TopDown_init_unchained(_childContracts721, _childContract1155);
        __ERC721TopDownDna_init_unchained(_admin, _admin);
    }

    /**
     * Initialize ERC721TopDownDna
     * @param _minterRole minter permissions
     * @param _dnaRole dna permissions
     */
    function __ERC721TopDownDna_init_unchained(address _minterRole, address _dnaRole) internal {
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
        _safeMint(to, tokenId, '');
        return tokenId;
    }

    /**
     * inheritdoc IERC721Dna
     */
    function updateDna(uint256 tokenId, bytes memory dna) external onlyRole(DNA_ROLE) {
        //No ownership checks, delegated to DNA_ROLE implementation
        /*
        //TODO: Move this logic to standard DNA_ROLE middleware
        address spender = _msgSender();
        address rootOwner = rootOwnerOf(tokenId);

        bool isApproved = isApprovedOrRootOwner(rootOwner, tokenId, spender);
        if (!isApproved) revert Unauthorized(spender, address(this), tokenId);
        */

        inherentDna[tokenId] = dna;
    }

    /**
     * inheritdoc IERC721Dna
     */
    function getDna(uint256 tokenId) public view returns (bytes memory) {
        _requireMinted(tokenId);
        return
            ERC721TopDownDnaLib.getDna(
                inherentDna,
                childContracts721,
                childTokenIdOf721,
                childContracts1155,
                childTokenIdOf1155,
                tokenId
            );
    }

    /***** Dna *****/
    /**
     * @dev returns uri for token metadata. If no baseURI, returns Dna as string
     * @param tokenId tokenId metadata to fetch
     * @return uri at which metadata is housed
     */
    function tokenURI(uint256 tokenId) public view override returns (string memory) {
        string memory baseURI = _baseURI();
        bytes memory dnaRaw = getDna(tokenId);
        string memory dnaString = dnaRaw.encode();
        return bytes(baseURI).length > 0 ? string(abi.encodePacked(baseURI, dnaString)) : dnaString;
    }

    /**
     * inheritdoc ERC721TopDown
     */
    function supportsInterface(bytes4 interfaceId) public view virtual override returns (bool) {
        return interfaceId == type(IERC721Dna).interfaceId || super.supportsInterface(interfaceId);
    }
}
