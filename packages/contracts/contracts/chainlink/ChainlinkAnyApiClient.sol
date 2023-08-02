//SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import {ChainlinkClient, Chainlink, LinkTokenInterface} from "@chainlink/contracts/src/v0.8/ChainlinkClient.sol";
import {AddressUpgradeable} from "@openzeppelin/contracts-upgradeable/utils/AddressUpgradeable.sol";

import {OwlBase} from "../common/OwlBase.sol";
import {IChainlinkAnyApiClient} from "./IChainlinkAnyApiClient.sol";
import {IChainlinkAnyApiConsumer} from "./IChainlinkAnyApiConsumer.sol";

/**
 * Request testnet LINK and ETH here: https://faucets.chain.link/
 * Find information on LINK Token Contracts and get the latest ETH and LINK faucets here: https://docs.chain.link/docs/link-token-contracts/
 */

/**
 * @dev A universal Chainlink AnyApi client. Requests store a fulfillAddress and fulfillPrefixData
 * that are stored (indexed on reqId) and then used to proxy the fulfillment data.
 * We only support bytes responses as all other types can be derived from these.
 */
contract ChainlinkAnyApiClient is OwlBase, ChainlinkClient, IChainlinkAnyApiClient {
    using Chainlink for Chainlink.Request;
    using AddressUpgradeable for address;

    bytes32 internal constant REQUEST_ROLE = keccak256("REQUEST_ROLE");
    bytes32 internal constant WITHDRAW_ROLE = keccak256("WITHDRAW_ROLE");

    mapping(bytes32 => ChainlinkReq) public requests;
    event RequestFulfilled(
        bytes32 indexed reqId,
        address indexed fulfillAddress,
        bytes fulfillPrefixData,
        bytes reqData
    );

    struct ChainlinkReq {
        address fulfillAddress;
        bytes fulfillPrefixData;
    }

    /**
     * @notice Initialize the link token and target oracle
     * @dev The oracle address must be an Operator contract for multiword response
     * @param _admin AccessControl admin
     * @param _initContractURI URI for storing metadata
     * @param token Chainlink token address
     * @param oracle Chainlink oracle address
     */
    function initialize(
        address _admin,
        string calldata _initContractURI,
        address token,
        address oracle
    ) external initializer {
        __ChainlinkAnyApiClient_init(_admin, _initContractURI, token, oracle);
    }

    function __ChainlinkAnyApiClient_init(
        address _admin,
        string memory _initContractURI,
        address token,
        address oracle
    ) internal {
        __ContractURI_init_unchained(_admin, _initContractURI);
        __OwlBase_init_unchained(_admin);

        __ChainlinkAnyApiClient_init_unchained(_admin, _admin, token, oracle);
    }

    function __ChainlinkAnyApiClient_init_unchained(
        address _requestRole,
        address _withdrawRole,
        address token,
        address oracle
    ) internal {
        _grantRole(REQUEST_ROLE, _requestRole);
        _grantRole(WITHDRAW_ROLE, _withdrawRole);

        if (_registryExists()) {
            _registerInterface(type(IChainlinkAnyApiClient).interfaceId);
        }

        setChainlinkToken(token);
        setChainlinkOracle(oracle);
    }

    /**
     * @inheritdoc IChainlinkAnyApiClient
     */
    function request(
        address fulfillAddress,
        bytes calldata fulfillPrefixData,
        bytes32 reqJobId,
        string calldata reqUrl,
        string calldata reqPath,
        uint256 reqFee
    ) external onlyRole(REQUEST_ROLE) {
        Chainlink.Request memory req = buildChainlinkRequest(reqJobId, address(this), this.fulfill.selector);
        req.add("get", reqUrl);
        req.add("path", reqPath);
        bytes32 reqId = sendChainlinkRequest(req, reqFee);
        requests[reqId] = ChainlinkReq({fulfillAddress: fulfillAddress, fulfillPrefixData: fulfillPrefixData});
    }

    /**
     * @inheritdoc IChainlinkAnyApiClient
     */
    function fulfill(bytes32 reqId, bytes calldata reqResponseData) external recordChainlinkFulfillment(reqId) {
        ChainlinkReq memory req = requests[reqId];
        emit RequestFulfilled(reqId, req.fulfillAddress, req.fulfillPrefixData, reqResponseData);
        IChainlinkAnyApiConsumer(req.fulfillAddress).fulfill(req.fulfillPrefixData, reqResponseData);
    }

    /**
     * @inheritdoc IChainlinkAnyApiClient
     */
    function withdrawLink(address to, uint256 amount) external onlyRole(WITHDRAW_ROLE) {
        LinkTokenInterface link = LinkTokenInterface(chainlinkTokenAddress());
        require(link.transfer(to, amount), "Unable to transfer");
    }
}
