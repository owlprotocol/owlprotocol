## MinterCore

Decentralized NFT Minter contract

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

### __MinterCore_init_unchained

```solidity
function __MinterCore_init_unchained(address _mintFeeToken, address _mintFeeAddress, uint256 _mintFeeAmount, address _nftContractAddr) internal
```

### _mintForFee

```solidity
function _mintForFee(address buyer, uint256 tokenId) internal
```

Base minting function (not safeMint). Called
by implementation contracts.

| Name | Type | Description |
| ---- | ---- | ----------- |
| buyer | address | who's paying the ERC20 fee / gets the ERC721 token |
| tokenId | uint256 | the token identifier to mint |

### _safeMintForFee

```solidity
function _safeMintForFee(address buyer, uint256 tokenId) internal
```

Base minting function (safeMint). Called
by implementation contracts.

| Name | Type | Description |
| ---- | ---- | ----------- |
| buyer | address | who's paying the ERC20 fee / gets the ERC721 token |
| tokenId | uint256 | the token identifier to mint |

### __gap

```solidity
uint256[46] __gap
```

