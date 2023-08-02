[ether.js]: https://github.com/ethers-io/ethers.js/
[web3.js]: https://github.com/web3/web3.js
[Typechain]: https://github.com/dethcrypto/TypeChain
[HRE]: https://hardhat.org/hardhat-runner/docs/advanced/hardhat-runtime-environment
[ts-node]: https://github.com/TypeStrong/ts-node
[esbuild]: https://github.com/evanw/esbuild
[hardhat-shorthand]: https://github.com/NomicFoundation/hardhat/tree/main/packages/hardhat-shorthand
[@typechain/hardhat]: https://www.npmjs.com/package/@typechain/hardhat
[Leo Vigna]: https://github.com/leovigna
[Dexie.js]: https://github.com/dexie/Dexie.js
[Redux]: https://github.com/reduxjs/redux
[Redux ORM]: https://redux-orm.github.io/redux-orm/
[Redux Sagas]: https://redux-saga.js.org/
[IndexedDB]: https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API
[Hooks]: https://react.dev/reference/react

[web3-models-npm]: https://img.shields.io/npm/v/@owlprotocol/web3-models.svg
[web3-dexie-npm]: https://img.shields.io/npm/v/@owlprotocol/web3-dexie.svg
[web3-dexie-hooks-npm]: https://img.shields.io/npm/v/@owlprotocol/web3-dexie-hooks.svg
[web3-actions-npm]: https://img.shields.io/npm/v/@owlprotocol/web3-actions.svg
[web3-redux-orm-npm]: https://img.shields.io/npm/v/@owlprotocol/web3-redux-orm.svg
[web3-redux-orm-hooks-npm]: https://img.shields.io/npm/v/@owlprotocol/web3-redux-orm-hooks.svg
[web3-sagas-npm]: https://img.shields.io/npm/v/@owlprotocol/web3-sagas.svg
[web3-redux-npm]: https://img.shields.io/npm/v/@owlprotocol/web3-redux.svg

[web3-redux]: ./packages/web3-redux
[web3-redux-npm]: https://img.shields.io/npm/v/@owlprotocol/web3-redux.svg

# Web3 Redux
Core Redux Library. See [README.md](../../README.md) for more info.

## Models
In total we have 13 data models.
### Simple Primary Key
These models have a single id as a primary key.
* `4Byte`: `signatureHash`
* `Config`: `id`
* `ContractSend`: `uuid` generated randomly
* `Error`: `id`
* `HTTPCache`
* `IPFSCache`
* `Network`: `networkId`
* `Sync`

## Packages
| Package  | Version |  Description |
| ---------|---------|----------- |
| [`web3-redux`](./web3-redux) | ![web3-redux-npm] | Combines all packages. |
| [`web3-models`](./web3-models) | ![web3-models-npm] | Web3 models with validation  |
| [`web3-dexie`](./web3-dexie) | ![web3-dexie-npm] | [Dexie.js] model for storing data in [IndexedDB] |
| [`web3-dexie-hooks`](./web3-dexie-hooks) | ![web3-dexie-hooks-npm] | React [Hooks] wrapper for [Dexie.js] model |
| [`web3-actions`](./web3-actions) | ![web3-actions-npm] | [Redux] actions for model |
| [`web3-redux-orm`](./web3-redux-orm) | ![web3-redux-orm-npm] | [Redux ORM] model |
| [`web3-redux-orm-hooks`](./web3-redux-orm-hooks) | ![web3-redux-orm-hooks-npm] | React [Hooks] wrapper for [Redux ORM] model  |
| [`web3-sagas`](./web3-sagas) | ![web3-sagas-npm] | [Redux Sagas] for model  |
