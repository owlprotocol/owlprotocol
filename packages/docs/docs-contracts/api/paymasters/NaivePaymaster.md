## NaivePaymaster

This paymaster will approve transactions sent through a relay provider
by the target contracts that are updated in the 'targets' mapping. This
mapping maps an address to a boolean to indicate whether or not the address
can be approved or not for gasless transactions
https://docs.opengsn.org/tutorials/integration.html#creating_a_paymaster

### targets

```solidity
mapping(address => bool) targets
```

### TargetSet

```solidity
event TargetSet(address target)
```

### constructor

```solidity
constructor() public
```

### initialize

```solidity
function initialize(address _admin, address _target, address _forwarder) external
```

initializes a paymaster contract

| Name | Type | Description |
| ---- | ---- | ----------- |
| _admin | address | admin of the paymaster |
| _target | address | the target address that should be approved for gasless transactions |
| _forwarder | address | address for the trusted forwarder for open GSN |

### proxyinitialize

```solidity
function proxyinitialize(address _admin, address _target, address _forwarder) external
```

### __NaivePaymaster_init

```solidity
function __NaivePaymaster_init(address _admin, address _target, address _forwarder) internal
```

### __NaivePaymaster_init_unchained

```solidity
function __NaivePaymaster_init_unchained(address _target) internal
```

### setTarget

```solidity
function setTarget(address target) external
```

updates the mapping of target addresses to approve
the passed in address

### removeTarget

```solidity
function removeTarget(address target) external
```

updates the mapping of target addresses to disapprove
the passed in address

### PreRelayed

```solidity
event PreRelayed(uint256)
```

### PostRelayed

```solidity
event PostRelayed(uint256)
```

### preRelayedCall

```solidity
function preRelayedCall(struct GsnTypes.RelayRequest relayRequest, bytes signature, bytes approvalData, uint256 maxPossibleGas) external virtual returns (bytes context, bool)
```

function that performs all access control. It verifies that
the relay request passes in an address that has been set as a
target address and is approved for a gasless transaction

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

