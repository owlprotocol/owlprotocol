## RouteRandomizer

### version

```solidity
string version
```

### ERC165TAG

```solidity
bytes4 ERC165TAG
```

### RouteElement

```solidity
struct RouteElement {
  uint256 epochBlock;
  bytes[] args;
}
```

### contracts

```solidity
address[] contracts
```

### signatures

```solidity
bytes[] signatures
```

### probabilities

```solidity
uint256[] probabilities
```

### vrfBeacon

```solidity
address vrfBeacon
```

### elements

```solidity
struct RouteRandomizer.RouteElement[] elements
```

### queueIndex

```solidity
uint256 queueIndex
```

### constructor

```solidity
constructor() public
```

### initialize

```solidity
function initialize(address _admin, address[] _contracts, bytes[] _signatures, uint8[] _probabilities, address _vrfBeacon, address _forwarder) external
```

Create RouteRandomizer instance

| Name | Type | Description |
| ---- | ---- | ----------- |
| _admin | address | the admin/owner of the contract |
| _contracts | address[] | array of contract addresses to route to, each instance is defined with unique recipe |
| _signatures | bytes[] | bytes array representing function signatures for each contract |
| _probabilities | uint8[] | array of cumulative proababilities associated with using a contract from contracts |
| _vrfBeacon | address |  |
| _forwarder | address | address for trusted forwarder for open GSN integration |

### proxyInitialize

```solidity
function proxyInitialize(address _admin, address[] _contracts, bytes[] _signatures, uint8[] _probabilities, address _vrfBeacon, address _forwarder) external
```

### __RouteRandomizer_init

```solidity
function __RouteRandomizer_init(address _admin, address[] _contracts, bytes[] _signatures, uint8[] _probabilities, address _vrfBeacon, address _forwarder) internal
```

### __RouteRandomizer_init_unchained

```solidity
function __RouteRandomizer_init_unchained(address[] _contracts, bytes[] _signatures, uint8[] _probabilities, address _vrfBeacon) internal
```

### requestRouteRandomize

```solidity
function requestRouteRandomize(bytes[] argsArr) external returns (uint256 requestId, uint256 blockNumber)
```

### checkUpkeep

```solidity
function checkUpkeep(bytes) external view returns (bool upkeepNeeded, bytes performData)
```

### performUpkeep

```solidity
function performUpkeep(bytes performData) external
```

method that is actually executed by the keepers, via the registry.
The data returned by the checkUpkeep simulation will be passed into
this method to actually be executed.

The input to this method should not be trusted, and the caller of the
method should not even be restricted to any single registry. Anyone should
be able call it, and the input should be validated, there is no guarantee
that the data passed in is the performData returned from checkUpkeep. This
could happen due to malicious keepers, racing keepers, or simply a state
change while the performUpkeep transaction is waiting for confirmation.
Always validate the data passed in.

| Name | Type | Description |
| ---- | ---- | ----------- |
| performData | bytes | is the data which was passed back from the checkData simulation. If it is encoded, it can easily be decoded into other types by calling `abi.decode`. This data should not be trusted, and should be validated against the contract's current state. |

### _routeRandomize

```solidity
function _routeRandomize(bytes[] argsArr, uint256 randomSeed) internal
```

### getRandomContract

```solidity
function getRandomContract(uint256 queueIndex, uint256 randomSeed) external view returns (uint256 selectedContract)
```

### getQueueIndex

```solidity
function getQueueIndex() public view returns (uint256)
```

### supportsInterface

```solidity
function supportsInterface(bytes4 interfaceId) public view virtual returns (bool)
```

ERC165 Support

| Name | Type | Description |
| ---- | ---- | ----------- |
| interfaceId | bytes4 | hash of the interface testing for |

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | bool | bool whether interface is supported |

