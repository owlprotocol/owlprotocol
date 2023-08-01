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

[crud-models-npm]: https://img.shields.io/npm/v/@owlprotocol/crud-models.svg
[crud-dexie-npm]: https://img.shields.io/npm/v/@owlprotocol/crud-dexie.svg
[crud-dexie-hooks-npm]: https://img.shields.io/npm/v/@owlprotocol/crud-dexie-hooks.svg
[crud-actions-npm]: https://img.shields.io/npm/v/@owlprotocol/crud-actions.svg
[crud-redux-orm-npm]: https://img.shields.io/npm/v/@owlprotocol/crud-redux-orm.svg
[crud-redux-orm-hooks-npm]: https://img.shields.io/npm/v/@owlprotocol/crud-redux-orm-hooks.svg
[crud-sagas-npm]: https://img.shields.io/npm/v/@owlprotocol/crud-sagas.svg
[crud-redux-npm]: https://img.shields.io/npm/v/@owlprotocol/crud-redux.svg

[web3-redux]: ./packages/web3-redux
[web3-redux-npm]: https://img.shields.io/npm/v/@owlprotocol/web3-redux.svg

# CRUD Redux
CRUD state management library using [Redux], [Dexie.js], [Redux ORM], [Redux Sagas]

## Install
```
pnpm install @owlprotocol/crud-redux
```
## Packages
| Package  | Version |  Description |
| ---------|---------|----------- |
| [`crud-redux`](./crud-redux) | ![crud-redux-npm] | Combines all packages.  |
| [`crud-models`](./crud-models) | ![crud-models-npm] | A basic model with validation  |
| [`crud-dexie`](./crud-dexie) | ![crud-dexie-npm] | [Dexie.js] model for storing data in [IndexedDB] |
| [`crud-dexie-hooks`](./crud-dexie-hooks) | ![crud-dexie-hooks-npm] | React [Hooks] wrapper for [Dexie.js] model |
| [`crud-actions`](./crud-actions) | ![crud-actions-npm] | [Redux] actions for model |
| [`crud-redux-orm`](./crud-redux-orm) | ![crud-redux-orm-npm] | [Redux ORM] model |
| [`crud-redux-orm-hooks`](./crud-redux-orm-hooks) | ![crud-redux-orm-hooks-npm] | React [Hooks] wrapper for [Redux ORM] model  |
| [`crud-sagas`](./crud-sagas) | ![crud-sagas-npm] | [Redux Sagas] for model  |
