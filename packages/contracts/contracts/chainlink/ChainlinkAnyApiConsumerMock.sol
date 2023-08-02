//SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import {ContextUpgradeable} from "@openzeppelin/contracts-upgradeable/utils/ContextUpgradeable.sol";

import {OwlBase} from "../common/OwlBase.sol";
import {IChainlinkAnyApiConsumer} from "./IChainlinkAnyApiConsumer.sol";
import {ChainlinkAnyApiConsumerAbstract} from "./ChainlinkAnyApiConsumerAbstract.sol";

/**
 * @dev An example consumer contract that expects (uint256, string) for prefixData, and (uint256, string) for responseData
 */
contract ChainlinkApiConsumerMock is OwlBase, ChainlinkAnyApiConsumerAbstract {
    mapping(uint256 => ChainlinkResponse) public responses;

    event ChainlinkResponseFulfilled(uint256 prefixNo, string prefixString, uint256 responseNo, string responseString);

    struct ChainlinkResponse {
        uint256 prefixNo;
        string prefixString;
        uint256 responseNo;
        string responseString;
    }

    /**
     * @dev Initialize the consumer.
     * @param _admin AccessControl admin
     * @param _initContractURI URI for storing metadata
     * @param _fulfillRole ChainlinkAnyApiClient address
     */
    function initialize(address _admin, string calldata _initContractURI, address _fulfillRole) external initializer {
        __ContractURI_init_unchained(_admin, _initContractURI);
        __OwlBase_init_unchained(_admin);

        __ChainlinkAnyApiConsumerMock_init(_fulfillRole);
    }

    function __ChainlinkAnyApiConsumerMock_init(address _fulfillRole) internal {
        __ChainlinkAnyApiConsumer_init_unchained(_fulfillRole);
        __ChainlinkAnyApiConsumerMock_init_unchained();
    }

    function __ChainlinkAnyApiConsumerMock_init_unchained() internal {}

    /**
     * inheritdoc IChainlinkAnyApiConsumer
     */
    function fulfill(
        bytes calldata fulfillPrefixData,
        bytes calldata fulfillResponseData
    ) external virtual onlyRole(FULFILL_ROLE) {
        (uint256 prefixNo, string memory prefixString) = abi.decode(fulfillPrefixData, (uint256, string));
        (uint256 responseNo, string memory responseString) = abi.decode(fulfillResponseData, (uint256, string));

        responses[prefixNo] = ChainlinkResponse({
            prefixNo: prefixNo,
            prefixString: prefixString,
            responseNo: responseNo,
            responseString: responseString
        });

        emit ChainlinkResponseFulfilled(prefixNo, prefixString, responseNo, responseString);
    }

    function supportsInterface(
        bytes4 interfaceId
    ) public view virtual override(ChainlinkAnyApiConsumerAbstract, OwlBase) returns (bool) {
        return OwlBase.supportsInterface(interfaceId);
    }
}
