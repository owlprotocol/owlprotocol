## DutchAuction

This contract is a simple on-chain Dutch Auction with a pricing view function that
decreases over a set period of time. In a Dutch Auction, the seller defines a starting ceiling price
and an ending floor price that then decreases over time based on either a linear or nonlinear function.
If a bid is made at any point, the bid must match the current price. Once a bid is made, the auction ends
and the owner will receive the current price in which the bid was made in ERC20 tokens. The asset is then
transferred to the bidder.

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

### Bid

```solidity
event Bid(address sender, uint256 amount)
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

### startPrice

```solidity
uint256 startPrice
```

### endPrice

```solidity
uint256 endPrice
```

### startTime

```solidity
uint256 startTime
```

### saleFee

```solidity
uint256 saleFee
```

### isNonLinear

```solidity
bool isNonLinear
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
function initialize(address payable _seller, struct AuctionLib.Asset _asset, address ERC20contractAddress, uint256 _startPrice, uint256 _endPrice, uint256 _auctionDuration, bool _isNonLinear, uint256 _saleFee, address payable _saleFeeAddress, address _forwarder) external
```

Create auction instance

| Name | Type | Description |
| ---- | ---- | ----------- |
| _seller | address payable | address of seller for auction |
| _asset | struct AuctionLib.Asset | struct containing information of the asset to be listed |
| ERC20contractAddress | address | address of ERC20 token accepted as payment |
| _startPrice | uint256 | highest starting price to start the auction |
| _endPrice | uint256 | lowest price that seller is willing to accept |
| _auctionDuration | uint256 | duration of auction (in seconds) |
| _isNonLinear | bool | set true if the seller wants to set a nonlinear decrease in price |
| _saleFee | uint256 | the percentage of the sale to be sent to the marketplace as commission |
| _saleFeeAddress | address payable | the address to which the sale fee is sent |
| _forwarder | address | the address for the Trusted Forwarder for Open GSN integration |

### proxyInitialize

```solidity
function proxyInitialize(address payable _seller, struct AuctionLib.Asset _asset, address ERC20contractAddress, uint256 _startPrice, uint256 _endPrice, uint256 _auctionDuration, bool _isNonLinear, uint256 _saleFee, address payable _saleFeeAddress, address _forwarder) external
```

### __DutchAuction_init

```solidity
function __DutchAuction_init(address payable _seller, struct AuctionLib.Asset _asset, address ERC20contractAddress, uint256 _startPrice, uint256 _endPrice, uint256 _auctionDuration, bool _isNonLinear, uint256 _saleFee, address payable _saleFeeAddress, address _forwarder) internal
```

### __DutchAuction_init_unchained

```solidity
function __DutchAuction_init_unchained(address payable _seller, struct AuctionLib.Asset _asset, address ERC20contractAddress, uint256 _startPrice, uint256 _endPrice, uint256 _auctionDuration, bool _isNonLinear, uint256 _saleFee, address payable _saleFeeAddress) internal
```

### getCurrentPrice

```solidity
function getCurrentPrice() public view returns (uint256)
```

Returns the current price of the asset based on the timestamp and type of function

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | uint256 | uint256 price of the asset |

### bid

```solidity
function bid() external
```

The required ERC20 tokens must be pre-approved before calling!

Allows a user to bid at the current price

### claim

```solidity
function claim() external
```

Allows the owner to claim back the asset if nobody bids and auction expires

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

