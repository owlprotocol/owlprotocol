---
sidebar_position: 2
sidebar_label: 'Key Concepts'
slug: '/concepts'
---

# Dynamic NFTs - Key Concepts

![Crafting](/img/crafting-v2.png)

### Owl Protocol groups Dynamic NFTs into 3 categories/types:

1. NFTs that are themselves dynamic, **able to change** based on preset rules or decentralized oracles and games.

2. NFTs that **can be owned by other NFTs** in meaningful ways, where owned or attached NFTs **modify** the parent NFT.

3. NFTs that can be **combined** with other NFTs, either burning or preserving them, to enable some action.<br/>*We see this in crafting, breeding, and gaming mechanics.*

:::info
*"Of course to enable Dynamic NFTs, **each NFT does indeed store its own "extra" data on-chain**,<br/>this data is used or preserved in the dynamic processes."*
:::

### Basics

To make the dynamic properties possible, we have added the following:

1. **Binary On-Chain Data** format that is stored for each NFT.
2. **Collection Schema JSON** that describes and corresponds to the above data format.
3. **Client-Side SDK** that allows apps, marketplaces, and games to translate the above to meaningful data, such as the rendered NFT visual/image.

![NFT Data Basics 1](/img/basics-1-v4.jpg)

<br/>
<br/>

---

## Managing NFT On-Chain Data

### Arbitrary Changing of NFT Data is Discouraged

The **binary extra data** is stored for each `tokenId` / NFT, and by default the intention is that it only be changed through defined mechanics,
*such as a **crafting recipe**, where the creator defines a limited number of ways an NFT may be upgraded by consuming another NFT, preferably an ERC1155 (multi-token).*

This ensures that Dynamic NFTs represent a fair playing field, with a generally understood system and expected outcomes of each interaction.

:::tip This Does Not Apply to Web3 Game NFTs
However for NFTs that represent characters/items in a game, it's typical that the data is updated periodically by the game developer to reflect the in-game state.
:::

### Standard Ways to Change the NFT On-Chain Data

1. **Full Write Access** - appropriate for Web3 game NFTs, the developer's custodial key can update the NFT on-chain data when needed to sync the game state to the NFT.
    This is ideal for partnerships where the NFT represents an avatar, character, or item that needs to exist in multiple worlds.
2. **NFT Interactions** - a different NFT is consumed, or the owner submits a proof-of-ownership of another NFT to trigger a change in the NFT's on-chain data.
    These interactions are defined
3. **Decentralized Oracles** - connecting NFTs to external or real-world data is another engaging mechanic for Dynamic NFTs. Blockchain oracles can
    be mapped to certain traits, this allows data from sports, market, retail and more to update the NFT.

<br/>

> **For more info on how we manage the on-chain data, read:** [NFT On-Chain Data](/contracts/concepts/onchain_data)

---

### Data Types

Each trait can be a visual element, attribute, or any other arbitrary data that the creator believes is relevant to external decentralized protocols.

Currently supported data types are:

1. **Images** - defined as an array of `options` with each value a struct containing URI/IPFS hash, usually to an image file.
2. **Enums** - for strings it is more efficient to have a defined set of possible values.
3. **Numbers** - numbers as well as the common *Display Types*: `boost_number` and `boost_percentage` are also supported.
4. **Dates** - this is a number with the *Display Type*: `date`.

---

## Combining NFTs - Crafting, Breeding, Gaming, and More

Another type of Dynamic NFT supported by Owl Protocol revolves around a standardized way for an **NFT to own other NFTs**, inspired by EIP-988,
*and with our own improvements, namely exposing child NFT data on the parent NFT as well.*

### NFTs Owning Other NFTs, And Beyond

Our solution goes beyond simply owning NFTs:

:::info
Our smart contract NFTs' on-chain data **includes child/attached NFT data** too:

```

function getDna(uint256 tokenId) public view returns (bytes memory) {

    [recurse through all Child NFTs...]

    //Decode recursively as (bytes, bytes[])
    bytes memory dna = abi.encode(inherentDna[tokenId], childDnas);
    return dna;
}
```
:::

### Rendering NFT with Attached/Equipped NFTs

By exposing the on-chain data of the attached NFTs, our Dynamic NFTs can be rendered fully with any attached equipment, accessories, clothing, or add-ons.

To maximize decentralization of this process we recommend using our Client-Side SDK to render the NFT on-chain data using the **IPFS hosted Schema JSON**.
This allows us to minimize the on-chain data, while still being able to reference high quality graphics.

Currently, we support 2D rendering for composite PNG and SVG images, and will be releasing more features such as dynamic colors for SVGs, and layer transformations.

> *We are working with game engine developers and SDKs to bring 3D rendering standards to Owl Protocol in the near future.*

<img src="/img/char-attached.jpg" style={{display: 'block', margin: '0 auto', height: 500}}/>

<br/>

> **For more info on how the rendering process works, read:** [NFT Rendering](/contracts/concepts/rendering)

### Interoperability of NFTs

This extends beyond just using it for visuals, the NFT returns the any data of itself and its children NFTs, which is useful if an external protocol, marketplace,
or game wants to incorporate the game within their world.

However, there are a few balancing issues and considerations to take:

1. External 3rd-party projects are free to interpret the NFT data however they choose, using the **Collection Schema JSON** defined for your NFT as a starting template.
    **This especially applies for visual elements or rendering**. For example, a trait on your NFT for *"long hair"* can be rendered in many ways, and as each rendering
    engine is different, unless you open source your graphic assets, other projects would likely render a trait in their own way.

2. For any type of game, stats would also likely need to be scaled to ensure imported characters or items are not unbalanced.
    A good technique is to **map/scale stats from the original game to the new game**, and also place limits on the imported stats,
    such as limiting the level of the character/avatar being imported.

3. Crosschain is also tricky, Owl Protocol doesn't directly support bridging NFT assets cross-chain, but rather we support
    cross-chain mechanics where a combining, crafting, or other interaction can involve inputs from different blockchains.
    We use Chainlink's [Cross-Chain Interoperability Protocol (CCIP)](https://chain.link/cross-chain) to faciliate this.


> **For more info on how cross-chain interactions work, read:** [Features/Cross-Chain](/contracts/features/crosschain)
