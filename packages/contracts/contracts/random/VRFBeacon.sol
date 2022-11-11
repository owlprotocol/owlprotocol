// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import '@chainlink/contracts/src/v0.8/interfaces/LinkTokenInterface.sol';
import '@chainlink/contracts/src/v0.8/interfaces/VRFCoordinatorV2Interface.sol';
import '@chainlink/contracts/src/v0.8/VRFConsumerBaseV2.sol';

import './RandomBeacon.sol';

/**
 * @dev A contract that acts as a central beacon for fetching random numbers
 * from Chainlink VRF. Multiple requests within an `EPOCH_PERIOD` (as defined by
 * VRFBeacon deployer) will be coupled into one request to `VRFCoordiantorV2`.
 * An `EPOCH_PERIOD` is simply a block range.
 *
 * Consumers of `VRFBeacon` will use the one random number as a seed to generate
 * another random number for the contract's own use case.
 */
contract VRFBeacon is VRFConsumerBaseV2, RandomBeacon {
    /**********************
             Events
    **********************/

    event Fulfilled(uint256 indexed requestId, uint256 indexed randomNumber);
    event Requested(uint256 indexed requestId);

    /**********************
             Storage
    **********************/

    VRFCoordinatorV2Interface COORDINATOR;
    bytes32 internal keyHash;

    uint64 s_subscriptionId;
    uint32 callbackGasLimit;
    uint32 numWords = 1;

    // Mapping from blockNumber to requestId
    mapping(uint256 => uint256) public blockNumberToRequestId;

    // Mapping from requestId to random number (0 if not fulfilled yet)
    mapping(uint256 => uint256) public requestIdToRandomness;

    /**
     * @dev Constructor inherits VRFConsumerBase
     */
    constructor(
        uint64 _subscriptionId,
        address _vrf,
        bytes32 _keyHash,
        uint32 _callbackGasLimit,
        uint8 _epochPeriod
    ) VRFConsumerBaseV2(_vrf) RandomBeacon(_epochPeriod) {
        require(_epochPeriod < 100 && _epochPeriod > 3, 'VRFBeacon: invalid number for _epoch period');

        s_subscriptionId = _subscriptionId;
        COORDINATOR = VRFCoordinatorV2Interface(_vrf);
        keyHash = _keyHash;
        callbackGasLimit = _callbackGasLimit;
        EPOCH_PERIOD = _epochPeriod;
    }

    /**
     * @param blockNumber in which request was made
     * @return requestId of the EPOCH_PERIOD that `blockNumber` is in
     */
    function getRequestId(uint256 blockNumber) external view returns (uint256 requestId) {
        requestId = blockNumberToRequestId[getEpochBlock(blockNumber)];
    }

    /**
     * @param blockNumber in which request was made
     * @return randomness if not fulfilled yet returns 0
     */
    function getRandomness(uint256 blockNumber) external view override returns (uint256 randomness) {
        randomness = requestIdToRandomness[blockNumberToRequestId[getEpochBlock(blockNumber)]];
    }

    /**
     * @dev Requests randomness from a block hash
     */
    function requestRandomness() public returns (uint256, uint256) {
        uint256 epochBlockNumber = block.number - (block.number % EPOCH_PERIOD);

        uint256 currRequestId = blockNumberToRequestId[epochBlockNumber];
        if (currRequestId != 0) return (currRequestId, epochBlockNumber);

        uint16 reqConf = uint16(currEpochExpires() - block.number);

        uint256 requestId = COORDINATOR.requestRandomWords(
            keyHash,
            s_subscriptionId,
            // If reqConf is lower than 3, submit 3.
            // If reqConf is higher than 200, submit 200.
            // Otherwise, submit reqConf
            reqConf < 3 ? 3 : reqConf > 200 ? 200 : reqConf,
            callbackGasLimit,
            numWords
        );
        blockNumberToRequestId[epochBlockNumber] = requestId;

        return (requestId, epochBlockNumber);
    }

    /**
     * @dev Callback function used by VRF Coordinator
     */
    function fulfillRandomWords(uint256 requestId, uint256[] memory randomWords) internal override {
        requestIdToRandomness[requestId] = randomWords[0];

        emit Fulfilled(requestId, randomWords[0]);
    }
}
