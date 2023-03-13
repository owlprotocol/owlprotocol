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

```
index.cjs <command>

Commands:
  index.cjs generateSchemaJSON <collectionJS>            Generates the Schema JSON from the default export of the specified JS file

                                                         The "collectionJS" file is relative to the required project folder option.

                                                         e.g. node dist/index.cjs generateSchemaJSON collections.js --project=projects/example-omo




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




  index.cjs deployCommon                                 Deploy the base smart contracts:

                                                         - Deterministic Deployer
                                                         - Proxy Factory
                                                         - Implementations of all our smart contracts
                                                         - UpgradeableBeacon

                                                         e.g. node dist/index.cjs deployCommon
```
