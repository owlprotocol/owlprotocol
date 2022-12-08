---
sidebar_position: 2
sidebar_label: 'IAssetRouterInput'
---

# IAssetRouterInput - NFT Input Router

[EIP-20]: https://eips.ethereum.org/EIPS/eip-20
[EIP-721]: https://eips.ethereum.org/EIPS/eip-721
[EIP-1155]: https://eips.ethereum.org/EIPS/eip-1155

[EIP-155]: https://eips.ethereum.org/EIPS/eip-155
[EIP-165]: https://eips.ethereum.org/EIPS/eip-165
[EIP-1820]: https://eips.ethereum.org/EIPS/eip-1820
[EIP-2470]: https://eips.ethereum.org/EIPS/eip-2470
[EIP-1014]: https://eips.ethereum.org/EIPS/eip-1014
[EIP-1167]: https://eips.ethereum.org/EIPS/eip-1167
[EIP-2470]: https://eips.ethereum.org/EIPS/eip-2470

[ether.js]: https://github.com/ethers-io/ethers.js/
[web3.js]: https://github.com/web3/web3.js
[Typechain]: https://github.com/dethcrypto/TypeChain
[HRE]: https://hardhat.org/hardhat-runner/docs/advanced/hardhat-runtime-environment
[ts-node]: https://github.com/TypeStrong/ts-node
[esbuild]: https://github.com/evanw/esbuild
[hardhat-shorthand]: https://github.com/NomicFoundation/hardhat/tree/main/packages/hardhat-shorthand
[@typechain/hardhat]: https://www.npmjs.com/package/@typechain/hardhat

[IAssetRouterLib.md]: ./IAssetRouterLib.md
[IAssetRouterInput.md]: ./IAssetRouterInput.md
[IAssetRouterOutput.md]: ./IAssetRouterOutput.md

[IAsset.sol]: ../reference/plugins/AssetRouter/IAsset
[IAssetRouterInput.sol]: ../reference/plugins/AssetRouter/IAssetRouterInput
[IAssetRouterOutput.sol]: ../reference/plugins/AssetRouter/IAssetRouterOutput

[IAssetRouterInput.sol] defines a contract that guards calls requiring users to deposit or prove ownership of assets to then call an underlying contract. It can then be paired with any  [IAssetRouterOutput.sol] contract to trigger minting or other mechanics.

The [IAssetRouterInput.sol] contract stores a set of `AssetInputBasket` from which the `user` can chose from. Any basket in the contract can then be used to forward calls to an [IAssetRouterOutput.sol]. The output contract is configured to **only** accepts calls from the input or a set of valid input contracts to trigger arbitrary logic though the current implementation is meant for token transfers & mints.

The general flow of a transaction can be visualized as such:
`user` -> `IAssetRouterInput` -> `AssetInputBasket` assets ([EIP-20], [EIP-721], [EIP-1155]) -> `IAssetRouterOutput` -> Arbitrary logic.

## Functions

### `getBasket`
Returns an `AssetInputBasket`. See [IAssetRouterLib.md]

### `input`
Call `target` address with `amount` parameter using `AssetInputBasket` stored at index `basketIdx`. Called by `user`.
