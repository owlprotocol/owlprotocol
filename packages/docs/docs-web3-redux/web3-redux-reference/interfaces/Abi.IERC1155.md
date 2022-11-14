---
id: "Abi.IERC1155"
title: "Interface: IERC1155"
sidebar_label: "IERC1155"
custom_edit_url: null
---

[Abi](../namespaces/Abi.md).IERC1155

## Hierarchy

- `BaseContract`

  ↳ **`IERC1155`**

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
| `ApprovalForAll` | (`cb?`: `Callback`<`ApprovalForAll`\>) => `EventEmitter`(`options?`: `EventOptions`, `cb?`: `Callback`<`ApprovalForAll`\>) => `EventEmitter` |
| `TransferBatch` | (`cb?`: `Callback`<`TransferBatch`\>) => `EventEmitter`(`options?`: `EventOptions`, `cb?`: `Callback`<`TransferBatch`\>) => `EventEmitter` |
| `TransferSingle` | (`cb?`: `Callback`<`TransferSingle`\>) => `EventEmitter`(`options?`: `EventOptions`, `cb?`: `Callback`<`TransferSingle`\>) => `EventEmitter` |
| `URI` | (`cb?`: `Callback`<`URI`\>) => `EventEmitter`(`options?`: `EventOptions`, `cb?`: `Callback`<`URI`\>) => `EventEmitter` |
| `allEvents` | (`options?`: `EventOptions`, `cb?`: `Callback`<`EventLog`\>) => `EventEmitter` |

#### Overrides

BaseContract.events

#### Defined in

packages/web3-redux/packages/web3-redux/src/typechain/IERC1155.d.ts:111

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
| `balanceOf` | (`account`: `string`, `id`: `any`) => `NonPayableTransactionObject`<`string`\> |
| `balanceOfBatch` | (`accounts`: `string`[], `ids`: `any`[]) => `NonPayableTransactionObject`<`string`[]\> |
| `isApprovedForAll` | (`account`: `string`, `operator`: `string`) => `NonPayableTransactionObject`<`boolean`\> |
| `safeBatchTransferFrom` | (`from`: `string`, `to`: `string`, `ids`: `any`[], `amounts`: `any`[], `data`: `string` \| `number`[]) => `NonPayableTransactionObject`<`void`\> |
| `safeTransferFrom` | (`from`: `string`, `to`: `string`, `id`: `any`, `amount`: `any`, `data`: `string` \| `number`[]) => `NonPayableTransactionObject`<`void`\> |
| `setApprovalForAll` | (`operator`: `string`, `approved`: `boolean`) => `NonPayableTransactionObject`<`void`\> |
| `supportsInterface` | (`interfaceId`: `string` \| `number`[]) => `NonPayableTransactionObject`<`boolean`\> |

#### Overrides

BaseContract.methods

#### Defined in

packages/web3-redux/packages/web3-redux/src/typechain/IERC1155.d.ts:70

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

▸ **clone**(): [`IERC1155`](Abi.IERC1155.md)

#### Returns

[`IERC1155`](Abi.IERC1155.md)

#### Defined in

packages/web3-redux/packages/web3-redux/src/typechain/IERC1155.d.ts:69

___

### constructor

▸ **constructor**(`jsonInterface`, `address?`, `options?`): [`IERC1155`](Abi.IERC1155.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `jsonInterface` | `any`[] |
| `address?` | `string` |
| `options?` | `ContractOptions` |

#### Returns

[`IERC1155`](Abi.IERC1155.md)

#### Defined in

packages/web3-redux/packages/web3-redux/src/typechain/IERC1155.d.ts:64

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
| `event` | ``"ApprovalForAll"`` |
| `cb` | `Callback`<`ApprovalForAll`\> |

#### Returns

`void`

#### Defined in

packages/web3-redux/packages/web3-redux/src/typechain/IERC1155.d.ts:136

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

packages/web3-redux/packages/web3-redux/src/typechain/IERC1155.d.ts:137

▸ **once**(`event`, `cb`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"TransferBatch"`` |
| `cb` | `Callback`<`TransferBatch`\> |

#### Returns

`void`

#### Defined in

packages/web3-redux/packages/web3-redux/src/typechain/IERC1155.d.ts:143

▸ **once**(`event`, `options`, `cb`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"TransferBatch"`` |
| `options` | `EventOptions` |
| `cb` | `Callback`<`TransferBatch`\> |

#### Returns

`void`

#### Defined in

packages/web3-redux/packages/web3-redux/src/typechain/IERC1155.d.ts:144

▸ **once**(`event`, `cb`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"TransferSingle"`` |
| `cb` | `Callback`<`TransferSingle`\> |

#### Returns

`void`

#### Defined in

packages/web3-redux/packages/web3-redux/src/typechain/IERC1155.d.ts:150

▸ **once**(`event`, `options`, `cb`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"TransferSingle"`` |
| `options` | `EventOptions` |
| `cb` | `Callback`<`TransferSingle`\> |

#### Returns

`void`

#### Defined in

packages/web3-redux/packages/web3-redux/src/typechain/IERC1155.d.ts:151

▸ **once**(`event`, `cb`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"URI"`` |
| `cb` | `Callback`<`URI`\> |

#### Returns

`void`

#### Defined in

packages/web3-redux/packages/web3-redux/src/typechain/IERC1155.d.ts:157

▸ **once**(`event`, `options`, `cb`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"URI"`` |
| `options` | `EventOptions` |
| `cb` | `Callback`<`URI`\> |

#### Returns

`void`

#### Defined in

packages/web3-redux/packages/web3-redux/src/typechain/IERC1155.d.ts:158
