---
sidebar_position: 2
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

Both options are valid depending on how the deployer wants to design their NFTs:

1. Burning the input NFTs means that the NFT can be only used once to create the output, this makes the input and
    output NFTs more rare.

2. Preserving the input NFT means that the NFT owners can create multiple outputted NFTs, which diminishes the value of
    the outputted NFT, but may make the input NFTs more valuable because they can be used multiple times to create value.
    Alternatively, the crafting contract deployer can also specify a set number of times a specific input NFT can be used.

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
To learn more about how `dna` is encoded on-chain for the NFT, read about [on-chain data](/contracts/concepts/onchain_data) and
our advanced [IERC721Dna Contract Description](/contracts/contract-guides/IERC721Dna).
:::

### Upgrading/Crafting NFTs to Change the On-Chain **DNA**

*As mentioned regarding Dynamic NFTs, we generally discourage allowing arbitrary changing of an NFT's on-chain dna*, rather
in **Example (2)** we have an **"Upgrade"** mechanic wherein the `dna` is changed through a pre-defined action by consuming
an NFT or ERC1155 multi-token.

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
