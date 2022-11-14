---
id: "Abi.ERC1155PresetMinterPauser"
title: "Interface: ERC1155PresetMinterPauser"
sidebar_label: "ERC1155PresetMinterPauser"
custom_edit_url: null
---

[Abi](../namespaces/Abi.md).ERC1155PresetMinterPauser

## Hierarchy

- `BaseContract`

  ↳ **`ERC1155PresetMinterPauser`**

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
| `Paused` | (`cb?`: `Callback`<`Paused`\>) => `EventEmitter`(`options?`: `EventOptions`, `cb?`: `Callback`<`Paused`\>) => `EventEmitter` |
| `RoleAdminChanged` | (`cb?`: `Callback`<`RoleAdminChanged`\>) => `EventEmitter`(`options?`: `EventOptions`, `cb?`: `Callback`<`RoleAdminChanged`\>) => `EventEmitter` |
| `RoleGranted` | (`cb?`: `Callback`<`RoleGranted`\>) => `EventEmitter`(`options?`: `EventOptions`, `cb?`: `Callback`<`RoleGranted`\>) => `EventEmitter` |
| `RoleRevoked` | (`cb?`: `Callback`<`RoleRevoked`\>) => `EventEmitter`(`options?`: `EventOptions`, `cb?`: `Callback`<`RoleRevoked`\>) => `EventEmitter` |
| `TransferBatch` | (`cb?`: `Callback`<`TransferBatch`\>) => `EventEmitter`(`options?`: `EventOptions`, `cb?`: `Callback`<`TransferBatch`\>) => `EventEmitter` |
| `TransferSingle` | (`cb?`: `Callback`<`TransferSingle`\>) => `EventEmitter`(`options?`: `EventOptions`, `cb?`: `Callback`<`TransferSingle`\>) => `EventEmitter` |
| `URI` | (`cb?`: `Callback`<`URI`\>) => `EventEmitter`(`options?`: `EventOptions`, `cb?`: `Callback`<`URI`\>) => `EventEmitter` |
| `Unpaused` | (`cb?`: `Callback`<`Unpaused`\>) => `EventEmitter`(`options?`: `EventOptions`, `cb?`: `Callback`<`Unpaused`\>) => `EventEmitter` |
| `allEvents` | (`options?`: `EventOptions`, `cb?`: `Callback`<`EventLog`\>) => `EventEmitter` |

#### Overrides

BaseContract.events

#### Defined in

packages/web3-redux/packages/web3-redux/src/typechain/ERC1155PresetMinterPauser.d.ts:214

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
| `DEFAULT_ADMIN_ROLE` | () => `NonPayableTransactionObject`<`string`\> |
| `MINTER_ROLE` | () => `NonPayableTransactionObject`<`string`\> |
| `PAUSER_ROLE` | () => `NonPayableTransactionObject`<`string`\> |
| `balanceOf` | (`account`: `string`, `id`: `any`) => `NonPayableTransactionObject`<`string`\> |
| `balanceOfBatch` | (`accounts`: `string`[], `ids`: `any`[]) => `NonPayableTransactionObject`<`string`[]\> |
| `burn` | (`account`: `string`, `id`: `any`, `value`: `any`) => `NonPayableTransactionObject`<`void`\> |
| `burnBatch` | (`account`: `string`, `ids`: `any`[], `values`: `any`[]) => `NonPayableTransactionObject`<`void`\> |
| `getRoleAdmin` | (`role`: `string` \| `number`[]) => `NonPayableTransactionObject`<`string`\> |
| `getRoleMember` | (`role`: `string` \| `number`[], `index`: `any`) => `NonPayableTransactionObject`<`string`\> |
| `getRoleMemberCount` | (`role`: `string` \| `number`[]) => `NonPayableTransactionObject`<`string`\> |
| `grantRole` | (`role`: `string` \| `number`[], `account`: `string`) => `NonPayableTransactionObject`<`void`\> |
| `hasRole` | (`role`: `string` \| `number`[], `account`: `string`) => `NonPayableTransactionObject`<`boolean`\> |
| `isApprovedForAll` | (`account`: `string`, `operator`: `string`) => `NonPayableTransactionObject`<`boolean`\> |
| `mint` | (`to`: `string`, `id`: `any`, `amount`: `any`, `data`: `string` \| `number`[]) => `NonPayableTransactionObject`<`void`\> |
| `mintBatch` | (`to`: `string`, `ids`: `any`[], `amounts`: `any`[], `data`: `string` \| `number`[]) => `NonPayableTransactionObject`<`void`\> |
| `pause` | () => `NonPayableTransactionObject`<`void`\> |
| `paused` | () => `NonPayableTransactionObject`<`boolean`\> |
| `renounceRole` | (`role`: `string` \| `number`[], `account`: `string`) => `NonPayableTransactionObject`<`void`\> |
| `revokeRole` | (`role`: `string` \| `number`[], `account`: `string`) => `NonPayableTransactionObject`<`void`\> |
| `safeBatchTransferFrom` | (`from`: `string`, `to`: `string`, `ids`: `any`[], `amounts`: `any`[], `data`: `string` \| `number`[]) => `NonPayableTransactionObject`<`void`\> |
| `safeTransferFrom` | (`from`: `string`, `to`: `string`, `id`: `any`, `amount`: `any`, `data`: `string` \| `number`[]) => `NonPayableTransactionObject`<`void`\> |
| `setApprovalForAll` | (`operator`: `string`, `approved`: `boolean`) => `NonPayableTransactionObject`<`void`\> |
| `supportsInterface` | (`interfaceId`: `string` \| `number`[]) => `NonPayableTransactionObject`<`boolean`\> |
| `unpause` | () => `NonPayableTransactionObject`<`void`\> |
| `uri` | (`arg0`: `any`) => `NonPayableTransactionObject`<`string`\> |

#### Overrides

BaseContract.methods

#### Defined in

packages/web3-redux/packages/web3-redux/src/typechain/ERC1155PresetMinterPauser.d.ts:102

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

▸ **clone**(): [`ERC1155PresetMinterPauser`](Abi.ERC1155PresetMinterPauser.md)

#### Returns

[`ERC1155PresetMinterPauser`](Abi.ERC1155PresetMinterPauser.md)

#### Defined in

packages/web3-redux/packages/web3-redux/src/typechain/ERC1155PresetMinterPauser.d.ts:101

___

### constructor

▸ **constructor**(`jsonInterface`, `address?`, `options?`): [`ERC1155PresetMinterPauser`](Abi.ERC1155PresetMinterPauser.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `jsonInterface` | `any`[] |
| `address?` | `string` |
| `options?` | `ContractOptions` |

#### Returns

[`ERC1155PresetMinterPauser`](Abi.ERC1155PresetMinterPauser.md)

#### Defined in

packages/web3-redux/packages/web3-redux/src/typechain/ERC1155PresetMinterPauser.d.ts:96

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

packages/web3-redux/packages/web3-redux/src/typechain/ERC1155PresetMinterPauser.d.ts:263

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

packages/web3-redux/packages/web3-redux/src/typechain/ERC1155PresetMinterPauser.d.ts:264

▸ **once**(`event`, `cb`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"Paused"`` |
| `cb` | `Callback`<`Paused`\> |

#### Returns

`void`

#### Defined in

packages/web3-redux/packages/web3-redux/src/typechain/ERC1155PresetMinterPauser.d.ts:270

▸ **once**(`event`, `options`, `cb`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"Paused"`` |
| `options` | `EventOptions` |
| `cb` | `Callback`<`Paused`\> |

#### Returns

`void`

#### Defined in

packages/web3-redux/packages/web3-redux/src/typechain/ERC1155PresetMinterPauser.d.ts:271

▸ **once**(`event`, `cb`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"RoleAdminChanged"`` |
| `cb` | `Callback`<`RoleAdminChanged`\> |

#### Returns

`void`

#### Defined in

packages/web3-redux/packages/web3-redux/src/typechain/ERC1155PresetMinterPauser.d.ts:273

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

packages/web3-redux/packages/web3-redux/src/typechain/ERC1155PresetMinterPauser.d.ts:274

▸ **once**(`event`, `cb`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"RoleGranted"`` |
| `cb` | `Callback`<`RoleGranted`\> |

#### Returns

`void`

#### Defined in

packages/web3-redux/packages/web3-redux/src/typechain/ERC1155PresetMinterPauser.d.ts:280

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

packages/web3-redux/packages/web3-redux/src/typechain/ERC1155PresetMinterPauser.d.ts:281

▸ **once**(`event`, `cb`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"RoleRevoked"`` |
| `cb` | `Callback`<`RoleRevoked`\> |

#### Returns

`void`

#### Defined in

packages/web3-redux/packages/web3-redux/src/typechain/ERC1155PresetMinterPauser.d.ts:287

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

packages/web3-redux/packages/web3-redux/src/typechain/ERC1155PresetMinterPauser.d.ts:288

▸ **once**(`event`, `cb`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"TransferBatch"`` |
| `cb` | `Callback`<`TransferBatch`\> |

#### Returns

`void`

#### Defined in

packages/web3-redux/packages/web3-redux/src/typechain/ERC1155PresetMinterPauser.d.ts:294

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

packages/web3-redux/packages/web3-redux/src/typechain/ERC1155PresetMinterPauser.d.ts:295

▸ **once**(`event`, `cb`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"TransferSingle"`` |
| `cb` | `Callback`<`TransferSingle`\> |

#### Returns

`void`

#### Defined in

packages/web3-redux/packages/web3-redux/src/typechain/ERC1155PresetMinterPauser.d.ts:301

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

packages/web3-redux/packages/web3-redux/src/typechain/ERC1155PresetMinterPauser.d.ts:302

▸ **once**(`event`, `cb`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"URI"`` |
| `cb` | `Callback`<`URI`\> |

#### Returns

`void`

#### Defined in

packages/web3-redux/packages/web3-redux/src/typechain/ERC1155PresetMinterPauser.d.ts:308

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

packages/web3-redux/packages/web3-redux/src/typechain/ERC1155PresetMinterPauser.d.ts:309

▸ **once**(`event`, `cb`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"Unpaused"`` |
| `cb` | `Callback`<`Unpaused`\> |

#### Returns

`void`

#### Defined in

packages/web3-redux/packages/web3-redux/src/typechain/ERC1155PresetMinterPauser.d.ts:311

▸ **once**(`event`, `options`, `cb`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"Unpaused"`` |
| `options` | `EventOptions` |
| `cb` | `Callback`<`Unpaused`\> |

#### Returns

`void`

#### Defined in

packages/web3-redux/packages/web3-redux/src/typechain/ERC1155PresetMinterPauser.d.ts:312
