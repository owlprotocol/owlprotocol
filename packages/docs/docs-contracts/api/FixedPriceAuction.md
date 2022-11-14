## FixedPriceAuction

### version

```solidity
string version
```

### ERC165TAG

```solidity
bytes4 ERC165TAG
```

### Start

```solidity
event Start(uint256 startTime)
```

### Buy

```solidity
event Buy(address buyer, uint256 buyPrice)
```

### Claim

```solidity
event Claim(address seller, address contractAddr, uint256 tokenId)
```

### asset

```solidity
struct AuctionLib.Asset asset
```

### acceptableToken

```solidity
address acceptableToken
```

### seller

```solidity
address payable seller
```

### saleFeeAddress

```solidity
address payable saleFeeAddress
```

### auctionDuration

```solidity
uint256 auctionDuration
```

### price

```solidity
uint256 price
```

### startTime

```solidity
uint256 startTime
```

### saleFee

```solidity
uint256 saleFee
```

### isBought

```solidity
bool isBought
```

### constructor

```solidity
constructor() public
```

### initialize

```solidity
function initialize(address payable _seller, struct AuctionLib.Asset _asset, address ERC20contractAddress, uint256 _price, uint256 _auctionDuration, uint256 _saleFee, address payable _saleFeeAddress, address _forwarder) external
```

Create auction instance

| Name | Type | Description |
| ---- | ---- | ----------- |
| _seller | address payable | address of seller for auction |
| _asset | struct AuctionLib.Asset | struct containing information of the asset to be listed |
| ERC20contractAddress | address | address of ERC20 token accepted as payment |
| _price | uint256 | price to start the auction |
| _auctionDuration | uint256 | how long the auction should last |
| _saleFee | uint256 | the percentage of the sale to be sent to the marketplace as commission |
| _saleFeeAddress | address payable | the address to which the sale fee is sent |
| _forwarder | address | address for the trusted forwarder for open GSN integration |

### proxyInitialize

```solidity
function proxyInitialize(address payable _seller, struct AuctionLib.Asset _asset, address ERC20contractAddress, uint256 _price, uint256 _auctionDuration, uint256 _saleFee, address payable _saleFeeAddress, address _forwarder) external
```

### __FixedPriceAuction_init

```solidity
function __FixedPriceAuction_init(address payable _seller, struct AuctionLib.Asset _asset, address ERC20contractAddress, uint256 _price, uint256 _auctionDuration, uint256 _saleFee, address payable _saleFeeAddress, address _forwarder) internal
```

### __FixedPriceAuction_init_unchained

```solidity
function __FixedPriceAuction_init_unchained(address payable _seller, struct AuctionLib.Asset _asset, address ERC20contractAddress, uint256 _price, uint256 _auctionDuration, uint256 _saleFee, address payable _saleFeeAddress) internal
```

### buy

```solidity
function buy() external
```

function that allows a buyer to buy the asset at the fixed price

### claim

```solidity
function claim() external
```

must be the owner to call this function

allows the owner to reclaim their asset if no one buys

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

