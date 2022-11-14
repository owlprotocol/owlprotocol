## EnglishAuction

This contract is a standard English Auction smart contract that allows
bidders to keep bidding until the highest bidder wins the asset. In an
English Auction, the owner defines the starting price and bidders can make
bids that are higher than the current price.* The auction duration is defined
by the bids being made and if they are made within the resetTime.
Theoretically, the auction can go on forever if higher bids continue to be
made within the resetTime period.* Once the ending time is passed, the
auction finishes and the NFT is transferred to the highest bidder.

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

### Withdraw

```solidity
event Withdraw(address bidder, uint256 amount)
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

### ownerClaimed

```solidity
bool ownerClaimed
```

### winnerClaimed

```solidity
bool winnerClaimed
```

### endAt

```solidity
uint256 endAt
```

### auctionDuration

```solidity
uint256 auctionDuration
```

### startPrice

```solidity
uint256 startPrice
```

### resetTime

```solidity
uint256 resetTime
```

### saleFee

```solidity
uint256 saleFee
```

### highestBidder

```solidity
address highestBidder
```

### bids

```solidity
mapping(address => uint256) bids
```

### constructor

```solidity
constructor() public
```

### initialize

```solidity
function initialize(address payable _seller, struct AuctionLib.Asset _asset, address ERC20contractAddress, uint256 _startPrice, uint256 _auctionDuration, uint256 _resetTime, uint256 _saleFee, address payable _saleFeeAddress, address _forwarder) external
```

Create English Auction instance

| Name | Type | Description |
| ---- | ---- | ----------- |
| _seller | address payable | address of seller for auction |
| _asset | struct AuctionLib.Asset | struct containing information of the asset to be listed |
| ERC20contractAddress | address | address of ERC20 token accepted as payment |
| _startPrice | uint256 | start bid on nft |
| _auctionDuration | uint256 | duration of auction (in seconds) |
| _resetTime | uint256 | time at which the auction resets when a bid is made within this time frame (in seconds) |
| _saleFee | uint256 | the percentage of the sale to be sent to the marketplace as commission |
| _saleFeeAddress | address payable | the address to which the sale fee is sent |
| _forwarder | address | the address for the Trusted Forwarder for Open GSN integration |

### proxyInitialize

```solidity
function proxyInitialize(address payable _seller, struct AuctionLib.Asset _asset, address ERC20contractAddress, uint256 _startPrice, uint256 _auctionDuration, uint256 _resetTime, uint256 _saleFee, address payable _saleFeeAddress, address _forwarder) external
```

### __EnglishAuction_init

```solidity
function __EnglishAuction_init(address payable _seller, struct AuctionLib.Asset _asset, address ERC20contractAddress, uint256 _startPrice, uint256 _auctionDuration, uint256 _resetTime, uint256 _saleFee, address payable _saleFeeAddress, address _forwarder) internal
```

### __EnglishAuction_init_unchained

```solidity
function __EnglishAuction_init_unchained(address payable _seller, struct AuctionLib.Asset _asset, address ERC20contractAddress, uint256 _startPrice, uint256 _auctionDuration, uint256 _resetTime, uint256 _saleFee, address payable _saleFeeAddress) internal
```

### bid

```solidity
function bid(uint256 amount) external
```

Allow a user to place a bid that must be higher than the highest bid

| Name | Type | Description |
| ---- | ---- | ----------- |
| amount | uint256 | to bid by the bidder |

### withdraw

```solidity
function withdraw() external
```

Highest bidder cannot withdraw

Allows a user to withdraw their bid.

### ownerClaim

```solidity
function ownerClaim() external
```

Allows owner to claim bid.
The seller must call to transfer the ERC20 to themselves

### winnerClaim

```solidity
function winnerClaim() external
```

Allows auction winner to claim the asset they won and transfers ownership

### getCurrentBid

```solidity
function getCurrentBid() external view returns (uint256)
```

Returns the current highest bid

### getRemainingTime

```solidity
function getRemainingTime() external view returns (uint256)
```

Returns the remaining time in the auction

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

