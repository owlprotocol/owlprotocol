---
id: "Abi.ERC20PresetMinterPauser"
title: "Interface: ERC20PresetMinterPauser"
sidebar_label: "ERC20PresetMinterPauser"
custom_edit_url: null
---

[Abi](../namespaces/Abi.md).ERC20PresetMinterPauser

## Hierarchy

- `BaseContract`

  ↳ **`ERC20PresetMinterPauser`**

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

packages/web3-redux/packages/web3-redux/src/typechain/ERC20PresetMinterPauser.d.ts:181

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
| `allowance` | (`owner`: `string`, `spender`: `string`) => `NonPayableTransactionObject`<`string`\> |
| `approve` | (`spender`: `string`, `amount`: `any`) => `NonPayableTransactionObject`<`boolean`\> |
| `balanceOf` | (`account`: `string`) => `NonPayableTransactionObject`<`string`\> |
| `burn` | (`amount`: `any`) => `NonPayableTransactionObject`<`void`\> |
| `burnFrom` | (`account`: `string`, `amount`: `any`) => `NonPayableTransactionObject`<`void`\> |
| `decimals` | () => `NonPayableTransactionObject`<`string`\> |
| `decreaseAllowance` | (`spender`: `string`, `subtractedValue`: `any`) => `NonPayableTransactionObject`<`boolean`\> |
| `getRoleAdmin` | (`role`: `string` \| `number`[]) => `NonPayableTransactionObject`<`string`\> |
| `getRoleMember` | (`role`: `string` \| `number`[], `index`: `any`) => `NonPayableTransactionObject`<`string`\> |
| `getRoleMemberCount` | (`role`: `string` \| `number`[]) => `NonPayableTransactionObject`<`string`\> |
| `grantRole` | (`role`: `string` \| `number`[], `account`: `string`) => `NonPayableTransactionObject`<`void`\> |
| `hasRole` | (`role`: `string` \| `number`[], `account`: `string`) => `NonPayableTransactionObject`<`boolean`\> |
| `increaseAllowance` | (`spender`: `string`, `addedValue`: `any`) => `NonPayableTransactionObject`<`boolean`\> |
| `mint` | (`to`: `string`, `amount`: `any`) => `NonPayableTransactionObject`<`void`\> |
| `name` | () => `NonPayableTransactionObject`<`string`\> |
| `pause` | () => `NonPayableTransactionObject`<`void`\> |
| `paused` | () => `NonPayableTransactionObject`<`boolean`\> |
| `renounceRole` | (`role`: `string` \| `number`[], `account`: `string`) => `NonPayableTransactionObject`<`void`\> |
| `revokeRole` | (`role`: `string` \| `number`[], `account`: `string`) => `NonPayableTransactionObject`<`void`\> |
| `supportsInterface` | (`interfaceId`: `string` \| `number`[]) => `NonPayableTransactionObject`<`boolean`\> |
| `symbol` | () => `NonPayableTransactionObject`<`string`\> |
| `totalSupply` | () => `NonPayableTransactionObject`<`string`\> |
| `transfer` | (`to`: `string`, `amount`: `any`) => `NonPayableTransactionObject`<`boolean`\> |
| `transferFrom` | (`from`: `string`, `to`: `string`, `amount`: `any`) => `NonPayableTransactionObject`<`boolean`\> |
| `unpause` | () => `NonPayableTransactionObject`<`void`\> |

#### Overrides

BaseContract.methods

#### Defined in

packages/web3-redux/packages/web3-redux/src/typechain/ERC20PresetMinterPauser.d.ts:80

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

▸ **clone**(): [`ERC20PresetMinterPauser`](Abi.ERC20PresetMinterPauser.md)

#### Returns

[`ERC20PresetMinterPauser`](Abi.ERC20PresetMinterPauser.md)

#### Defined in

packages/web3-redux/packages/web3-redux/src/typechain/ERC20PresetMinterPauser.d.ts:79

___

### constructor

▸ **constructor**(`jsonInterface`, `address?`, `options?`): [`ERC20PresetMinterPauser`](Abi.ERC20PresetMinterPauser.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `jsonInterface` | `any`[] |
| `address?` | `string` |
| `options?` | `ContractOptions` |

#### Returns

[`ERC20PresetMinterPauser`](Abi.ERC20PresetMinterPauser.md)

#### Defined in

packages/web3-redux/packages/web3-redux/src/typechain/ERC20PresetMinterPauser.d.ts:74

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

packages/web3-redux/packages/web3-redux/src/typechain/ERC20PresetMinterPauser.d.ts:215

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

packages/web3-redux/packages/web3-redux/src/typechain/ERC20PresetMinterPauser.d.ts:216

▸ **once**(`event`, `cb`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"Paused"`` |
| `cb` | `Callback`<`Paused`\> |

#### Returns

`void`

#### Defined in

packages/web3-redux/packages/web3-redux/src/typechain/ERC20PresetMinterPauser.d.ts:218

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

packages/web3-redux/packages/web3-redux/src/typechain/ERC20PresetMinterPauser.d.ts:219

▸ **once**(`event`, `cb`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"RoleAdminChanged"`` |
| `cb` | `Callback`<`RoleAdminChanged`\> |

#### Returns

`void`

#### Defined in

packages/web3-redux/packages/web3-redux/src/typechain/ERC20PresetMinterPauser.d.ts:221

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

packages/web3-redux/packages/web3-redux/src/typechain/ERC20PresetMinterPauser.d.ts:222

▸ **once**(`event`, `cb`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"RoleGranted"`` |
| `cb` | `Callback`<`RoleGranted`\> |

#### Returns

`void`

#### Defined in

packages/web3-redux/packages/web3-redux/src/typechain/ERC20PresetMinterPauser.d.ts:228

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

packages/web3-redux/packages/web3-redux/src/typechain/ERC20PresetMinterPauser.d.ts:229

▸ **once**(`event`, `cb`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"RoleRevoked"`` |
| `cb` | `Callback`<`RoleRevoked`\> |

#### Returns

`void`

#### Defined in

packages/web3-redux/packages/web3-redux/src/typechain/ERC20PresetMinterPauser.d.ts:235

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

packages/web3-redux/packages/web3-redux/src/typechain/ERC20PresetMinterPauser.d.ts:236

▸ **once**(`event`, `cb`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"Transfer"`` |
| `cb` | `Callback`<`Transfer`\> |

#### Returns

`void`

#### Defined in

packages/web3-redux/packages/web3-redux/src/typechain/ERC20PresetMinterPauser.d.ts:242

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

packages/web3-redux/packages/web3-redux/src/typechain/ERC20PresetMinterPauser.d.ts:243

▸ **once**(`event`, `cb`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"Unpaused"`` |
| `cb` | `Callback`<`Unpaused`\> |

#### Returns

`void`

#### Defined in

packages/web3-redux/packages/web3-redux/src/typechain/ERC20PresetMinterPauser.d.ts:245

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

packages/web3-redux/packages/web3-redux/src/typechain/ERC20PresetMinterPauser.d.ts:246
