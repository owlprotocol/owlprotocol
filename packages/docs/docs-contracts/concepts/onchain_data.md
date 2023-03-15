---
sidebar_position: 2
---

import { Box } from '@chakra-ui/react'

# Dynamic NFT Data

### To maximize the flexibility of NFT on-chain data, we only add a `bytes` data named `dna` to the NFT - **this is the NFT Data**

Many other NFT projects may add additional methods to their NFT token contract, which is difficult for integration,
because they are non-standard, requiring developers to customize integrations for each NFT collection.

:::tip Jump to the Tutorial
## Learn from example through our [Dynamic NFT Data Tutorial](/contracts/tutorial-nftdata)!

Explore step by step, how to encode arbitrary data for your NFT, for any use case.

[CLICK HERE](/contracts/tutorial-nftdata)
:::

### Our approach starts with exposing the dynamic features (DNA) through the standard `tokenURI` method.

```js
/***** Dna (NFT Data) *****/
/**
 * @dev returns uri for token metadata. If no baseURI, returns Dna as string
 * @param tokenId tokenId metadata to fetch
 * @return uri at which metadata is housed
 */
function tokenURI(uint256 tokenId) public view override returns (string memory) {
    _requireMinted(tokenId);

    string memory baseURI = _baseURI();
    bytes memory dnaRaw = getDna(tokenId);
    string memory dnaString = dnaRaw.encode();
    return bytes(baseURI).length > 0 ? string(abi.encodePacked(baseURI, dnaString)) : dnaString;
}
```
[ERC721TopDownDna.sol](https://github.com/owlprotocol/owlprotocol/blob/main/packages/contracts/contracts/assets/ERC721/ERC721TopDownDna.sol)

> As you can see we store this `dna` per `tokenId`: **`getDna( tokenId )`**

:::info Detailed Docs
**Visit our Contract Guide for in the detailed docs:** [IERC721Dna](/contracts/contract-guides/IERC721Dna)
:::

<Box p={4} bgColor='white' borderRadius={4}>
    <img src="/img/data_breakdown.png" alt="data_breakdown"/>
</Box>

---

### Deciphering / Translating the NFT On-Chain Data (DNA)

By itself the **`dna`** is useless, it can be thought of as similar to [`msgPack`](https://msgpack.org/index.html) or
`protoBuf` which requires a **schema** to decode the data.

Since the schema can get quite large, this is stored on **IPFS** in JSON format, and only the IPFS hash is
added to the NFT smart contract as part of the **`baseURI`**.

For example a typical `tokenURI( tokenId )` method call to the *smart contract* itself will return something like:

> `https://metadata.owlprotocol.xyz`/metadata/getMetadata/**QmbUcD2MRhHYVwEw3YEX3izMzVvZfT49CGfLhqdVRVcnZd**/**AAAAAA...**

Which follows the format:

> `https://api.owlprotocol.xyz`/metadata/getMetadata/{**ipfsSchemaHash**}/{**dna**}

:::note The API Endpoint is a Fallback
You'll see here that we also include an API endpoint `https://api.owlprotocol.xyz`, which hosts a server-side version of
the **Client-Side SDK**. This is intended as a fallback for when the application does not integrate the client-side SDK.
:::

Typically, rather than calling the API Endpoint, a decentralized application should parse the **`ipfsSchemaHash`** and
the **`dna`**, then pass that to the **client-side SDK** to generate the NFT's `metadata`, which will typically also include the
NFT rendering/image either as a link or a base64 encoded image.

---

### The IPFS Hosted Schema JSON

The **Collection Schema JSON** defines how the traits of an NFT are encoded into bytes, for example a typical Schema JSON
may look like this:

```json
{
  "name": "Owl Protocol Example",
  "description": "Example Collection",
  "traits": [
    {
      "name": "Item Level",
      "type": "number",
      "min": 1,
      "max": 9999,
      "abi": "uint16"
    },
    {
      "name": "Base Item",
      "type": "image",
      "options": [
        {
          "value": "Sword",
          "image_url": "/ipfs/Qme8axUSCZrRNaFE2QaPYfVYhaFdRazC5baNtkE674rjAZ/items/sword.png",
          "image_type": "png"
        }
      ]
    },
    {
      "name": "Enchantment",
      "type": "image",
      "options": [
        {
          "value": "None",
          "image_url": "/ipfs/Qme8axUSCZrRNaFE2QaPYfVYhaFdRazC5baNtkE674rjAZ/enchant/none.png",
          "image_type": "png"
        },
        {
          "value": "Ruby Fire",
          "image_url": "/ipfs/Qme8axUSCZrRNaFE2QaPYfVYhaFdRazC5baNtkE674rjAZ/enchant/ruby.png",
          "image_type": "png"
        },
        ...
      ]
    }
  ]
}
```

> By default, traits are 8-bits, unless specified by the `bitSize` field, which must be a multiple of 8.

In this example we have a Sword NFT with 3 traits:

1. **Item Level** - which is 16-bits
2. **Base Item** - the base sword
3. **Enchantment** - an enchantment on the sword

Therefore, if we had a "Level 5" sword, with a ruby enchantment the **`dna`** would be:

|       | Item Level       | Base Item | Enchantment |
|-------|------------------|-----------|-------------|
| bits  | 0000000000000101 | 00000000  | 00000001    |
| value | 5                | 0         | 1           |


> We encode from *left-to-right*, which is most intuitive to work with.

:::info Result
This gives us a final bit representation for the data of: **`00000000000001010000000000000001`**.

Which is translated to `base64`.
:::

So for example, if the IPFS hash for the **Collection Schema JSON** is `QmePBmfWYbZ6rtt93E9L5AnpAdeuVu7pbkjHAxDSQe5bjw`,
then `tokenURI` would return:

> `https://api.owlprotocol.xyz`/metadata/
> getMetadata/**QmePBmfWYbZ6rtt93E9L5AnpAdeuVu7pbkjHAxDSQe5bjw**/**[base64 of dna]**

Calling the `tokenURI` would return the NFT **metadata JSON**, which conforms to https://docs.opensea.io/docs/metadata-standards at the very minimum.

Which is the descriptive JSON that looks somewhat like:

```js
{
  "description": "NFT Marketplace compatible metadata JSON for the Owl Protocol Example docs.",
  "external_url": "https://docs.owlprotocol.xyz",
  "image": "base64",
  "name": "Owl Protocol Sword",
  "attributes": [ ... ]
}
```

Notice that the image here is shown as a `base64`, but this also supports a link to an IPFS hosted image, or just any API.

### Read on about the [NFT Rendering](/contracts/concepts/rendering) process in the next page.
### Or try it out with our tutorial: [click here](/contracts/tutorial-nftdata).


