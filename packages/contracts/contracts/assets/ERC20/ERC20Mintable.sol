// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import {ContextUpgradeable} from "@openzeppelin/contracts-upgradeable/utils/ContextUpgradeable.sol";
import {ERC20BurnableUpgradeable} from "@openzeppelin/contracts-upgradeable/token/ERC20/extensions/ERC20BurnableUpgradeable.sol";
import {IERC20Upgradeable} from "@openzeppelin/contracts-upgradeable/token/ERC20/IERC20Upgradeable.sol";
import {AddressUpgradeable} from "@openzeppelin/contracts-upgradeable/utils/AddressUpgradeable.sol";

import {OwlBase} from "../../common/OwlBase.sol";

import {IERC165Upgradeable} from "@openzeppelin/contracts-upgradeable/utils/introspection/IERC165Upgradeable.sol";
import {IERC20Mintable} from "./IERC20Mintable.sol";
import {IAccessControlUpgradeable} from "@openzeppelin/contracts-upgradeable/access/IAccessControlUpgradeable.sol";
import {IRouterReceiver} from "../../common/IRouterReceiver.sol";
import {IContractURI} from "../../common/IContractURI.sol";

contract ERC20Mintable is OwlBase, ERC20BurnableUpgradeable, IERC20Mintable {
    bytes32 private constant MINTER_ROLE = keccak256("MINTER_ROLE");

    //https://docs.openzeppelin.com/contracts/4.x/upgradeable#storage_gaps
    uint256[50] private __gap;

    constructor() {}

    function initialize(
        address _admin,
        string calldata _initContractURI,
        address _gsnForwarder,
        string calldata _name,
        string calldata _symbol
    ) external initializer {
        __ERC20Mintable_init(_admin, _initContractURI, _gsnForwarder, _name, _symbol);
    }

    function __ERC20Mintable_init(
        address _admin,
        string memory _initContractURI,
        address _gsnForwarder,
        string calldata _name,
        string calldata _symbol
    ) internal {
        __ContractURI_init_unchained(_admin, _initContractURI);
        __RouterReceiver_init_unchained(_gsnForwarder);
        __OwlBase_init_unchained(_admin);

        __ERC20_init_unchained(_name, _symbol);
        __ERC20Mintable_init_unchained(_admin);
    }

    function __ERC20Mintable_init_unchained(address _minterRole) internal {
        _grantRole(MINTER_ROLE, _minterRole);
        if (AddressUpgradeable.isContract(ERC1820_REGISTRY)) {
            registry.updateERC165Cache(address(this), type(IERC20Upgradeable).interfaceId);
            registry.updateERC165Cache(address(this), type(IERC20Mintable).interfaceId);
            registry.setInterfaceImplementer(address(this), type(IERC20Upgradeable).interfaceId | ONE, address(this));
            registry.setInterfaceImplementer(address(this), type(IERC20Mintable).interfaceId | ONE, address(this));
        }
    }

    /***** MINTING *****/
    /**
     * @notice Must have MINTER_ROLE
     * @dev Allows MINTER_ROLE to mint NFTs
     * @param to address to
     * @param amount amount to mint
     */
    function mint(address to, uint256 amount) public onlyRole(MINTER_ROLE) {
        _mint(to, amount);
    }

    function _msgSender() internal view override(OwlBase, ContextUpgradeable) returns (address) {
        return OwlBase._msgSender();
    }

    function _msgData() internal view virtual override(OwlBase, ContextUpgradeable) returns (bytes calldata) {
        return OwlBase._msgData();
    }

    /**
     * @dev ERC165 Support
     * @param interfaceId hash of the interface testing for
     * @return bool whether interface is supported
     */
    function supportsInterface(bytes4 interfaceId) public view virtual override returns (bool) {
        return
            interfaceId == type(IERC165Upgradeable).interfaceId ||
            interfaceId == type(IERC20Upgradeable).interfaceId ||
            interfaceId == type(IAccessControlUpgradeable).interfaceId ||
            interfaceId == type(IRouterReceiver).interfaceId ||
            interfaceId == type(IContractURI).interfaceId;
    }
}
