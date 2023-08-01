// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import {IERC721Mintable} from "./IERC721Mintable.sol";
import {ERC721Abstract} from "./ERC721Abstract.sol";

/**
 * @dev This implements the standard OwlProtocol `ERC721` contract that is an
 * extension of Openzeppelin's `ERC721BurnableUpgradeable`. Initializations
 * happens through initializers for compatibility with a EIP1167 minimal-proxy
 * deployment strategy.
 */
contract ERC721Mintable is ERC721Abstract, IERC721Mintable {
    bytes32 internal constant MINTER_ROLE = keccak256("MINTER_ROLE");

    /**********************
        Initialization
    **********************/

    function initialize(
        address _admin,
        string memory _initContractURI,
        address _gsnForwarder,
        string memory _name,
        string memory _symbol,
        address _tokenUriProvider,
        address _tokenRoyaltyProvider
    ) external virtual initializer {
        __ERC721Mintable_init(
            _admin,
            _initContractURI,
            _gsnForwarder,
            _name,
            _symbol,
            _tokenUriProvider,
            _tokenRoyaltyProvider
        );
    }

    function __ERC721Mintable_init(
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
        __ERC721Mintable_init_unchained(_admin);
    }

    function __ERC721Mintable_init_unchained(address _minterRole) internal {
        _grantRole(MINTER_ROLE, _minterRole);
        if (_registryExists()) {
            _registerInterface(type(IERC721Mintable).interfaceId);
        }
    }

    /**
     * @inheritdoc IERC721Mintable
     */
    function mint(address to, uint256 tokenId) external virtual onlyRole(MINTER_ROLE) {
        _mint(to, tokenId);
    }

    /**
     * @inheritdoc IERC721Mintable
     */
    function mintBatch(address[] memory to, uint256[] memory tokenId) external virtual onlyRole(MINTER_ROLE) {
        for (uint256 i = 0; i < to.length; i++) {
            _mint(to[i], tokenId[i]);
        }
    }

    /**
     * @inheritdoc IERC721Mintable
     */
    function safeMint(address to, uint256 tokenId) external virtual onlyRole(MINTER_ROLE) {
        _safeMint(to, tokenId);
    }

    /**
     * @inheritdoc IERC721Mintable
     */
    function safeMintBatch(address[] memory to, uint256[] memory tokenId) external virtual onlyRole(MINTER_ROLE) {
        for (uint256 i = 0; i < to.length; i++) {
            _safeMint(to[i], tokenId[i]);
        }
    }
}
