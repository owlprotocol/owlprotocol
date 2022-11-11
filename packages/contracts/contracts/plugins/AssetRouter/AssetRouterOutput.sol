//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import {IERC20Upgradeable} from '@openzeppelin/contracts-upgradeable/token/ERC20/IERC20Upgradeable.sol';
import {IERC721Upgradeable} from '@openzeppelin/contracts-upgradeable/token/ERC721/IERC721Upgradeable.sol';
import {IERC1155Upgradeable} from '@openzeppelin/contracts-upgradeable/token/ERC1155/IERC1155Upgradeable.sol';

import {ERC721HolderUpgradeable} from '@openzeppelin/contracts-upgradeable/token/ERC721/utils/ERC721HolderUpgradeable.sol';
import {ERC1155HolderUpgradeable} from '@openzeppelin/contracts-upgradeable/token/ERC1155/utils/ERC1155HolderUpgradeable.sol';
import {ERC1155ReceiverUpgradeable} from '@openzeppelin/contracts-upgradeable/token/ERC1155/utils/ERC1155ReceiverUpgradeable.sol';

import {SafeERC20Upgradeable} from '@openzeppelin/contracts-upgradeable/token/ERC20/utils/SafeERC20Upgradeable.sol';

import {OwlBase} from '../../common/OwlBase.sol';

import {AssetBasketOutput, AssetLib} from './IAsset.sol';
import {IAssetRouterInput} from './IAssetRouterInput.sol';
import {IAssetRouterOutput} from './IAssetRouterOutput.sol';

import {IERC165Upgradeable} from '@openzeppelin/contracts-upgradeable/utils/introspection/IERC165Upgradeable.sol';
import {IERC1155ReceiverUpgradeable} from '@openzeppelin/contracts-upgradeable/interfaces/IERC1155ReceiverUpgradeable.sol';
import {IAccessControlUpgradeable} from '@openzeppelin/contracts-upgradeable/access/IAccessControlUpgradeable.sol';
import {IRouterReceiver} from '../../common/IRouterReceiver.sol';
import {IContractURI} from '../../common/IContractURI.sol';

/**
 * @dev Abstract contract with types and utilities that will be used by many (if
 * not all) Plugins contracts
 *
 *
 */
contract AssetRouterOutput is ERC721HolderUpgradeable, ERC1155HolderUpgradeable, OwlBase, IAssetRouterOutput {
    bytes32 internal constant ASSET_ROUTER_INPUT = keccak256('ASSET_ROUTER_INPUT');

    // Array of outputBaskets in this configurations
    AssetBasketOutput[] internal outputBaskets;

    //https://docs.openzeppelin.com/contracts/4.x/upgradeable#storage_gaps
    uint256[49] private __gap;

    constructor() {}

    /**
     * @dev Initializes contract (replaces constructor in proxy pattern)
     * @param _admin owner, can control outputs on contract
     * @param _initContractURI contract uri
     * @param _outputBaskets outputs for configuration
     * @param _routers trusted routers that can call the output function
     */
    function initialize(
        address _admin,
        string calldata _initContractURI,
        AssetBasketOutput[] calldata _outputBaskets,
        address[] calldata _routers
    ) external initializer {
        __AssetRouterOutput_init(_admin, _initContractURI, _outputBaskets, _routers);
    }

    /**
     * @dev See initialize. Uses onlyInitializing modifier, enabling running while initializing.
     */
    function proxyInitialize(
        address _admin,
        string calldata _initContractURI,
        AssetBasketOutput[] calldata _outputBaskets,
        address[] calldata _routers
    ) external onlyInitializing {
        __AssetRouterOutput_init(_admin, _initContractURI, _outputBaskets, _routers);
    }

    function __AssetRouterOutput_init(
        address _admin,
        string calldata _initContractURI,
        AssetBasketOutput[] calldata _outputBaskets,
        address[] calldata _routers
    ) internal {
        __ContractURI_init_unchained(_admin, _initContractURI);
        //No GSN router initialized as calls are not using GSN
        __OwlBase_init_unchained(_admin);

        __AssetRouterOutput_init_unchained(_outputBaskets, _routers);
    }

    function __AssetRouterOutput_init_unchained(AssetBasketOutput[] calldata _outputBaskets, address[] memory _routers)
        internal
        onlyInitializing
    {
        outputBaskets = _outputBaskets;
        for (uint256 i = 0; i < _routers.length; i++) {
            _grantRole(ASSET_ROUTER_INPUT, _routers[i]);
        }
    }

    /**
     * inheritdoc IAssetRouterOutput
     */
    function getBasket(uint256 basketIdx) public view returns (AssetBasketOutput memory) {
        return outputBaskets[basketIdx];
    }

    /**
     * inheritdoc IAssetRouterOutput
     */
    function deposit(
        uint256 amount,
        uint256 basketIdx,
        uint256[][] calldata erc721TokenIdsTransfer,
        uint256[][] calldata erc721TokenIdsMint
    ) external onlyRole(DEFAULT_ADMIN_ROLE) {
        AssetLib.deposit(outputBaskets[basketIdx], amount, _msgSender(), erc721TokenIdsTransfer, erc721TokenIdsMint);
    }

    /**
     * inheritdoc IAssetRouterOutput
     */
    function withdraw(uint256 amount, uint256 basketIdx) external onlyRole(DEFAULT_ADMIN_ROLE) {
        AssetLib.withdraw(outputBaskets[basketIdx], amount, _msgSender());
    }

    /**
     * inheritdoc IAssetRouterOutput
     */
    function output(
        address to,
        uint256 amount,
        uint256 basketIdx
    ) external onlyRole(ASSET_ROUTER_INPUT) {
        AssetLib.output(outputBaskets[basketIdx], amount, to);
    }

    /**
     * inheritdoc OwlBase
     */
    function supportsInterface(bytes4 interfaceId)
        public
        view
        virtual
        override(OwlBase, ERC1155ReceiverUpgradeable)
        returns (bool)
    {
        return
            interfaceId == type(IAssetRouterOutput).interfaceId ||
            interfaceId == type(IERC1155ReceiverUpgradeable).interfaceId ||
            interfaceId == type(IERC165Upgradeable).interfaceId ||
            interfaceId == type(IAccessControlUpgradeable).interfaceId ||
            interfaceId == type(IRouterReceiver).interfaceId ||
            interfaceId == type(IContractURI).interfaceId;
    }
}
