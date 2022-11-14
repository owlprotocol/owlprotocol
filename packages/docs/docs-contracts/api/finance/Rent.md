## Rent

This Rent contract serves as a middleman and allows owners of NFTs to lock their assets in this
smart contract for a fixed epoch period. The contract then mints a new identical "shadow" NFT on a separate
smart contract. This "shadow" NFT can be sold and transferred like any other NFT when being rented. However,
after the epoch is finished, the "shadow" NFT is destroyed and the original NFT is returned to its original owner.
This contract can handle multiple rentals at a time and keeps track of rental instances using a rentId. This contract
is great for allowing owners of NFTs to earn income by renting out their assets and incentivizes renters to get a
chance to temporarily own a cool NFT.

### ERC165TAG

```solidity
bytes4 ERC165TAG
```

### Create

```solidity
event Create(uint256 rentId, address owner, address renter, uint256 nftId, uint256 timePeriods, uint256 pricePerPeriod, uint256 expireTimePerPeriod)
```

### Pay

```solidity
event Pay(uint256 rentId, uint256 amountPaid)
```

### End

```solidity
event End(uint256 rentId, uint256 amountPaid)
```

### Claim

```solidity
event Claim(address owner, uint256 amountClaimed)
```

### RentalTerms

```solidity
struct RentalTerms {
  uint256 nftId;
  address owner;
  address renter;
  bool ended;
  uint256 timePeriods;
  uint256 pricePerPeriod;
  uint256 expireTimePerPeriod;
}
```

### acceptableToken

```solidity
address acceptableToken
```

### shadowAddr

```solidity
address shadowAddr
```

### contractAddr

```solidity
address contractAddr
```

### numRentals

```solidity
uint256 numRentals
```

### rentTermsId

```solidity
mapping(uint256 => struct Rent.RentalTerms) rentTermsId
```

### timePeriodsPaid

```solidity
mapping(uint256 => uint256) timePeriodsPaid
```

### balances

```solidity
mapping(address => uint256) balances
```

### constructor

```solidity
constructor() public
```

### initialize

```solidity
function initialize(address _admin, address _acceptableToken, address _contractAddr, address _shadowAddr, address _forwarder) external
```

Initializing the Rent contract

| Name | Type | Description |
| ---- | ---- | ----------- |
| _admin | address | address of the launcher, which is this contract |
| _acceptableToken | address | accepted ERC20 token for payment |
| _contractAddr | address | contract address for original NFT |
| _shadowAddr | address | address where "shadow" NFT is minted |
| _forwarder | address | address for trusted forwarder for openGSN |

### proxyInitialize

```solidity
function proxyInitialize(address _admin, address _acceptableToken, address _contractAddr, address _shadowAddr, address _forwarder) external
```

### __Rent_init

```solidity
function __Rent_init(address _admin, address _acceptableToken, address _contractAddr, address _shadowAddr, address _forwarder) internal
```

### __Rent_init_unchained

```solidity
function __Rent_init_unchained(address _admin, address _acceptableToken, address _contractAddr, address _shadowAddr) internal
```

### createRental

```solidity
function createRental(struct Rent.RentalTerms rentalTerm) external
```

Creates a single Rental based on the inputted Rental Term Struct that outlines all of the terms
for that specific rental instance.
Updates the various mappings and gives the Rental an ID.
Increments the number of Rentals handled by this contract

| Name | Type | Description |
| ---- | ---- | ----------- |
| rentalTerm | struct Rent.RentalTerms | inputted rental term struct |

### startRent

```solidity
function startRent(uint256 rentId) external payable
```

this function can only be called at the very start of a Rental process. It must be called
to mint the shadow NFT

Starts the payment process for the Rental with rentId with it's first payment

| Name | Type | Description |
| ---- | ---- | ----------- |
| rentId | uint256 | inputted Rental ID that is used in the mapping to get the corresponding rental term struct |

### payRent

```solidity
function payRent(uint256 rentId, uint256 timePeriodsToPay) public payable
```

function that allows a renter to pay rent for any number of time periods

| Name | Type | Description |
| ---- | ---- | ----------- |
| rentId | uint256 | inputted Rental ID that is used in the mapping to get the corresponding rental term struct |
| timePeriodsToPay | uint256 | allows the renter to decide how many time periods they want to pay for at once |

### endRental

```solidity
function endRental(uint256 rentalId) external payable
```

this function only updates the boolean for the rent status (ended vs not) and
transfers the ownership of the NFT back to its owner. It does not give funds to the owner in ERC20 tokens

this function allows the owner to end the rental at any point in time

| Name | Type | Description |
| ---- | ---- | ----------- |
| rentalId | uint256 | inputted Rental ID that is used in the mapping to get the corresponding rental term struct |

### ownerClaim

```solidity
function ownerClaim() external payable
```

this function enables the owner to claim the balances paid by the renter

### getRental

```solidity
function getRental(uint256 rentId) external view returns (struct Rent.RentalTerms)
```

gets a rental instance based on the inputted rentId

| Name | Type | Description |
| ---- | ---- | ----------- |
| rentId | uint256 | inputted rental term struct id |

### getNumRentals

```solidity
function getNumRentals() external view returns (uint256)
```

gets the number of rentals created on this contract

### getTimePeriodsPaid

```solidity
function getTimePeriodsPaid(uint256 rentalId) external view returns (uint256)
```

gets the number of time periods paid by a renter for a specific Rental based on the inputted rentId

| Name | Type | Description |
| ---- | ---- | ----------- |
| rentalId | uint256 | inputted rental term struct id |

### getTimePeriodsLeftToPay

```solidity
function getTimePeriodsLeftToPay(uint256 rentalId) external view returns (uint256)
```

gets how many time periods are left to pay for a specific Rental

| Name | Type | Description |
| ---- | ---- | ----------- |
| rentalId | uint256 | inputted rental term struct id |

### getBalance

```solidity
function getBalance(address owner) external view returns (uint256)
```

gets the total balance that is claimable by an owner

| Name | Type | Description |
| ---- | ---- | ----------- |
| owner | address | owner of a Rental that can call this function to see how much they can claim |

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

