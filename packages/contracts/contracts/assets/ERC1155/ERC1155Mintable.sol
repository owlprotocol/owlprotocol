// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import {AddressUpgradeable} from "@openzeppelin/contracts-upgradeable/utils/AddressUpgradeable.sol";

import {ERC1155Base} from "./ERC1155Base.sol";
import {IERC1155Mintable} from "./IERC1155Mintable.sol";

contract ERC1155Mintable is ERC1155Base, IERC1155Mintable {
    bytes32 private constant MINTER_ROLE = keccak256("MINTER_ROLE");

    //https://docs.openzeppelin.com/contracts/4.x/upgradeable#storage_gaps
    uint256[50] private __gap;

    constructor() {}

    /**
     * @dev Initializes an ERC1155Mintable contract
     * @param _admin admin for contract
     * @param _initContractURI uri for contract metadata description
     * @param _gsnForwarder GSN Trusted forwarder
     * @param _uri URI for tokens
     * @param _feeReceiver address of receiver of royalty fees
     * @param _feeNumerator numerator of royalty fee percentage (numerator / 10000)
     */
    function initialize(
        address _admin,
        string calldata _initContractURI,
        address _gsnForwarder,
        string calldata _uri,
        address _feeReceiver,
        uint96 _feeNumerator
    ) external virtual initializer {
        __ERC1155Mintable_init(_admin, _initContractURI, _gsnForwarder, _uri, _feeReceiver, _feeNumerator);
    }

    function __ERC1155Mintable_init(
        address _admin,
        string memory _initContractURI,
        address _gsnForwarder,
        string memory _uri,
        address _feeReceiver,
        uint96 _feeNumerator
    ) internal {
        __ContractURI_init_unchained(_admin, _initContractURI);
        __RouterReceiver_init_unchained(_gsnForwarder);
        __OwlBase_init_unchained(_admin);

        __ERC1155_init_unchained(_uri);
        __ERC2981Setter_init_unchained(_admin, _feeReceiver, _feeNumerator);
        __ERC1155Base_init_unchained(_admin);
        __ERC1155Mintable_init_unchained(_admin);
    }

    function __ERC1155Mintable_init_unchained(address _minterRole) internal {
        _grantRole(MINTER_ROLE, _minterRole);
        if (AddressUpgradeable.isContract(ERC1820_REGISTRY)) {
            registry.updateERC165Cache(address(this), type(IERC1155Mintable).interfaceId);
            registry.setInterfaceImplementer(address(this), type(IERC1155Mintable).interfaceId | ONE, address(this));
        }
    }

    /***** MINTING *****/
    /**
     * @inheritdoc IERC1155Mintable
     */
    function mint(address to, uint256 id, uint256 amount, bytes memory data) external onlyRole(MINTER_ROLE) {
        _mint(to, id, amount, data);
    }

    /**
     * @inheritdoc IERC1155Mintable
     */
    function mintBatch(
        address to,
        uint256[] memory ids,
        uint256[] memory amounts,
        bytes memory data
    ) external onlyRole(MINTER_ROLE) {
        _mintBatch(to, ids, amounts, data);
    }

    /**
     * @inheritdoc ERC1155Base
     */
    function supportsInterface(bytes4 interfaceId) public view virtual override returns (bool) {
        return interfaceId == type(IERC1155Mintable).interfaceId || super.supportsInterface(interfaceId);
    }
}
