// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import {CountersUpgradeable} from '@openzeppelin/contracts-upgradeable/utils/CountersUpgradeable.sol';
import {AddressUpgradeable} from '@openzeppelin/contracts-upgradeable/utils/AddressUpgradeable.sol';

import {ERC721Base} from './ERC721Base.sol';
import {IERC721MintableAutoId} from './IERC721MintableAutoId.sol';

/**
 * @dev This implements the standard OwlProtocol `ERC721` contract that is an
 * extension of Openzeppelin's `ERC721BurnableUpgradeable`. Initializations
 * happens through initializers for compatibility with a EIP1167 minimal-proxy
 * deployment strategy.
 */
contract ERC721MintableAutoId is ERC721Base, IERC721MintableAutoId {
    using CountersUpgradeable for CountersUpgradeable.Counter;

    bytes32 internal constant MINTER_ROLE = keccak256('MINTER_ROLE');

    // Auto-incrementing tokenIds
    CountersUpgradeable.Counter private nextId; //1 slot

    //https://docs.openzeppelin.com/contracts/4.x/upgradeable#storage_gaps
    uint256[49] private __gap;

    constructor() {}

    /**********************
        Initialization
    **********************/

    /**
     * @dev Initializes an ERC721MintableAutoId contract
     * @param _admin admin for contract
     * @param _initContractURI uri for contract metadata description
     * @param _gsnForwarder GSN Trusted forwarder
     * @param _name name for contract
     * @param _symbol symbol for contract
     * @param _initBaseURI base URI for contract
     * @param _feeReceiver address of receiver of royalty fees
     * @param _feeNumerator numerator of royalty fee percentage (numerator / 10000)
     */
    function initialize(
        address _admin,
        string calldata _initContractURI,
        address _gsnForwarder,
        string calldata _name,
        string calldata _symbol,
        string calldata _initBaseURI,
        address _feeReceiver,
        uint96 _feeNumerator
    ) external virtual initializer {
        __ERC721MintableAutoId_init(
            _admin,
            _initContractURI,
            _gsnForwarder,
            _name,
            _symbol,
            _initBaseURI,
            _feeReceiver,
            _feeNumerator
        );
    }

    /**
     * @dev Initializes contract through beacon proxy (replaces constructor in
     * proxy pattern)
     */
    function proxyInitialize(
        address _admin,
        string calldata _initContractURI,
        address _gsnForwarder,
        string calldata _name,
        string calldata _symbol,
        string calldata _initBaseURI,
        address _feeReceiver,
        uint96 _feeNumerator
    ) external virtual onlyInitializing {
        __ERC721MintableAutoId_init(
            _admin,
            _initContractURI,
            _gsnForwarder,
            _name,
            _symbol,
            _initBaseURI,
            _feeReceiver,
            _feeNumerator
        );
    }

    function __ERC721MintableAutoId_init(
        address _admin,
        string memory _initContractURI,
        address _gsnForwarder,
        string memory _name,
        string memory _symbol,
        string memory _initBaseURI,
        address _feeReceiver,
        uint96 _feeNumerator
    ) internal {
        __ContractURI_init_unchained(_admin, _initContractURI);
        __RouterReceiver_init_unchained(_gsnForwarder);
        __OwlBase_init_unchained(_admin);

        __ERC721_init_unchained(_name, _symbol);
        __BaseURI_init_unchained(_admin, _initBaseURI);
        __ERC2981Setter_init_unchained(_admin, _feeReceiver, _feeNumerator);
        __ERC721Base_init_unchained();
        __ERC721MintableAutoId_init_unchained(_admin);
    }

    function __ERC721MintableAutoId_init_unchained(address _minterRole) internal {
        _grantRole(MINTER_ROLE, _minterRole);
        if (AddressUpgradeable.isContract(ERC1820_REGISTRY)) {
            registry.updateERC165Cache(address(this), type(IERC721MintableAutoId).interfaceId);
            registry.setInterfaceImplementer(
                address(this),
                type(IERC721MintableAutoId).interfaceId | ONE,
                address(this)
            );
        }

        //Start at 1
        nextId.increment();
    }

    /**********************
          Interaction
    **********************/

    /**
     * @inheritdoc IERC721MintableAutoId
     */
    function mint(address to) external virtual onlyRole(MINTER_ROLE) returns (uint256) {
        uint256 tokenId = nextId.current();
        nextId.increment();

        _mint(to, tokenId);

        return tokenId;
    }

    /**
     * @inheritdoc IERC721MintableAutoId
     */
    function safeMint(address to) external virtual onlyRole(MINTER_ROLE) returns (uint256) {
        uint256 tokenId = nextId.current();
        nextId.increment();

        _safeMint(to, tokenId, '');

        return tokenId;
    }

    /**
     * @inheritdoc ERC721Base
     */
    function supportsInterface(bytes4 interfaceId) public view virtual override returns (bool) {
        return interfaceId == type(IERC721MintableAutoId).interfaceId || super.supportsInterface(interfaceId);
    }
}
