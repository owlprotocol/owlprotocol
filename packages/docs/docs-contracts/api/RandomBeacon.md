## RandomBeacon

abstract contract for all randomnes-generating contracts to implement.
All randomness-generating contracts must implement `getRandomness(uint256)`

### EPOCH_PERIOD

```solidity
uint8 EPOCH_PERIOD
```

### constructor

```solidity
constructor(uint8 epochPeriod) internal
```

### getRandomness

```solidity
function getRandomness(uint256 blockNumber) external view virtual returns (uint256)
```

randomness will be generated in this function. Must be implemented
in child.

### epochBlockLatest

```solidity
function epochBlockLatest() public view returns (uint256 currEpochBlock)
```

| Name | Type | Description |
| ---- | ---- | ----------- |
| currEpochBlock | uint256 | when current block expires |

### epochBlock

```solidity
function epochBlock(uint256 blockNumber) public view returns (uint256)
```

Return when epoch expires. Eg. blockNumber=0-99, period=100 => 100

