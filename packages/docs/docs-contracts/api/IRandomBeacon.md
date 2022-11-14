## IRandomBeacon

Random beacon interface

### Update

```solidity
event Update(uint256 blockNumber, uint256 value)
```

### EPOCH_PERIOD

```solidity
function EPOCH_PERIOD() external view returns (uint8)
```

### getRandomness

```solidity
function getRandomness(uint256 blockNumber) external view returns (uint256)
```

### epochBlockLatest

```solidity
function epochBlockLatest() external view returns (uint256)
```

### epochBlock

```solidity
function epochBlock(uint256 blockNumber) external view returns (uint256)
```

