## Lootbox

Contract module that enables implementation of unlockable lootboxes by
routing unlock requests to a number of deployed Crafter contracts. By
configuring multiple Crafter contracts that take in the lootbox (typically
some ERC721 token) as their sole input and each have different output asset
bundles, a developer can route the output of a certain lootbox to a myriad of
possible output bundles, effectively designating the inputted token as a
lootbox.

Configuration for Crafter contracts is designated by two [`Ingredient`](./Ingredient)[]. One
array is the `inputs` and the other is the `outputs`. The contract allows for
the `inputs` to be redeemed for the `outputs`, `craftableAmount` times.

```
struct Ingredient {
    TokenType token;
    ConsumableType consumableType;
    address contractAddr;
    uint256[] amounts;
    uint256[] tokenIds;
}
```

Configuration is set in the initializers and cannot be edited once the
contract has been launched Other configurations will require their own
contract to be deployed

However, `craftableAmount` can be dynamically updated through the [`deposit(...)`](#deposit)
and [`withdraw(...)`](#withdraw) functions which are only accessible to `DEFAULT_ADMIN_ROLE`

Each Ingredient has a `consumableType` field.* This field is for the `inputs`
elements and ignored by the `outputs` elements. ERC20 and ERC1155 `inputs`
elements can be `unaffected` or `burned`. `unaffected` will check for
ownership/balance while `burned` will send the asset(s) to the `burnAddress`.
ERC721 inputs can be `NTime` or `burned`. `NTime` allows for a specfic
`tokenId` to only be used 'n times', as defined by contract deployer.

ERC20 `inputs` and `outputs` elements should have one number in the `amounts`
array denoting ERC20 token amount requirement.`tokenIds` should be empty.
NTime consumable type ERC721 inputs should have empty `tokenIds` and
`amounts[0]` equal to `n` - the maximum number of times the input can be
used. Burned ERC721 `inputs` elements should have empty `amounts` and
`tokenIds` array. This contract accepts *all* `tokenId`s from an ERC721
contract as inputs. ERC721 `outputs` elements must have empty `amounts`
array. `tokenIds` array length should be `craftableAmount`. The `tokenIds`
array will contain the `tokenIds` to be transferred out when [`craft(...)`](#craft) is
called. Important to note that output transfers will be from the *end* of the
array since `.pop()` is used.

ERC1155 `inputs` and `outputs` elements should have the length of `amounts`
and `tokenIds` array be the same. The indices will be linked where each index
denotes how much of each ERC1155 `tokenId` is required.

This module is used through composition. It can be deployed to create
crafting logic with asset contracts that are already on chain and active;
plug-and-play, so to speak.

Configuration for a lootbox requires the developer enter `_crafterContracts`,
an address array of deployed Crafter contracts that makes up the pool of
potential contracts routed to.* The `probabilities` array must be of the same
length, as it describes the probability distribution of the random variable
that determines a randomly chosen contract.

A VRFBeacon is deployed and used to inject randomness, while a Chainlink
Keeper is used to autonomously check if a random number has been returned by
the off-chain VRFBeacon coordinator. Upon receiving a random number, the
Keeper then calls the _unlock() function to randomly select a Crafter
contract and call its `craft()` function.

### ERC165TAG

```solidity
bytes4 ERC165TAG
```

### crafterContracts

```solidity
address[] crafterContracts
```

### probabilities

```solidity
uint256[] probabilities
```

### vrfBeacon

```solidity
address vrfBeacon
```

### lootboxIdToEpochBlock

```solidity
mapping(uint256 => uint256) lootboxIdToEpochBlock
```

### queueIndex

```solidity
uint256 queueIndex
```

### upkeepQueue

```solidity
uint256[] upkeepQueue
```

### constructor

```solidity
constructor() public
```

### initialize

```solidity
function initialize(address _admin, address[] _crafterContracts, uint8[] _probabilities, address _vrfBeacon, address _forwarder) external
```

Create Lootbox instance

| Name | Type | Description |
| ---- | ---- | ----------- |
| _admin | address | the admin/owner of the contract |
| _crafterContracts | address[] | array of crafterContract address, each with unique recipe |
| _probabilities | uint8[] | array of cumulative probabilities associated with using a contract from crafterContracts |
| _vrfBeacon | address |  |
| _forwarder | address | address for trusted forwarder for open GSN integration |

### proxyInitialize

```solidity
function proxyInitialize(address _admin, address[] _crafterContracts, uint8[] _probabilities, address _vrfBeacon, address _forwarder) external
```

Initializes contract through beacon proxy (replaces constructor in proxy pattern)

### __Lootbox_init

```solidity
function __Lootbox_init(address _admin, address[] _crafterContracts, uint8[] _probabilities, address _vrfBeacon, address _forwarder) internal
```

performs validations that `_inputs`  are valid and creates the
configuration

### __Lootbox_init_unchained

```solidity
function __Lootbox_init_unchained(address[] _crafterContracts, uint8[] _probabilities, address _vrfBeacon) internal
```

performs validations that `_inputs` and `_outputs` are valid and
creates the configuration

### requestUnlock

```solidity
function requestUnlock(uint256 lootboxId) external returns (uint256 requestId, uint256 epochBlockNumber)
```

Makes a request for random number from VRFBeacon, adds unlock
request to queue - specific to lootbox token id

| Name | Type | Description |
| ---- | ---- | ----------- |
| lootboxId | uint256 | the token ID of the lootbox asset to be unlocked |

| Name | Type | Description |
| ---- | ---- | ----------- |
| requestId | uint256 | the id given to the request by the VRFBeacon |
| epochBlockNumber | uint256 | the epoch block number at the time request is made |

### checkUpkeep

```solidity
function checkUpkeep(bytes) external view returns (bool upkeepNeeded, bytes performData)
```

Run by Chainlink Keeper to check whether random number has been returned by VRFBeacon

| Name | Type | Description |
| ---- | ---- | ----------- |
| upkeepNeeded | bool | whether a random number has been returned |
| performData | bytes | encoding of random number and queue index |

### performUpkeep

```solidity
function performUpkeep(bytes performData) external
```

Run by Chainlink Keeper to perform unlock on a lootbox id requiring upkeep

| Name | Type | Description |
| ---- | ---- | ----------- |
| performData | bytes | encoding of random number and queue index via checkUpkeep |

### _unlock

```solidity
function _unlock(uint256 lootboxId, uint256 randomSeed) internal
```

Internal function called by performUpkeep() to call randomly-selected Crafter contract

| Name | Type | Description |
| ---- | ---- | ----------- |
| lootboxId | uint256 | the id of the lootbox to unlock |
| randomSeed | uint256 | the random seed generated by the VRFBeacon to be used to source a random number |

### getEpochBlock

```solidity
function getEpochBlock(uint256 lootboxId) public view returns (uint256)
```

Used for testing only

Returns epoch block during which requestUnlock was called on a lootbox ID

| Name | Type | Description |
| ---- | ---- | ----------- |
| lootboxId | uint256 | the ID of the lootbox to unlock |

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | uint256 | uint256 the epoch block corresponding to lootboxId |

### getRandomContract

```solidity
function getRandomContract(uint256 lootboxId, uint256 randomSeed) external view returns (uint256 selectedContract)
```

Used for testing only

Returns the randomly selected contract from the contracts array

| Name | Type | Description |
| ---- | ---- | ----------- |
| lootboxId | uint256 | the ID of the lootbox to unlock, used as nonce in random number generation |
| randomSeed | uint256 | the random seed taken from checkUpkeep |

| Name | Type | Description |
| ---- | ---- | ----------- |
| selectedContract | uint256 | the randomly selected contract's index in contracts array |

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

