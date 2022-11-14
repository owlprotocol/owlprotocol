## OwlBase

Base for all OwlProtocol contracts

Implements several required mechanisms for all OwlProtocol contracts to
utilize:
- OpenGSN support (gasless transactions)
- Consistent contract versioning
- Consistent access control
- UUPS contract upgrade support

### ROUTER_ROLE

```solidity
bytes32 ROUTER_ROLE
```

### _version

```solidity
string _version
```

### ERC165TAG

```solidity
bytes4 ERC165TAG
```

### __OwlBase_init

```solidity
function __OwlBase_init(address _admin, address _forwarder) internal
```

OwlBase required initialization

| Name | Type | Description |
| ---- | ---- | ----------- |
| _admin | address | address to assign owner rights |
| _forwarder | address | OpenGSN forwarder address (if desired). |

### __OwlBase_init_unchained

```solidity
function __OwlBase_init_unchained(address _admin, address _forwarder) internal
```

OwlBase unchained initialization.
For future implementation.

### grantRouter

```solidity
function grantRouter(address to) public
```

Must have owner role

Grants ROUTER_ROLE to [`to(...)`](#to)

| Name | Type | Description |
| ---- | ---- | ----------- |
| to | address | address to |

### _authorizeUpgrade

```solidity
function _authorizeUpgrade(address newImplementation) internal
```

Only callable by admins

UUPS function to authorize upgrades

| Name | Type | Description |
| ---- | ---- | ----------- |
| newImplementation | address | newImplementation |

### getImplementation

```solidity
function getImplementation() external view returns (address)
```

Returns the implementation address.

### _msgSender

```solidity
function _msgSender() internal view virtual returns (address ret)
```

the following 3 functions are all required for OpenGSN integration

Support for meta transactions

| Name | Type | Description |
| ---- | ---- | ----------- |
| ret | address | either msg.sender or user who called transaction through a relayer |

### _msgData

```solidity
function _msgData() internal view virtual returns (bytes)
```

Support for meta transactions

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | bytes | msgData from either msg.sender or from user who called through relayer |

### versionRecipient

```solidity
function versionRecipient() external pure virtual returns (string)
```

Returns OpenGSN contract version (used for compatibility checks)

### version

```solidity
function version() external pure virtual returns (string)
```

OwlProtocol contract version. Used to determine compatibility
interoperable with other Owl contracts.

### isTrustedForwarder

```solidity
function isTrustedForwarder(address forwarder) public view returns (bool)
```

Determine is an address a GSN trusted forwarder.

| Name | Type | Description |
| ---- | ---- | ----------- |
| forwarder | address | address to query |

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | bool | OpenGSN trusted forwarder status |

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

