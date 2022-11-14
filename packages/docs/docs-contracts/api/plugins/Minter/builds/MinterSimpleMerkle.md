## MinterSimpleMerkle

Decentralized NFT Minter contract

Simple Minter contract to expose `mint` functionality behind an optional
ERC20 payment and a MerkleTree allowlist.

TODO - mint IPFS-MERKLE library

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

### merkleRoot

```solidity
bytes32 merkleRoot
```

### uri

```solidity
string uri
```

### SetMerkleRoot

```solidity
event SetMerkleRoot(bytes32 merkleRoot)
```

### initialize

```solidity
function initialize(address _admin, address _mintFeeToken, address _mintFeeAddress, uint256 _mintFeeAmount, address _nftContractAddr, bytes32 _merkleRoot, string _uri, address _forwarder) external
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
| _merkleRoot | bytes32 | Merkle root of the allowlist |
| _uri | string | identifier for generating merkle proofs |
| _forwarder | address | OpenGSN forwarder address to use |

### proxyInitialize

```solidity
function proxyInitialize(address _admin, address _mintFeeToken, address _mintFeeAddress, uint256 _mintFeeAmount, address _nftContractAddr, bytes32 _merkleRoot, string _uri, address _forwarder) external
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
| _merkleRoot | bytes32 | Merkle root of the allowlist |
| _uri | string | Resource identifier for generating merkle proofs |
| _forwarder | address | OpenGSN forwarder address to use |

### __MinterSimpleMerkle_init

```solidity
function __MinterSimpleMerkle_init(address _admin, address _mintFeeToken, address _mintFeeAddress, uint256 _mintFeeAmount, address _nftContractAddr, bytes32 _merkleRoot, string _uri, address _forwarder) internal
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
| _merkleRoot | bytes32 | Merkle root of the allowlist |
| _uri | string | Resource identifier for generating merkle proofs |
| _forwarder | address | OpenGSN forwarder address to use |

### __MinterSimpleMerkle_init_unchained

```solidity
function __MinterSimpleMerkle_init_unchained(bytes32 _merkleRoot, string _uri) internal
```

This function is usually called through ERC1167Factory cloning and not directly.

MinterAutoId initialization parameters.

| Name | Type | Description |
| ---- | ---- | ----------- |
| _merkleRoot | bytes32 | Merkle root of the allowlist |
| _uri | string | Resource identifier for generating merkle proofs |

### mint

```solidity
function mint(address buyer) public pure returns (uint256)
```

mint(address,bytes[]) must be called with proof

This function only reverts.

### safeMint

```solidity
function safeMint(address buyer) public pure returns (uint256)
```

safeMint(address,bytes[]) must be called with proof

This function only reverts.

### mint

```solidity
function mint(address buyer, bytes32[] merkleProof) public
```

Mint a new auto-incremented id for a user in the Merkle tree.

| Name | Type | Description |
| ---- | ---- | ----------- |
| buyer | address | address who pays the optional ERC20 fee |
| merkleProof | bytes32[] | merkleProof generated for on-chain verification |

### safeMint

```solidity
function safeMint(address buyer, bytes32[] merkleProof) public
```

Mint a new auto-incremented id for a user in the Merkle tree.

| Name | Type | Description |
| ---- | ---- | ----------- |
| buyer | address | address who pays the optional ERC20 fee |
| merkleProof | bytes32[] | merkleProof generated for on-chain verification |

### updateMerkleRoot

```solidity
function updateMerkleRoot(bytes32 _merkleRoot, string _uri) public
```

Allows updating Merkle root and identifier for clients

| Name | Type | Description |
| ---- | ---- | ----------- |
| _merkleRoot | bytes32 | new merkle root |
| _uri | string | new URI for clients to refer to |

### _verifyMerkle

```solidity
function _verifyMerkle(bytes32[] merkleProof) internal view returns (bool)
```

Internal function to verify merkle proofs

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

## IMinterSimpleMerkle

### mint

```solidity
function mint(uint256 tokenId, bytes32 merkleRoot, bytes32[] merkleProof) external
```

@dev

| Name | Type | Description |
| ---- | ---- | ----------- |
| tokenId | uint256 | minted token id |
| merkleRoot | bytes32 |  |
| merkleProof | bytes32[] |  |

### safeMint

```solidity
function safeMint(uint256 tokenId, bytes32 merkleRoot, bytes32[] merkleProof) external
```

@dev

| Name | Type | Description |
| ---- | ---- | ----------- |
| tokenId | uint256 | minted token id |
| merkleRoot | bytes32 |  |
| merkleProof | bytes32[] |  |

