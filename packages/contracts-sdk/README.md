# Owl Protocol Contracts SDK

Owl Protocol Contracts SDK, enables easier interaction with our core smart contract library.

## SDK Design
The SDK is designed to work with our smart contracts from `@owlprotocol/contracts`, and enable easier interaction. Due to the modularity of our smart contracts, users sometimes need to deploy or interact with multiple smart contracts. The SDK enables batching all of this logic within simple abstraction layers.

### Abstractions Layers
We enable abstractions such as:
* Deploying an NFT Collection with our DNA & Royalty standards
* Extending an existing NFT Collection with our DNA standard
* Deploying crafting recipes that combine and create NFTs

### Signer-agnostic (low-level)
The SDK is designed to be modular with custom signing methods and as such only returns [ethers.UnsignedTransaction](https://docs.ethers.org/v5/api/utils/transactions/#UnsignedTransaction) objects which can then be used to generate a custom signed transaction (eg. privateKey, multisig, MPC).

### Signer-aware (high-level)
We also expose a version of the SDK that takes a [ethers.Signer](https://docs.ethers.org/v5/api/signer/) object and returns an SDK that returns signed transactions.
