# Owl Protocol On-Chain encoded NFT SDK
Owl Protocol's NFT SDK designed for generative NFTs with on-chain encoding.


## Terminology
For the purposes of this project, we use the following naming conventions:

### `NFTGenerativeCollection`
A generative NFT collection that is hybrid, storing its data both on and off-chain. On-chain through the smart contract's storage `mapping(uint256 tokenId => uint256 dna)`, and off-chain through the rendering client side using the `@owlprotocol/nft-sdk` itself or using the associated `@owlprotocol/nft-sdk-api`.

On-chain encoding is important as it enables other smart contracts to access the NFT's metadata directly in trustless fashion. However, it must be compact, and we therefore store the encoding (aka `dna`) conciseuly using a single `uint256` storage slot.

Off-chain decoding enables users to actually render various attributes of an NFT using the collection's `collection.json` definition which maps encodings to various attribute types.

### `NFTGenerativeTrait`
A generative attribute defines encoding/decoding from binary data to a user facing rendering. The abstract `NFTGenerativeTraitClass` defines basic shared features but various kinds of attributes exists:

* `Color`: Defines an [8-bit color](https://en.wikipedia.org/wiki/8-bit_color). To actually render, into a color, the color must go through **quantization** through a colormap that maps 8-bit colors to 24-bit RGB. This is done through `color.rgb(gene: number, colormap: RGB[])`. The actual color is then `colormap[gene]` where `gene` is simply the decoded binary data that can range from 0-255. Color is therefore similar to `Number` but with a fixed range.

* `Colormap`: Defines a colormap with 256 colors. Requires 8bits.

* `Enum`: Defines a string value that user picks from `enum.options[gene]`. Can have an arbitrary number of options. Up to 32bits.
* `Image`: Defines an image layer that the user picks from `image.options[gene]`. This is similar to `Enum` bit includes additional convenience functions for rendering & querying the base image.
* `Number`: Defines a number that can range from `n.min - n.max` where `n.min >= 0`. Gene is therefore offset by `n.min` to map binary data to rendered value.


### `NFT Item`
This does **not** exist as any interface or class but simply refers to the high-level concept of the rendered NFT item. The `NFTGenerativeCollection.dnaToAttributesFormatted(dna: BytesLike)` enables decoding a full `dna` encoding to a list of attributes as defined by the collection.

### `dna`
A binary encoding of an NFT Item data. Can be up to 256bit. This compact encoding enables efficient storage on smart contracts. **Always** stored in variables as a `BN.js` number to avoid integer overflow.

### `gene`
A slice of the binary encoding that defines a specic attribute of an NFT Item

### `trait`
A trait refers to a characteristic of an NFT Collection and is defined by `NFTGenerativeTrait` which describes how many bits it is encoded it and what value it renders to (eg. `Color, Colormap, Enum, Image, Number`). A trait might for example be `hair_style`, encoded into 2 bits that represent 4 options `[bald, short, medium, long]`.

A generative collection is defined as a set of traits that map the binary encoding to attributes.

### `attribute`
An attribute refers to the actual rendering of a trait by decoding the `gene`. `trait + gene = attribute`. Following our previous example, an attribute of a  decoded NFT item cold be having `hair_color = medium`. In biology, the rendered `attribute` would be called the [phenotype](https://en.wikipedia.org/wiki/Phenotype) of the item.
Attributes are what are rendered for an `NFT Item` on a marketplace and are usually listed as `Attributes` or `Properties`.

## Project Structure

## SVG Styling
For SVG composition use a standard 800x800 grid to wrap the layers. As such, if looking to use SVG-based image generation, make sure all svg layers are wrapped in this view box.

```html
<svg width="800" height="800" viewBox="0 0 800 800"></svg>
```

## IPFS Caching
We use the `js-datastore-core` interface as a cache for IPFS.
A list of implementations can be found [here](https://github.com/orgs/ipfs/repositories?q=js-datastore&type=all&language=&sort=)
