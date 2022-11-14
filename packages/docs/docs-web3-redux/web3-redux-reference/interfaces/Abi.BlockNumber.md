---
id: "Abi.BlockNumber"
title: "Interface: BlockNumber"
sidebar_label: "BlockNumber"
custom_edit_url: null
---

[Abi](../namespaces/Abi.md).BlockNumber

## Hierarchy

- `BaseContract`

  ↳ **`BlockNumber`**

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
| `NewValue` | (`cb?`: `Callback`<`NewValue`\>) => `EventEmitter`(`options?`: `EventOptions`, `cb?`: `Callback`<`NewValue`\>) => `EventEmitter` |
| `allEvents` | (`options?`: `EventOptions`, `cb?`: `Callback`<`EventLog`\>) => `EventEmitter` |

#### Overrides

BaseContract.events

#### Defined in

packages/web3-redux/packages/web3-redux/src/typechain/BlockNumber.d.ts:51

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
| `blockNumber` | () => `NonPayableTransactionObject`<`string`\> |
| `getNumber` | (`x`: `any`) => `NonPayableTransactionObject`<`string`\> |
| `getValue` | () => `NonPayableTransactionObject`<`string`\> |
| `msgSender` | () => `PayableTransactionObject`<`string`\> |
| `msgValue` | () => `PayableTransactionObject`<`string`\> |
| `revertTx` | () => `NonPayableTransactionObject`<`void`\> |
| `setValue` | (`v`: `any`) => `NonPayableTransactionObject`<`void`\> |

#### Overrides

BaseContract.methods

#### Defined in

packages/web3-redux/packages/web3-redux/src/typechain/BlockNumber.d.ts:36

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

▸ **clone**(): [`BlockNumber`](Abi.BlockNumber.md)

#### Returns

[`BlockNumber`](Abi.BlockNumber.md)

#### Defined in

packages/web3-redux/packages/web3-redux/src/typechain/BlockNumber.d.ts:35

___

### constructor

▸ **constructor**(`jsonInterface`, `address?`, `options?`): [`BlockNumber`](Abi.BlockNumber.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `jsonInterface` | `any`[] |
| `address?` | `string` |
| `options?` | `ContractOptions` |

#### Returns

[`BlockNumber`](Abi.BlockNumber.md)

#### Defined in

packages/web3-redux/packages/web3-redux/src/typechain/BlockNumber.d.ts:30

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
| `event` | ``"NewValue"`` |
| `cb` | `Callback`<`NewValue`\> |

#### Returns

`void`

#### Defined in

packages/web3-redux/packages/web3-redux/src/typechain/BlockNumber.d.ts:58

▸ **once**(`event`, `options`, `cb`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"NewValue"`` |
| `options` | `EventOptions` |
| `cb` | `Callback`<`NewValue`\> |

#### Returns

`void`

#### Defined in

packages/web3-redux/packages/web3-redux/src/typechain/BlockNumber.d.ts:59
