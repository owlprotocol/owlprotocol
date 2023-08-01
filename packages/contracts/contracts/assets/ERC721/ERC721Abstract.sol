// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import {IERC165Upgradeable} from "@openzeppelin/contracts-upgradeable/utils/introspection/IERC165Upgradeable.sol";
import {IERC721Upgradeable} from "@openzeppelin/contracts-upgradeable/token/ERC721/IERC721Upgradeable.sol";
import {IERC721MetadataUpgradeable} from "@openzeppelin/contracts-upgradeable/token/ERC721/extensions/IERC721MetadataUpgradeable.sol";

import {AccessControlUpgradeable} from "@openzeppelin/contracts-upgradeable/access/AccessControlUpgradeable.sol";
import {ContextUpgradeable} from "@openzeppelin/contracts-upgradeable/utils/ContextUpgradeable.sol";
import {AddressUpgradeable} from "@openzeppelin/contracts-upgradeable/utils/AddressUpgradeable.sol";
import {ERC721Upgradeable} from "@openzeppelin/contracts-upgradeable/token/ERC721/ERC721Upgradeable.sol";
import {ERC721BurnableUpgradeable} from "@openzeppelin/contracts-upgradeable/token/ERC721/extensions/ERC721BurnableUpgradeable.sol";

import {ERC1820RegistryConsumer} from "../../common/ERC1820/ERC1820RegistryConsumer.sol";

import {IERC4906} from "../../common/ERC4906/IERC4906.sol";
import {OwlBase} from "../../common/OwlBase.sol";
import {TokenURIConsumerAbstract} from "../../plugins/TokenURI/TokenURIConsumerAbstract.sol";
import {ERC2981ConsumerAbstract} from "../../plugins/ERC2981/ERC2981ConsumerAbstract.sol";

/**
 * @dev This implements the standard OwlProtocol `ERC721` contract that is an
 * extension of Openzeppelin's `ERC721BurnableUpgradeable`. Initializations
 * happens through initializers for compatibility with a EIP1167 minimal-proxy
 * deployment strategy. No external mint functions are defined.
 */
abstract contract ERC721Abstract is
    OwlBase,
    ERC721BurnableUpgradeable,
    TokenURIConsumerAbstract,
    ERC2981ConsumerAbstract,
    IERC4906
{
    bytes32 internal constant APPROVED_FOR_ALL_ROLE = keccak256("APPROVED_FOR_ALL_ROLE");

    //https://docs.openzeppelin.com/contracts/4.x/upgradeable#storage_gaps
    uint256[50] private __gap;

    /**********************
        Initialization
    **********************/
    function __ERC721Abstract_init(
        address _admin,
        string memory _initContractURI,
        address _gsnForwarder,
        string memory _name,
        string memory _symbol,
        address _tokenUriProvider,
        address _tokenRoyaltyProvider
    ) internal {
        __ContractURI_init_unchained(_admin, _initContractURI);
        __RouterReceiver_init_unchained(_gsnForwarder);
        __OwlBase_init_unchained(_admin);

        __ERC721_init_unchained(_name, _symbol);
        __TokenURIConsumerAbstract_init_unchained(_admin, _tokenUriProvider);
        __ERC2981ConsumerAbstract_init_unchained(_admin, _tokenRoyaltyProvider);
        __ERC721Abstract_init_unchained();
    }

    function __ERC721Abstract_init_unchained() internal {
        if (_registryExists()) {
            _registerInterface(type(IERC721Upgradeable).interfaceId);
            _registerInterface(type(IERC721MetadataUpgradeable).interfaceId);
        }
    }

    /**********************
          Interaction
    **********************/
    /**
     * @dev Overrides isApprovedForAll with global approvals
     */
    function isApprovedForAll(address owner, address operator) public view virtual override returns (bool) {
        return hasRole(APPROVED_FOR_ALL_ROLE, operator) || ERC721Upgradeable.isApprovedForAll(owner, operator);
    }

    function tokenURI(uint256 tokenId) public view override returns (string memory) {
        return _tokenURI(tokenId);
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
    )
        public
        view
        override(OwlBase, ERC721Upgradeable, ERC2981ConsumerAbstract, TokenURIConsumerAbstract)
        returns (bool)
    {
        return OwlBase.supportsInterface(interfaceId);
    }
}
