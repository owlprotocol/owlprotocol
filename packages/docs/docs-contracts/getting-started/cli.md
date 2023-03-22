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
See our [Tutorials](/contracts/tutorials) for how we use the CLI - [**LINK**](/contracts/tutorials)
:::

> View the help with: `node dist/index.cjs --help`

---

## Commands

### generateSchemaJSON

**Usage:**
```
node dist/index.cjs generateSchemaJSON <collectionJS> --project=projects/[folder]
```

Generates the Schema JSON used by the **nft-sdk** to translate the on-chain data.

> Reads the **collectionJS** file relative to the project folder and
> outputs the Schema JSON to the **output** subfolder.

:::info
To create a new collection this is usually the first step, where you define the collection
in 1 or more Typescript files.

Then run `pnpm run build:projects`, to generate the required JS file.

e.g. `node dist/index.cjs generateSchemaJSON collections.js --project=projects/example-omo`
:::

---

### generateItemNFT

**Usage:**
```
node dist/index.cjs generateItemNFT <nftItemJS> --project=projects/[folder]`
```

Generates an NFT Item's JSON with DNA attributes for minting.

> Reads the **nftItemJS** file relative to the project folder and
> outputs the Schema JSON to the **output** subfolder.

:::info
Use this command if you know exactly what NFT attributes you want to mint.

> Otherwise use the **generateRandomNFT** command to randomly generate NFTs using defined probabilities.

Run `pnpm run build:projects`, to generate the required NFT Item's JS file.

e.g. `node dist/index.cjs generateItemNFT items/collection-item-1.js --project=projects/example-omo`
:::

---

**TODO:**

```
index.cjs <command>

Commands:
  index.cjs generateSchemaJSON <collectionJS>            Generates the Schema JSON from the default export of the specified JS file

                                                         The "collectionJS" file is relative to the required project folder option.

                                                         e.g. node dist/index.cjs generateSchemaJSON collections.js --project=projects/example-omo




  index.cjs generateItemNFT <nftItemJS>                  Devtool - Generates the NFT Item's JS

                                                         For now this always outputs to the folder "./output/items/" relative to the projectFolder

                                                         nftItemJS - path to the NFT item file, relative from the projectFolder

                                                         e.g. node dist/index.cjs generateItemNFT items/collection-item-1.js --project=projects/example-omo




  index.cjs generateRandomNFT <collectionJS> <numItems>  Devtool - Generates random instances for NFTGenerativeCollection

                                                         For now this always outputs to the folder "./output/items/" relative to the projectFolder

                                                         collectionJS - path to the collection's JS file, relative from the projectFolder

                                                         e.g. node dist/index.cjs generateRandomNFT collections.js 3 --project=projects/example-omo




  index.cjs deployTopDown                                Deploy the collection defined by the metadataIPFS to the configured chain

                                                         For now this always expects the nftItems in the folder "./output/items/" relative to the projectFolder

                                                         e.g. node dist/index.cjs deployTopDown --projectFolder=projects/example-omo --deployCommon=true --debug=true




  index.cjs detachTopDown                                Deploy the collection to the configured chain

                                                         collectionJS - Relative path to the collection's JS file
                                                         itemsFolder - (Optional) The path to the folder with the item DNA JSONs, defaults to folder "items" in the same directory as the collectionJS

                                                         e.g. node dist/index.cjs detachTopDown --root=0xC627f2756822dFEc6fB81615340FA133129bE19d -c 0x6b42e97a042AECdd27c8798F9cd5b8C860C423FC --tokenId=1




  index.cjs viewTopDown                                  Introspect and view the NFT TopDownDna contract

                                                         e.g. node dist/index.cjs viewTopDown --root=0xbE705Ab239b7CE7c078E84965A518834Cb7CFE4b --tokenId=1




  index.cjs updateDnaNFT                                 Introspect and view the NFT TopDownDna contract

                                                         e.g. node dist/index.cjs updateDnaNFT --root=0xbE705Ab239b7CE7c078E84965A518834Cb7CFE4b --tokenId=1 --trait='xyz' --attr='abc'

                                                         OR

                                                         node dist/index.cjs updateDnaNFT --root=0xbE705Ab239b7CE7c078E84965A518834Cb7CFE4b --tokenId=1 --json=src/projects/example-loyalty/exampleUpdateDnaNFT.json


  index.cjs burnNFT                                      Burns the NFT and all children (if any)

                                                         e.g. node dist/index.cjs burnNFT --contract=0x74Dbc83C18fE41B8db1d8A31A9B5E665d974D55b --tokenId=3




  index.cjs deployCommon                                 Deploy the base smart contracts:

                                                         - Deterministic Deployer
                                                         - Proxy Factory
                                                         - Implementations of all our smart contracts
                                                         - UpgradeableBeacon

                                                         e.g. node dist/index.cjs deployCommon

```
