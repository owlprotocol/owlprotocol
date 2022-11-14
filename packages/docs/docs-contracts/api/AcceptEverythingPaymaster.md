## AcceptEverythingPaymaster

### versionPaymaster

```solidity
function versionPaymaster() external view virtual returns (string)
```

### preRelayedCall

```solidity
function preRelayedCall(struct GsnTypes.RelayRequest relayRequest, bytes signature, bytes approvalData, uint256 maxPossibleGas) external virtual returns (bytes context, bool revertOnRecipientRevert)
```

Called by Relay (and RelayHub), to validate if the paymaster agrees to pay for this call.

MUST be protected with relayHubOnly() in case it modifies state.

The Paymaster rejects by the following "revert" operations
 - preRelayedCall() method reverts
 - the forwarder reverts because of nonce or signature error
 - the paymaster returned "rejectOnRecipientRevert", and the recipient contract reverted.
In any of the above cases, all paymaster calls (and recipient call) are reverted.
In any other case, the paymaster agrees to pay for the gas cost of the transaction (note
 that this includes also postRelayedCall revert)

The rejectOnRecipientRevert flag means the Paymaster "delegate" the rejection to the recipient
 code.  It also means the Paymaster trust the recipient to reject fast: both preRelayedCall,
 forwarder check and receipient checks must fit into the GasLimits.acceptanceBudget,
 otherwise the TX is paid by the Paymaster.

 @param relayRequest - the full relay request structure
 @param signature - user's EIP712-compatible signature of the {@link relayRequest}.
             Note that in most cases the paymaster shouldn't try use it at all. It is always checked
             by the forwarder immediately after preRelayedCall returns.
 @param approvalData - extra dapp-specific data (e.g. signature from trusted party)
 @param maxPossibleGas - based on values returned from {@link getGasAndDataLimits},
        the RelayHub will calculate the maximum possible amount of gas the user may be charged for.
        In order to convert this value to wei, the Paymaster has to call "relayHub.calculateCharge()"
 return:
     a context to be passed to postRelayedCall
     rejectOnRecipientRevert - TRUE if paymaster want to reject the TX if the recipient reverts.
         FALSE means that rejects by the recipient will be completed on chain, and paid by the paymaster.
         (note that in the latter case, the preRelayedCall and postRelayedCall are not reverted).

### postRelayedCall

```solidity
function postRelayedCall(bytes context, bool success, uint256 gasUseWithoutPost, struct GsnTypes.RelayData relayData) external virtual
```

This method is called after the actual relayed function call.
It may be used to record the transaction (e.g. charge the caller by some contract logic) for this call.

MUST be protected with relayHubOnly() in case it modifies state.

| Name | Type | Description |
| ---- | ---- | ----------- |
| context | bytes | - the call context, as returned by the preRelayedCall |
| success | bool | - true if the relayed call succeeded, false if it reverted |
| gasUseWithoutPost | uint256 | - the actual amount of gas used by the entire transaction, EXCEPT        the gas used by the postRelayedCall itself. |
| relayData | struct GsnTypes.RelayData | - the relay params of the request. can be used by relayHub.calculateCharge() Revert in this functions causes a revert of the client's relayed call (and preRelayedCall(), but the Paymaster is still committed to pay the relay for the entire transaction. |

