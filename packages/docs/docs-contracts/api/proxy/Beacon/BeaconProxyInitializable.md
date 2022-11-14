## BeaconProxyInitializable

This contract implements a proxy that gets the implementation address for each call from an [`UpgradeableBeacon`](./UpgradeableBeacon).

The beacon address is stored in storage slot `uint256(keccak256('eip1967.proxy.beacon')) - 1`, so that it doesn't
conflict with the storage layout of the implementation behind the proxy.

_Available since v3.4._

### constructor

```solidity
constructor() public payable
```

Initializes the proxy with `beacon`.

If `data` is nonempty, it's used as data in a delegate call to the implementation returned by the beacon. This
will typically be an encoded function call, and allows initializing the storage of the proxy like a Solidity
constructor.

Requirements:

- `beacon` must be a contract with the interface [`IBeacon`](./IBeacon).

### initialize

```solidity
function initialize(address _admin, address beacon, bytes data) public payable
```

### _beacon

```solidity
function _beacon() internal view virtual returns (address)
```

Returns the current beacon address.

### beacon

```solidity
function beacon() external view virtual returns (address)
```

### _implementation

```solidity
function _implementation() internal view virtual returns (address)
```

Returns the current implementation address of the associated beacon.

### _setBeacon

```solidity
function _setBeacon(address beacon, bytes data) internal virtual
```

Changes the proxy to use a new beacon. Deprecated: see [`_upgradeBeaconToAndCall(...)`](#_upgradebeacontoandcall).

If `data` is nonempty, it's used as data in a delegate call to the implementation returned by the beacon.

Requirements:

- `beacon` must be a contract.
- The implementation returned by `beacon` must be a contract.

### setBeacon

```solidity
function setBeacon(address beacon, bytes data) external
```

