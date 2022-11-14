## FactoryERC721

**INTERNAL TOOL**
Used to factory ERC721 NFTs for unit testing

### lastTokenId

```solidity
uint256 lastTokenId
```

### constructor

```solidity
constructor(string nftName, string nftSymbol) public
```

Creates ERC721 token

| Name | Type | Description |
| ---- | ---- | ----------- |
| nftName | string | name used to identify nft |
| nftSymbol | string | ticker used to identify nft |

### mintTokens

```solidity
function mintTokens(uint256 count) public
```

Creates and gives a token to whoever calls the method

| Name | Type | Description |
| ---- | ---- | ----------- |
| count | uint256 | number of tokens to generate and give |

### mint

```solidity
function mint(address to, uint256 tokenId) public
```

Mints a token and assigns it to `to`.
doesn't require permissions.

| Name | Type | Description |
| ---- | ---- | ----------- |
| to | address | add |
| tokenId | uint256 | token |

### safeMint

```solidity
function safeMint(address to, uint256 tokenId) public
```

Mints a token and assigns it to `to`.
doesn't require permissions.

| Name | Type | Description |
| ---- | ---- | ----------- |
| to | address | add |
| tokenId | uint256 | token |

### exists

```solidity
function exists(uint256 tokenId) external view returns (bool)
```

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

