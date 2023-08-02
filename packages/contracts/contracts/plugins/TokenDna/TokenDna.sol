// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import {ContextUpgradeable} from "@openzeppelin/contracts-upgradeable/utils/ContextUpgradeable.sol";

import {OwlBase} from "../../common/OwlBase.sol";
import {ITokenDna} from "./ITokenDna.sol";
import {TokenDnaAbstract} from "./TokenDnaAbstract.sol";
import {ChainlinkAnyApiConsumerAbstract, InvalidSelector} from "../../chainlink/ChainlinkAnyApiConsumerAbstract.sol";
import {IChainlinkAnyApiConsumer} from "../../chainlink/IChainlinkAnyApiConsumer.sol";

/**
 * @dev TokenDna storage contract
 */
contract TokenDna is ChainlinkAnyApiConsumerAbstract, TokenDnaAbstract, OwlBase {
    function initialize(address _admin, string memory _contractUri, address _dnaRole) external initializer {
        __TokenDna_init(_admin, _contractUri, _dnaRole);
    }

    /**
     * @dev TokenDna chained initialization
     */
    function __TokenDna_init(address _admin, string memory _contractUri, address _dnaRole) internal {
        __ContractURI_init_unchained(_admin, _contractUri);
        __OwlBase_init_unchained(_admin);

        __TokenDnaAbstract_init_unchained(_dnaRole);
        __ChainlinkAnyApiConsumer_init_unchained(_dnaRole);
    }

    /**
     * inheritdoc IChainlinkAnyApiConsumer
     */
    function fulfill(
        bytes calldata fulfillPrefixData,
        bytes calldata fulfillResponseData
    ) external virtual onlyRole(FULFILL_ROLE) {
        bytes4 selector = bytes4(fulfillPrefixData[:4]);
        if (selector == ITokenDna.setDna.selector) {
            (, uint256 tokenId) = abi.decode(fulfillPrefixData, (bytes4, uint256));
            bytes memory dna = fulfillResponseData;
            setDna(tokenId, dna);
        } else if (selector == ITokenDna.setDnaBatch.selector) {
            //TODO: Test out if it works
            (, uint256[] memory tokenId) = abi.decode(fulfillPrefixData, (bytes4, uint256[]));
            bytes[] memory dna = abi.decode(fulfillResponseData, (bytes[]));
            setDnaBatch(tokenId, dna);
        } else {
            revert InvalidSelector(selector);
        }
    }

    function supportsInterface(
        bytes4 interfaceId
    ) public view virtual override(ChainlinkAnyApiConsumerAbstract, TokenDnaAbstract, OwlBase) returns (bool) {
        return OwlBase.supportsInterface(interfaceId);
    }
}
