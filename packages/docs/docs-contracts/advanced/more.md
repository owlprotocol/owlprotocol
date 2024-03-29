---
sidebar_position: 3
sidebar_label: How We're Different
slug: '/index-cont'
keywords:
    - NFT
    - NFTs
    - Dynamic NFTs
    - dNFTs
---

# How We're Different

[EIP-721]: https://eips.ethereum.org/EIPS/eip-721

import { SimpleGrid } from '@chakra-ui/react'

:::caution Under Revision
:::

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

## Our **standards** are Smart Contract **Primitives** that can be combined to create complex use cases for Dynamic NFTs (DNFTs).

### 1. Dynamic NFT Data

The most basic requirement for Dynamic NFTs is a standardized way to *encode data* in a way that is:

1. **Gas-Efficient**

   We use a compressed binary format *on-chain* similar to [MsgPack](https://msgpack.org), with a JSON Schema file hosted
   *off-chain* in an immutable datastore, such as [IPFS](https://ipfs.tech).

2. **Flexible**

   For our Dynamic NFT data standard we extend [EIP-721] with only the minimal methods necessary to implement Dynamic NFTs.

   Our data standard uses only a **single** arbitrary length byte array of data per NFT, simply referred to as the **DNA**.

   Instead of adding many non-standard methods like other custom implementations, we reuse existing methods such as
   `baseURI` and `tokenURI` to expose a standard JSON schema for the Dynamic NFT binary data.

   By combining the Dynamic NFT Data JSON schema and data, any developer can translate it into usable data.

   :::info
   Many other custom dNFT projects add multiple methods to manage all the dynamic aspects of their NFT.

   This is extremely difficult to integrate when all NFTs have a different interface.

   By moving complexity to a standard **JSON Schema**, that can be parsed by any application and used programmatically.
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

You can find the source code for our **Dynamic NFT Smart Contracts** on Github at: [github.com/owlprotocol/owlprotocol](https://github.com/owlprotocol/owlprotocol).

---

## Deploy It Yourself

Owl Protocol's smart contracts make use of a number of EIP standards to achieve standardization, convenience, and leading edge compatibility across different chains.
It also helps when deploying on many networks at once, and **maintains the same deterministic address on all chains**.

Therefore, deploying the smart contracts yourself is a bit harder, but if you're interested
we have some scripts to make it slightly easier to manage the proxies and contracts.

> To learn more check out our [CLI Tool](/contracts/getting-started/cli).

