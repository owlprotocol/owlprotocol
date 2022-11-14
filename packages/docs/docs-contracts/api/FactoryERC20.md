## FactoryERC20

**INTERNAL TOOL**
Used to factory ERC20 coins for unit testing

### constructor

```solidity
constructor(uint256 mintAmount, string coinName, string coinTicker) public
```

Creates ERC20 token

| Name | Type | Description |
| ---- | ---- | ----------- |
| mintAmount | uint256 | how much should be minted and given to `msg.sender`. Pass `mintAmount=0` to create `1_000_000_000_000_000_000_000_000_000` coins. |
| coinName | string | name used to identify coin |
| coinTicker | string | ticker used to identify coin |

### setTrustedForwarder

```solidity
function setTrustedForwarder(address forwarder) public
```

### _msgSender

```solidity
function _msgSender() internal view returns (address sender)
```

the following 3 functions are all required for OpenGSN integration

### _msgData

```solidity
function _msgData() internal view returns (bytes)
```

### versionRecipient

```solidity
function versionRecipient() external pure returns (string)
```

### mint

```solidity
function mint(address to, uint256 amount) external
```

