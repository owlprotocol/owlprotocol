## ERC1820Registry

This contract is the official implementation of the ERC1820 Registry.
For more details, see https://eips.ethereum.org/EIPS/eip-1820

### INVALID_ID

```solidity
bytes4 INVALID_ID
```

ERC165 Invalid ID.

### ERC165ID

```solidity
bytes4 ERC165ID
```

Method ID for the ERC165 supportsInterface method (= `bytes4(keccak256('supportsInterface(bytes4)'))`).

### ERC1820_ACCEPT_MAGIC

```solidity
bytes32 ERC1820_ACCEPT_MAGIC
```

Magic value which is returned if a contract implements an interface on behalf of some other address.

### interfaces

```solidity
mapping(address => mapping(bytes32 => address)) interfaces
```

mapping from addresses and interface hashes to their implementers.

### managers

```solidity
mapping(address => address) managers
```

mapping from addresses to their manager.

### erc165Cached

```solidity
mapping(address => mapping(bytes4 => bool)) erc165Cached
```

flag for each address and erc165 interface to indicate if it is cached.

### InterfaceImplementerSet

```solidity
event InterfaceImplementerSet(address addr, bytes32 interfaceHash, address implementer)
```

Indicates a contract is the 'implementer' of 'interfaceHash' for 'addr'.

### ManagerChanged

```solidity
event ManagerChanged(address addr, address newManager)
```

Indicates 'newManager' is the address of the new manager for 'addr'.

### getInterfaceImplementer

```solidity
function getInterfaceImplementer(address _addr, bytes32 _interfaceHash) external view returns (address)
```

Query if an address implements an interface and through which contract.

| Name | Type | Description |
| ---- | ---- | ----------- |
| _addr | address | Address being queried for the implementer of an interface. (If '_addr' is the zero address then 'msg.sender' is assumed.) |
| _interfaceHash | bytes32 | Keccak256 hash of the name of the interface as a string. E.g., 'web3.utils.keccak256("ERC777TokensRecipient")' for the 'ERC777TokensRecipient' interface. |

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | address | The address of the contract which implements the interface '_interfaceHash' for '_addr' or '0' if '_addr' did not register an implementer for this interface. |

### setInterfaceImplementer

```solidity
function setInterfaceImplementer(address _addr, bytes32 _interfaceHash, address _implementer) external
```

Sets the contract which implements a specific interface for an address.
Only the manager defined for that address can set it.
(Each address is the manager for itself until it sets a new manager.)

| Name | Type | Description |
| ---- | ---- | ----------- |
| _addr | address | Address for which to set the interface. (If '_addr' is the zero address then 'msg.sender' is assumed.) |
| _interfaceHash | bytes32 | Keccak256 hash of the name of the interface as a string. E.g., 'web3.utils.keccak256("ERC777TokensRecipient")' for the 'ERC777TokensRecipient' interface. |
| _implementer | address | Contract address implementing '_interfaceHash' for '_addr'. |

### setManager

```solidity
function setManager(address _addr, address _newManager) external
```

Sets '_newManager' as manager for '_addr'.
The new manager will be able to call 'setInterfaceImplementer' for '_addr'.

| Name | Type | Description |
| ---- | ---- | ----------- |
| _addr | address | Address for which to set the new manager. |
| _newManager | address | Address of the new manager for 'addr'. (Pass '0x0' to reset the manager to '_addr'.) |

### getManager

```solidity
function getManager(address _addr) public view returns (address)
```

Get the manager of an address.

| Name | Type | Description |
| ---- | ---- | ----------- |
| _addr | address | Address for which to return the manager. |

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | address | Address of the manager for a given address. |

### interfaceHash

```solidity
function interfaceHash(string _interfaceName) external pure returns (bytes32)
```

Compute the keccak256 hash of an interface given its name.

| Name | Type | Description |
| ---- | ---- | ----------- |
| _interfaceName | string | Name of the interface. |

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | bytes32 | The keccak256 hash of an interface name. |

### updateERC165Cache

```solidity
function updateERC165Cache(address _contract, bytes4 _interfaceId) external
```

Updates the cache with whether the contract implements an ERC165 interface or not.

| Name | Type | Description |
| ---- | ---- | ----------- |
| _contract | address | Address of the contract for which to update the cache. |
| _interfaceId | bytes4 | ERC165 interface for which to update the cache. |

### implementsERC165Interface

```solidity
function implementsERC165Interface(address _contract, bytes4 _interfaceId) public view returns (bool)
```

| Name | Type | Description |
| ---- | ---- | ----------- |
| _contract | address | Address of the contract to check. |
| _interfaceId | bytes4 | ERC165 interface to check. |

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | bool | True if '_contract' implements '_interfaceId', false otherwise. |

### implementsERC165InterfaceNoCache

```solidity
function implementsERC165InterfaceNoCache(address _contract, bytes4 _interfaceId) public view returns (bool)
```

Checks whether a contract implements an ERC165 interface or not without using nor updating the cache.

| Name | Type | Description |
| ---- | ---- | ----------- |
| _contract | address | Address of the contract to check. |
| _interfaceId | bytes4 | ERC165 interface to check. |

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | bool | True if '_contract' implements '_interfaceId', false otherwise. |

### isERC165Interface

```solidity
function isERC165Interface(bytes32 _interfaceHash) internal pure returns (bool)
```

Checks whether the hash is a ERC165 interface (ending with 28 zeroes) or not.

| Name | Type | Description |
| ---- | ---- | ----------- |
| _interfaceHash | bytes32 | The hash to check. |

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | bool | True if '_interfaceHash' is an ERC165 interface (ending with 28 zeroes), false otherwise. |

### noThrowCall

```solidity
function noThrowCall(address _contract, bytes4 _interfaceId) internal view returns (uint256 success, uint256 result)
```

Make a call on a contract without throwing if the function does not exist.

