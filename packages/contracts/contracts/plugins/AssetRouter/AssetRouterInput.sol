//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import {IERC721ReceiverUpgradeable} from "@openzeppelin/contracts-upgradeable/token/ERC721/IERC721ReceiverUpgradeable.sol";
import {IERC1155ReceiverUpgradeable} from "@openzeppelin/contracts-upgradeable/token/ERC1155/IERC1155ReceiverUpgradeable.sol";

import {OwlBase} from "../../common/OwlBase.sol";

import {AssetBasketInput, AssetInputLib} from "./AssetInputLib.sol";
import {IAssetRouterInput} from "./IAssetRouterInput.sol";
import {IAssetRouterOutput} from "./IAssetRouterOutput.sol";

/**
 * @dev Abstract contract with types and utilities that will be used by many (if
 * not all) Plugins contracts
 *
 *
 */
contract AssetRouterInput is OwlBase, IAssetRouterInput, IERC721ReceiverUpgradeable {
    // mapping from contract address to tokenId to nUsed
    mapping(uint256 => mapping(address => mapping(uint256 => uint256))) erc721NTime;
    // Array of inputs in this configurations
    AssetBasketInput[] internal inputBaskets;

    //https://docs.openzeppelin.com/contracts/4.x/upgradeable#storage_gaps
    uint256[48] private __gap;

    constructor() {}

    /**
     * @dev Initializes contract (replaces constructor in proxy pattern)
     * @param _admin owner, can control outputs on contract
     * @param _initContractURI contract uri
     * @param _inputBaskets input baskets
     */
    function initialize(
        address _admin,
        string memory _initContractURI,
        AssetBasketInput[] calldata _inputBaskets
    ) external initializer {
        __AssetRouterInput_init(_admin, _initContractURI, _inputBaskets);
    }

    /**
     * @dev performs validations that `_inputs` and `_outputs` are valid and
     * creates the configuration
     */
    function __AssetRouterInput_init(
        address _admin,
        string memory _initContractURI,
        AssetBasketInput[] memory _inputBaskets
    ) internal {
        __ContractURI_init_unchained(_admin, _initContractURI);
        __OwlBase_init_unchained(_admin);

        __AssetRouterInput_init_unchained(_inputBaskets);
    }

    function __AssetRouterInput_init_unchained(AssetBasketInput[] memory _inputBaskets) internal {
        //Registry
        if (_registryExists()) {
            _registerInterface(type(IERC721ReceiverUpgradeable).interfaceId);
            _registerInterface(type(IERC1155ReceiverUpgradeable).interfaceId);
            _registerInterface(type(IAssetRouterInput).interfaceId);
        }

        //Emit events for indexing
        for (uint256 i = 0; i < _inputBaskets.length; i++) {
            AssetBasketInput memory basket = _inputBaskets[i];
            AssetInputLib.supportsBasket(basket, i);
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
    function getInputBasket(uint256 basketIdx) public view returns (AssetBasketInput memory) {
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
        address msgSender = msg.sender;

        //Consume inputs
        AssetInputLib.input(
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

        emit RouteBasket(msgSender, target, basketIdx, amount);
    }

    /**
     * @dev Direct input via transfer (avoids need for approvals)
     */
    function onERC721Received(
        address,
        address from,
        uint256 tokenId,
        bytes memory data
    ) external override returns (bytes4) {
        //User deposit
        (
            uint256 basketId,
            uint256[][] memory erc721TokenIdsUnaffected,
            uint256[][] memory erc721TokenIdsNTime,
            address target,
            uint256 outputBasketId
        ) = abi.decode(data, (uint256, uint256[][], uint256[][], address, uint256));

        //Burn tokenId hard code
        uint256[][] memory erc721TokenIdsBurned = new uint256[][](1);
        uint256[] memory erc721TokenIdsBurned0 = new uint256[](1);
        erc721TokenIdsBurned0[0] = tokenId;
        erc721TokenIdsBurned[0] = erc721TokenIdsBurned0;

        //childTokenId
        AssetBasketInput memory basket = inputBaskets[basketId];

        AssetInputLib.inputOnERC721Received(
            basket,
            from,
            erc721TokenIdsUnaffected,
            erc721TokenIdsNTime,
            erc721TokenIdsBurned,
            erc721NTime[basketId]
        );
        emit RouteBasket(from, target, basketId, 1);

        //Route call
        IAssetRouterOutput(target).output(from, 1, outputBasketId);
        return IERC721ReceiverUpgradeable.onERC721Received.selector;
    }

    /**
     * @dev Direct input via transfer (avoids need for approvals)
     */
    function onERC1155BatchReceived(
        address,
        address from,
        uint256[] calldata,
        uint256[] calldata,
        bytes calldata data
    ) external returns (bytes4) {
        //User deposit
        (
            uint256 basketId,
            uint256 amount,
            uint256[][] memory erc721TokenIdsUnaffected,
            uint256[][] memory erc721TokenIdsNTime,
            uint256[][] memory erc721TokenIdsBurned,
            address target,
            uint256 outputBasketId
        ) = abi.decode(data, (uint256, uint256, uint256[][], uint256[][], uint256[][], address, uint256));

        AssetBasketInput memory basket = inputBaskets[basketId];

        AssetInputLib.inputOnERC1155Received(
            basket,
            amount,
            from,
            erc721TokenIdsUnaffected,
            erc721TokenIdsNTime,
            erc721TokenIdsBurned,
            erc721NTime[basketId]
        );
        emit RouteBasket(from, target, basketId, amount);

        //Route call
        IAssetRouterOutput(target).output(from, amount, outputBasketId);
        return IERC1155ReceiverUpgradeable.onERC1155Received.selector;
    }
}
