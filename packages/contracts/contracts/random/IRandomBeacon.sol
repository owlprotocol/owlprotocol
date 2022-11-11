// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

/**
 @dev Random beacon interface
 */
interface IRandomBeacon {
    event Update(uint256 blockNumber, uint256 value);

    function EPOCH_PERIOD() external view returns (uint8);

    function getRandomness(uint256 blockNumber) external view returns (uint256);

    function currEpochBlock() external view returns (uint256);

    function getEpochBlock(uint256 blockNumber) external view returns (uint256);

    function currEpochExpires() external view returns (uint256);

    function getEpochExpires(uint256 blockNumber) external view returns (uint256);

    function requestRandomness() external returns (uint256, uint256);
}
