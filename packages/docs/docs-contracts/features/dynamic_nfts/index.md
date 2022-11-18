---
sidebar_position: 1
---

# Dynamic NFTs (dNFTs)

<img src="/img/feature-dnft-v3.png" alt="Dynamic NFTs Diagram" style={{height: 400, margin: '0 auto'}}/>

## Use Cases

### Syncing In-Game Assets with NFTs

Exposing the state of your in-game assets with NFTs is invaluable for interoperability between games, and gives rise
to various benefits such as:

1. Other game developers can accept your items in their games, allowing them to target your community, which also brings
    more exposure to your game and creates more **value** for your in-game assets/NFTs.

2. Your game can attract users from non-gaming NFT communities. Using Owl Protocol's innovative tools you can create
    engaging perks/recipes that are available to users who own certain NFTs and target top NFT communities easily. Or
    customize the recipe for a specific partnership for co-marketing purposes.

3. Online leaderboards and communities can directly read data from the NFTs such as statistics, high scores, and more without requiring
    the developer to build and maintain an API for this. Owners of the NFTs may also prefer having their achievements
    saved permanently on the NFT, which can be shown more easily.

### Exposing Granular Data for Web3 Gaming Guilds, DAOs, or Retail Brands

There is a growing demand from DAOs, Web3 Gaming Guilds, and Real-World Brands to have more insight into which NFT
holders are most valuable to target.

**For example they could be looking to target NFT holders that are**:

1. Owners of high-value NFTs, and likely to have more spending power.
2. Active or high-level players of certain Web3 games, which shows they are engaged and influential players.
3. Collectors of NFTs of a certain category, which may signal interest in certain marketable brands.

**Creating a popular NFT collection with insightful data can enable new revenue streams.**

NFT utilities and interactions are an innovative way to add a fee and create a new revenue stream. Especially where the
interaction is overly beneficial for the user they are more likely to pay that fee.

As your project gains popularity, external 3rd-parties may create engaging rewards using your community as a marketing
target, **exposing granular data on the NFTs allows them to better target owners of certain items/assets**.

**Best of all, fees are enforceable in the smart contract**, which is unlike royalty fees from NFT marketplaces/trading.

### Integration with Web3 Messaging Services

The rise of services such as [Push](https://push.org), [Web3MQ](https://www.web3mq.com/), and others, fits well within a
future where NFTs being tied to identities is more common, and exposing more data gives a clearer picture of who others
may be interested in communicating with.

---

## Balancing Over-Centralization in Dynamic NFTs

Dynamic NFTs may have to be able to change their data frequently, however it's important to avoid over-centralization,
and call out NFT collections that use a fully centralized API or have arbitrary control over the NFT.

:::tip This Does Not Apply to Web3 Game NFTs
However for NFTs that represent characters/items in a game, it's typical that the data is updated periodically by the
game developer to reflect the in-game state.

In this case the developer usually has full approval access to update the NFT's metadata.
:::

So, while in-game assets reflected in NFTs require full write access to the `dna`, typically we encourage NFT
projects to use consumable NFTs and **crafting recipes** to control changing the `dna`.

> **Read on about how Combining, Crafting, and Breeding work :** [here](/contracts/features/crafting)


### Read on about how [Combining, Crafting, and Breeding](/contracts/features/crafting) work: [click here](/contracts/features/crafting).
