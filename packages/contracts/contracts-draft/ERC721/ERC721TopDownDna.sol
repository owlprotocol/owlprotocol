// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import {IERC721Upgradeable} from "@openzeppelin/contracts-upgradeable/token/ERC721/IERC721Upgradeable.sol";
import {IERC165Upgradeable} from "@openzeppelin/contracts-upgradeable/utils/introspection/IERC165Upgradeable.sol";

import {CountersUpgradeable} from "@openzeppelin/contracts-upgradeable/utils/CountersUpgradeable.sol";
import {AddressUpgradeable} from "@openzeppelin/contracts-upgradeable/utils/AddressUpgradeable.sol";
import {Base64UrlUpgradeable} from "../../utils/Base64UrlUpgradeable.sol";
import {EnumerableSetUpgradeable} from "@openzeppelin/contracts-upgradeable/utils/structs/EnumerableSetUpgradeable.sol";

import {ERC721Upgradeable} from "@openzeppelin/contracts-upgradeable/token/ERC721/ERC721Upgradeable.sol";

import {ERC721TopDownBase} from "./ERC721TopDownBase.sol";
import {ERC721DnaBase} from "./ERC721DnaBase.sol";
import {Unauthorized, AddressNotChild} from "./ERC721TopDownLib.sol";
import {ERC721TopDownDnaLib} from "./ERC721TopDownDnaLib.sol";

/**
 * @dev ERC721TopDownDNA
 */
contract ERC721TopDownDna is ERC721DnaBase, ERC721TopDownBase {
    using Base64UrlUpgradeable for bytes;
    using AddressUpgradeable for address;
    using CountersUpgradeable for CountersUpgradeable.Counter;
    using EnumerableSetUpgradeable for EnumerableSetUpgradeable.AddressSet;

    constructor() {}

    /**
     * @dev Initializes an ERC721MintableAutoId contract.
     *      Protected with `initializer` modifier.
     * @param _admin admin for contract
     * @param _initContractURI uri for contract metadata description
     * @param _name name for contract
     * @param _symbol symbol for contract
     * @param _initBaseURI base URI for contract
     * @param _feeReceiver address of receiver of royalty fees
     * @param _feeNumerator numerator of royalty fee percentage (numerator / 10000)
     * @param _childContracts721 child ERC721nDNA contracts
     * @param _childContracts1155 child ERC1155DNA contracts
     */
    function initialize(
        address _admin,
        string calldata _initContractURI,
        string calldata _name,
        string calldata _symbol,
        string calldata _initBaseURI,
        address _feeReceiver,
        uint96 _feeNumerator,
        address[] calldata _childContracts721,
        address[] calldata _childContracts1155
    ) external initializer {
        __ERC721TopDownDna_init(
            _admin,
            _initContractURI,
            _name,
            _symbol,
            _initBaseURI,
            _feeReceiver,
            _feeNumerator,
            _childContracts721,
            _childContracts1155
        );
    }

    /**
     * @dev Initialize ERC721TopDownDna + dependencies
     */
    function __ERC721TopDownDna_init(
        address _admin,
        string memory _initContractURI,
        string memory _name,
        string memory _symbol,
        string memory _initBaseURI,
        address _feeReceiver,
        uint96 _feeNumerator,
        address[] memory _childContracts721,
        address[] memory _childContract1155
    ) internal {
        __ContractURI_init_unchained(_admin, _initContractURI);
        __OwlBase_init_unchained(_admin);

        __ERC721_init_unchained(_name, _symbol);
        __BaseURI_init_unchained(_admin, _initBaseURI);
        __ERC2981Setter_init_unchained(_admin, _feeReceiver, _feeNumerator);
        __ERC721Abstract_init_unchained();

        __ERC721DnaBase_init_unchained(_admin, _admin);
        __ERC721TopDown_init_unchained(_childContracts721, _childContract1155);
    }

    /**
     * inheritdoc IERC721Dna
     */
    function getDna(uint256 tokenId) public view override returns (bytes memory) {
        _requireMinted(tokenId);
        return
            ERC721TopDownDnaLib.getDna(
                inherentDna,
                childContracts721,
                childTokenIdOf721,
                childContracts1155,
                childTokenIdOf1155,
                tokenId
            );
    }

    /***** Dna *****/
    /**
     * @dev returns uri for token metadata. If no baseURI, returns Dna as string
     * @param tokenId tokenId metadata to fetch
     * @return uri at which metadata is housed
     */
    function tokenURI(uint256 tokenId) public view override(ERC721Upgradeable, ERC721DnaBase) returns (string memory) {
        string memory baseURI = _baseURI();
        bytes memory dnaRaw = getDna(tokenId);
        string memory dnaString = dnaRaw.encode();
        return bytes(baseURI).length > 0 ? string(abi.encodePacked(baseURI, dnaString)) : dnaString;
    }
}
