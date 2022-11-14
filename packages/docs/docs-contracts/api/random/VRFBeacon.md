## VRFBeacon

A contract that acts as a central beacon for fetching random numbers
from Chainlink VRF. Multiple requests within an `EPOCH_PERIOD` (as defined by
VRFBeacon deployer) will be coupled into one request to `VRFCoordiantorV2`.
An `EPOCH_PERIOD` is simply a block range.

Consumers of `VRFBeacon` will use the one random number as a seed to generate
another random number for the contract's own use case.

### Fulfilled

```solidity
event Fulfilled(uint256 requestId, uint256 randomNumber)
```

### Requested

```solidity
event Requested(uint256 requestId)
```

### COORDINATOR

```solidity
contract VRFCoordinatorV2Interface COORDINATOR
```

### keyHash

```solidity
bytes32 keyHash
```

### s_subscriptionId

```solidity
uint64 s_subscriptionId
```

### callbackGasLimit

```solidity
uint32 callbackGasLimit
```

### numWords

```solidity
uint32 numWords
```

### blockNumberToRequestId

```solidity
mapping(uint256 => uint256) blockNumberToRequestId
```

### requestIdToRandomness

```solidity
mapping(uint256 => uint256) requestIdToRandomness
```

### constructor

```solidity
constructor(uint64 _subscriptionId, address _vrf, bytes32 _keyHash, uint32 _callbackGasLimit, uint8 _epochPeriod) public
```

Constructor inherits VRFConsumerBase

### getRequestId

```solidity
function getRequestId(uint256 blockNumber) external view returns (uint256 requestId)
```

| Name | Type | Description |
| ---- | ---- | ----------- |
| blockNumber | uint256 | in which request was made |

| Name | Type | Description |
| ---- | ---- | ----------- |
| requestId | uint256 | of the EPOCH_PERIOD that `blockNumber` is in |

### getRandomness

```solidity
function getRandomness(uint256 blockNumber) external view returns (uint256 randomness)
```

| Name | Type | Description |
| ---- | ---- | ----------- |
| blockNumber | uint256 | in which request was made |

| Name | Type | Description |
| ---- | ---- | ----------- |
| randomness | uint256 | if not fulfilled yet returns 0 |

### requestRandomness

```solidity
function requestRandomness() public returns (uint256, uint256)
```

Requests randomness from a block hash

### fulfillRandomWords

```solidity
function fulfillRandomWords(uint256 requestId, uint256[] randomWords) internal
```

Callback function used by VRF Coordinator

