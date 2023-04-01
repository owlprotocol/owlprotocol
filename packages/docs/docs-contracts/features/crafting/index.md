---
sidebar_position: 3
---

# Combining / Crafting / Breeding

We loosely group combining, crafting, and breeding togethers because these dynamic NFT **mechanics** all involve similar
features.

### Basic Mechanics

<img src="/img/feature-combining-labels-v2.png" alt="Dynamic NFTs Diagram" style={{height: 500, margin: '0 auto'}}/>

Our **Crafting** contracts involve a set of **input/output router** smart contracts:

For example in **Example (1)**, we have two "Owl" NFT inputs, which are combined by **transferring** them to the crafting
smart contract.

### Burning (Consuming) or Preserving Input NFTs

Within the crafting smart contract the deployer can define whether the inputs are **burned (consumed)** or **preserved**.

Both options are valid depending on how the deployer wants to design their NFTs recipes:

1. **Burning** - this destroys the NFT or allows a limited number of uses in the recipe.

    This mechanic is useful for:

    - **Consumables** - commonly seen in games, items such as potions, food, or other items can be used to enhance a
        character or another item. In the case of Dynamic NFTs, we see this useful for extending an NFT's expiry,
        upgrading an NFT, or feeding a pet NFT.
    - **Subscription Renewals** - for Loyalty Programs, DAO membership NFTs, or VIP passes, a consumable NFT is a great
        way to create creative ways to stay active. Users can attend events, participate, and more to collect special
        one-time use NFTs to extend or renew their subscriptions or passes.
    - **Crafting** - perhaps the most common use case, crafting NFTs is a great way to create cross-game/metaverse
        mechanics. For example having players collect NFTs from multiple games to *craft* a special NFT can connect
        different worlds like never before.

2. **Preserving** - this leaves the original NFT untouched, in fact we only require that the user sign to verify ownership.
    This may make the input NFTs more valuable because they can be used multiple times.

    Usually you want to preserve the NFT, for example in use cases such as:

    - **NFT Passes/Memberships** - communities, DAOs, and collections may use NFTs as an access pass to content or events.
        Usually these NFTs are preserved, and even better, with Owl's Dynamic NFT Data standards, you can add parameters
        to track activity, time the token has been held, expiry dates and more.
    - **Upgrading/Enchanting** - in games' crafting systems we commonly see weapons, armor, or other valuable equipment
        preserved, but upgradeable, though this is not always the case. Because Owl's Dynamic NFT Logic contracts are
        external, you can change the recipe for each item as you choose.


### Types of Crafting/Combining Outputs Including Breeding

Also in **Example (1)**, we can see that there is an outputted **"egg"**, there are a number of interesting options
for how this egg is generated/created.

1. **Pre-minted Outputs** - the most simple mechanic is where a set number of output NFTs are pre-minted and transferred
   to the crafting smart contract. Once the output or claimable NFTs are depleted, the smart contract will no longer
   accept new inputs until it is replenished.

2. **Mintable Outputs** - the deployer can also assign mint permissions to the crafting contracts for a specific NFT
    collection, that way once the required input NFTs are transferred to the crafting contract, it can mint the expected
    output.

3. **Breeding Mechanics** - in the case that the input NFTs also have **`dna`**, we can use that `dna` to breed/cross-traits
    with some random element to produce a semi-predictable output NFT. This of course is known as breeding and quite
    common in gaming, with [CryptoKitties](https://www.cryptokitties.co) one of the early pioneers, Owl Protocol takes
    this a step further with more flexible `dna` and client-side SDKs so that NFTs are not reliant on a centralized
    API to decipher the on-chain `dna`.

    In this case, we can create an egg that retains some of the input NFTs' `dna`, so that when it hatches we get an NFT
    resembling the parents/inputs.

:::info
To learn more about how `dna` is encoded on-chain for the NFT, see [on-chain data](/contracts/concepts/onchain_data) and
our advanced [IERC721Dna Contract Description](/contracts/contract-guides/IERC721Dna).
:::

### Upgrading/Crafting NFTs to Change the On-Chain **DNA**

<!-- TODO: @ClarenceL verbose 
*As mentioned regarding Dynamic NFTs, we generally discourage allowing arbitrary changing of an NFT's on-chain dna*, rather
in **Example (2)** we have an **"Upgrade"** mechanic where the `dna` is changed through a pre-defined action by consuming
an NFT or ERC1155 multi-token.
-->

Our smart contracts are quite flexible, and also accept **ERC20** tokens! So rather than consuming an NFT to upgrade/change
the on-chain `dna` of an NFT, you can literally pay to upgrade.

Of course in practice it's recommended that only the genesis collection deployer/creator be the one to also create the
pre-defined upgrade paths.

:::tip
For example the deployer of a pet Owl NFT collection, could have multiple levels of an Owl as it grows older, and pre-define
the different NFTs you need to **"feed"** to it, in order to upgrade or grow the Owl to each levels.

This way there is a fair and expected way to improve the NFT, and the deployer in this case can revoke the role to
make arbitrary `dna` changes.
:::
