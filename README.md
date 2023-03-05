[EIP-20]: https://eips.ethereum.org/EIPS/eip-20
[EIP-721]: https://eips.ethereum.org/EIPS/eip-721
[EIP-1155]: https://eips.ethereum.org/EIPS/eip-1155
[EIP-155]: https://eips.ethereum.org/EIPS/eip-155
[EIP-165]: https://eips.ethereum.org/EIPS/eip-165
[EIP-1820]: https://eips.ethereum.org/EIPS/eip-1820
[EIP-2470]: https://eips.ethereum.org/EIPS/eip-2470
[EIP-1014]: https://eips.ethereum.org/EIPS/eip-1014
[EIP-1167]: https://eips.ethereum.org/EIPS/eip-1167
[EIP-2470]: https://eips.ethereum.org/EIPS/eip-2470

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

[esbuild-config]: ./configs/esbuild-config
[eslint-config]: ./configs/eslint-config
[storybook-config]: ./configs/eslint-config
[ts-config]: ./configs/ts-config
[vite-config]: ./configs/vite-config


[crud-redux]: ./packages/crud-redux
[crud-redux-npm]: https://img.shields.io/npm/v/@owlprotocol/crud-redux.svg

[web3-redux]: ./packages/web3-redux
[web3-redux-npm]: https://img.shields.io/npm/v/@owlprotocol/web3-redux.svg

[web3-redux-components]: ./packages/web3-redux-components
[web3-redux-components-npm]: https://img.shields.io/npm/v/@owlprotocol/web3-redux-components.svg

[contracts]: ./packages/contracts
[contracts-npm]: https://img.shields.io/npm/v/@owlprotocol/contracts.svg

[nft-sdk]: ./packages/nft-sdk
[nft-sdk-npm]: https://img.shields.io/npm/v/@owlprotocol/nft-sdk.svg

[nft-sdk-components]: ./packages/nft-sdk-components
[nft-sdk-components-npm]: https://img.shields.io/npm/v/@owlprotocol/nft-sdk-components.svg

[docs]: ./packages/docs

# Owl Protocol
Owl Protocol - Web3 Tools & Dynamic NFTs.

## TL;DR

```
git clone git@github.com:owlprotocol/owlprotocol-2023.git
npx turbo login
npx turbo link
pnpm i
```

Supply your own `.env` file in `packages/contracts` or:
`cp .env.example .env`

*This is required for the next build command*

```
pnpm run build
```

## Getting Started

### Tutorial

- Dynamic NFT Equipment/Attachability - [ERC721TopDownDna Tutorial](https://docs.owlprotocol.xyz)

## Packages
| Package  | Version |  Description |
| ---------|---------|----------- |
| **Smart Contracts** |
| [`contracts`](./packages/contracts) | ![contracts-npm] | Dynamic NFT smart contractssuch as Crafting, Breeding, and other complex smart contract mechanics.
| **State Management** |
| [`crud-redux`](./packages/crud-redux) | ![crud-redux-npm] | CRUD state management library with caching using   [Redux] and [Dexie.js] |
| [`web3-redux`](./packages/web3-redux) | ![web3-redux-npm] | Web3 state management library with caching using [web3.js], [Redux], and [Dexie.js]
| [`web3-redux-components`]([web3-redux-components]) | ![web3-redux-components-npm]  | React UI Components for common Web3 smart contracts such as [EIP-20], [EIP-721], and [EIP-1155] as well as more complex Dynamic NFT mechanics.
| **NFT Metadata Encoding** |
| [`nft-sdk`](./packages/nft-sdk) | ![nft-sdk-npm] | NFT SDK for encoding/decoding on-chain dna.
| [`nft-sdk-components`](./packages/nft-sdk-components) | ![nft-sdk-components-npm] | React UI Components to render decoded attribtues.

## Docs
Read the official docs at [docs.owlprotocol.xyz](https://docs.owlprotocol.xyz).
