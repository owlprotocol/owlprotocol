//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import {IERC20Upgradeable} from '@openzeppelin/contracts-upgradeable/token/ERC20/IERC20Upgradeable.sol';
import {IERC721Upgradeable} from '@openzeppelin/contracts-upgradeable/token/ERC721/IERC721Upgradeable.sol';
import {IERC1155Upgradeable} from '@openzeppelin/contracts-upgradeable/token/ERC1155/IERC1155Upgradeable.sol';

import {AddressUpgradeable} from '@openzeppelin/contracts-upgradeable/utils/AddressUpgradeable.sol';
import {SafeERC20Upgradeable} from '@openzeppelin/contracts-upgradeable/token/ERC20/utils/SafeERC20Upgradeable.sol';

import {OwlBase} from '../../common/OwlBase.sol';

import {AssetBasketInput, AssetLib} from './IAsset.sol';
import {IAssetRouterInput} from './IAssetRouterInput.sol';
import {IAssetRouterOutput} from './IAssetRouterOutput.sol';

/**
 * @dev Abstract contract with types and utilities that will be used by many (if
 * not all) Plugins contracts
 *
 *
 */
contract AssetRouterInput is OwlBase, IAssetRouterInput {
    // mapping from contract address to tokenId to nUsed
    mapping(uint256 => mapping(address => mapping(uint256 => uint256))) erc721NTime;
    // Array of inputs in this configurations
    AssetBasketInput[] private inputBaskets;

    //https://docs.openzeppelin.com/contracts/4.x/upgradeable#storage_gaps
    uint256[48] private __gap;

    constructor() {}

    /**
     * @dev Initializes contract (replaces constructor in proxy pattern)
     * @param _admin owner, can control outputs on contract
     * @param _initContractURI contract uri
     * @param _gsnForwarder trusted forwarder address for openGSN
     * @param _inputBaskets input baskets
     */
    function initialize(
        address _admin,
        string memory _initContractURI,
        address _gsnForwarder,
        AssetBasketInput[] calldata _inputBaskets
    ) external initializer {
        __AssetRouterInput_init(_admin, _initContractURI, _gsnForwarder, _inputBaskets);
    }

    /**
     * @dev See initialize. Uses onlyInitializing modifier, enabling running while initializing.
     */
    function proxyInitialize(
        address _admin,
        string memory _initContractURI,
        address _gsnForwarder,
        AssetBasketInput[] calldata _inputBaskets
    ) external onlyInitializing {
        __AssetRouterInput_init(_admin, _initContractURI, _gsnForwarder, _inputBaskets);
    }

    /**
     * @dev performs validations that `_inputs` and `_outputs` are valid and
     * creates the configuration
     */
    function __AssetRouterInput_init(
        address _admin,
        string memory _initContractURI,
        address _gsnForwarder,
        AssetBasketInput[] memory _inputBaskets
    ) internal {
        __ContractURI_init_unchained(_admin, _initContractURI);
        __RouterReceiver_init_unchained(_gsnForwarder);
        __OwlBase_init_unchained(_admin);

        __AssetRouterInput_init_unchained(_inputBaskets);
    }

    function __AssetRouterInput_init_unchained(AssetBasketInput[] memory _inputBaskets) internal {
        //Registry
        if (AddressUpgradeable.isContract(ERC1820_REGISTRY)) {
            registry.updateERC165Cache(address(this), type(IAssetRouterInput).interfaceId);
            registry.setInterfaceImplementer(address(this), type(IAssetRouterInput).interfaceId | ONE, address(this));
        }

        //Emit events for indexing
        for (uint256 i = 0; i < _inputBaskets.length; i++) {
            AssetBasketInput memory basket = _inputBaskets[i];
            for (uint256 j = 0; j < basket.erc20Unaffected.length; j++) {
                emit SupportsAsset(basket.erc20Unaffected[j].contractAddr, 0, i);
            }
            for (uint256 j = 0; j < basket.erc20Burned.length; j++) {
                emit SupportsAsset(basket.erc20Burned[j].contractAddr, 0, i);
            }
            for (uint256 j = 0; j < basket.erc721Unaffected.length; j++) {
                emit SupportsAsset(basket.erc721Unaffected[j].contractAddr, 0, i);
            }
            for (uint256 j = 0; j < basket.erc721Burned.length; j++) {
                emit SupportsAsset(basket.erc721Burned[j].contractAddr, 0, i);
            }
            for (uint256 j = 0; j < basket.erc721NTime.length; j++) {
                emit SupportsAsset(basket.erc721NTime[j].contractAddr, 0, i);
            }
            for (uint256 j = 0; j < basket.erc1155Unaffected.length; j++) {
                for (uint256 k = 0; k < basket.erc1155Unaffected[j].tokenIds.length; k++) {
                    emit SupportsAsset(
                        basket.erc1155Unaffected[j].contractAddr,
                        basket.erc1155Unaffected[j].tokenIds[k],
                        i
                    );
                }
            }
            for (uint256 j = 0; j < basket.erc1155Burned.length; j++) {
                for (uint256 k = 0; k < basket.erc1155Burned[j].tokenIds.length; k++) {
                    emit SupportsAsset(
                        basket.erc1155Burned[j].contractAddr,
                        basket.erc1155Burned[j].tokenIds[k],
                        i
                    );
                }
            }
        }

        //Store
        inputBaskets = _inputBaskets;
    }

    /**
     *
     * Getters
     *
     */

    /**
     * inheritdoc IAssetRouterInput
     */
    function getBasket(uint256 basketIdx) public view returns (AssetBasketInput memory) {
        return inputBaskets[basketIdx];
    }

    /**
     * inheritdoc IAssetRouterInput
     */
    function input(
        address target,
        uint256 amount,
        uint256 basketIdx,
        uint256[][] calldata erc721TokenIdsUnaffected,
        uint256[][] calldata erc721TokenIdsNTime,
        uint256[][] calldata erc721TokenIdsBurned,
        uint256 outBasketIdx
    ) external override {
        address msgSender = _msgSender();

        emit RouteBasket(msgSender, target, basketIdx, amount);

        //Consume inputs
        AssetLib.input(
            inputBaskets[basketIdx],
            amount,
            msgSender,
            erc721TokenIdsUnaffected,
            erc721TokenIdsNTime,
            erc721TokenIdsBurned,
            erc721NTime[basketIdx]
        );

        //Route call
        IAssetRouterOutput(target).output(msgSender, amount, outBasketIdx);
    }
}
