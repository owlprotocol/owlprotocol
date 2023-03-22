---
sidebar_position: 3
---

import { SimpleGrid } from '@chakra-ui/react'

# Dynamic NFT Rendering

### Client-Side Rendering

Owl Protocol advocates for client-side rendering where possible.

With all of the Dynamic NFT's data on-chain, and the IPFS hosted **Collection Schema JSON** you have all the data
you need to recreate any NFT's rendering.

The final piece of the puzzle is a **Client-Side SDK** that would allow any dApp, Web3 game or website
to integrate and render the NFT, **without relying on a back-end server.**

:::tip Jump to the Tutorial
## Learn from example through our [dNFT Image DNA Tutorial](/contracts/tutorial-topdowndna)!

Explore step by step, how to create a new collection NFT profile pic, with dynamic detachable elements.

[CLICK HERE](/contracts/tutorial-topdowndna)
:::

## How It Works

### We maintain backwards compatibility with existing marketplaces with `tokenURI()`

- `tokenURI( tokenId )` calls `baseURI` + `getDNA( tokenId )` which returns a **metadata JSON** compatible with most marketplaces

- The marketplace may integrate a client-side SDK to render the NFT in the browser, but as a fallback the NFT may also point
    to a decentralized network that can render the NFT. Possible solutions to this include IPNS, or a DAO controlled endpoint.

- However, any Web3 game, dApp, or website can easily integrate our open-source SDK which intercepts the NFT's on-chain
    data and translates it into the rendering directly in the game client, mobile, or browser.

### Rendering a Dynamic NFT Step-By-Step

![Rendering Diagram](/img/rendering-swimlanes.jpg)

1. We start with a Webapp (dApp), Web3 Game, or NFT Marketplace, that wants to render the Dynamic NFT.

2. The application calls the standard smart contract’s `tokenURI()` method ensuring backwards compatibility.

3. The dNFT smart contract returns a `tokenURI` that includes the IPFS hash of the **Collection's Schema JSON** mappings and the actual on-chain data **(DNA)**.

4. The application can either render the image in-app with the SDK, or call the failover API endpoint if deployed by the creator.

5. In either case, a **metadata.json** is produced with the base64 encoded image for rendering, and the list of traits as usual.
    In more advanced cases where the rendering is 3D, we recommend taking a static 2D snapshot of the 3D model, but you can
    conceivably also return 3D graphics files, and or an animated MP4/GIF/video which is supported by some marketplaces.

## See It In Action

You can deploy a [ERC721TopDownDna Smart Contract](https://github.com/owlprotocol/owlprotocol/blob/main/packages/contracts/contracts/assets/ERC721/ERC721TopDownDna.sol) by
following our tutorial here: [DNA Encoding - ERC721TopDownDna](/contracts/tutorial-topdowndna) where you can experiment with a few layers
and an example collection.

<SimpleGrid className="features-grid" columns={{sm: 2, md: 4}} spacing={8}>
    <Box>
    <div>
    <img src="/img/tutorial/attached.png"/>
    <br/>
    <strong>NFT with Hat</strong>
    </div>
    </Box>
    <Box>
    <div>
    <img src="/img/tutorial/detached.png"/>
    <br/>
    <strong>NFT with Hat Removed</strong>
    </div>
    </Box>
</SimpleGrid>

In this example we are creating a Dynamic PFP (Profile Picture NFT).

- **The hat is its own NFT!** And can be detached/removed, or re-attached to the base NFT.
- When attached/removed the NFT will show the hat on or off.
- The hat once removed can be traded on its own with other hats, or sold, it's up the owner.
- The onchain data, and IPFS hosted Schema JSON is all that is required to render the NFT graphics.
- No centralized back-ends, or dependencies on other tools. **Our `nft-sdk` is the only thing a client/browser needs to render the NFT.**

:::info Learn Through Example
[CLICK HERE](/contracts/tutorial-topdowndna) to go to the tutorial.
:::
