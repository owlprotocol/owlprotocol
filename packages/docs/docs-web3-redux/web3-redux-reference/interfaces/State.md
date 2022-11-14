---
id: "State"
title: "Interface: State"
sidebar_label: "State"
sidebar_position: 0
custom_edit_url: null
---

## Properties

### @@\_\_\_\_\_\_\_REDUX\_ORM\_STATE\_FLAG

• **@@\_\_\_\_\_\_\_REDUX\_ORM\_STATE\_FLAG**: `boolean`

#### Defined in

[packages/web3-redux/packages/web3-redux/src/state.ts:14](https://github.com/owlprotocol/workspace/blob/13023f93/packages/web3-redux/packages/web3-redux/src/state.ts#L14)

___

### Config

• **Config**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `items` | [``0``] |
| `itemsById` | { `0`: `Config`  } |
| `itemsById.0` | `Config` |

#### Defined in

[packages/web3-redux/packages/web3-redux/src/state.ts:16](https://github.com/owlprotocol/workspace/blob/13023f93/packages/web3-redux/packages/web3-redux/src/state.ts#L16)

___

### Contract

• **Contract**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `indexes` | { `networkId`: { `[networkId: string]`: `string`[];  }  } |
| `indexes.networkId` | { `[networkId: string]`: `string`[];  } |
| `items` | `string`[] |
| `itemsById` | { `[id: string]`: `Contract`;  } |

#### Defined in

[packages/web3-redux/packages/web3-redux/src/state.ts:21](https://github.com/owlprotocol/workspace/blob/13023f93/packages/web3-redux/packages/web3-redux/src/state.ts#L21)

___

### Network

• **Network**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `items` | `string`[] |
| `itemsById` | { `[networkId: string]`: [`NetworkData`](NetworkData.md);  } |

#### Defined in

[packages/web3-redux/packages/web3-redux/src/state.ts:31](https://github.com/owlprotocol/workspace/blob/13023f93/packages/web3-redux/packages/web3-redux/src/state.ts#L31)
