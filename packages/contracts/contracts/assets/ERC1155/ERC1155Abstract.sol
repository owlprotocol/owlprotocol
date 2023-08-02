// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import {IERC165Upgradeable} from "@openzeppelin/contracts-upgradeable/utils/introspection/IERC165Upgradeable.sol";
import {IERC1155Upgradeable} from "@openzeppelin/contracts-upgradeable/token/ERC1155/IERC1155Upgradeable.sol";

import {AccessControlUpgradeable} from "@openzeppelin/contracts-upgradeable/access/AccessControlUpgradeable.sol";
import {ContextUpgradeable} from "@openzeppelin/contracts-upgradeable/utils/ContextUpgradeable.sol";
import {AddressUpgradeable} from "@openzeppelin/contracts-upgradeable/utils/AddressUpgradeable.sol";
import {ERC1155Upgradeable} from "@openzeppelin/contracts-upgradeable/token/ERC1155/ERC1155Upgradeable.sol";
import {ERC1155BurnableUpgradeable} from "@openzeppelin/contracts-upgradeable/token/ERC1155/extensions/ERC1155BurnableUpgradeable.sol";

import {ERC1820RegistryConsumer} from "../../common/ERC1820/ERC1820RegistryConsumer.sol";

import {IERC4906} from "../../common/ERC4906/IERC4906.sol";
import {OwlBase} from "../../common/OwlBase.sol";
import {TokenURIConsumerAbstract} from "../../plugins/TokenURI/TokenURIConsumerAbstract.sol";
import {ERC2981ConsumerAbstract} from "../../plugins/ERC2981/ERC2981ConsumerAbstract.sol";

abstract contract ERC1155Abstract is
    OwlBase,
    ERC1155BurnableUpgradeable,
    TokenURIConsumerAbstract,
    ERC2981ConsumerAbstract,
    IERC4906
{
    bytes32 internal constant APPROVED_FOR_ALL_ROLE = keccak256("APPROVED_FOR_ALL_ROLE");

    //https://docs.openzeppelin.com/contracts/4.x/upgradeable#storage_gaps
    uint256[50] private __gap;

    function __ERC1155Abstract_init(
        address _admin,
        string memory _initContractURI,
        address _tokenUriProvider,
        address _tokenRoyaltyProvider
    ) internal {
        __ContractURI_init_unchained(_admin, _initContractURI);
        __OwlBase_init_unchained(_admin);

        __TokenURIConsumerAbstract_init_unchained(_admin, _tokenUriProvider);
        __ERC2981ConsumerAbstract_init_unchained(_admin, _tokenRoyaltyProvider);
        __ERC1155Abstract_init_unchained();
    }

    function __ERC1155Abstract_init_unchained() internal {
        if (_registryExists()) {
            _registerInterface(type(IERC1155Upgradeable).interfaceId);
        }
    }

    /**
     * @dev Overrides isApprovedForAll with global approvals
     */
    function isApprovedForAll(address account, address operator) public view virtual override returns (bool) {
        return hasRole(APPROVED_FOR_ALL_ROLE, operator) || ERC1155Upgradeable.isApprovedForAll(account, operator);
    }

    function uri(uint256 tokenId) public view override returns (string memory) {
        return _tokenURI(tokenId);
    }

    function supportsInterface(
        bytes4 interfaceId
    )
        public
        view
        override(OwlBase, ERC1155Upgradeable, ERC2981ConsumerAbstract, TokenURIConsumerAbstract)
        returns (bool)
    {
        return OwlBase.supportsInterface(interfaceId);
    }
}
