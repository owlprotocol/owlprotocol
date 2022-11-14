---
id: "Web3ReduxDexie"
title: "Class: Web3ReduxDexie"
sidebar_label: "Web3ReduxDexie"
sidebar_position: 0
custom_edit_url: null
---

## Hierarchy

- `Dexie`

  ↳ **`Web3ReduxDexie`**

## Constructors

### constructor

• **new Web3ReduxDexie**()

#### Overrides

Dexie.constructor

#### Defined in

[packages/web3-redux/packages/web3-redux/src/db.ts:53](https://github.com/owlprotocol/workspace/blob/13023f93/packages/web3-redux/packages/web3-redux/src/db.ts#L53)

## Properties

### 4Byte

• **4Byte**: `Table`<`_4ByteSignature`, `IndexableType`\>

#### Defined in

[packages/web3-redux/packages/web3-redux/src/db.ts:38](https://github.com/owlprotocol/workspace/blob/13023f93/packages/web3-redux/packages/web3-redux/src/db.ts#L38)

___

### Block

• **Block**: `Table`<`BlockTransaction`, `IndexableType`\>

#### Defined in

[packages/web3-redux/packages/web3-redux/src/db.ts:39](https://github.com/owlprotocol/workspace/blob/13023f93/packages/web3-redux/packages/web3-redux/src/db.ts#L39)

___

### Collection

• **Collection**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `prototype` | `Collection`<`any`, `IndexableType`\> |

#### Inherited from

Dexie.Collection

#### Defined in

node_modules/.pnpm/dexie@3.2.2/node_modules/dexie/dist/dexie.d.ts:784

___

### Config

• **Config**: `Table`<`Config`, `IndexableType`\>

#### Defined in

[packages/web3-redux/packages/web3-redux/src/db.ts:40](https://github.com/owlprotocol/workspace/blob/13023f93/packages/web3-redux/packages/web3-redux/src/db.ts#L40)

___

### Contract

• **Contract**: `Table`<`Contract`, `IndexableType`\>

#### Defined in

[packages/web3-redux/packages/web3-redux/src/db.ts:41](https://github.com/owlprotocol/workspace/blob/13023f93/packages/web3-redux/packages/web3-redux/src/db.ts#L41)

___

### ContractEvent

• **ContractEvent**: `Table`<`ContractEvent`<`Record`<`string`, `any`\>\>, `IndexableType`\>

#### Defined in

[packages/web3-redux/packages/web3-redux/src/db.ts:42](https://github.com/owlprotocol/workspace/blob/13023f93/packages/web3-redux/packages/web3-redux/src/db.ts#L42)

___

### ContractEventQuery

• **ContractEventQuery**: `Table`<`ContractEventQuery`, `IndexableType`\>

#### Defined in

[packages/web3-redux/packages/web3-redux/src/db.ts:43](https://github.com/owlprotocol/workspace/blob/13023f93/packages/web3-redux/packages/web3-redux/src/db.ts#L43)

___

### ContractSend

• **ContractSend**: `Table`<`ContractSend`, `IndexableType`\>

#### Defined in

[packages/web3-redux/packages/web3-redux/src/db.ts:44](https://github.com/owlprotocol/workspace/blob/13023f93/packages/web3-redux/packages/web3-redux/src/db.ts#L44)

___

### EthCall

• **EthCall**: `Table`<`EthCall`, `IndexableType`\>

#### Defined in

[packages/web3-redux/packages/web3-redux/src/db.ts:46](https://github.com/owlprotocol/workspace/blob/13023f93/packages/web3-redux/packages/web3-redux/src/db.ts#L46)

___

### EthTransaction

• **EthTransaction**: `Table`<`Transaction`, `IndexableType`\>

#### Defined in

[packages/web3-redux/packages/web3-redux/src/db.ts:51](https://github.com/owlprotocol/workspace/blob/13023f93/packages/web3-redux/packages/web3-redux/src/db.ts#L51)

___

### HTTPCache

• **HTTPCache**: `Table`<`HTTPCache`, `IndexableType`\>

#### Defined in

[packages/web3-redux/packages/web3-redux/src/db.ts:47](https://github.com/owlprotocol/workspace/blob/13023f93/packages/web3-redux/packages/web3-redux/src/db.ts#L47)

___

### IPFSCache

• **IPFSCache**: `Table`<`Ipfs`, `IndexableType`\>

#### Defined in

[packages/web3-redux/packages/web3-redux/src/db.ts:48](https://github.com/owlprotocol/workspace/blob/13023f93/packages/web3-redux/packages/web3-redux/src/db.ts#L48)

___

### Network

• **Network**: `Table`<[`NetworkData`](../interfaces/NetworkData.md), `IndexableType`\>

#### Defined in

[packages/web3-redux/packages/web3-redux/src/db.ts:49](https://github.com/owlprotocol/workspace/blob/13023f93/packages/web3-redux/packages/web3-redux/src/db.ts#L49)

___

### ReduxError

• **ReduxError**: `Table`<`ReduxError`, `IndexableType`\>

#### Defined in

[packages/web3-redux/packages/web3-redux/src/db.ts:45](https://github.com/owlprotocol/workspace/blob/13023f93/packages/web3-redux/packages/web3-redux/src/db.ts#L45)

___

### Sync

• **Sync**: `Table`<`Sync`, `IndexableType`\>

#### Defined in

[packages/web3-redux/packages/web3-redux/src/db.ts:50](https://github.com/owlprotocol/workspace/blob/13023f93/packages/web3-redux/packages/web3-redux/src/db.ts#L50)

___

### Table

• **Table**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `prototype` | `Table`<`any`, `IndexableType`\> |

#### Inherited from

Dexie.Table

#### Defined in

node_modules/.pnpm/dexie@3.2.2/node_modules/dexie/dist/dexie.d.ts:772

___

### Transaction

• **Transaction**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `prototype` | `Transaction` |

#### Inherited from

Dexie.Transaction

#### Defined in

node_modules/.pnpm/dexie@3.2.2/node_modules/dexie/dist/dexie.d.ts:781

___

### Version

• **Version**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `prototype` | `Version` |

#### Inherited from

Dexie.Version

#### Defined in

node_modules/.pnpm/dexie@3.2.2/node_modules/dexie/dist/dexie.d.ts:778

___

### WhereClause

• **WhereClause**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `prototype` | `WhereClause`<`any`, `IndexableType`\> |

#### Inherited from

Dexie.WhereClause

#### Defined in

node_modules/.pnpm/dexie@3.2.2/node_modules/dexie/dist/dexie.d.ts:775

___

### \_allTables

• `Readonly` **\_allTables**: `Object`

#### Index signature

▪ [name: `string`]: `Table`<`any`, `IndexableType`\>

#### Inherited from

Dexie.\_allTables

#### Defined in

node_modules/.pnpm/dexie@3.2.2/node_modules/dexie/dist/dexie.d.ts:732

___

### \_dbSchema

• **\_dbSchema**: `DbSchema`

#### Inherited from

Dexie.\_dbSchema

#### Defined in

node_modules/.pnpm/dexie@3.2.2/node_modules/dexie/dist/dexie.d.ts:737

___

### core

• `Readonly` **core**: `DBCore`

#### Inherited from

Dexie.core

#### Defined in

node_modules/.pnpm/dexie@3.2.2/node_modules/dexie/dist/dexie.d.ts:735

___

### name

• `Readonly` **name**: `string`

#### Inherited from

Dexie.name

#### Defined in

node_modules/.pnpm/dexie@3.2.2/node_modules/dexie/dist/dexie.d.ts:728

___

### on

• **on**: `DbEvents`

#### Inherited from

Dexie.on

#### Defined in

node_modules/.pnpm/dexie@3.2.2/node_modules/dexie/dist/dexie.d.ts:739

___

### tables

• `Readonly` **tables**: `Table`<`any`, `IndexableType`\>[]

#### Inherited from

Dexie.tables

#### Defined in

node_modules/.pnpm/dexie@3.2.2/node_modules/dexie/dist/dexie.d.ts:729

___

### verno

• `Readonly` **verno**: `number`

#### Inherited from

Dexie.verno

#### Defined in

node_modules/.pnpm/dexie@3.2.2/node_modules/dexie/dist/dexie.d.ts:730

___

### vip

• `Readonly` **vip**: `Dexie`

#### Inherited from

Dexie.vip

#### Defined in

node_modules/.pnpm/dexie@3.2.2/node_modules/dexie/dist/dexie.d.ts:731

___

### AbortError

▪ `Static` **AbortError**: `DexieErrorConstructor`

#### Inherited from

Dexie.AbortError

___

### BulkError

▪ `Static` **BulkError**: `BulkErrorConstructor`

#### Inherited from

Dexie.BulkError

#### Defined in

node_modules/.pnpm/dexie@3.2.2/node_modules/dexie/dist/dexie.d.ts:922

___

### ConstraintError

▪ `Static` **ConstraintError**: `DexieErrorConstructor`

#### Inherited from

Dexie.ConstraintError

___

### DataCloneError

▪ `Static` **DataCloneError**: `DexieErrorConstructor`

#### Inherited from

Dexie.DataCloneError

___

### DataError

▪ `Static` **DataError**: `DexieErrorConstructor`

#### Inherited from

Dexie.DataError

___

### DatabaseClosedError

▪ `Static` **DatabaseClosedError**: `DexieErrorConstructor`

#### Inherited from

Dexie.DatabaseClosedError

___

### DexieError

▪ `Static` **DexieError**: `DexieErrorConstructor`

#### Inherited from

Dexie.DexieError

#### Defined in

node_modules/.pnpm/dexie@3.2.2/node_modules/dexie/dist/dexie.d.ts:920

___

### ForeignAwaitError

▪ `Static` **ForeignAwaitError**: `DexieErrorConstructor`

#### Inherited from

Dexie.ForeignAwaitError

___

### InternalError

▪ `Static` **InternalError**: `DexieErrorConstructor`

#### Inherited from

Dexie.InternalError

___

### InvalidAccessError

▪ `Static` **InvalidAccessError**: `DexieErrorConstructor`

#### Inherited from

Dexie.InvalidAccessError

___

### InvalidArgumentError

▪ `Static` **InvalidArgumentError**: `DexieErrorConstructor`

#### Inherited from

Dexie.InvalidArgumentError

___

### InvalidStateError

▪ `Static` **InvalidStateError**: `DexieErrorConstructor`

#### Inherited from

Dexie.InvalidStateError

___

### InvalidTableError

▪ `Static` **InvalidTableError**: `DexieErrorConstructor`

#### Inherited from

Dexie.InvalidTableError

___

### MissingAPIError

▪ `Static` **MissingAPIError**: `DexieErrorConstructor`

#### Inherited from

Dexie.MissingAPIError

___

### ModifyError

▪ `Static` **ModifyError**: `ModifyErrorConstructor`

#### Inherited from

Dexie.ModifyError

#### Defined in

node_modules/.pnpm/dexie@3.2.2/node_modules/dexie/dist/dexie.d.ts:921

___

### NoSuchDatabaseError

▪ `Static` **NoSuchDatabaseError**: `DexieErrorConstructor`

#### Inherited from

Dexie.NoSuchDatabaseError

___

### NotFoundError

▪ `Static` **NotFoundError**: `DexieErrorConstructor`

#### Inherited from

Dexie.NotFoundError

___

### OpenFailedError

▪ `Static` **OpenFailedError**: `DexieErrorConstructor`

#### Inherited from

Dexie.OpenFailedError

___

### PrematureCommitError

▪ `Static` **PrematureCommitError**: `DexieErrorConstructor`

#### Inherited from

Dexie.PrematureCommitError

___

### Promise

▪ `Static` **Promise**: `PromiseExtendedConstructor`

#### Inherited from

Dexie.Promise

#### Defined in

node_modules/.pnpm/dexie@3.2.2/node_modules/dexie/dist/dexie.d.ts:991

___

### QuotaExceededError

▪ `Static` **QuotaExceededError**: `DexieErrorConstructor`

#### Inherited from

Dexie.QuotaExceededError

___

### ReadOnlyError

▪ `Static` **ReadOnlyError**: `DexieErrorConstructor`

#### Inherited from

Dexie.ReadOnlyError

___

### SchemaError

▪ `Static` **SchemaError**: `DexieErrorConstructor`

#### Inherited from

Dexie.SchemaError

___

### SubTransactionError

▪ `Static` **SubTransactionError**: `DexieErrorConstructor`

#### Inherited from

Dexie.SubTransactionError

___

### TimeoutError

▪ `Static` **TimeoutError**: `DexieErrorConstructor`

#### Inherited from

Dexie.TimeoutError

___

### TransactionInactiveError

▪ `Static` **TransactionInactiveError**: `DexieErrorConstructor`

#### Inherited from

Dexie.TransactionInactiveError

___

### UnknownError

▪ `Static` **UnknownError**: `DexieErrorConstructor`

#### Inherited from

Dexie.UnknownError

___

### UnsupportedError

▪ `Static` **UnsupportedError**: `DexieErrorConstructor`

#### Inherited from

Dexie.UnsupportedError

___

### UpgradeError

▪ `Static` **UpgradeError**: `DexieErrorConstructor`

#### Inherited from

Dexie.UpgradeError

___

### VersionChangeError

▪ `Static` **VersionChangeError**: `DexieErrorConstructor`

#### Inherited from

Dexie.VersionChangeError

___

### VersionError

▪ `Static` **VersionError**: `DexieErrorConstructor`

#### Inherited from

Dexie.VersionError

___

### addons

▪ `Static` **addons**: (`db`: `Dexie`) => `void`[]

#### Inherited from

Dexie.addons

#### Defined in

node_modules/.pnpm/dexie@3.2.2/node_modules/dexie/dist/dexie.d.ts:967

___

### currentTransaction

▪ `Static` **currentTransaction**: `Transaction`

#### Inherited from

Dexie.currentTransaction

#### Defined in

node_modules/.pnpm/dexie@3.2.2/node_modules/dexie/dist/dexie.d.ts:970

___

### default

▪ `Static` **default**: `Dexie`

#### Inherited from

Dexie.default

#### Defined in

node_modules/.pnpm/dexie@3.2.2/node_modules/dexie/dist/dexie.d.ts:990

___

### dependencies

▪ `Static` **dependencies**: `DexieDOMDependencies`

#### Inherited from

Dexie.dependencies

#### Defined in

node_modules/.pnpm/dexie@3.2.2/node_modules/dexie/dist/dexie.d.ts:989

___

### errnames

▪ `Static` **errnames**: `DexieErrors`

#### Inherited from

Dexie.errnames

#### Defined in

node_modules/.pnpm/dexie@3.2.2/node_modules/dexie/dist/dexie.d.ts:996

___

### maxKey

▪ `Static` **maxKey**: `string` \| `void`[][]

#### Inherited from

Dexie.maxKey

#### Defined in

node_modules/.pnpm/dexie@3.2.2/node_modules/dexie/dist/dexie.d.ts:985

___

### minKey

▪ `Static` **minKey**: `number`

#### Inherited from

Dexie.minKey

#### Defined in

node_modules/.pnpm/dexie@3.2.2/node_modules/dexie/dist/dexie.d.ts:986

___

### on

▪ `Static` **on**: `GlobalDexieEvents`

#### Inherited from

Dexie.on

#### Defined in

node_modules/.pnpm/dexie@3.2.2/node_modules/dexie/dist/dexie.d.ts:995

___

### semVer

▪ `Static` **semVer**: `string`

#### Inherited from

Dexie.semVer

#### Defined in

node_modules/.pnpm/dexie@3.2.2/node_modules/dexie/dist/dexie.d.ts:969

___

### version

▪ `Static` **version**: `number`

#### Inherited from

Dexie.version

#### Defined in

node_modules/.pnpm/dexie@3.2.2/node_modules/dexie/dist/dexie.d.ts:968

## Methods

### \_createTransaction

▸ **_createTransaction**(`this`, `mode`, `storeNames`, `dbschema`, `parentTransaction?`): `Transaction`

#### Parameters

| Name | Type |
| :------ | :------ |
| `this` | `Dexie` |
| `mode` | `IDBTransactionMode` |
| `storeNames` | `ArrayLike`<`string`\> |
| `dbschema` | `DbSchema` |
| `parentTransaction?` | ``null`` \| `Transaction` |

#### Returns

`Transaction`

#### Inherited from

Dexie.\_createTransaction

#### Defined in

node_modules/.pnpm/dexie@3.2.2/node_modules/dexie/dist/dexie.d.ts:736

___

### backendDB

▸ **backendDB**(): `IDBDatabase`

#### Returns

`IDBDatabase`

#### Inherited from

Dexie.backendDB

#### Defined in

node_modules/.pnpm/dexie@3.2.2/node_modules/dexie/dist/dexie.d.ts:760

___

### clear

▸ **clear**(): `Promise`<`void`[]\>

#### Returns

`Promise`<`void`[]\>

#### Defined in

[packages/web3-redux/packages/web3-redux/src/db.ts:73](https://github.com/owlprotocol/workspace/blob/13023f93/packages/web3-redux/packages/web3-redux/src/db.ts#L73)

___

### close

▸ **close**(): `void`

#### Returns

`void`

#### Inherited from

Dexie.close

#### Defined in

node_modules/.pnpm/dexie@3.2.2/node_modules/dexie/dist/dexie.d.ts:754

___

### delete

▸ **delete**(): `PromiseExtended`<`void`\>

#### Returns

`PromiseExtended`<`void`\>

#### Inherited from

Dexie.delete

#### Defined in

node_modules/.pnpm/dexie@3.2.2/node_modules/dexie/dist/dexie.d.ts:755

___

### dynamicallyOpened

▸ **dynamicallyOpened**(): `boolean`

#### Returns

`boolean`

#### Inherited from

Dexie.dynamicallyOpened

#### Defined in

node_modules/.pnpm/dexie@3.2.2/node_modules/dexie/dist/dexie.d.ts:759

___

### hasBeenClosed

▸ **hasBeenClosed**(): `boolean`

#### Returns

`boolean`

#### Inherited from

Dexie.hasBeenClosed

#### Defined in

node_modules/.pnpm/dexie@3.2.2/node_modules/dexie/dist/dexie.d.ts:757

___

### hasFailed

▸ **hasFailed**(): `boolean`

#### Returns

`boolean`

#### Inherited from

Dexie.hasFailed

#### Defined in

node_modules/.pnpm/dexie@3.2.2/node_modules/dexie/dist/dexie.d.ts:758

___

### isOpen

▸ **isOpen**(): `boolean`

#### Returns

`boolean`

#### Inherited from

Dexie.isOpen

#### Defined in

node_modules/.pnpm/dexie@3.2.2/node_modules/dexie/dist/dexie.d.ts:756

___

### open

▸ **open**(): `PromiseExtended`<`Dexie`\>

#### Returns

`PromiseExtended`<`Dexie`\>

#### Inherited from

Dexie.open

#### Defined in

node_modules/.pnpm/dexie@3.2.2/node_modules/dexie/dist/dexie.d.ts:740

___

### table

▸ **table**<`T`, `TKey`\>(`tableName`): `Table`<`T`, `TKey`\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | `any` |
| `TKey` | `IndexableType` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `tableName` | `string` |

#### Returns

`Table`<`T`, `TKey`\>

#### Inherited from

Dexie.table

#### Defined in

node_modules/.pnpm/dexie@3.2.2/node_modules/dexie/dist/dexie.d.ts:741

___

### transaction

▸ **transaction**<`U`\>(`mode`, `table`, `scope`): `PromiseExtended`<`U`\>

#### Type parameters

| Name |
| :------ |
| `U` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `mode` | `TransactionMode` |
| `table` | `Table`<`any`, `IndexableType`\> |
| `scope` | (`trans`: `Transaction`) => `U` \| `PromiseLike`<`U`\> |

#### Returns

`PromiseExtended`<`U`\>

#### Inherited from

Dexie.transaction

#### Defined in

node_modules/.pnpm/dexie@3.2.2/node_modules/dexie/dist/dexie.d.ts:742

▸ **transaction**<`U`\>(`mode`, `table`, `scope`): `PromiseExtended`<`U`\>

#### Type parameters

| Name |
| :------ |
| `U` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `mode` | `TransactionMode` |
| `table` | `string` |
| `scope` | (`trans`: `Transaction`) => `U` \| `PromiseLike`<`U`\> |

#### Returns

`PromiseExtended`<`U`\>

#### Inherited from

Dexie.transaction

#### Defined in

node_modules/.pnpm/dexie@3.2.2/node_modules/dexie/dist/dexie.d.ts:743

▸ **transaction**<`U`\>(`mode`, `table`, `table2`, `scope`): `PromiseExtended`<`U`\>

#### Type parameters

| Name |
| :------ |
| `U` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `mode` | `TransactionMode` |
| `table` | `Table`<`any`, `IndexableType`\> |
| `table2` | `Table`<`any`, `IndexableType`\> |
| `scope` | (`trans`: `Transaction`) => `U` \| `PromiseLike`<`U`\> |

#### Returns

`PromiseExtended`<`U`\>

#### Inherited from

Dexie.transaction

#### Defined in

node_modules/.pnpm/dexie@3.2.2/node_modules/dexie/dist/dexie.d.ts:744

▸ **transaction**<`U`\>(`mode`, `table`, `table2`, `scope`): `PromiseExtended`<`U`\>

#### Type parameters

| Name |
| :------ |
| `U` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `mode` | `TransactionMode` |
| `table` | `string` |
| `table2` | `string` |
| `scope` | (`trans`: `Transaction`) => `U` \| `PromiseLike`<`U`\> |

#### Returns

`PromiseExtended`<`U`\>

#### Inherited from

Dexie.transaction

#### Defined in

node_modules/.pnpm/dexie@3.2.2/node_modules/dexie/dist/dexie.d.ts:745

▸ **transaction**<`U`\>(`mode`, `table`, `table2`, `table3`, `scope`): `PromiseExtended`<`U`\>

#### Type parameters

| Name |
| :------ |
| `U` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `mode` | `TransactionMode` |
| `table` | `Table`<`any`, `IndexableType`\> |
| `table2` | `Table`<`any`, `IndexableType`\> |
| `table3` | `Table`<`any`, `IndexableType`\> |
| `scope` | (`trans`: `Transaction`) => `U` \| `PromiseLike`<`U`\> |

#### Returns

`PromiseExtended`<`U`\>

#### Inherited from

Dexie.transaction

#### Defined in

node_modules/.pnpm/dexie@3.2.2/node_modules/dexie/dist/dexie.d.ts:746

▸ **transaction**<`U`\>(`mode`, `table`, `table2`, `table3`, `scope`): `PromiseExtended`<`U`\>

#### Type parameters

| Name |
| :------ |
| `U` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `mode` | `TransactionMode` |
| `table` | `string` |
| `table2` | `string` |
| `table3` | `string` |
| `scope` | (`trans`: `Transaction`) => `U` \| `PromiseLike`<`U`\> |

#### Returns

`PromiseExtended`<`U`\>

#### Inherited from

Dexie.transaction

#### Defined in

node_modules/.pnpm/dexie@3.2.2/node_modules/dexie/dist/dexie.d.ts:747

▸ **transaction**<`U`\>(`mode`, `table`, `table2`, `table3`, `table4`, `scope`): `PromiseExtended`<`U`\>

#### Type parameters

| Name |
| :------ |
| `U` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `mode` | `TransactionMode` |
| `table` | `Table`<`any`, `IndexableType`\> |
| `table2` | `Table`<`any`, `IndexableType`\> |
| `table3` | `Table`<`any`, `IndexableType`\> |
| `table4` | `Table`<`any`, `IndexableType`\> |
| `scope` | (`trans`: `Transaction`) => `U` \| `PromiseLike`<`U`\> |

#### Returns

`PromiseExtended`<`U`\>

#### Inherited from

Dexie.transaction

#### Defined in

node_modules/.pnpm/dexie@3.2.2/node_modules/dexie/dist/dexie.d.ts:748

▸ **transaction**<`U`\>(`mode`, `table`, `table2`, `table3`, `table4`, `scope`): `PromiseExtended`<`U`\>

#### Type parameters

| Name |
| :------ |
| `U` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `mode` | `TransactionMode` |
| `table` | `string` |
| `table2` | `string` |
| `table3` | `string` |
| `table4` | `string` |
| `scope` | (`trans`: `Transaction`) => `U` \| `PromiseLike`<`U`\> |

#### Returns

`PromiseExtended`<`U`\>

#### Inherited from

Dexie.transaction

#### Defined in

node_modules/.pnpm/dexie@3.2.2/node_modules/dexie/dist/dexie.d.ts:749

▸ **transaction**<`U`\>(`mode`, `table`, `table2`, `table3`, `table4`, `table5`, `scope`): `PromiseExtended`<`U`\>

#### Type parameters

| Name |
| :------ |
| `U` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `mode` | `TransactionMode` |
| `table` | `Table`<`any`, `IndexableType`\> |
| `table2` | `Table`<`any`, `IndexableType`\> |
| `table3` | `Table`<`any`, `IndexableType`\> |
| `table4` | `Table`<`any`, `IndexableType`\> |
| `table5` | `Table`<`any`, `IndexableType`\> |
| `scope` | (`trans`: `Transaction`) => `U` \| `PromiseLike`<`U`\> |

#### Returns

`PromiseExtended`<`U`\>

#### Inherited from

Dexie.transaction

#### Defined in

node_modules/.pnpm/dexie@3.2.2/node_modules/dexie/dist/dexie.d.ts:750

▸ **transaction**<`U`\>(`mode`, `table`, `table2`, `table3`, `table4`, `table5`, `scope`): `PromiseExtended`<`U`\>

#### Type parameters

| Name |
| :------ |
| `U` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `mode` | `TransactionMode` |
| `table` | `string` |
| `table2` | `string` |
| `table3` | `string` |
| `table4` | `string` |
| `table5` | `string` |
| `scope` | (`trans`: `Transaction`) => `U` \| `PromiseLike`<`U`\> |

#### Returns

`PromiseExtended`<`U`\>

#### Inherited from

Dexie.transaction

#### Defined in

node_modules/.pnpm/dexie@3.2.2/node_modules/dexie/dist/dexie.d.ts:751

▸ **transaction**<`U`\>(`mode`, `tables`, `scope`): `PromiseExtended`<`U`\>

#### Type parameters

| Name |
| :------ |
| `U` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `mode` | `TransactionMode` |
| `tables` | `Table`<`any`, `IndexableType`\>[] |
| `scope` | (`trans`: `Transaction`) => `U` \| `PromiseLike`<`U`\> |

#### Returns

`PromiseExtended`<`U`\>

#### Inherited from

Dexie.transaction

#### Defined in

node_modules/.pnpm/dexie@3.2.2/node_modules/dexie/dist/dexie.d.ts:752

▸ **transaction**<`U`\>(`mode`, `tables`, `scope`): `PromiseExtended`<`U`\>

#### Type parameters

| Name |
| :------ |
| `U` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `mode` | `TransactionMode` |
| `tables` | `string`[] |
| `scope` | (`trans`: `Transaction`) => `U` \| `PromiseLike`<`U`\> |

#### Returns

`PromiseExtended`<`U`\>

#### Inherited from

Dexie.transaction

#### Defined in

node_modules/.pnpm/dexie@3.2.2/node_modules/dexie/dist/dexie.d.ts:753

___

### unuse

▸ **unuse**(`__namedParameters`): [`Web3ReduxDexie`](Web3ReduxDexie.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | `Middleware`<{ `stack`: ``"dbcore"``  }\> |

#### Returns

[`Web3ReduxDexie`](Web3ReduxDexie.md)

#### Inherited from

Dexie.unuse

#### Defined in

node_modules/.pnpm/dexie@3.2.2/node_modules/dexie/dist/dexie.d.ts:763

▸ **unuse**(`__namedParameters`): [`Web3ReduxDexie`](Web3ReduxDexie.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | `Object` |
| `__namedParameters.name` | `string` |
| `__namedParameters.stack` | ``"dbcore"`` |

#### Returns

[`Web3ReduxDexie`](Web3ReduxDexie.md)

#### Inherited from

Dexie.unuse

#### Defined in

node_modules/.pnpm/dexie@3.2.2/node_modules/dexie/dist/dexie.d.ts:766

___

### use

▸ **use**(`middleware`): [`Web3ReduxDexie`](Web3ReduxDexie.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `middleware` | `Middleware`<`DBCore`\> |

#### Returns

[`Web3ReduxDexie`](Web3ReduxDexie.md)

#### Inherited from

Dexie.use

#### Defined in

node_modules/.pnpm/dexie@3.2.2/node_modules/dexie/dist/dexie.d.ts:761

___

### version

▸ **version**(`versionNumber`): `Version`

#### Parameters

| Name | Type |
| :------ | :------ |
| `versionNumber` | `number` |

#### Returns

`Version`

#### Inherited from

Dexie.version

#### Defined in

node_modules/.pnpm/dexie@3.2.2/node_modules/dexie/dist/dexie.d.ts:738

___

### Events

▸ `Static` **Events**(`ctx?`): `DexieEventSet`

#### Parameters

| Name | Type |
| :------ | :------ |
| `ctx?` | `any` |

#### Returns

`DexieEventSet`

#### Inherited from

Dexie.Events

#### Defined in

node_modules/.pnpm/dexie@3.2.2/node_modules/dexie/dist/dexie.d.ts:994

___

### asap

▸ `Static` **asap**(`fn`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `fn` | `Function` |

#### Returns

`void`

#### Inherited from

Dexie.asap

#### Defined in

node_modules/.pnpm/dexie@3.2.2/node_modules/dexie/dist/dexie.d.ts:984

___

### deepClone

▸ `Static` **deepClone**<`T`\>(`obj`): `T`

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `obj` | `T` |

#### Returns

`T`

#### Inherited from

Dexie.deepClone

#### Defined in

node_modules/.pnpm/dexie@3.2.2/node_modules/dexie/dist/dexie.d.ts:983

___

### delByKeyPath

▸ `Static` **delByKeyPath**(`obj`, `keyPath`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `obj` | `Object` |
| `keyPath` | `string` |

#### Returns

`void`

#### Inherited from

Dexie.delByKeyPath

#### Defined in

node_modules/.pnpm/dexie@3.2.2/node_modules/dexie/dist/dexie.d.ts:981

___

### delete

▸ `Static` **delete**(`dbName`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `dbName` | `string` |

#### Returns

`Promise`<`void`\>

#### Inherited from

Dexie.delete

#### Defined in

node_modules/.pnpm/dexie@3.2.2/node_modules/dexie/dist/dexie.d.ts:988

___

### exists

▸ `Static` **exists**(`dbName`): `Promise`<`boolean`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `dbName` | `string` |

#### Returns

`Promise`<`boolean`\>

#### Inherited from

Dexie.exists

#### Defined in

node_modules/.pnpm/dexie@3.2.2/node_modules/dexie/dist/dexie.d.ts:987

___

### extendObservabilitySet

▸ `Static` **extendObservabilitySet**(`target`, `newSet`): `ObservabilitySet`

#### Parameters

| Name | Type |
| :------ | :------ |
| `target` | `ObservabilitySet` |
| `newSet` | `ObservabilitySet` |

#### Returns

`ObservabilitySet`

#### Inherited from

Dexie.extendObservabilitySet

#### Defined in

node_modules/.pnpm/dexie@3.2.2/node_modules/dexie/dist/dexie.d.ts:977

___

### getByKeyPath

▸ `Static` **getByKeyPath**(`obj`, `keyPath`): `any`

#### Parameters

| Name | Type |
| :------ | :------ |
| `obj` | `Object` |
| `keyPath` | `string` |

#### Returns

`any`

#### Inherited from

Dexie.getByKeyPath

#### Defined in

node_modules/.pnpm/dexie@3.2.2/node_modules/dexie/dist/dexie.d.ts:979

___

### getDatabaseNames

▸ `Static` **getDatabaseNames**(): `Promise`<`string`[]\>

#### Returns

`Promise`<`string`[]\>

#### Inherited from

Dexie.getDatabaseNames

#### Defined in

node_modules/.pnpm/dexie@3.2.2/node_modules/dexie/dist/dexie.d.ts:972

▸ `Static` **getDatabaseNames**<`R`\>(`thenShortcut`): `Promise`<`R`\>

#### Type parameters

| Name |
| :------ |
| `R` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `thenShortcut` | `ThenShortcut`<`string`[], `R`\> |

#### Returns

`Promise`<`R`\>

#### Inherited from

Dexie.getDatabaseNames

#### Defined in

node_modules/.pnpm/dexie@3.2.2/node_modules/dexie/dist/dexie.d.ts:973

___

### ignoreTransaction

▸ `Static` **ignoreTransaction**<`U`\>(`fn`): `U`

#### Type parameters

| Name |
| :------ |
| `U` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `fn` | () => `U` |

#### Returns

`U`

#### Inherited from

Dexie.ignoreTransaction

#### Defined in

node_modules/.pnpm/dexie@3.2.2/node_modules/dexie/dist/dexie.d.ts:975

___

### liveQuery

▸ `Static` **liveQuery**<`T`\>(`fn`): `Observable`<`T`\>

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `fn` | () => `T` \| `Promise`<`T`\> |

#### Returns

`Observable`<`T`\>

#### Inherited from

Dexie.liveQuery

#### Defined in

node_modules/.pnpm/dexie@3.2.2/node_modules/dexie/dist/dexie.d.ts:976

___

### override

▸ `Static` **override**<`F`\>(`origFunc`, `overridedFactory`): `F`

#### Type parameters

| Name |
| :------ |
| `F` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `origFunc` | `F` |
| `overridedFactory` | (`fn`: `any`) => `any` |

#### Returns

`F`

#### Inherited from

Dexie.override

#### Defined in

node_modules/.pnpm/dexie@3.2.2/node_modules/dexie/dist/dexie.d.ts:978

___

### setByKeyPath

▸ `Static` **setByKeyPath**(`obj`, `keyPath`, `value`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `obj` | `Object` |
| `keyPath` | `string` |
| `value` | `any` |

#### Returns

`void`

#### Inherited from

Dexie.setByKeyPath

#### Defined in

node_modules/.pnpm/dexie@3.2.2/node_modules/dexie/dist/dexie.d.ts:980

___

### shallowClone

▸ `Static` **shallowClone**<`T`\>(`obj`): `T`

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `obj` | `T` |

#### Returns

`T`

#### Inherited from

Dexie.shallowClone

#### Defined in

node_modules/.pnpm/dexie@3.2.2/node_modules/dexie/dist/dexie.d.ts:982

___

### vip

▸ `Static` **vip**<`U`\>(`scopeFunction`): `U`

#### Type parameters

| Name |
| :------ |
| `U` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `scopeFunction` | () => `U` |

#### Returns

`U`

#### Inherited from

Dexie.vip

#### Defined in

node_modules/.pnpm/dexie@3.2.2/node_modules/dexie/dist/dexie.d.ts:974

___

### waitFor

▸ `Static` **waitFor**<`T`\>(`promise`, `timeoutMilliseconds?`): `Promise`<`T`\>

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `promise` | `T` \| `PromiseLike`<`T`\> |
| `timeoutMilliseconds?` | `number` |

#### Returns

`Promise`<`T`\>

#### Inherited from

Dexie.waitFor

#### Defined in

node_modules/.pnpm/dexie@3.2.2/node_modules/dexie/dist/dexie.d.ts:971
