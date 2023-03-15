---
sidebar_position: 5
sidebar_label: 'IERC721Dna'
---

# IERC721Dna - Metadata Encoding Standard

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
[EIP-998]: https://eips.ethereum.org/EIPS/eip-998

[ether.js]: https://github.com/ethers-io/ethers.js/
[web3.js]: https://github.com/web3/web3.js
[Typechain]: https://github.com/dethcrypto/TypeChain
[HRE]: https://hardhat.org/hardhat-runner/docs/advanced/hardhat-runtime-environment
[ts-node]: https://github.com/TypeStrong/ts-node
[esbuild]: https://github.com/evanw/esbuild
[hardhat-shorthand]: https://github.com/NomicFoundation/hardhat/tree/main/packages/hardhat-shorthand
[@typechain/hardhat]: https://www.npmjs.com/package/@typechain/hardhat
[cryptokitties.co]: https://www.cryptokitties.co/
[layout_in_storage.html#bytes-and-string]: https://docs.soliditylang.org/en/v0.8.17/internals/layout_in_storage.html#bytes-and-string
[colormap]: https://github.com/bpostlethwaite/colormap
[colormaps.png]: https://raw.githubusercontent.com/bpostlethwaite/colormap/master/colormaps.png
[merge-images]: https://github.com/lukechilds/merge-images
[contract-level-metadata]: https://docs.opensea.io/docs/contract-level-metadata


[IAssetRouterLib.md]: ./IAssetRouterLib.md
[IAssetRouterInput.md]: ./IAssetRouterInput.md
[IAssetRouterOutput.md]: ./IAssetRouterOutput.md

[@owlprotocol/nft-sdk]: ../../../../../nft-sdk/

[IAsset.sol]: ../reference/plugins/AssetRouter/IAsset
[IAssetRouterInput.sol]: ../reference/plugins/AssetRouter/IAssetRouterInput
[IAssetRouterOutput.sol]: ../reference/plugins/AssetRouter/IAssetRouterOutput
[IERC721Dna.sol]: ../reference/assets/ERC721/IERC721Dna
[IERC721TopDown.sol]: ../reference/assets/ERC721/IERC721TopDown
[IERC721TopDownDna.sol]: ../reference/assets/ERC721/IERC721TopDownDna

The [IERC721Dna.sol] contract defines a standard for efficiently encoding on-chain NFT metadata. This enables powerful on-chain mechanics combining NFTs such as Crafting, Breeding or other decentralized incentives. The standard is inspired by ideas first pioneered by [cryptokitties.co] which encoded "DNA" into their kitty NFTs for the purpose of gamified breeding. However, Owl Protocol's NFT trait encoding mechanic is fundamentally different as it is designed with standardisation and composability in mind.

The goal of the `IERC721Dna.sol` standard is to be as flexible as possible. As such, the `dna` of an NFT is returned as an arbitrary `bytes` array which can be used to encode any data.

## Interface
The [IERC721Dna.sol] interface itself is quite minimal defining only 4 functions:
```js
interface IERC721Dna {
    function mintWithDna(address to, bytes memory dna) external returns (uint256);
    function safeMintWithDna(address to, bytes memory dna) external returns (uint256);
    function getDna(uint256 tokenId) external returns (bytes memory);
    function updateDna(uint256 tokenId, bytes memory dna) external;
}
```
* `mintWithDna` and `safeMintWithDna` are essentially the same. Notable is the lack of a specified `tokenId` as our contract uses `AutoId` mechanic as the `tokenId` is **NOT** used to encode the dna of the NFT.
* `getDna` gets the `dna` data of an NFT. Notable here is the fact that unlike other solutions, the `dna` of an NFT is returned
* `updateDna` sets the `dna` of an NFT. It is recommended that this function limited with permissions to the owner of an NFT or to external proxy contract for additional composability.

While only the external interface is defined here, the simplest way to implement this interface is by introducing a `mapping(uint256 tokenId => bytes dna)` into the contract.

## Gas Costs
The addition of on-chain metadata encoding adds **NO OVERHEAD** for regualr [EIP-721] transfers. However, this does introduce a slight overhead for minting new tokens, which is proportional to the amount of DNA written. If stored efficiently however, this can be minimal and only cost 1 additional `SSTORE` operation (if the `dna` < 31 bytes [layout_in_storage.html#bytes-and-string]). For `getDna` and `updateDna` operations, the cost will scale similarly.

## DNA Standard
Owl Protocol's [IERC721Dna.sol] interface does **not necessarily** specify **how** to encode the dna but we **highly recommend** using the Owl DNA encoding standard to maximize efficiency and composability.


### What to encode
Before, you use Owl Protocol DNA standard, you should think about **what** data is relevant to store on-chain. We recommend a hybrid model. **Not all** data should be stored on-chain. Only data with **execution value**, meaning that it is relevant to the logic of other smart contracts (eg. DAO, staking, crafting), should be used on-chain.

### Image Layers
Images should **not** be encoded on-chain. Storing an image on-chain can be prohibitively expensive or imposible. Instead **pointers** to images should be stored in the form of numbers. For example, if an NFT can have 4 background images (eg. circle, triangle, triangle, pentagon), an `number` trait from `0-3` should be stored on-chain. The `collection.json` encoding spec can then define how each number points to a different image and can be used to create a truly generative NFT (see later section). The `collection.json` and associated image resources can then be uploaded to IPFS and referenced by the `contraryURI()` function extending the [contract-level-metadata] standard. See later sections for more info on how to use generative image layers using "Image Traits".

### Nested DNA Encoding
We define the following recommended encoding standard for [IERC721Dna.sol] NFTs.
```solidity
bytes memory fullDna = abi.encode(bytes inherentDna, bytes[] childDna)
```
The `fullDna` of an NFT is defined as the encoding of its `inherentDna` which is stored in [IERC721Dna.sol] (and can be updated) and its `childDna[]` which is defined as an array of child dna encoding for NFTs that are attached to this NFT. This encoding enables extending the DNA encoding standard to support additional data that can be encoded in the NFT but not expressely stored in the contract itself.

For example, our [IERC721TopDown.sol] interface defines a composable nft similar to [EIP-998]. The combined interface [IERC721TopDownDna.sol], enables users to componse NFTs in a parent-child relationship, and have the parent NFT's dna be defined recursively as the encoding of its `inherentDna` and of its attached `childDna[]`.

### Traits & Attributes
While the on-chain encoding is useful for smart contracts, we also need a way to define how the on-chain data is visualized. We therefore create a `collection.json` file that will serve as an encoding map, for **both** the `inherentDna` and the `childDna[]`. This will be used to encode/decode attributes of an NFT to human-readable metadata such as text or images that can be rendered in a marketplace.

We define the following terms:
* `fullDna`: The encoding of an NFT's attributes and its associated child NFTs
* `inherentDna`: The encoding of a set of attributes of an NFT
* `childDna[]`: The encoding of the set child attached NFTs. Each element of the array is encoded as `fullDna` itself.
* `collection.json`: The definition of how `inherentDna` of an NFT is decoded to attributes, and how child NFT's `inherentDna` is decoded.
* `trait`: The definition of the various options an attribute can take. (eg. `size: small, medium, large`)
* `attribute`: The specific value of a trait decoded using `inherentDna` and the `collection.json` (eg. `decode(0) = small`)

Below a simple example `collection.json` defining a collection with 2 traits, and one optional child attachment.
```json
{
  "name": "Shapes",
  "generatedImageType": "png",
  "traits": {
    "faction": {
      "name": "faction",
      "type": "enum",
      "options": [
        "earth",
        "wind",
        "fire",
        "water"
      ],
      "abi": "uint8"
    },
    "strength": {
      "name": "strength",
      "type": "number",
      "abi": "uint8"
    }
  },
  "children": {
    "fg": {
      "name": "Shapes NFT Child",
      "traits": {
        "strokeWidth": {
          "name": "strokeWidth",
          "type": "number",
          "abi": "uint8"
        },
      }
    }
  }
}
```

The two key fields are the `traits` and `children` properties which defines traits for the `inherentDna` and the `childDna` respectively.  The `children` field itself also defines a collection in the same format, which can be extended infinitely.

Each trait is defined by its `name`, `type` (enum, number...), and its `abi`, which defines how the trait is encoded (default `uint8` but can be `uint16`, `uint32`).

The **order** of the keys in the `traits` field matters as if there are 2 traits, the order will define how the traits are decoded:
```solidity
(uint8 faction, uint8 strength) = abi.decode(inherentDna, (uint8, uint8));
```

Similarly, the **order** of the keys in the `children` field matters as if there are 2 children, the order will define how the children are decoded.
```solidity
(bytes memory inherentDna, bytes[] memory childDna) = abi.decode(fullDna, (bytes, bytes[]));
bytes child0 = childDna[0];
bytes child1 = childDna[1];
```

Various traits are already supported by [@owlprotocol/nft-sdk] in addition to `enum` and `number`

#### Number
Defines a number trait. By default, 0-255 though this can be lower or higher (provided `abi` is changed to `uint16`). Dna is decoded as an integer (eg. `decode(0) = 0`)
```json
{
    "name": "strength",
    "type": "number",
    "abi": "uint8"
}
```

#### Enum
Defines text that can be chosen from a set of options (in other words a category). By default, up to 255 options are supported though this can be lower or higher (provided `abi` is changed to `uint16`). Each value specified in the `options` field, is decoded to its index position (eg. `decode(0) = options[0]`)
```json
{
    "name": "faction",
    "type": "enum",
    "options": [
        "earth",
        "wind",
        "fire",
        "water"
    ],
    "abi": "uint8"
}
```

#### Image
An image trait can be used to define a layer that can be used to create a truly generative collection. By default, an image trait can support up to 255 options but this can be lower or higher (provided `abi` is changed to `uint16`).

A collection can support **multiple** image traits (each with their own options), that will then be merged as layers using the [merge-images] library. To use generative image merging specify `"generatedImageType": "png"` for PNG merging or `"generatedImageType": "svg"` for SVG merging.

Image layers can be of two types. PNG or SVG (aka vector files). PNG images are usually easier to use by artists but SVG open up greater possibilties by enabling the parametrization of the image generation using other attributes (eg. `number` attribute to scale size or `color` attribute to set color). In any case **ALL** image traits and their possible options must be of the same type.

**PNG Image**
```json
{
    "name": "imageBg",
    "type": "image",
    "image_type": "png",
    "options": [
        {
            "value": "circle",
            "image_url": "http://example.com/bgCircle.png"
        },
        {
            "value": "square",
            "image_url": "http://example.com/bgSquare.png"
        }
    ]
}
```

**SVG Image**
```json
{
    "name": "imageBg",
    "type": "image",
    "image_type": "svg",
    "options": [
        {
            "value": "circle",
            "image_url": "http://example.com/bgCircle.svg"
        },
        {
            "value": "square",
            "image_url": "http://example.com/bgSquare.svg"
        }
    ]
}
```

#### Color
Defines an RGB color. Can be used by an `svg` image layer for rendering.

**8bit color**
An NFT with a color trait with `abi = uint8` **MUST** also defined a colormap trait that the color trait points to (see below). Due to only storing 8bits, the color is similar to a `number` trait, being able to only take 255 values. The colormap enables conversion from the 8bit color trait to an RGB value using the selected colormap.

**16bit color**
Not implemented

**24bit color**
Not implemented.

#### Colormap
Defines a set of RGB colors, in the form of an array. A colormap trait can store up to 255 different colormaps. Each colormap having up to 255 colors.
```json
{
    "name": "colormap",
    "type": "colormap",
    "options": [
        {
            "value": "white" //white gradient
        },
        {
            "value": "black" //black gradient
        },
        {
            "value": "custom" //custom colors
            "colors": [[0, 0, 0], [0, 1, 1], [0, 2, 2]] //...
        }
    ]
},
```

A set of standard colormap options from [colormap]  are also supported where you don't need to specify the color options but simply set `value` as one of the names below.

![colormaps.png]



