---
sidebar_position: 1
---

# Setup

## Installation

### Requirements

- **pnpm** - `npm install -g pnpm`
- **turbo** - See: [https://turbo.build](https://turbo.build/) for more info and to sign up.

### Setup

```
git clone --recursive git@github.com:owlprotocol/owlprotocol.git
npx turbo login
npx turbo link
pnpm i
```

Supply your own `.env` file in `packages/contracts` or: `cp .env.example .env`

*This is required for the next build command:*

```
pnpm run build
```

If successful, it should show *(otherwise consult the `Dockerfile` for environment issues)*:

```
 Tasks:    12 successful, 12 total
Cached:    3 cached, 12 total
  Time:    2m32.857s
```

## Tutorials

We have a set of tutorials for the common use cases, this is also a good way to get started and experiment with the basic
use cases.

- [**DNA Encoding - ERC721TopDownDna**](/contracts/tutorial-topdowndna) - create a Dynamic NFT with detachable child NFTs and proper onchain data encoding.

:::info
We are still in **Alpha**, If you experience any issues please email us at [contact@owlprotocol.xyz](mailto:contact@owlprotocol.xyz).
:::

