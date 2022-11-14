## IBeacon

This is the interface that [`BeaconProxy`](./BeaconProxy) expects of its beacon.

### implementation

```solidity
function implementation() external view returns (address)
```

Must return an address that can be used as a delegate call target.

[`BeaconProxy`](./BeaconProxy) will check that this address is a contract.

