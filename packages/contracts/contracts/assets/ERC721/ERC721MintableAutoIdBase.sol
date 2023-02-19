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
abstract contract ERC721MintableAutoIdBase is ERC721Base, IERC721MintableAutoId {
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

    function __ERC721MintableAutoIdBase_init_unchained(address _minterRole) internal {
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
