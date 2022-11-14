## MinterRandom

Decentralized NFT Minter contract

### version

```solidity
string version
```

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

### proxyInitialize

```solidity
function proxyInitialize(address _admin, address _mintFeeToken, address _mintFeeAddress, uint256 _mintFeeAmount, address _nftContractAddr, address _forwarder) external
```

### __MinterRandom_init

```solidity
function __MinterRandom_init(address _admin, address _mintFeeToken, address _mintFeeAddress, uint256 _mintFeeAmount, address _nftContractAddr, address _forwarder) internal
```

### __MinterRandom_init_unchained

```solidity
function __MinterRandom_init_unchained() internal
```

### mint

```solidity
function mint(address buyer) public
```

Create a new type of species and define attributes.

### safeMint

```solidity
function safeMint(address buyer) public
```

Create a new type of species and define attributes.

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

