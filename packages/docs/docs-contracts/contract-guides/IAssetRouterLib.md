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

[IAssetRouterInput.md]: ./IAssetRouterInput.md
[IAssetRouterOutput.md]: ./IAssetRouterOutput.md

[IAsset.sol]: ../../../owlprotocol-contracts/contracts/plugins/AssetRouter/IAsset.sol
[IAssetRouterInput.sol]: ../../../owlprotocol-contracts/contracts/plugins/AssetRouter/IAssetRouterInput.sol
[IAssetRouterOutput.sol]: ../../../owlprotocol-contracts/contracts/plugins/AssetRouter/IAssetRouterOutput.sol
[IERC721Dna.sol]: ../../../owlprotocol-contracts/contracts/assets/ERC721/IERC721Dna.sol

# [IAsset.sol]
A library for batched [EIP-20], [EIP-721], and [EIP-1155] interactions such as transfers, mints, and ownership checks. [IAsset.sol] is used by [IAssetRouterInput.md] and [IAssetRouterOutput.md] to enable dynamic NFT mechanics that combine, mint, and burn NFTs with flexible logic.

See the reference [here](#) **TODO**

## Structs
### AssetERC20
Represents an [EIP-20] token and its amount.
```solidity
struct AssetERC20 {
    address contractAddr;
    uint256 amount;
}
```

### AssetERC721
Represents a set of [EIP-721] tokens or an entire collection (when `tokenIds.length` = 0).

```solidity
struct AssetERC721 {
    address contractAddr;
    uint256[] tokenIds;
}
```

### AssetERC1155
Represents a set of [EIP-1155] tokens, and associated amounts.
Invariant: `amounts.length == tokenIds.length`

```solidity
struct AssetERC1155 {
    address contractAddr;
    uint256[] amounts;
    uint256[] tokenIds;
}
```

### AssetBasketInput
Represents a set of assets used as inputs. Inputs can have 3 types:
- Unaffected: Check for ownership or minimum amount
- Burn: Transfer to a `burnAddress` (Note: this might also be a regular address)
- NTime: For [EIP-721] tokens. Check for ownership and keep track of `usage < erc721NTimeMax`
Using the basket information the [IAssetRouterInput.md] can process the inputs and then call another [IAssetRouterOutput.md] contract to trigger it.
The basket is also configured with a `burnAddress` shared across all assets.

```solidity
struct AssetBasketInput {
    address burnAddress;
    AssetERC20[] erc20Unaffected;
    AssetERC20[] erc20Burned;
    AssetERC721[] erc721Unaffected;
    AssetERC721[] erc721Burned;
    AssetERC721[] erc721NTime;
    uint256[] erc721NTimeMax;
    AssetERC1155[] erc1155Unaffected;
    AssetERC1155[] erc1155Burned;
}
```

### AssetBasketOutput
Represents a set of assets used as outputs. Inputs can have 3 types:
- Transfer: Transferred to the output contract initially and then to the user when triggered. For [EIP-721] tokens. Transferred tokens are tracked in the `tokenIds` field of the `AssetERC721` and popped incrementally.
- Mint: Minted directly from the output contract to the user when triggered
- MintAutoId: For [EIP-721] tokens. Minted directly using autoId from the output contract to the user when triggered
The basket is also configured with an `outputableAmount` which defines how many baskets can be outputted.
Invariant: The `outputableAmount` MUST match the `tokenIds.length` for all `erc721Transfer` assets.

```solidity
struct AssetBasketOutput {
    uint256 outputableAmount;
    AssetERC20[] erc20Transfer;
    AssetERC20[] erc20Mint;
    AssetERC721[] erc721Transfer;
    AssetERC721[] erc721Mint;
    AssetERC721[] erc721MintAutoId;
    AssetERC1155[] erc1155Transfer;
    AssetERC1155[] erc1155Mint;
}
```

## Functions
### AssetBasketInput
#### `input`
`AssetBasketInput` that checks token guards. Called by the `user` interacting with an [IAssetRouterInput.md] contract.

Each asset is checked for ownership or transferred accordingly depending on its type. `NTime` [EIP-721] assets are also incremented by how many times the asset is used. If any check fails the function throws as the input failed. This could be because the `user` does not own the asset or hasn't given transfer permissions to the contract.

### AssetBasketOutput
#### `deposit`
`AssetBasketOutput` that is incrementing its `outputableAmount`. Called by `admin` looking to increase the amount. The `ouputableAmount` is increased, and `Transfer` assets are transferred to the contract, sufficiently to cover the additional increase. For mintable assets, no change is necessary.

#### `withdraw`
`AssetBasketOutput` that is decrementing its `outputableAmount`. Called by `admin` looking to decrease the amount. The `outputableAmount` is decreased, and `Transfer` assets are transferred back to the `admin`.

#### `output`
`AssetBasketOutput` that outputing assets to a `user`. The `outputableAmount` is decreased, and `Transfer` assets are transferred to the `user`, and `Mint` assets are minted to the `user`.
