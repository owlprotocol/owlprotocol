---
id: "Abi.IERC1820Registry"
title: "Interface: IERC1820Registry"
sidebar_label: "IERC1820Registry"
custom_edit_url: null
---

[Abi](../namespaces/Abi.md).IERC1820Registry

## Hierarchy

- `BaseContract`

  ↳ **`IERC1820Registry`**

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
| `InterfaceImplementerSet` | (`cb?`: `Callback`<`InterfaceImplementerSet`\>) => `EventEmitter`(`options?`: `EventOptions`, `cb?`: `Callback`<`InterfaceImplementerSet`\>) => `EventEmitter` |
| `ManagerChanged` | (`cb?`: `Callback`<`ManagerChanged`\>) => `EventEmitter`(`options?`: `EventOptions`, `cb?`: `Callback`<`ManagerChanged`\>) => `EventEmitter` |
| `allEvents` | (`options?`: `EventOptions`, `cb?`: `Callback`<`EventLog`\>) => `EventEmitter` |

#### Overrides

BaseContract.events

#### Defined in

packages/web3-redux/packages/web3-redux/src/typechain/IERC1820Registry.d.ts:82

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
| `getInterfaceImplementer` | (`account`: `string`, `_interfaceHash`: `string` \| `number`[]) => `NonPayableTransactionObject`<`string`\> |
| `getManager` | (`account`: `string`) => `NonPayableTransactionObject`<`string`\> |
| `implementsERC165Interface` | (`account`: `string`, `interfaceId`: `string` \| `number`[]) => `NonPayableTransactionObject`<`boolean`\> |
| `implementsERC165InterfaceNoCache` | (`account`: `string`, `interfaceId`: `string` \| `number`[]) => `NonPayableTransactionObject`<`boolean`\> |
| `interfaceHash` | (`interfaceName`: `string`) => `NonPayableTransactionObject`<`string`\> |
| `setInterfaceImplementer` | (`account`: `string`, `_interfaceHash`: `string` \| `number`[], `implementer`: `string`) => `NonPayableTransactionObject`<`void`\> |
| `setManager` | (`account`: `string`, `newManager`: `string`) => `NonPayableTransactionObject`<`void`\> |
| `updateERC165Cache` | (`account`: `string`, `interfaceId`: `string` \| `number`[]) => `NonPayableTransactionObject`<`void`\> |

#### Overrides

BaseContract.methods

#### Defined in

packages/web3-redux/packages/web3-redux/src/typechain/IERC1820Registry.d.ts:46

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

▸ **clone**(): [`IERC1820Registry`](Abi.IERC1820Registry.md)

#### Returns

[`IERC1820Registry`](Abi.IERC1820Registry.md)

#### Defined in

packages/web3-redux/packages/web3-redux/src/typechain/IERC1820Registry.d.ts:45

___

### constructor

▸ **constructor**(`jsonInterface`, `address?`, `options?`): [`IERC1820Registry`](Abi.IERC1820Registry.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `jsonInterface` | `any`[] |
| `address?` | `string` |
| `options?` | `ContractOptions` |

#### Returns

[`IERC1820Registry`](Abi.IERC1820Registry.md)

#### Defined in

packages/web3-redux/packages/web3-redux/src/typechain/IERC1820Registry.d.ts:40

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
| `event` | ``"InterfaceImplementerSet"`` |
| `cb` | `Callback`<`InterfaceImplementerSet`\> |

#### Returns

`void`

#### Defined in

packages/web3-redux/packages/web3-redux/src/typechain/IERC1820Registry.d.ts:100

▸ **once**(`event`, `options`, `cb`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"InterfaceImplementerSet"`` |
| `options` | `EventOptions` |
| `cb` | `Callback`<`InterfaceImplementerSet`\> |

#### Returns

`void`

#### Defined in

packages/web3-redux/packages/web3-redux/src/typechain/IERC1820Registry.d.ts:104

▸ **once**(`event`, `cb`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"ManagerChanged"`` |
| `cb` | `Callback`<`ManagerChanged`\> |

#### Returns

`void`

#### Defined in

packages/web3-redux/packages/web3-redux/src/typechain/IERC1820Registry.d.ts:110

▸ **once**(`event`, `options`, `cb`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"ManagerChanged"`` |
| `options` | `EventOptions` |
| `cb` | `Callback`<`ManagerChanged`\> |

#### Returns

`void`

#### Defined in

packages/web3-redux/packages/web3-redux/src/typechain/IERC1820Registry.d.ts:111
