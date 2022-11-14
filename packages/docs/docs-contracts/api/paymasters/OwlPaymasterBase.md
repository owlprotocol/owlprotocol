## OwlPaymasterBase

this abstract contract is the base for all Owl Paymasters.
It inherits from BasePaymaster implemented by Open GSN and it
also inherits from OwlBase to allow for creating Beacon proxies
and instances.

### _msgSender

```solidity
function _msgSender() internal view virtual returns (address ret)
```

### _msgData

```solidity
function _msgData() internal view virtual returns (bytes)
```

