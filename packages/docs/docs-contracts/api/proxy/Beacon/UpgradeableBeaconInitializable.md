## UpgradeableBeaconInitializable

This contract is used in conjunction with one or more instances of [`BeaconProxy`](./BeaconProxy) to determine their
implementation contract, which is where they will delegate all function calls.

An owner is able to change the implementation the beacon points to, thus upgrading the proxies that use this beacon.

### _implementation

```solidity
address _implementation
```

### Upgraded

```solidity
event Upgraded(address implementation)
```

Emitted when the implementation returned by the beacon is changed.

### constructor

```solidity
constructor() public
```

Sets the address of the initial implementation, and the deployer account as the owner who can upgrade the
beacon.

### initialize

```solidity
function initialize(address _admin, address implementation_) public
```

### implementation

```solidity
function implementation() public view virtual returns (address)
```

Returns the current implementation address.

### upgradeTo

```solidity
function upgradeTo(address newImplementation) public virtual
```

Upgrades the beacon to a new implementation.

Emits an [`Upgraded`](./Upgraded) event.

Requirements:

- msg.sender must be the owner of the contract.
- `newImplementation` must be a contract.

### _setImplementation

```solidity
function _setImplementation(address newImplementation) private
```

Sets the implementation contract address for this beacon

Requirements:

- `newImplementation` must be a contract.

