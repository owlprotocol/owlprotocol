---
id: "Abi.ERC721PresetMinterPauserAutoId"
title: "Interface: ERC721PresetMinterPauserAutoId"
sidebar_label: "ERC721PresetMinterPauserAutoId"
custom_edit_url: null
---

[Abi](../namespaces/Abi.md).ERC721PresetMinterPauserAutoId

## Hierarchy

- `BaseContract`

  ↳ **`ERC721PresetMinterPauserAutoId`**

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
| `Paused` | (`cb?`: `Callback`<`Paused`\>) => `EventEmitter`(`options?`: `EventOptions`, `cb?`: `Callback`<`Paused`\>) => `EventEmitter` |
| `RoleAdminChanged` | (`cb?`: `Callback`<`RoleAdminChanged`\>) => `EventEmitter`(`options?`: `EventOptions`, `cb?`: `Callback`<`RoleAdminChanged`\>) => `EventEmitter` |
| `RoleGranted` | (`cb?`: `Callback`<`RoleGranted`\>) => `EventEmitter`(`options?`: `EventOptions`, `cb?`: `Callback`<`RoleGranted`\>) => `EventEmitter` |
| `RoleRevoked` | (`cb?`: `Callback`<`RoleRevoked`\>) => `EventEmitter`(`options?`: `EventOptions`, `cb?`: `Callback`<`RoleRevoked`\>) => `EventEmitter` |
| `Transfer` | (`cb?`: `Callback`<`Transfer`\>) => `EventEmitter`(`options?`: `EventOptions`, `cb?`: `Callback`<`Transfer`\>) => `EventEmitter` |
| `Unpaused` | (`cb?`: `Callback`<`Unpaused`\>) => `EventEmitter`(`options?`: `EventOptions`, `cb?`: `Callback`<`Unpaused`\>) => `EventEmitter` |
| `allEvents` | (`options?`: `EventOptions`, `cb?`: `Callback`<`EventLog`\>) => `EventEmitter` |

#### Overrides

BaseContract.events

#### Defined in

packages/web3-redux/packages/web3-redux/src/typechain/ERC721PresetMinterPauserAutoId.d.ts:201

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
| `approve` | (`to`: `string`, `tokenId`: `any`) => `NonPayableTransactionObject`<`void`\> |
| `balanceOf` | (`owner`: `string`) => `NonPayableTransactionObject`<`string`\> |
| `burn` | (`tokenId`: `any`) => `NonPayableTransactionObject`<`void`\> |
| `getApproved` | (`tokenId`: `any`) => `NonPayableTransactionObject`<`string`\> |
| `getRoleAdmin` | (`role`: `string` \| `number`[]) => `NonPayableTransactionObject`<`string`\> |
| `getRoleMember` | (`role`: `string` \| `number`[], `index`: `any`) => `NonPayableTransactionObject`<`string`\> |
| `getRoleMemberCount` | (`role`: `string` \| `number`[]) => `NonPayableTransactionObject`<`string`\> |
| `grantRole` | (`role`: `string` \| `number`[], `account`: `string`) => `NonPayableTransactionObject`<`void`\> |
| `hasRole` | (`role`: `string` \| `number`[], `account`: `string`) => `NonPayableTransactionObject`<`boolean`\> |
| `isApprovedForAll` | (`owner`: `string`, `operator`: `string`) => `NonPayableTransactionObject`<`boolean`\> |
| `mint` | (`to`: `string`) => `NonPayableTransactionObject`<`void`\> |
| `name` | () => `NonPayableTransactionObject`<`string`\> |
| `ownerOf` | (`tokenId`: `any`) => `NonPayableTransactionObject`<`string`\> |
| `pause` | () => `NonPayableTransactionObject`<`void`\> |
| `paused` | () => `NonPayableTransactionObject`<`boolean`\> |
| `renounceRole` | (`role`: `string` \| `number`[], `account`: `string`) => `NonPayableTransactionObject`<`void`\> |
| `revokeRole` | (`role`: `string` \| `number`[], `account`: `string`) => `NonPayableTransactionObject`<`void`\> |
| `safeTransferFrom(address,address,uint256)` | (`from`: `string`, `to`: `string`, `tokenId`: `any`) => `NonPayableTransactionObject`<`void`\> |
| `safeTransferFrom(address,address,uint256,bytes)` | (`from`: `string`, `to`: `string`, `tokenId`: `any`, `data`: `string` \| `number`[]) => `NonPayableTransactionObject`<`void`\> |
| `setApprovalForAll` | (`operator`: `string`, `approved`: `boolean`) => `NonPayableTransactionObject`<`void`\> |
| `supportsInterface` | (`interfaceId`: `string` \| `number`[]) => `NonPayableTransactionObject`<`boolean`\> |
| `symbol` | () => `NonPayableTransactionObject`<`string`\> |
| `tokenByIndex` | (`index`: `any`) => `NonPayableTransactionObject`<`string`\> |
| `tokenOfOwnerByIndex` | (`owner`: `string`, `index`: `any`) => `NonPayableTransactionObject`<`string`\> |
| `tokenURI` | (`tokenId`: `any`) => `NonPayableTransactionObject`<`string`\> |
| `totalSupply` | () => `NonPayableTransactionObject`<`string`\> |
| `transferFrom` | (`from`: `string`, `to`: `string`, `tokenId`: `any`) => `NonPayableTransactionObject`<`void`\> |
| `unpause` | () => `NonPayableTransactionObject`<`void`\> |

#### Overrides

BaseContract.methods

#### Defined in

packages/web3-redux/packages/web3-redux/src/typechain/ERC721PresetMinterPauserAutoId.d.ts:88

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

▸ **clone**(): [`ERC721PresetMinterPauserAutoId`](Abi.ERC721PresetMinterPauserAutoId.md)

#### Returns

[`ERC721PresetMinterPauserAutoId`](Abi.ERC721PresetMinterPauserAutoId.md)

#### Defined in

packages/web3-redux/packages/web3-redux/src/typechain/ERC721PresetMinterPauserAutoId.d.ts:87

___

### constructor

▸ **constructor**(`jsonInterface`, `address?`, `options?`): [`ERC721PresetMinterPauserAutoId`](Abi.ERC721PresetMinterPauserAutoId.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `jsonInterface` | `any`[] |
| `address?` | `string` |
| `options?` | `ContractOptions` |

#### Returns

[`ERC721PresetMinterPauserAutoId`](Abi.ERC721PresetMinterPauserAutoId.md)

#### Defined in

packages/web3-redux/packages/web3-redux/src/typechain/ERC721PresetMinterPauserAutoId.d.ts:82

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

packages/web3-redux/packages/web3-redux/src/typechain/ERC721PresetMinterPauserAutoId.d.ts:241

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

packages/web3-redux/packages/web3-redux/src/typechain/ERC721PresetMinterPauserAutoId.d.ts:242

▸ **once**(`event`, `cb`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"ApprovalForAll"`` |
| `cb` | `Callback`<`ApprovalForAll`\> |

#### Returns

`void`

#### Defined in

packages/web3-redux/packages/web3-redux/src/typechain/ERC721PresetMinterPauserAutoId.d.ts:244

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

packages/web3-redux/packages/web3-redux/src/typechain/ERC721PresetMinterPauserAutoId.d.ts:245

▸ **once**(`event`, `cb`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"Paused"`` |
| `cb` | `Callback`<`Paused`\> |

#### Returns

`void`

#### Defined in

packages/web3-redux/packages/web3-redux/src/typechain/ERC721PresetMinterPauserAutoId.d.ts:251

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

packages/web3-redux/packages/web3-redux/src/typechain/ERC721PresetMinterPauserAutoId.d.ts:252

▸ **once**(`event`, `cb`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"RoleAdminChanged"`` |
| `cb` | `Callback`<`RoleAdminChanged`\> |

#### Returns

`void`

#### Defined in

packages/web3-redux/packages/web3-redux/src/typechain/ERC721PresetMinterPauserAutoId.d.ts:254

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

packages/web3-redux/packages/web3-redux/src/typechain/ERC721PresetMinterPauserAutoId.d.ts:255

▸ **once**(`event`, `cb`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"RoleGranted"`` |
| `cb` | `Callback`<`RoleGranted`\> |

#### Returns

`void`

#### Defined in

packages/web3-redux/packages/web3-redux/src/typechain/ERC721PresetMinterPauserAutoId.d.ts:261

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

packages/web3-redux/packages/web3-redux/src/typechain/ERC721PresetMinterPauserAutoId.d.ts:262

▸ **once**(`event`, `cb`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"RoleRevoked"`` |
| `cb` | `Callback`<`RoleRevoked`\> |

#### Returns

`void`

#### Defined in

packages/web3-redux/packages/web3-redux/src/typechain/ERC721PresetMinterPauserAutoId.d.ts:268

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

packages/web3-redux/packages/web3-redux/src/typechain/ERC721PresetMinterPauserAutoId.d.ts:269

▸ **once**(`event`, `cb`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"Transfer"`` |
| `cb` | `Callback`<`Transfer`\> |

#### Returns

`void`

#### Defined in

packages/web3-redux/packages/web3-redux/src/typechain/ERC721PresetMinterPauserAutoId.d.ts:275

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

packages/web3-redux/packages/web3-redux/src/typechain/ERC721PresetMinterPauserAutoId.d.ts:276

▸ **once**(`event`, `cb`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"Unpaused"`` |
| `cb` | `Callback`<`Unpaused`\> |

#### Returns

`void`

#### Defined in

packages/web3-redux/packages/web3-redux/src/typechain/ERC721PresetMinterPauserAutoId.d.ts:278

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

packages/web3-redux/packages/web3-redux/src/typechain/ERC721PresetMinterPauserAutoId.d.ts:279
