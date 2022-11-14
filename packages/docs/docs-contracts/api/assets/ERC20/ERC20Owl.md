## ERC20Mintable

### MINTER_ROLE

```solidity
bytes32 MINTER_ROLE
```

### URI_ROLE

```solidity
bytes32 URI_ROLE
```

### ERC165TAG

```solidity
bytes4 ERC165TAG
```

### constructor

```solidity
constructor() public
```

### initialize

```solidity
function initialize(address _admin, string _name, string _symbol, address _forwarder) external
```

### proxyInitialize

```solidity
function proxyInitialize(address _admin, string _name, string _symbol, address _forwarder) external
```

### __ERC20Mintable_init

```solidity
function __ERC20Mintable_init(address _admin, string _name, string _symbol, address _forwarder) internal
```

### __ERC20Mintable_init_unchained

```solidity
function __ERC20Mintable_init_unchained(address _admin, address _forwarder) internal
```

### grantMinter

```solidity
function grantMinter(address to) public
```

Must have DEFAULT_ADMIN_ROLE

Grants MINTER_ROLE to [`a(...)`](#a)

| Name | Type | Description |
| ---- | ---- | ----------- |
| to | address | address to |

### mint

```solidity
function mint(address to, uint256 amount) public
```

Must have MINTER_ROLE

Allows MINTER_ROLE to mint NFTs

| Name | Type | Description |
| ---- | ---- | ----------- |
| to | address | address to |
| amount | uint256 | amount to mint |

### _msgSender

```solidity
function _msgSender() internal view returns (address)
```

### _msgData

```solidity
function _msgData() internal view virtual returns (bytes)
```

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

