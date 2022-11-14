## ERC1820ImplementerAuthorizeAll

Implementation of the {IERC1820Implementer} interface.

Contracts may inherit from this and call {_registerInterfaceForAddress} to
declare their willingness to be implementers.

Any accounts requesting to add this to the registry will be approved.

{IERC1820Registry-setInterfaceImplementer} should then be called for the
registration to be complete.

### _ERC1820_ACCEPT_MAGIC

```solidity
bytes32 _ERC1820_ACCEPT_MAGIC
```

### _supportedInterfaces

```solidity
mapping(bytes32 => bool) _supportedInterfaces
```

### canImplementInterfaceForAddress

```solidity
function canImplementInterfaceForAddress(bytes32 interfaceHash, address) public view virtual returns (bytes32)
```

See {IERC1820Implementer-canImplementInterfaceForAddress}.

### _registerInterfaceForAddress

```solidity
function _registerInterfaceForAddress(bytes32 interfaceHash) internal virtual
```

Declares the contract as willing to be an implementer of
`interfaceHash` for `account`.

See {IERC1820Registry-setInterfaceImplementer} and
{IERC1820Registry-interfaceHash}.

