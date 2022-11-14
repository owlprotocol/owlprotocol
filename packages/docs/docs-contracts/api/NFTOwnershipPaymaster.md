## NFTOwnershipPaymaster

This paymaster will approve transactions sent through a relay provider
if the client owns an approved ERC721 token in a collection. The paymaster
takes in an address of a collection of acceptable tokenIds that a client
can own to be able to complete a gasless transaction. A mapping also keeps
track of how many times a specific tokenId is used to get approved, and there
is a limit on how many times each tokenId can be used.

### PreRelayed

```solidity
event PreRelayed()
```

### PostRelayed

```solidity
event PostRelayed()
```

### acceptableToken

```solidity
contract IERC721Upgradeable acceptableToken
```

### payer

```solidity
address payer
```

### limit

```solidity
uint256 limit
```

### numTimes

```solidity
mapping(uint256 => uint256) numTimes
```

### constructor

```solidity
constructor() public
```

### initialize

```solidity
function initialize(address _admin, address _acceptableToken, uint256 _limit, address _forwarder) external
```

initializes a paymaster contract

| Name | Type | Description |
| ---- | ---- | ----------- |
| _admin | address | admin of the paymaster |
| _acceptableToken | address | address for acceptable token contract for approving transactions |
| _limit | uint256 | the maximum number of times a tokenId can be used to approve a transaction |
| _forwarder | address | address for the trusted forwarder for open GSN |

### proxyinitialize

```solidity
function proxyinitialize(address _admin, address _acceptableToken, uint256 _limit, address _forwarder) external
```

### __NFTOwnershipPaymaster_init

```solidity
function __NFTOwnershipPaymaster_init(address _admin, address _acceptableToken, uint256 _limit, address _forwarder) internal
```

### __NFTOwnershipPaymaster_init_unchained

```solidity
function __NFTOwnershipPaymaster_init_unchained(address _acceptableToken, uint256 _limit) internal
```

### getNumTransactions

```solidity
function getNumTransactions(uint256 tokenId) external view returns (uint256)
```

function that returns the number of times a tokenId has been used
for approving a transaction

### preRelayedCall

```solidity
function preRelayedCall(struct GsnTypes.RelayRequest relayRequest, bytes signature, bytes approvalData, uint256 maxPossibleGas) external virtual returns (bytes context, bool revertOnRecipientRevert)
```

function that performs all access control. It verifies that
the client owns an acceptable token in the approved collection.
it also ensures that the tokenId usage has not reached it's limit

### postRelayedCall

```solidity
function postRelayedCall(bytes context, bool success, uint256 gasUseWithoutPost, struct GsnTypes.RelayData relayData) external virtual
```

function that performs all bookkeeping after a function call
has been made.

### versionPaymaster

```solidity
function versionPaymaster() external view virtual returns (string)
```

function that is required for open GSN paymasters

