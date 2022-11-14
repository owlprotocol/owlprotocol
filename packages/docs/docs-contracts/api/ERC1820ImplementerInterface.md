## ERC1820ImplementerInterface

The interface a contract MUST implement if it is the implementer of
some (other) interface for any address other than itself.

### canImplementInterfaceForAddress

```solidity
function canImplementInterfaceForAddress(bytes32 interfaceHash, address addr) external view returns (bytes32)
```

Indicates whether the contract implements the interface 'interfaceHash' for the address 'addr' or not.

| Name | Type | Description |
| ---- | ---- | ----------- |
| interfaceHash | bytes32 | keccak256 hash of the name of the interface |
| addr | address | Address for which the contract will implement the interface |

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | bytes32 | ERC1820_ACCEPT_MAGIC only if the contract implements 'interfaceHash' for the address 'addr'. |

