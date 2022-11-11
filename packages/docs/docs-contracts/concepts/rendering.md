---
sidebar_position: 2
---

# NFT Rendering

:::caution Do Not Support Centralization!
One of the key goals at Owl Protocol is to ensure that the user has full ownership of their NFT, including the graphical
assets, even if it's a dynamic NFT.

We **DO NOT USE** a centralized API Endpoint. Otherwise it’s too easy, and basically cheating in our view.
:::

### Client-Side Rendering to the Rescue

Having already put the crucial Dynamic NFT's data on-chain, and the **Collection Schema JSON** to translate the on-chain
data on **IPFS**, the final piece of the puzzle is a **Client-Side SDK** that would allow any dApp, Web3 game or website
to integrate and render the NFT, **without relying on a back-end server.**

## How It Works

### We maintain backwards compatibility with existing marketplaces with `tokenURI()`

- `tokenURI( tokenId )` calls `baseURI` + `getDNA( tokenId )` which returns a **metadata JSON** compatible with most marketplaces

- The marketplace may integrate a client-side SDK to render the NFT in the browser, but as a fallback the NFT may also point
    to a decentralized network that can render the NFT. Possible solutions to this include IPNS, or a DAO controlled endpoint.

- However, any Web3 game, dApp, or website can easily integrate our open-source SDK which intercepts the NFT's on-chain
    data and translates it into the rendering directly in the game client, mobile, or browser.

### Rendering a Dynamic NFT Step-By-Step

<img src="/img/rendering-swimlanes.jpg"/>

1. We start with a Webapp (dApp), Web3 Game, or NFT Marketplace, that wants to render the Dynamic NFT.

2. The application calls the standard smart contract’s `tokenURI()` method ensuring backwards compatibility.

3. The dNFT smart contract returns a `tokenURI` that includes the IPFS hash of the **Collection's Schema JSON** mappings and the actual on-chain data **(DNA)**.

4. The application can either render the image in-app with the SDK, or call the failover API endpoint if deployed by the creator.

5. In either case, a **metadata.json** is produced with the base64 encoded image for rendering, and the list of traits as usual.
    In more advanced cases where the rendering is 3D, we recommend taking a static 2D snapshot of the 3D model, but you can
    conceivably also return 3D graphics files, and or an animated MP4/GIF/video which is supported by some marketplaces.

## Example - NFT Rendering
