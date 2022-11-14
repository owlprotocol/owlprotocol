## VRFCoordinatorV2

### LINK

```solidity
contract LinkTokenInterface LINK
```

### LINK_ETH_FEED

```solidity
contract AggregatorV3Interface LINK_ETH_FEED
```

### BLOCKHASH_STORE

```solidity
contract BlockhashStoreInterface BLOCKHASH_STORE
```

### MAX_CONSUMERS

```solidity
uint16 MAX_CONSUMERS
```

### TooManyConsumers

```solidity
error TooManyConsumers()
```

### InsufficientBalance

```solidity
error InsufficientBalance()
```

### InvalidConsumer

```solidity
error InvalidConsumer(uint64 subId, address consumer)
```

### InvalidSubscription

```solidity
error InvalidSubscription()
```

### OnlyCallableFromLink

```solidity
error OnlyCallableFromLink()
```

### InvalidCalldata

```solidity
error InvalidCalldata()
```

### MustBeSubOwner

```solidity
error MustBeSubOwner(address owner)
```

### PendingRequestExists

```solidity
error PendingRequestExists()
```

### MustBeRequestedOwner

```solidity
error MustBeRequestedOwner(address proposedOwner)
```

### BalanceInvariantViolated

```solidity
error BalanceInvariantViolated(uint256 internalBalance, uint256 externalBalance)
```

### FundsRecovered

```solidity
event FundsRecovered(address to, uint256 amount)
```

### Subscription

```solidity
struct Subscription {
  uint96 balance;
  uint64 reqCount;
}
```

### SubscriptionConfig

```solidity
struct SubscriptionConfig {
  address owner;
  address requestedOwner;
  address[] consumers;
}
```

### s_consumers

```solidity
mapping(address => mapping(uint64 => uint64)) s_consumers
```

### s_subscriptionConfigs

```solidity
mapping(uint64 => struct VRFCoordinatorV2.SubscriptionConfig) s_subscriptionConfigs
```

### s_subscriptions

```solidity
mapping(uint64 => struct VRFCoordinatorV2.Subscription) s_subscriptions
```

### s_currentSubId

```solidity
uint64 s_currentSubId
```

### s_totalBalance

```solidity
uint96 s_totalBalance
```

### SubscriptionCreated

```solidity
event SubscriptionCreated(uint64 subId, address owner)
```

### SubscriptionFunded

```solidity
event SubscriptionFunded(uint64 subId, uint256 oldBalance, uint256 newBalance)
```

### SubscriptionConsumerAdded

```solidity
event SubscriptionConsumerAdded(uint64 subId, address consumer)
```

### SubscriptionConsumerRemoved

```solidity
event SubscriptionConsumerRemoved(uint64 subId, address consumer)
```

### SubscriptionCanceled

```solidity
event SubscriptionCanceled(uint64 subId, address to, uint256 amount)
```

### SubscriptionOwnerTransferRequested

```solidity
event SubscriptionOwnerTransferRequested(uint64 subId, address from, address to)
```

### SubscriptionOwnerTransferred

```solidity
event SubscriptionOwnerTransferred(uint64 subId, address from, address to)
```

### MAX_REQUEST_CONFIRMATIONS

```solidity
uint16 MAX_REQUEST_CONFIRMATIONS
```

### MAX_NUM_WORDS

```solidity
uint32 MAX_NUM_WORDS
```

### GAS_FOR_CALL_EXACT_CHECK

```solidity
uint256 GAS_FOR_CALL_EXACT_CHECK
```

### InvalidRequestConfirmations

```solidity
error InvalidRequestConfirmations(uint16 have, uint16 min, uint16 max)
```

### GasLimitTooBig

```solidity
error GasLimitTooBig(uint32 have, uint32 want)
```

### NumWordsTooBig

```solidity
error NumWordsTooBig(uint32 have, uint32 want)
```

### ProvingKeyAlreadyRegistered

```solidity
error ProvingKeyAlreadyRegistered(bytes32 keyHash)
```

### NoSuchProvingKey

```solidity
error NoSuchProvingKey(bytes32 keyHash)
```

### InvalidLinkWeiPrice

```solidity
error InvalidLinkWeiPrice(int256 linkWei)
```

### InsufficientGasForConsumer

```solidity
error InsufficientGasForConsumer(uint256 have, uint256 want)
```

### NoCorrespondingRequest

```solidity
error NoCorrespondingRequest()
```

### IncorrectCommitment

```solidity
error IncorrectCommitment()
```

### BlockhashNotInStore

```solidity
error BlockhashNotInStore(uint256 blockNum)
```

### PaymentTooLarge

```solidity
error PaymentTooLarge()
```

### Reentrant

```solidity
error Reentrant()
```

### RequestCommitment

```solidity
struct RequestCommitment {
  uint64 blockNum;
  uint64 subId;
  uint32 callbackGasLimit;
  uint32 numWords;
  address sender;
}
```

### s_provingKeys

```solidity
mapping(bytes32 => address) s_provingKeys
```

### s_provingKeyHashes

```solidity
bytes32[] s_provingKeyHashes
```

### s_withdrawableTokens

```solidity
mapping(address => uint96) s_withdrawableTokens
```

### s_requestCommitments

```solidity
mapping(uint256 => bytes32) s_requestCommitments
```

### ProvingKeyRegistered

```solidity
event ProvingKeyRegistered(bytes32 keyHash, address oracle)
```

### ProvingKeyDeregistered

```solidity
event ProvingKeyDeregistered(bytes32 keyHash, address oracle)
```

### RandomWordsRequested

```solidity
event RandomWordsRequested(bytes32 keyHash, uint256 requestId, uint256 preSeed, uint64 subId, uint16 minimumRequestConfirmations, uint32 callbackGasLimit, uint32 numWords, address sender)
```

### RandomWordsFulfilled

```solidity
event RandomWordsFulfilled(uint256 requestId, uint256 outputSeed, uint96 payment, bool success)
```

### Config

```solidity
struct Config {
  uint16 minimumRequestConfirmations;
  uint32 maxGasLimit;
  bool reentrancyLock;
  uint32 stalenessSeconds;
  uint32 gasAfterPaymentCalculation;
}
```

### s_fallbackWeiPerUnitLink

```solidity
int256 s_fallbackWeiPerUnitLink
```

### s_config

```solidity
struct VRFCoordinatorV2.Config s_config
```

### s_feeConfig

```solidity
struct VRFCoordinatorV2.FeeConfig s_feeConfig
```

### FeeConfig

```solidity
struct FeeConfig {
  uint32 fulfillmentFlatFeeLinkPPMTier1;
  uint32 fulfillmentFlatFeeLinkPPMTier2;
  uint32 fulfillmentFlatFeeLinkPPMTier3;
  uint32 fulfillmentFlatFeeLinkPPMTier4;
  uint32 fulfillmentFlatFeeLinkPPMTier5;
  uint24 reqsForTier2;
  uint24 reqsForTier3;
  uint24 reqsForTier4;
  uint24 reqsForTier5;
}
```

### ConfigSet

```solidity
event ConfigSet(uint16 minimumRequestConfirmations, uint32 maxGasLimit, uint32 stalenessSeconds, uint32 gasAfterPaymentCalculation, int256 fallbackWeiPerUnitLink, struct VRFCoordinatorV2.FeeConfig feeConfig)
```

### Request

```solidity
struct Request {
  uint64 subId;
  uint32 callbackGasLimit;
  uint32 numWords;
}
```

### s_requests

```solidity
mapping(uint256 => struct VRFCoordinatorV2.Request) s_requests
```

### constructor

```solidity
constructor(address link, address blockhashStore, address linkEthFeed) public
```

### registerProvingKey

```solidity
function registerProvingKey(address oracle, uint256[2] publicProvingKey) external
```

Registers a proving key to an oracle.

| Name | Type | Description |
| ---- | ---- | ----------- |
| oracle | address | address of the oracle |
| publicProvingKey | uint256[2] | key that oracle can use to submit vrf fulfillments |

### deregisterProvingKey

```solidity
function deregisterProvingKey(uint256[2] publicProvingKey) external
```

Deregisters a proving key to an oracle.

| Name | Type | Description |
| ---- | ---- | ----------- |
| publicProvingKey | uint256[2] | key that oracle can use to submit vrf fulfillments |

### hashOfKey

```solidity
function hashOfKey(uint256[2] publicKey) public pure returns (bytes32)
```

Returns the proving key hash key associated with this public key

| Name | Type | Description |
| ---- | ---- | ----------- |
| publicKey | uint256[2] | the key to return the hash of |

### setConfig

```solidity
function setConfig(uint16 minimumRequestConfirmations, uint32 maxGasLimit, uint32 stalenessSeconds, uint32 gasAfterPaymentCalculation, int256 fallbackWeiPerUnitLink, struct VRFCoordinatorV2.FeeConfig feeConfig) external
```

Sets the configuration of the vrfv2 coordinator

| Name | Type | Description |
| ---- | ---- | ----------- |
| minimumRequestConfirmations | uint16 | global min for request confirmations |
| maxGasLimit | uint32 | global max for request gas limit |
| stalenessSeconds | uint32 | if the eth/link feed is more stale then this, use the fallback price |
| gasAfterPaymentCalculation | uint32 | gas used in doing accounting after completing the gas measurement |
| fallbackWeiPerUnitLink | int256 | fallback eth/link price in the case of a stale feed |
| feeConfig | struct VRFCoordinatorV2.FeeConfig | fee tier configuration |

### getConfig

```solidity
function getConfig() external view returns (uint16 minimumRequestConfirmations, uint32 maxGasLimit, uint32 stalenessSeconds, uint32 gasAfterPaymentCalculation)
```

### getFeeConfig

```solidity
function getFeeConfig() external view returns (uint32 fulfillmentFlatFeeLinkPPMTier1, uint32 fulfillmentFlatFeeLinkPPMTier2, uint32 fulfillmentFlatFeeLinkPPMTier3, uint32 fulfillmentFlatFeeLinkPPMTier4, uint32 fulfillmentFlatFeeLinkPPMTier5, uint24 reqsForTier2, uint24 reqsForTier3, uint24 reqsForTier4, uint24 reqsForTier5)
```

### getTotalBalance

```solidity
function getTotalBalance() external view returns (uint256)
```

### getFallbackWeiPerUnitLink

```solidity
function getFallbackWeiPerUnitLink() external view returns (int256)
```

### ownerCancelSubscription

```solidity
function ownerCancelSubscription(uint64 subId) external
```

Owner cancel subscription, sends remaining link directly to the subscription owner.

notably can be called even if there are pending requests, outstanding ones may fail onchain

| Name | Type | Description |
| ---- | ---- | ----------- |
| subId | uint64 | subscription id |

### recoverFunds

```solidity
function recoverFunds(address to) external
```

Recover link sent with transfer instead of transferAndCall.

| Name | Type | Description |
| ---- | ---- | ----------- |
| to | address | address to send link to |

### getRequestConfig

```solidity
function getRequestConfig() external view returns (uint16, uint32, bytes32[])
```

Get configuration relevant for making requests

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | uint16 | minimumRequestConfirmations global min for request confirmations |
| [1] | uint32 | maxGasLimit global max for request gas limit |
| [2] | bytes32[] | s_provingKeyHashes list of registered key hashes |

### requestRandomWords

```solidity
function requestRandomWords(bytes32 keyHash, uint64 subId, uint16 requestConfirmations, uint32 callbackGasLimit, uint32 numWords) external returns (uint256)
```

Request a set of random words.

| Name | Type | Description |
| ---- | ---- | ----------- |
| keyHash | bytes32 | - Corresponds to a particular oracle job which uses that key for generating the VRF proof. Different keyHash's have different gas price ceilings, so you can select a specific one to bound your maximum per request cost. |
| subId | uint64 | - The ID of the VRF subscription. Must be funded with the minimum subscription balance required for the selected keyHash. |
| requestConfirmations | uint16 |  |
| callbackGasLimit | uint32 | - How much gas you'd like to receive in your fulfillRandomWords callback. Note that gasleft() inside fulfillRandomWords may be slightly less than this amount because of gas used calling the function (argument decoding etc.), so you may need to request slightly more than you expect to have inside fulfillRandomWords. The acceptable range is [0, maxGasLimit] |
| numWords | uint32 | - The number of uint256 random values you'd like to receive in your fulfillRandomWords callback. Note these numbers are expanded in a secure way by the VRFCoordinator from a single random value supplied by the oracle. |

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | uint256 |  |

### getCommitment

```solidity
function getCommitment(uint256 requestId) external view returns (bytes32)
```

Get request commitment

used to determine if a request is fulfilled or not

| Name | Type | Description |
| ---- | ---- | ----------- |
| requestId | uint256 | id of request |

### computeRequestId

```solidity
function computeRequestId(bytes32 keyHash, address sender, uint64 subId, uint64 nonce) private pure returns (uint256, uint256)
```

### callWithExactGas

```solidity
function callWithExactGas(uint256 gasAmount, address target, bytes data) private returns (bool success)
```

calls target address with exactly gasAmount gas and data as calldata
or reverts if at least gasAmount gas is not available.

### getFeeTier

```solidity
function getFeeTier(uint64 reqCount) public view returns (uint32)
```

### fulfillRandomWords

```solidity
function fulfillRandomWords(uint256 _requestId, address _consumer) external returns (uint96)
```

### calculatePaymentAmount

```solidity
function calculatePaymentAmount(uint256 startGas, uint256 gasAfterPaymentCalculation, uint32 fulfillmentFlatFeeLinkPPM, uint256 weiPerUnitGas) internal view returns (uint96)
```

### getFeedData

```solidity
function getFeedData() private view returns (int256)
```

### oracleWithdraw

```solidity
function oracleWithdraw(address recipient, uint96 amount) external
```

### onTokenTransfer

```solidity
function onTokenTransfer(address, uint256 amount, bytes data) external
```

### getCurrentSubId

```solidity
function getCurrentSubId() external view returns (uint64)
```

### getSubscription

```solidity
function getSubscription(uint64 subId) external view returns (uint96 balance, uint64 reqCount, address owner, address[] consumers)
```

Get a VRF subscription.

| Name | Type | Description |
| ---- | ---- | ----------- |
| subId | uint64 | - ID of the subscription |

| Name | Type | Description |
| ---- | ---- | ----------- |
| balance | uint96 | - LINK balance of the subscription in juels. |
| reqCount | uint64 | - number of requests for this subscription, determines fee tier. |
| owner | address | - owner of the subscription. |
| consumers | address[] | - list of consumer address which are able to use this subscription. |

### createSubscription

```solidity
function createSubscription() external returns (uint64)
```

Create a VRF subscription.

You can manage the consumer set dynamically with addConsumer/removeConsumer.
Note to fund the subscription, use transferAndCall. For example
 LINKTOKEN.transferAndCall(
   address(COORDINATOR),
   amount,
   abi.encode(subId));

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | uint64 |  |

### requestSubscriptionOwnerTransfer

```solidity
function requestSubscriptionOwnerTransfer(uint64 subId, address newOwner) external
```

Request subscription owner transfer.

| Name | Type | Description |
| ---- | ---- | ----------- |
| subId | uint64 | - ID of the subscription |
| newOwner | address | - proposed new owner of the subscription |

### acceptSubscriptionOwnerTransfer

```solidity
function acceptSubscriptionOwnerTransfer(uint64 subId) external
```

Request subscription owner transfer.

will revert if original owner of subId has
not requested that msg.sender become the new owner.

| Name | Type | Description |
| ---- | ---- | ----------- |
| subId | uint64 | - ID of the subscription |

### removeConsumer

```solidity
function removeConsumer(uint64 subId, address consumer) external
```

Remove a consumer from a VRF subscription.

| Name | Type | Description |
| ---- | ---- | ----------- |
| subId | uint64 | - ID of the subscription |
| consumer | address | - Consumer to remove from the subscription |

### addConsumer

```solidity
function addConsumer(uint64 subId, address consumer) external
```

Add a consumer to a VRF subscription.

| Name | Type | Description |
| ---- | ---- | ----------- |
| subId | uint64 | - ID of the subscription |
| consumer | address | - New consumer which can use the subscription |

### cancelSubscription

```solidity
function cancelSubscription(uint64 subId, address to) external
```

Cancel a subscription

| Name | Type | Description |
| ---- | ---- | ----------- |
| subId | uint64 | - ID of the subscription |
| to | address | - Where to send the remaining LINK to |

### cancelSubscriptionHelper

```solidity
function cancelSubscriptionHelper(uint64 subId, address to) private
```

### onlySubOwner

```solidity
modifier onlySubOwner(uint64 subId)
```

### nonReentrant

```solidity
modifier nonReentrant()
```

### typeAndVersion

```solidity
function typeAndVersion() external pure virtual returns (string)
```

The type and version of this contract

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | string | Type and version string |

