---
id: "Abi.IAccessControlEnumerable"
title: "Interface: IAccessControlEnumerable"
sidebar_label: "IAccessControlEnumerable"
custom_edit_url: null
---

[Abi](../namespaces/Abi.md).IAccessControlEnumerable

## Hierarchy

- `BaseContract`

  ↳ **`IAccessControlEnumerable`**

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
| `RoleAdminChanged` | (`cb?`: `Callback`<`RoleAdminChanged`\>) => `EventEmitter`(`options?`: `EventOptions`, `cb?`: `Callback`<`RoleAdminChanged`\>) => `EventEmitter` |
| `RoleGranted` | (`cb?`: `Callback`<`RoleGranted`\>) => `EventEmitter`(`options?`: `EventOptions`, `cb?`: `Callback`<`RoleGranted`\>) => `EventEmitter` |
| `RoleRevoked` | (`cb?`: `Callback`<`RoleRevoked`\>) => `EventEmitter`(`options?`: `EventOptions`, `cb?`: `Callback`<`RoleRevoked`\>) => `EventEmitter` |
| `allEvents` | (`options?`: `EventOptions`, `cb?`: `Callback`<`EventLog`\>) => `EventEmitter` |

#### Overrides

BaseContract.events

#### Defined in

packages/web3-redux/packages/web3-redux/src/typechain/IAccessControlEnumerable.d.ts:88

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
| `getRoleAdmin` | (`role`: `string` \| `number`[]) => `NonPayableTransactionObject`<`string`\> |
| `getRoleMember` | (`role`: `string` \| `number`[], `index`: `any`) => `NonPayableTransactionObject`<`string`\> |
| `getRoleMemberCount` | (`role`: `string` \| `number`[]) => `NonPayableTransactionObject`<`string`\> |
| `grantRole` | (`role`: `string` \| `number`[], `account`: `string`) => `NonPayableTransactionObject`<`void`\> |
| `hasRole` | (`role`: `string` \| `number`[], `account`: `string`) => `NonPayableTransactionObject`<`boolean`\> |
| `renounceRole` | (`role`: `string` \| `number`[], `account`: `string`) => `NonPayableTransactionObject`<`void`\> |
| `revokeRole` | (`role`: `string` \| `number`[], `account`: `string`) => `NonPayableTransactionObject`<`void`\> |

#### Overrides

BaseContract.methods

#### Defined in

packages/web3-redux/packages/web3-redux/src/typechain/IAccessControlEnumerable.d.ts:56

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

▸ **clone**(): [`IAccessControlEnumerable`](Abi.IAccessControlEnumerable.md)

#### Returns

[`IAccessControlEnumerable`](Abi.IAccessControlEnumerable.md)

#### Defined in

packages/web3-redux/packages/web3-redux/src/typechain/IAccessControlEnumerable.d.ts:55

___

### constructor

▸ **constructor**(`jsonInterface`, `address?`, `options?`): [`IAccessControlEnumerable`](Abi.IAccessControlEnumerable.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `jsonInterface` | `any`[] |
| `address?` | `string` |
| `options?` | `ContractOptions` |

#### Returns

[`IAccessControlEnumerable`](Abi.IAccessControlEnumerable.md)

#### Defined in

packages/web3-redux/packages/web3-redux/src/typechain/IAccessControlEnumerable.d.ts:50

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
| `event` | ``"RoleAdminChanged"`` |
| `cb` | `Callback`<`RoleAdminChanged`\> |

#### Returns

`void`

#### Defined in

packages/web3-redux/packages/web3-redux/src/typechain/IAccessControlEnumerable.d.ts:110

▸ **once**(`event`, `options`, `cb`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"RoleAdminChanged"`` |
| `options` | `EventOptions` |
| `cb` | `Callback`<`RoleAdminChanged`\> |

#### Returns

`void`

#### Defined in

packages/web3-redux/packages/web3-redux/src/typechain/IAccessControlEnumerable.d.ts:111

▸ **once**(`event`, `cb`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"RoleGranted"`` |
| `cb` | `Callback`<`RoleGranted`\> |

#### Returns

`void`

#### Defined in

packages/web3-redux/packages/web3-redux/src/typechain/IAccessControlEnumerable.d.ts:117

▸ **once**(`event`, `options`, `cb`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"RoleGranted"`` |
| `options` | `EventOptions` |
| `cb` | `Callback`<`RoleGranted`\> |

#### Returns

`void`

#### Defined in

packages/web3-redux/packages/web3-redux/src/typechain/IAccessControlEnumerable.d.ts:118

▸ **once**(`event`, `cb`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"RoleRevoked"`` |
| `cb` | `Callback`<`RoleRevoked`\> |

#### Returns

`void`

#### Defined in

packages/web3-redux/packages/web3-redux/src/typechain/IAccessControlEnumerable.d.ts:124

▸ **once**(`event`, `options`, `cb`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"RoleRevoked"`` |
| `options` | `EventOptions` |
| `cb` | `Callback`<`RoleRevoked`\> |

#### Returns

`void`

#### Defined in

packages/web3-redux/packages/web3-redux/src/typechain/IAccessControlEnumerable.d.ts:125
