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
abstract contract ERC721MintableBase is ERC721Base, IERC721Mintable {
    bytes32 internal constant MINTER_ROLE = keccak256('MINTER_ROLE');

    //https://docs.openzeppelin.com/contracts/4.x/upgradeable#storage_gaps
    uint256[50] private __gap;

    constructor() {}

    function __ERC721MintableBase_init_unchained(address _minterRole) internal {
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
