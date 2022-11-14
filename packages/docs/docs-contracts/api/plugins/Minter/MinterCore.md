## MinterCore

Decentralized NFT Minter contract

Core NFT functionality for all Minter contracts to inherit from.

As all Minter contracts interact with existing NFTs, MinterCore expects two
standard functions exposed by the NFT:
- `mint(address to, uint256 tokenId)`
- `safeMint(address to, uint256 tokenId)`

Additionally, Minter contracts must have required permissions for minting. In
the case that you're using ERC721Owl, you'll do that with
[`ERC721Owl.grantMinter(...)`](./ERC721Owl#grantminter).

### mintFeeToken

```solidity
address mintFeeToken
```

### mintFeeAddress

```solidity
address mintFeeAddress
```

### mintFeeAmount

```solidity
uint256 mintFeeAmount
```

### nftContractAddr

```solidity
address nftContractAddr
```

### __MinterCore_init

```solidity
function __MinterCore_init(address _admin, address _mintFeeToken, address _mintFeeAddress, uint256 _mintFeeAmount, address _nftContractAddr, address _forwarder) internal
```

This function is usually called through ERC1167Factory cloning and not directly.

MinterCore initialization parameters.

| Name | Type | Description |
| ---- | ---- | ----------- |
| _admin | address | user to grant admin privileges |
| _mintFeeToken | address | ERC20 token address to use for minting (ZeroAddress if none) |
| _mintFeeAddress | address | address to transfer minting payments to |
| _mintFeeAmount | uint256 | Number of tokens to charge users (0 if none) |
| _nftContractAddr | address | NFT address to mint |
| _forwarder | address | OpenGSN forwarder address to use |

### __MinterCore_init_unchained

```solidity
function __MinterCore_init_unchained(address _mintFeeToken, address _mintFeeAddress, uint256 _mintFeeAmount, address _nftContractAddr) private
```

This function is never called directly

MinterCore initialization parameters.

| Name | Type | Description |
| ---- | ---- | ----------- |
| _mintFeeToken | address | ERC20 token address to use for minting (ZeroAddress if none) |
| _mintFeeAddress | address | address to transfer minting payments to |
| _mintFeeAmount | uint256 | Number of tokens to charge users (0 if none) |
| _nftContractAddr | address | NFT address to mint |

### _mintForFee

```solidity
function _mintForFee(address buyer, uint256 tokenId) internal
```

Base minting function (not safeMint). Called by implementations.

| Name | Type | Description |
| ---- | ---- | ----------- |
| buyer | address | who's paying the ERC20 fee / gets the ERC721 token |
| tokenId | uint256 | the token id to mint |

### _safeMintForFee

```solidity
function _safeMintForFee(address buyer, uint256 tokenId) internal
```

Base minting function (safeMint). Called by implementations.

| Name | Type | Description |
| ---- | ---- | ----------- |
| buyer | address | who's paying the ERC20 fee / gets the ERC721 token |
| tokenId | uint256 | the token id to mint |

### __gap

```solidity
uint256[46] __gap
```

