---
sidebar_position: 2
---

# CLI Tool

### Under `packages/cli` is our CLI Tool

This is a developer tool useful for:
- Deploying the smart contracts
- Viewing NFT data
- Generating NFTs with randomized traits/attributes
- Invoking common functions on Dynamic NFTs, such as attaching/detaching child NFTs

:::tip
See our [Tutorials](/contracts/tutorials) for how we use the CLI
:::

> View the help with: `owl-cli --help`

---

## Installation

```bash
npm install -g @owlprotocol/nft-sdk-cli
```

---

## Commands

### List commands
```
owl-cli --help
```

### generateSchemaJSON

**Usage:**
```
owl-cli generateJsonSchema <collectionJS> --project=projects/[folder]
```

Generates the JSON Schema used by the **nft-sdk** to translate the on-chain data.

> Reads the **collectionJS** file relative to the project folder and
> outputs the JSON Schema to the **output** subfolder.

:::info
To create a new collection this is usually the first step, where you define the collection
in one or more Typescript files.

Then run `pnpm run build:projects`, to generate the required JS file.

e.g. `owl-cli generateJsonSchema collections.js --project=projects/example-omo`
:::

---

### generateItemNFT

**Usage:**
```
owl-cli generateItemNFT <nftItemJS> --project=projects/[folder]`
```

Generates an NFT Item's JSON with DNA attributes for minting.

> Reads the **nftItemJS** file relative to the project folder and
> outputs the JSON Schema to the **output** subfolder.

:::info
Use this command if you know exactly what NFT attributes you want to mint.

> Otherwise use the **generateRandomNFT** command to randomly generate NFTs using defined probabilities.

Run `pnpm run build:projects`, to generate the required NFT Item's JS file.

e.g. `owl-cli generateItemNFT items/collection-item-1.js --project=projects/example-omo`
:::
