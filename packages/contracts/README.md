# OWL Protocol Contracts

This repository contains all Owl Protocol Smart production smart contracts.
## What is it?
We're developing plug-and-play smart contracts and libraries to make it easier for developers and creators to focus on what they do best: **making great games and content**.

With [our platform](https://owlprotocol.xyz), you can easily deploy contracts which implement complex functionality like item crafting and breeding.

## TLDR
Comprehensive documentation [can be found here](https://owlprotocol.github.io/contracts/docs).

See [contracts](./contracts) for more info on using the smart contracts.

## Deploy it yourself

If you want to deploy our contracts yourself, we have some scripts to make it slightly easier to manage the proxies and contracts. It also helps when deploying on many networks at once, and maintains the same deterministic address on all chains.

In [deploy](./deploy/001_Implementation/), run `ProxyFactory.ts` script. Take the address outputted and place it in variable `ProxyFactoryAddress` in `CrafterTransfer.ts`

https://github.com/wighawag/hardhat-deploy#the-deployments-field

```
hh deploy --tags Implementations --network polygon
hh
```

## Testing

Temporarily not imported, though some tests do work directly (with some commonjs/module replacement):

`TEST_FILE=lib/cjs/test/assets/ERC721/ERC721Dna-readOnChain.test.js pnpm run test-grep`

## Architecture

We use a somewhat complicated system of interlaced proxies in order to optimize for low-gas deployments and easily-upgradeable contracts. This comes at the cost of a small uptick in gas used per transaction.

See [OWLArchitecture](OWLArchitecture.svg) for more info on what's going on under the hood.

## Development
See [contract-structure.md](../docs/docs-contracts/advanced/contract-structure.md) for more info.
