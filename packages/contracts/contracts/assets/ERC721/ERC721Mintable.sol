// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import {AddressUpgradeable} from '@openzeppelin/contracts-upgradeable/utils/AddressUpgradeable.sol';
import {IERC165Upgradeable} from '@openzeppelin/contracts-upgradeable/utils/introspection/IERC165Upgradeable.sol';

import {ERC721Base} from './ERC721Base.sol';
import {IERC721Mintable} from './IERC721Mintable.sol';

/**
 * @dev This implements the standard OwlProtocol `ERC721` contract that is an
 * extension of Openzeppelin's `ERC721BurnableUpgradeable`. Initializations
 * happens through initializers for compatibility with a EIP1167 minimal-proxy
 * deployment strategy.
 */
contract ERC721Mintable is ERC721Base, IERC721Mintable {
    bytes32 internal constant MINTER_ROLE = keccak256('MINTER_ROLE');

    //https://docs.openzeppelin.com/contracts/4.x/upgradeable#storage_gaps
    uint256[50] private __gap;

    constructor() {}

    /**********************
        Initialization
    **********************/

    /**
     * @dev Initializes an ERC721Mintable contract
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
        __ERC721Mintable_init(
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
        __ERC721Mintable_init(
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

    function __ERC721Mintable_init(
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
        __ERC721Mintable_init_unchained(_admin);
    }

    function __ERC721Mintable_init_unchained(address _minterRole) internal {
        _grantRole(MINTER_ROLE, _minterRole);
        if (AddressUpgradeable.isContract(ERC1820_REGISTRY)) {
            registry.updateERC165Cache(address(this), type(IERC721Mintable).interfaceId);
            registry.setInterfaceImplementer(address(this), type(IERC721Mintable).interfaceId | ONE, address(this));
        }
    }

    /**********************
          Interaction
    **********************/

    /**
     * @inheritdoc IERC721Mintable
     */
    function mint(address to, uint256 tokenId) external virtual onlyRole(MINTER_ROLE) {
        _mint(to, tokenId);
    }

    /**
     * @inheritdoc IERC721Mintable
     */
    function safeMint(address to, uint256 tokenId) external virtual onlyRole(MINTER_ROLE) {
        _safeMint(to, tokenId);
    }

    /**
     * @inheritdoc ERC721Base
     */
    function supportsInterface(bytes4 interfaceId) public view virtual override returns (bool) {
        return interfaceId == type(IERC721Mintable).interfaceId || super.supportsInterface(interfaceId);
    }
}
