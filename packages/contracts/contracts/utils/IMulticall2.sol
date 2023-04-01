//SPDX-License-Identifier: MIT
//https://github.com/makerdao/multicall/blob/master/src/Multicall2.sol
pragma solidity >=0.5.0;
pragma experimental ABIEncoderV2;

interface IMulticall2 {
    struct Call {
        address target;
        bytes callData;
    }

    function aggregate(Call[] memory calls) external returns (uint256 blockNumber, bytes[] memory returnData);
    function getBlockHash(uint256 blockNumber) external view returns (bytes32 blockHash) ;
    function getBlockNumber() external view returns (uint256 blockNumber);
    function getCurrentBlockCoinbase() external view returns (address coinbase) ;
    function getCurrentBlockDifficulty() external view returns (uint256 difficulty);
    function getCurrentBlockGasLimit() external view returns (uint256 gaslimit) ;
    function getCurrentBlockTimestamp() external view returns (uint256 timestamp) ;
    function getEthBalance(address addr) external view returns (uint256 balance);
    function getLastBlockHash() external view returns (bytes32 blockHash);
}
