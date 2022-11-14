## MinterRandom

Decentralized NFT Minter contract

Id-randomizing NFT minter contracts. Every time `mint` or `safeMint` is
called, the NFT id is randomly generated and minted on the fly. Great
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

### _numMinted

```solidity
uint256 _numMinted
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

### __MinterRandom_init

```solidity
function __MinterRandom_init(address _admin, address _mintFeeToken, address _mintFeeAddress, uint256 _mintFeeAmount, address _nftContractAddr, address _forwarder) internal
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

### __MinterRandom_init_unchained

```solidity
function __MinterRandom_init_unchained() internal
```

To be implemented in the future.

### mint

```solidity
function mint(address buyer) public
```

Mint a new species with random id.

| Name | Type | Description |
| ---- | ---- | ----------- |
| buyer | address | address of the buyer |

### safeMint

```solidity
function safeMint(address buyer) public
```

Mint a new species with random id.

| Name | Type | Description |
| ---- | ---- | ----------- |
| buyer | address | address of the buyer |

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

## IMinterRandom

### mint

```solidity
function mint(address buyer) external
```

Create a new type of species and define attributes.

### safeMint

```solidity
function safeMint(address buyer) external
```

Create a new type of species and define attributes.

