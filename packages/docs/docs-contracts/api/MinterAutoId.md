## MinterAutoId

Decentralized NFT Minter contract

### version

```solidity
string version
```

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

### proxyInitialize

```solidity
function proxyInitialize(address _admin, address _mintFeeToken, address _mintFeeAddress, uint256 _mintFeeAmount, address _nftContractAddr, address _forwarder) external
```

### __MinterAutoId_init

```solidity
function __MinterAutoId_init(address _admin, address _mintFeeToken, address _mintFeeAddress, uint256 _mintFeeAmount, address _nftContractAddr, address _forwarder) internal
```

### __MinterAutoId_init_unchained

```solidity
function __MinterAutoId_init_unchained() internal
```

### mint

```solidity
function mint(address buyer) public virtual returns (uint256)
```

Create a new type of species and define attributes.

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | uint256 | nextTokenId |

### safeMint

```solidity
function safeMint(address buyer) public virtual returns (uint256)
```

Create a new type of species and define attributes.

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | uint256 | nextTokenId |

### setNextTokenId

```solidity
function setNextTokenId(uint256 nextTokenId_) public
```

Used to set the starting nextTokenId value.
Used to save situtations where someone mints directly
and we get out of sync.

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

