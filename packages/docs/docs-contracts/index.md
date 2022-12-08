---
sidebar_position: 1
sidebar_label: 'Introduction'
slug: '/'
keywords:
    - NFT
    - NFTs
    - Dynamic NFTs
    - dNFTs
---

# Owl Protocol - Developer Documentation

[EIP-721]: https://eips.ethereum.org/EIPS/eip-721

import { SimpleGrid } from '@chakra-ui/react'

## Our **standards** are Smart Contract **Primitives** that can be combined to create amazing use cases for Dynamic NFTs.

### 1. Dynamic NFT Data

The most basic requirement for Dynamic NFTs is a standardized way to *encode data* in a way that is:

1. **Gas-Efficient**

    We use a compressed binary format *on-chain* similar to [MsgPack](https://msgpack.org), with a schema JSON file hosted
    *off-chain* in an immutable datastore, such as [IPFS](https://ipfs.tech).

2. **Flexible**

    For our Dynamic NFT data standard we extend [EIP-721] with only the minimal methods necessary to implement Dynamic NFTs. a single arbitrary

    Our data standard uses only a **single** arbitrary length byte array of data per NFT, simply referred to as the **DNA**.

    Instead of adding many non-standard methods like other custom implementations, we reuse existing methods such as
    `baseURI` and `tokenURI` to expose a standard JSON schema for the Dynamic NFT binary data.

    By combining the Dynamic NFT Data JSON schema and data, any developer can translate it into usable data.

    :::info
    Many other custom dNFT projects add multiple methods to manage all the dynamic aspects of their NFT, but this makes
    it extremely difficult to integrate when all NFTs have a different interface. By moving complexity to a standard
    **JSON Schema**, that can be parsed by any application and used programmatically.
    :::

    > Read the source code: [ERC721TopDownDna.sol](https://github.com/owlprotocol/owlprotocol/blob/main/packages/contracts/contracts/assets/ERC721/ERC721TopDownDna.sol)
    > and read more in-depth on the implementation at [Contract Guides/IERC721Dna](/contracts/contract-guides/IERC721Dna)


3. **Decentralized**

    Everything needed to translate and render the NFT is stored on *immutable/decentralized datasources*, such as on-chain or on IPFS.

    We also provide an open-source client-side SDK, which can be adapted to any platform or medium to allow fully
    decentralized ownership of NFTs and the data in a usable format.

> *For more information on how we store Dynamic NFT Data on-chain read:* [Key Concepts: Dynamic NFT Data](/contracts/concepts/onchain_data)


### 2. Dynamic NFT Logic

![dNFT Logic](/img/dnft_logic-v4.png)

NFT Logic smart contracts govern how NFTs interact with one another, **Logic** is implemented by external smart contracts that can be used
to create and **chain** rules about how certain NFTs behave when they interact or combine.

> *For more information on these mechanics, read:* [Features: Combining / Crafting / Breeding](/contracts/features/crafting/)

### 3. Dynamic NFT Inheritance

When combining Dynamic NFT Data and Logic, a crucial requirement arises, how is the NFT data preserved or passed on to
successive NFTs? There are many possibilities here, and all of them have good use cases:

1. **Upgrading NFTs** - in this scenario the input NFT's dynamic data is modified. However, this is difficult to implement
    in a decentralized manner. One approach is to pre-define specific **Upgrade NFT Logic** smart contracts that have access
    to only modify specific traits, then revoke further approvals for such access.

    We'd expect access to these upgrade be gated in one of the following ways:

    - **Consumable Upgrades** - an NFT is consumed (burned) to activate an upgrade mechanic, this consumable NFT can be
   either purchased, or crafted by combining NFTs obtained by completing various tasks.

    - **Catalysts** - an NFT that is defined to be can be usable more than once or take part in multiple NFT Logic recipes,
   but we recommend putting a maximum number of uses to limit supply of higher tier NFTs.

2. **Breeding NFTs** - the best example of this are games such as Aavegotchi or CryptoKitties, but combining NFTs are also
    useful in many real-world use cases. Our smart contracts support creating various rules about what data is preserved,
    changed, or mutated. In Web3 games the NFT breeding mutations can follow set rarity distributions or probabilities.


This also controls how Dynamic NFT Data is preserved, combined, or inherited by the output or new generation of NFTs

## Open Source Smart Contracts and APIs/SDKs

Our aim is to improve the interoperability and composability of NFTs through these standards so that NFTs can be truly
decentralized and exist in many worlds, virtual or real.

:::info Visit Our Website
You can learn more about us at https://owlprotocol.xyz, and our sister company Vulcan Link at https://vulcan.link.
:::

Our smart contracts add a number of features in a **modular** fashion to maximize the *backwards compatibility* and
flexibility of what we call **Dynamic NFTs (dNFTs)**.

This makes common NFT mechanics such as *combining, bundling, crafting, breeding and more*, easier for developers and
creators, so they can focus on what they do best: **making great games, projects, and partnerships happen**.

---

## Features

The primary features supported by Owl Protocol are:

<SimpleGrid className="features-grid" columns={{sm: 1, md: 2}} spacing={16}>
    <Box>
        <a href="/contracts/features/dynamic_nfts">
            <div className="cell-bg">
                <img src="/img/feature-dnft-v3.png"/>
                <br/>
                <strong>Dynamic NFTs</strong>
                <p>NFTs that change over time, or when triggered by real-world/external data.</p>
            </div>
        </a>
    </Box>
    <Box>
        <a href="/contracts/features/attaching">
            <div className="cell-bg">
                <img src="/img/feature-equipment-v3.png"/>
                <br/>
                <strong>Attaching / Equipment</strong>
                <p>Map attachable NFTs to upgrade or change certain traits or stats.</p>
            </div>
        </a>
    </Box>
    <Box>
        <a href="/contracts/features/crafting">
            <div className="cell-bg">
                <img src="/img/feature-combining-v3.png"/>
                <br/>
                <strong>Combining / Crafting / Breeding</strong>
                <p>Input or whitelist NFTs that will output certain NFTs, <i>sometimes carrying over traits</i>.</p>
            </div>
        </a>
    </Box>
    <Box>
        <a href="/contracts/features/crosschain">
            <div className="cell-bg">
                <img src="/img/feature-crosschain-v3.png"/>
                <br/>
                <strong>Cross Collection Interactions</strong>
                <p>Create mechanics between multiple collections, including those you <strong>DO NOT</strong> own.</p>
            </div>
        </a>
    </Box>
</SimpleGrid>

## Smart Contracts / Github

You can find the source code for our **Dynamic NFT Smart Contracts** on Github at: https://github.com/owlprotocol/contracts.

## APIs and SDKs

- *Owl Protocol is launching a SDK for easier integration with its Dynamic NFT Smart Contracts in Q1 2023.*

---

## No-Code Interface

Owl Protocol also has a no-code interface that is tailored to allow non-technical creators, businesses, and NFT project owners to easily deploy, configure, and manage Dynamic NFTs.

### For the Creator:

- Allows the NFT creator to create many different mechanics for their NFTs, as well as create crafting recipes that involve NFT other collections they **DO NOT** own.
- View their NFT collections, and where possible modify the parameters and view statistics on the collection's NFTs.

### For the User:

- Users can explore and interact with the **Dynamic NFT** mechanics enabled by Owl Protocol.
- Users can **discover new promotions and utilities**, that their NFT gives them access to, which can be created by any 3rd-party external projects.

---

## Why Use Owl Protocol?

### Modular and Backwards Compatible

Many other Dynamic NFT projects create over-complicated custom smart contracts for one-off use-cases, or worse they use a **centralized/traditional** API endpoint they have full control over.

At Owl Protocol we are building smart contracts that are backwards compatible with existing marketplaces, and moving complex logic to modular smart contracts or proxies.
That way you can build on top of your existing collection, or extend off of other collections.

### Open Source Smart Contracts

Owl Protocol's smart contracts will always be open-source. Our goal is to improve accessibility to Dynamic NFT features that have for a long time been reserved
only for well-funded projects.

We believe that the current lack of access to advanced dynamic mechanics restricts the creativity of artists, creators, and developers.

Therefore, we will continue to listen to feedback and develop new features where we see a common demand.

> If you have any ideas or feedback on Dynamic NFT features we should add, email us at: [contact@owlprotocol.xyz](mailto:contact@owlprotocol.xyz)

---

## Deploy It Yourself

Owl Protocol's smart contracts make use of a number of EIP standards to achieve standardization, convenience, and leading edge compatibility across different chains.
It also helps when deploying on many networks at once, and **maintains the same deterministic address on all chains**.

Therefore, deploying the smart contracts yourself is a bit harder, but if you're interested
we have some scripts to make it slightly easier to manage the proxies and contracts.

To learn more visit our [Advanced Section](/contracts/advanced/).

