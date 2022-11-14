## MinterSimpleMerkle

Decentralized NFT Minter contract

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

### proxyInitialize

```solidity
function proxyInitialize(address _admin, address _mintFeeToken, address _mintFeeAddress, uint256 _mintFeeAmount, address _nftContractAddr, bytes32 _merkleRoot, string _uri, address _forwarder) external
```

### __MinterSimpleMerkle_init

```solidity
function __MinterSimpleMerkle_init(address _admin, address _mintFeeToken, address _mintFeeAddress, uint256 _mintFeeAmount, address _nftContractAddr, bytes32 _merkleRoot, string _uri, address _forwarder) internal
```

### __MinterSimpleMerkle_init_unchained

```solidity
function __MinterSimpleMerkle_init_unchained(bytes32 _merkleRoot, string _uri) internal
```

### mint

```solidity
function mint(address buyer) public pure returns (uint256)
```

Create a new type of species and define attributes.

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | uint256 | nextTokenId |

### safeMint

```solidity
function safeMint(address buyer) public pure returns (uint256)
```

Create a new type of species and define attributes.

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | uint256 | nextTokenId |

### mint

```solidity
function mint(address buyer, bytes32[] merkleProof) public
```

Create a new type of species and define attributes.

### safeMint

```solidity
function safeMint(address buyer, bytes32[] merkleProof) public
```

Create a new type of species and define attributes.

### updateMerkleRoot

```solidity
function updateMerkleRoot(bytes32 _merkleRoot, string _uri) public
```

### _verifyMerkle

```solidity
function _verifyMerkle(bytes32[] merkleProof) internal view returns (bool)
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

