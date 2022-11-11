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

[IAsset.sol]: ../../../owlprotocol-contracts/contracts/plugins/AssetRouter/IAsset.sol
[IAssetRouterInput.sol]: ../../../owlprotocol-contracts/contracts/plugins/AssetRouter/IAssetRouterInput.sol
[IAssetRouterOutput.sol]: ../../../owlprotocol-contracts/contracts/plugins/AssetRouter/IAssetRouterOutput.sol
[IERC721Dna.sol]: ../../../owlprotocol-contracts/contracts/assets/ERC721/IERC721Dna.sol

# [IAssetRouterOutput.sol]
[IAssetRouterOutput.sol] defines a contract that outputs assets. All calls come from a set of trusted forwarders, usually [IAssetRouterInput.sol].

The [IAssetRouterOutput.sol] contract stores a set of `AssetOutputBasket` from which the `forwarder` can chose from. Any basket in the contract can then be used to mint assets.

The general flow of a transaction can be visualized as such:
`forwarder` -> `IAssetRouterOutput` -> Mint/Transfer `AssetOutputBasket` assets ([EIP-20], [EIP-721], [EIP-1155])
