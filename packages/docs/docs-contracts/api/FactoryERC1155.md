## FactoryERC1155

**INTERNAL TOOL**
Used to factory ERC721 NFTs for unit testing

### lastTokenId

```solidity
uint256 lastTokenId
```

### defaultTokenMint

```solidity
uint256 defaultTokenMint
```

### constructor

```solidity
constructor(string uri, uint256[] initialMint) public
```

Creates ERC721 token

| Name | Type | Description |
| ---- | ---- | ----------- |
| uri | string | associate |
| initialMint | uint256[] |  |

### mintTokens

```solidity
function mintTokens(uint256[] amounts) public
```

Creates and gives a token to whoever calls the method

| Name | Type | Description |
| ---- | ---- | ----------- |
| amounts | uint256[] | array of token amounts to mint for each tokenID |

### mint

```solidity
function mint(address to, uint256 tokenId, uint256 amount) public
```

Mints a token and assigns it to `to`.
doesn't require permissions.

| Name | Type | Description |
| ---- | ---- | ----------- |
| to | address | add |
| tokenId | uint256 | token |
| amount | uint256 |  |

### mintBatch

```solidity
function mintBatch(address to, uint256[] ids, uint256[] amounts, bytes data) public
```

Must have MINTER_ROLE

Allows caller to mint NFTs (safeMint)

| Name | Type | Description |
| ---- | ---- | ----------- |
| to | address | address to |
| ids | uint256[] | id values |
| amounts | uint256[] | to mint |
| data | bytes | for hooks |

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

