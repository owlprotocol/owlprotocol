---
id: "Abi.IERC721Metadata"
title: "Interface: IERC721Metadata"
sidebar_label: "IERC721Metadata"
custom_edit_url: null
---

[Abi](../namespaces/Abi.md).IERC721Metadata

## Hierarchy

- `BaseContract`

  ↳ **`IERC721Metadata`**

## Properties

### defaultAccount

• **defaultAccount**: ``null`` \| `string`

#### Inherited from

BaseContract.defaultAccount

#### Defined in

node_modules/.pnpm/web3-eth-contract@1.8.0/node_modules/web3-eth-contract/types/index.d.ts:37

___

### defaultBlock

• **defaultBlock**: `BlockNumber`

#### Inherited from

BaseContract.defaultBlock

#### Defined in

node_modules/.pnpm/web3-eth-contract@1.8.0/node_modules/web3-eth-contract/types/index.d.ts:38

___

### defaultChain

• **defaultChain**: `chain`

#### Inherited from

BaseContract.defaultChain

#### Defined in

node_modules/.pnpm/web3-eth-contract@1.8.0/node_modules/web3-eth-contract/types/index.d.ts:41

___

### defaultCommon

• **defaultCommon**: `Common`

#### Inherited from

BaseContract.defaultCommon

#### Defined in

node_modules/.pnpm/web3-eth-contract@1.8.0/node_modules/web3-eth-contract/types/index.d.ts:39

___

### defaultHardfork

• **defaultHardfork**: `hardfork`

#### Inherited from

BaseContract.defaultHardfork

#### Defined in

node_modules/.pnpm/web3-eth-contract@1.8.0/node_modules/web3-eth-contract/types/index.d.ts:40

___

### events

• **events**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `Approval` | (`cb?`: `Callback`<`Approval`\>) => `EventEmitter`(`options?`: `EventOptions`, `cb?`: `Callback`<`Approval`\>) => `EventEmitter` |
| `ApprovalForAll` | (`cb?`: `Callback`<`ApprovalForAll`\>) => `EventEmitter`(`options?`: `EventOptions`, `cb?`: `Callback`<`ApprovalForAll`\>) => `EventEmitter` |
| `Transfer` | (`cb?`: `Callback`<`Transfer`\>) => `EventEmitter`(`options?`: `EventOptions`, `cb?`: `Callback`<`Transfer`\>) => `EventEmitter` |
| `allEvents` | (`options?`: `EventOptions`, `cb?`: `Callback`<`EventLog`\>) => `EventEmitter` |

#### Overrides

BaseContract.events

#### Defined in

packages/web3-redux/packages/web3-redux/src/typechain/IERC721Metadata.d.ts:111

___

### handleRevert

• **handleRevert**: `boolean`

#### Inherited from

BaseContract.handleRevert

#### Defined in

node_modules/.pnpm/web3-eth-contract@1.8.0/node_modules/web3-eth-contract/types/index.d.ts:45

___

### methods

• **methods**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `approve` | (`to`: `string`, `tokenId`: `any`) => `NonPayableTransactionObject`<`void`\> |
| `balanceOf` | (`owner`: `string`) => `NonPayableTransactionObject`<`string`\> |
| `getApproved` | (`tokenId`: `any`) => `NonPayableTransactionObject`<`string`\> |
| `isApprovedForAll` | (`owner`: `string`, `operator`: `string`) => `NonPayableTransactionObject`<`boolean`\> |
| `name` | () => `NonPayableTransactionObject`<`string`\> |
| `ownerOf` | (`tokenId`: `any`) => `NonPayableTransactionObject`<`string`\> |
| `safeTransferFrom(address,address,uint256)` | (`from`: `string`, `to`: `string`, `tokenId`: `any`) => `NonPayableTransactionObject`<`void`\> |
| `safeTransferFrom(address,address,uint256,bytes)` | (`from`: `string`, `to`: `string`, `tokenId`: `any`, `data`: `string` \| `number`[]) => `NonPayableTransactionObject`<`void`\> |
| `setApprovalForAll` | (`operator`: `string`, `_approved`: `boolean`) => `NonPayableTransactionObject`<`void`\> |
| `supportsInterface` | (`interfaceId`: `string` \| `number`[]) => `NonPayableTransactionObject`<`boolean`\> |
| `symbol` | () => `NonPayableTransactionObject`<`string`\> |
| `tokenURI` | (`tokenId`: `any`) => `NonPayableTransactionObject`<`string`\> |
| `transferFrom` | (`from`: `string`, `to`: `string`, `tokenId`: `any`) => `NonPayableTransactionObject`<`void`\> |

#### Overrides

BaseContract.methods

#### Defined in

packages/web3-redux/packages/web3-redux/src/typechain/IERC721Metadata.d.ts:56

___

### options

• **options**: `Options`

#### Inherited from

BaseContract.options

#### Defined in

node_modules/.pnpm/web3-eth-contract@1.8.0/node_modules/web3-eth-contract/types/index.d.ts:47

___

### transactionBlockTimeout

• **transactionBlockTimeout**: `number`

#### Inherited from

BaseContract.transactionBlockTimeout

#### Defined in

node_modules/.pnpm/web3-eth-contract@1.8.0/node_modules/web3-eth-contract/types/index.d.ts:44

___

### transactionConfirmationBlocks

• **transactionConfirmationBlocks**: `number`

#### Inherited from

BaseContract.transactionConfirmationBlocks

#### Defined in

node_modules/.pnpm/web3-eth-contract@1.8.0/node_modules/web3-eth-contract/types/index.d.ts:43

___

### transactionPollingTimeout

• **transactionPollingTimeout**: `number`

#### Inherited from

BaseContract.transactionPollingTimeout

#### Defined in

node_modules/.pnpm/web3-eth-contract@1.8.0/node_modules/web3-eth-contract/types/index.d.ts:42

## Methods

### clone

▸ **clone**(): [`IERC721Metadata`](Abi.IERC721Metadata.md)

#### Returns

[`IERC721Metadata`](Abi.IERC721Metadata.md)

#### Defined in

packages/web3-redux/packages/web3-redux/src/typechain/IERC721Metadata.d.ts:55

___

### constructor

▸ **constructor**(`jsonInterface`, `address?`, `options?`): [`IERC721Metadata`](Abi.IERC721Metadata.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `jsonInterface` | `any`[] |
| `address?` | `string` |
| `options?` | `ContractOptions` |

#### Returns

[`IERC721Metadata`](Abi.IERC721Metadata.md)

#### Defined in

packages/web3-redux/packages/web3-redux/src/typechain/IERC721Metadata.d.ts:50

___

### deploy

▸ **deploy**(`options`): `ContractSendMethod`

#### Parameters

| Name | Type |
| :------ | :------ |
| `options` | `DeployOptions` |

#### Returns

`ContractSendMethod`

#### Inherited from

BaseContract.deploy

#### Defined in

node_modules/.pnpm/web3-eth-contract@1.8.0/node_modules/web3-eth-contract/types/index.d.ts:51

___

### getPastEvents

▸ **getPastEvents**(`event`): `Promise`<`EventData`[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | `string` |

#### Returns

`Promise`<`EventData`[]\>

#### Inherited from

BaseContract.getPastEvents

#### Defined in

node_modules/.pnpm/web3-eth-contract@1.8.0/node_modules/web3-eth-contract/types/index.d.ts:67

▸ **getPastEvents**(`event`, `options`, `callback`): `Promise`<`EventData`[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | `string` |
| `options` | `PastEventOptions` |
| `callback` | (`error`: `Error`, `event`: `EventData`) => `void` |

#### Returns

`Promise`<`EventData`[]\>

#### Inherited from

BaseContract.getPastEvents

#### Defined in

node_modules/.pnpm/web3-eth-contract@1.8.0/node_modules/web3-eth-contract/types/index.d.ts:68

▸ **getPastEvents**(`event`, `options`): `Promise`<`EventData`[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | `string` |
| `options` | `PastEventOptions` |

#### Returns

`Promise`<`EventData`[]\>

#### Inherited from

BaseContract.getPastEvents

#### Defined in

node_modules/.pnpm/web3-eth-contract@1.8.0/node_modules/web3-eth-contract/types/index.d.ts:73

▸ **getPastEvents**(`event`, `callback`): `Promise`<`EventData`[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | `string` |
| `callback` | (`error`: `Error`, `event`: `EventData`) => `void` |

#### Returns

`Promise`<`EventData`[]\>

#### Inherited from

BaseContract.getPastEvents

#### Defined in

node_modules/.pnpm/web3-eth-contract@1.8.0/node_modules/web3-eth-contract/types/index.d.ts:74

___

### once

▸ **once**(`event`, `cb`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"Approval"`` |
| `cb` | `Callback`<`Approval`\> |

#### Returns

`void`

#### Defined in

packages/web3-redux/packages/web3-redux/src/typechain/IERC721Metadata.d.ts:127

▸ **once**(`event`, `options`, `cb`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"Approval"`` |
| `options` | `EventOptions` |
| `cb` | `Callback`<`Approval`\> |

#### Returns

`void`

#### Defined in

packages/web3-redux/packages/web3-redux/src/typechain/IERC721Metadata.d.ts:128

▸ **once**(`event`, `cb`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"ApprovalForAll"`` |
| `cb` | `Callback`<`ApprovalForAll`\> |

#### Returns

`void`

#### Defined in

packages/web3-redux/packages/web3-redux/src/typechain/IERC721Metadata.d.ts:130

▸ **once**(`event`, `options`, `cb`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"ApprovalForAll"`` |
| `options` | `EventOptions` |
| `cb` | `Callback`<`ApprovalForAll`\> |

#### Returns

`void`

#### Defined in

packages/web3-redux/packages/web3-redux/src/typechain/IERC721Metadata.d.ts:131

▸ **once**(`event`, `cb`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"Transfer"`` |
| `cb` | `Callback`<`Transfer`\> |

#### Returns

`void`

#### Defined in

packages/web3-redux/packages/web3-redux/src/typechain/IERC721Metadata.d.ts:137

▸ **once**(`event`, `options`, `cb`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"Transfer"`` |
| `options` | `EventOptions` |
| `cb` | `Callback`<`Transfer`\> |

#### Returns

`void`

#### Defined in

packages/web3-redux/packages/web3-redux/src/typechain/IERC721Metadata.d.ts:138
