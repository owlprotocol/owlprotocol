## ERC1167Factory

ERC1167 Minimal Proxy Factory

### NewClone

```solidity
event NewClone(address instance, address implementation, bytes32 salt)
```

### clone

```solidity
function clone(address implementation, bytes data) public returns (address instance)
```

### cloneDeterministic

```solidity
function cloneDeterministic(address implementation, bytes32 salt, bytes data) public returns (address instance)
```

### predictDeterministicAddress

```solidity
function predictDeterministicAddress(address implementation, bytes32 salt, bytes data) public view returns (address predicted)
```

