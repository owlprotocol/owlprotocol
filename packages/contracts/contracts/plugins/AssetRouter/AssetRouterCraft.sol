//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import {IERC721ReceiverUpgradeable} from "@openzeppelin/contracts-upgradeable/token/ERC721/IERC721ReceiverUpgradeable.sol";
import {IERC1155ReceiverUpgradeable} from "@openzeppelin/contracts-upgradeable/token/ERC1155/IERC1155ReceiverUpgradeable.sol";

import {AddressUpgradeable} from "@openzeppelin/contracts-upgradeable/utils/AddressUpgradeable.sol";

import {OwlBase} from "../../common/OwlBase.sol";

import {AssetBasketInput, AssetInputLib} from "./AssetInputLib.sol";
import {AssetBasketOutput, AssetOutputLib} from "./AssetOutputLib.sol";
import {IAssetRouterCraft} from "./IAssetRouterCraft.sol";

/**
 * @dev Abstract contract with types and utilities that will be used by many (if
 * not all) Plugins contracts
 *
 *
 */
contract AssetRouterCraft is OwlBase, IAssetRouterCraft, IERC721ReceiverUpgradeable {
    bytes32 internal constant DEPOSIT_ROLE = keccak256("DEPOSIT_ROLE");
    bytes32 internal constant WITHDRAW_ROLE = keccak256("WITHDRAW_ROLE");

    // mapping from contract address to tokenId to nUsed
    mapping(uint256 => mapping(address => mapping(uint256 => uint256))) erc721NTime;
    // Array of inputs in this configurations
    AssetBasketInput[] private inputBaskets;
    AssetBasketOutput[] private outputBaskets;

    //https://docs.openzeppelin.com/contracts/4.x/upgradeable#storage_gaps
    uint256[47] private __gap;

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
        AssetBasketInput[] calldata _inputBaskets,
        AssetBasketOutput[] calldata _outputBaskets
    ) external initializer {
        __AssetRouterCraft_init(_admin, _initContractURI, _gsnForwarder, _inputBaskets, _outputBaskets);
    }

    /**
     * @dev performs validations that `_inputs` and `_outputs` are valid and
     * creates the configuration
     */
    function __AssetRouterCraft_init(
        address _admin,
        string memory _initContractURI,
        address _gsnForwarder,
        AssetBasketInput[] memory _inputBaskets,
        AssetBasketOutput[] memory _outputBaskets
    ) internal {
        __ContractURI_init_unchained(_admin, _initContractURI);
        __RouterReceiver_init_unchained(_gsnForwarder);
        __OwlBase_init_unchained(_admin);

        __AssetRouterCraft_init_unchained(_inputBaskets, _outputBaskets, _admin, _admin);
    }

    function __AssetRouterCraft_init_unchained(
        AssetBasketInput[] memory _inputBaskets,
        AssetBasketOutput[] memory _outputBaskets,
        address _depositRole,
        address _withdrawRole
    ) internal {
        _grantRole(DEPOSIT_ROLE, _depositRole);
        _grantRole(WITHDRAW_ROLE, _withdrawRole);

        //Registry
        if (AddressUpgradeable.isContract(ERC1820_REGISTRY)) {
            registry.updateERC165Cache(address(this), type(IERC721ReceiverUpgradeable).interfaceId);
            registry.updateERC165Cache(address(this), type(IERC1155ReceiverUpgradeable).interfaceId);
            registry.updateERC165Cache(address(this), type(IAssetRouterCraft).interfaceId);
            registry.setInterfaceImplementer(
                address(this),
                type(IERC721ReceiverUpgradeable).interfaceId | ONE,
                address(this)
            );
            registry.setInterfaceImplementer(
                address(this),
                type(IERC1155ReceiverUpgradeable).interfaceId | ONE,
                address(this)
            );
            registry.setInterfaceImplementer(address(this), type(IAssetRouterCraft).interfaceId | ONE, address(this));
        }

        //Emit events for indexing
        for (uint256 i = 0; i < _inputBaskets.length; i++) {
            AssetBasketInput memory basket = _inputBaskets[i];
            AssetInputLib.supportsBasket(basket, i);
        }
        for (uint256 i = 0; i < _outputBaskets.length; i++) {
            AssetBasketOutput memory basket = _outputBaskets[i];
            AssetOutputLib.supportsBasket(basket, i);
        }

        //Store
        inputBaskets = _inputBaskets;
        outputBaskets = _outputBaskets;
    }

    /**
     * inheritdoc IAssetRouterCraft
     */
    function getInputBasket(uint256 basketIdx) public view returns (AssetBasketInput memory) {
        return inputBaskets[basketIdx];
    }

    /**
     * inheritdoc IAssetRouterOutput
     */
    function getOutputBasket(uint256 basketIdx) public view returns (AssetBasketOutput memory) {
        return outputBaskets[basketIdx];
    }

    /**
     * inheritdoc IAssetRouterCraft
     */
    function craft(
        uint256 amount,
        uint256 basketIdx,
        uint256[][] calldata erc721TokenIdsUnaffected,
        uint256[][] calldata erc721TokenIdsNTime,
        uint256[][] calldata erc721TokenIdsBurned,
        uint256 outBasketIdx
    ) external override {
        address msgSender = _msgSender();

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

        //Output call
        AssetOutputLib.output(outputBaskets[outBasketIdx], amount, msgSender);

        emit RouteBasket(msgSender, address(this), basketIdx, amount);
        emit RouteBasket(address(this), msgSender, outBasketIdx, amount);
        emit UpdateBasket(outBasketIdx, -int256(amount));
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
            uint256 outputBasketId
        ) = abi.decode(data, (uint256, uint256[][], uint256[][], uint256));

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

        //Output call
        AssetOutputLib.output(outputBaskets[outputBasketId], 1, from);

        emit RouteBasket(from, address(this), basketId, 1);
        emit RouteBasket(address(this), from, outputBasketId, 1);
        emit UpdateBasket(outputBasketId, -int256(1));

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
            uint256 outputBasketId
        ) = abi.decode(data, (uint256, uint256, uint256[][], uint256[][], uint256[][], uint256));

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

        //Output call
        AssetOutputLib.output(outputBaskets[outputBasketId], amount, from);

        emit RouteBasket(from, address(this), basketId, amount);
        emit RouteBasket(address(this), from, outputBasketId, amount);
        emit UpdateBasket(outputBasketId, -int256(amount));

        return IERC1155ReceiverUpgradeable.onERC1155Received.selector;
    }

    /**
     * inheritdoc IAssetRouterOutput
     */
    function deposit(uint256 amount, uint256 basketIdx) external onlyRole(DEPOSIT_ROLE) {
        AssetOutputLib.deposit(outputBaskets[basketIdx], amount);
        emit UpdateBasket(basketIdx, int256(amount));
    }

    /**
     * inheritdoc IAssetRouterOutput
     */
    function withdraw(uint256 amount, uint256 basketIdx) external onlyRole(WITHDRAW_ROLE) {
        AssetOutputLib.withdraw(outputBaskets[basketIdx], amount);
        emit UpdateBasket(basketIdx, -int256(amount));
    }

    function supportsInterface(bytes4 interfaceId) public view virtual override returns (bool) {
        return
            interfaceId == type(IAssetRouterCraft).interfaceId ||
            interfaceId == type(IERC721ReceiverUpgradeable).interfaceId ||
            interfaceId == type(IERC1155ReceiverUpgradeable).interfaceId ||
            super.supportsInterface(interfaceId);
    }
}
