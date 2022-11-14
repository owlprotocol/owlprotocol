## MinterAutoId

Decentralized NFT Minter contract

Auto-incrementing NFT minter contracts. Every time `mint` or `safeMint` is
called, the NFT id is automatically generated and minted on the fly. Great
for end-users to interact with without requiring clients to monitor the
blockchain.

As all Minter contracts interact with existing NFTs, MinterCore expects two
standard functions exposed by the NFT:
- `mint(address to, uint256 tokenId)`
- `safeMint(address to, uint256 tokenId)`

Additionally, Minter contracts must have required permissions for minting. In
the case that you're using ERC721Owl, you'll do that with
[`ERC721Owl.grantMinter(...)`](./ERC721Owl#grantminter).

### ERC165TAG

```solidity
bytes4 ERC165TAG
```

### nextTokenId

```solidity
uint256 nextTokenId
```

### constructor

```solidity
constructor() public
```

### initialize

```solidity
function initialize(address _admin, address _mintFeeToken, address _mintFeeAddress, uint256 _mintFeeAmount, address _nftContractAddr, address _forwarder) external
```

This function is usually called through ERC1167Factory cloning and not directly.

MinterAutoId initialization parameters.

| Name | Type | Description |
| ---- | ---- | ----------- |
| _admin | address | user to grant admin privileges |
| _mintFeeToken | address | ERC20 token address to use for minting (ZeroAddress if none) |
| _mintFeeAddress | address | address to transfer minting payments to |
| _mintFeeAmount | uint256 | Number of tokens to charge users (0 if none) |
| _nftContractAddr | address | NFT address to mint |
| _forwarder | address | OpenGSN forwarder address to use |

### proxyInitialize

```solidity
function proxyInitialize(address _admin, address _mintFeeToken, address _mintFeeAddress, uint256 _mintFeeAmount, address _nftContractAddr, address _forwarder) external
```

This function is usually called through ERC1167Factory cloning and not directly.

MinterAutoId initialization parameters.

| Name | Type | Description |
| ---- | ---- | ----------- |
| _admin | address | user to grant admin privileges |
| _mintFeeToken | address | ERC20 token address to use for minting (ZeroAddress if none) |
| _mintFeeAddress | address | address to transfer minting payments to |
| _mintFeeAmount | uint256 | Number of tokens to charge users (0 if none) |
| _nftContractAddr | address | NFT address to mint |
| _forwarder | address | OpenGSN forwarder address to use |

### __MinterAutoId_init

```solidity
function __MinterAutoId_init(address _admin, address _mintFeeToken, address _mintFeeAddress, uint256 _mintFeeAmount, address _nftContractAddr, address _forwarder) internal
```

This function is never called directly.

MinterAutoId initialization parameters.

| Name | Type | Description |
| ---- | ---- | ----------- |
| _admin | address | user to grant admin privileges |
| _mintFeeToken | address | ERC20 token address to use for minting (ZeroAddress if none) |
| _mintFeeAddress | address | address to transfer minting payments to |
| _mintFeeAmount | uint256 | Number of tokens to charge users (0 if none) |
| _nftContractAddr | address | NFT address to mint |
| _forwarder | address | OpenGSN forwarder address to use |

### __MinterAutoId_init_unchained

```solidity
function __MinterAutoId_init_unchained() private
```

For future implementations.

### mint

```solidity
function mint(address buyer) public virtual returns (uint256)
```

Mint the next NFT at `nextTokenId`.

| Name | Type | Description |
| ---- | ---- | ----------- |
| buyer | address | user to pay for and send the NFT to |

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | uint256 | nextTokenId |

### safeMint

```solidity
function safeMint(address buyer) public virtual returns (uint256)
```

Mint the next NFT at `nextTokenId`.

| Name | Type | Description |
| ---- | ---- | ----------- |
| buyer | address | user to pay for and send the NFT to |

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | uint256 | nextTokenId |

### setNextTokenId

```solidity
function setNextTokenId(uint256 nextTokenId_) public
```

Used to set the starting nextTokenId value. Used to save situations
where someone mints directly and we get out of sync.

| Name | Type | Description |
| ---- | ---- | ----------- |
| nextTokenId_ | uint256 | next token id to be minted |

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

## IMinterAutoId

Decentralized NFT Minter contract

### mint

```solidity
function mint() external returns (uint256 nextTokenId)
```

Create a new type of species and define attributes.

### safeMint

```solidity
function safeMint() external returns (uint256 nextTokenId)
```

Create a new type of species and define attributes.

### setNextTokenId

```solidity
function setNextTokenId(uint256 nextTokenId_) external
```

Used to set the starting nextTokenId value.
Used to save situations where someone mints directly

