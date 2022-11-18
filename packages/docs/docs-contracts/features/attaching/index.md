---
sidebar_position: 3
---

# Attaching / Equipment

Another way that Owl Protocol allows for dynamic NFT mechanics is by extending the way NFTs can be owned by other NFTs.

### Adding **On-Chain DNA** to **EIP-998**

Owl Protocol takes the **Composable NFTs** standard a step further by having the `tokenURI` method return not just the
on-chain `dna` of the target NFT, but also an *ABI Encoded* array of all the child NFT's `dna` recursively.

<img src="/img/feature-equipment-v3.png" alt="Dynamic NFTs Diagram" style={{height: 500, margin: '0 auto'}}/>

## Why This Is Useful

### Rendering NFTs with Attached NFTs

> This is especially great for Web3 Game **"equipment"**, where the in-game state of equipped accessories, armor, weapons,
> and more can be accurately reflected in the NFT by having the character own the equipment NFTs.
>
> The innovation here is that by exposing all the children NFTs recursively, all the data of the equipped items'
> **on-chain `dna`** is also readily available to be rendered by NFT marketplaces and more.

:::tip
For more info on how the rendering process works visit: [NFT Rendering](/contracts/concepts/rendering)
:::

### Transferring a Parent NFT Includes the Child NFTs

Another great thing about Dynamic NFTs with **Attached/Equipment NFTs** is that transferring the root/parent NFT
also transfers all the recursively owned children NFTs. Since the NFT is the actual owner of the children NFTs,
there is no extra gas cost to the transfer either.
