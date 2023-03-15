---
sidebar_position: 2
sidebar_label: 'DNFT Data Encoding'
slug: '/tutorial-nftdata'
---

import { SimpleGrid } from '@chakra-ui/react'

# NFT Data Encoding - ERC721Dna

## Tutorial

The **ERC721Dna** smart contract is used to encode useful data on-chain for an NFT.

> Contract: [ERC721DnaBase.sol](https://github.com/owlprotocol/owlprotocol/blob/main/packages/contracts/contracts/assets/ERC721/ERC721DnaBase.sol)

By itself, it doesn't do much except primarily managing the `dna` field and overriding `tokenURI` to also return the DNA.

```javascript
/***** Dna *****/
    /**
     * @dev returns uri for token metadata. If no baseURI, returns Dna as string
     * @param tokenId tokenId metadata to fetch
     * @return uri at which metadata is housed
     */
    function tokenURI(uint256 tokenId) public view virtual override returns (string memory) {
        string memory baseURI = _baseURI();
        bytes memory dnaRaw = getDna(tokenId);
        string memory dnaString = dnaRaw.encode();
        return bytes(baseURI).length > 0 ? string(abi.encodePacked(baseURI, dnaString)) : dnaString;
    }
```

However, when combined with the **NFT-SDK** and a Schema JSON, we're able to provide much more information
about an NFT, its intent, and usage than before.

## Step 1: Defining the Data Schema

First we want to define the NFT data and how we want that represented.

<SimpleGrid className="features-grid" columns={{sm: 2, md: 4}} spacing={8}>
    <Box>
        <div style={{textAlign: 'center'}}>
        <img src="/img/tutorial/loyalty/bg-silver.png"/>
        <br/>
        Background
        </div>
    </Box>
    <Box>
        <div style={{textAlign: 'center'}}>
        <img src="/img/tutorial/loyalty/tier-gold.png"/>
        <br/>
        Badge
        </div>
    </Box>
</SimpleGrid>

This includes all the **traits/attributes** you expect to need for the lifetime of the NFT.

> You can also make your DNFT upgradeable (which is the default on our platform),
> to have full control to make required changes in the future.

In this example, we're building a generic loyalty program, so the traits/attributes we'll have are:

- Member ID
- Status Tier
- Points
- Country
- **Sub Group** - `uint16`
- Last Transferred

We'll also have 2 image layers

1. Background
2. Tier Badge


:::tip Attribute Order Matters
The order in which we declare our traits/attributes is important because this is the order in which
the NFT data is encoded on-chain.

By default, we use 8-bits for a trait, unless its options are over 256, in which case we increase that to 16-bits.

But it may also be the case that you may want to reserve extra space in anticipation that more traits may be added later.
This is necessary because once NFTs are minted, the data is encoded at specific offsets, and changing that is expensive
later.
:::

In this example we declare the **Sub Group** attribute to be a `uint16`. This allows us to have up to 64,000+ different
sub groups in the future.

Also note that the **Last Transferred** comes immediately after **Sub Group**, so if we didn't declare it as a uint16,
then after 256 different enum options, it would start to overflow and overwrite the last transferred time.

## Step 2: Implementing the Traits and Collection

To implement our schema we need to declare our traits and the collection class.

We will create 2 files, one has all the traits/attributes:

#### `traits.ts`

```js
import { NFTGenerativeTraitImage, NFTGenerativeTraitEnum, NFTGenerativeTraitNumber } from '@owlprotocol/nft-sdk';

export const attrMemberIdNumber: NFTGenerativeTraitNumber = {
    name: 'Member ID',
    type: 'number',
    description: `Owner's membership ID`,
    min: 10000000000,
    max: 99999999999,
}

export const attrTierEnum: NFTGenerativeTraitEnum = {
    name: 'Status Tier',
    type: 'enum',
    description: 'Status tier in the loyalty program, can be one of: General, Blue, Silver, Gold, Platinum, Diamond',
    options: ['Bronze', 'Silver', 'Gold', 'Platinum', 'Diamond'],
};

export const attrTierBgImage: NFTGenerativeTraitImage = {
    name: 'Background',
    type: 'image',
    image_type: 'png',
    options: [
        {
            value: 'Basic',
            image_url: 'ipfs://QmTeQUXNbaXZctrhfztbWsvfrz1vBNvaqHui6LVbDp14YV/bg-blue.png',
        },
        {
            value: 'Facets',
            image_url: 'ipfs://QmTeQUXNbaXZctrhfztbWsvfrz1vBNvaqHui6LVbDp14YV/bg-silver.png',
        },
        ...
```
[https://github.com/owlprotocol/owlprotocol/tree/main/packages/cli/src/projects](https://github.com/owlprotocol/owlprotocol/tree/main/packages/cli/src/projects)



#### `collection.ts`
And the other brings it all together in the [NFTGenerativeCollectionClass](https://github.com/owlprotocol/owlprotocol/blob/main/packages/nft-sdk/src/classes/NFTGenerativeCollection/NFTGenerativeCollectionClass.ts) collection class.

```js
import {
    ...
} from './traits.js';

import {
    ...
} from '@owlprotocol/nft-sdk';

const collExampleLoyaltyDef: NFTGenerativeCollection = {
    name: 'Tutorial Example - Loyalty Program',
    description: 'Example from https://docs.owlprotocol.xyz/contracts/tutorial-nftdata',
    external_url: 'https://docs.owlprotocol.xyz/contracts/tutorial-nftdata',
    seller_fee_basis_points: 0,
    fee_recipient: '0xc2A3cB7d4BF24e456051E3a710057ac61f5dB133',
    generatedImageType: 'png',
    traits: {
        attrMemberIdNumber,
        attrTierEnum,
        attrTierBgImage,
        attrTierIconImage,
        attrPointsNumber,
        attrCountryEnum,
        attrSubGroupEnum,
        attrLastTransferTimestampNumber
    }
};

export const collExampleLoyalty = NFTGenerativeCollectionClass.fromData(collExampleLoyaltyDef) as NFTGenerativeCollectionClass<
    {
        'Member ID': NFTGenerativeTraitNumberClass,
        'Status Tier': NFTGenerativeTraitEnumClass,
        ...
    }
>;

export default collExampleLoyaltyDef;
```
[https://github.com/owlprotocol/owlprotocol/tree/main/packages/cli/src/projects](https://github.com/owlprotocol/owlprotocol/tree/main/packages/cli/src/projects)

## Step 3: Generate the Schema JSON using the [CLI Tool](/contracts/getting-started/cli)

We then use the CLI Tool to generate the Schema JSON.

1. First make sure you have a `.env.development` file, for this step it's fine to just copy the included `.env.example` file.

```
cp .env.example .env.development
```

2. Then build the CLI package, to generate the JS files we execute.

```
pnpm run build
```

3. Now call the `generateSchemaJSON` command on the CLI Tool. We're building the index JS file to `lib/esm/index.js` for now (this will be changed to dist soon).

```
| => node dist/index.cjs generateSchemaJSON collections.js --projectFolder=projects/example-loyalty
```

Which should output:

```
getProjectSubfolder /Users/owl/owl_protocol/owlprotocol/packages/cli/src/projects/example-loyalty/output
Creating JSON(s) for collections.js to folder: /Users/owl/owl_protocol/owlprotocol/packages/cli/src/projects/example-loyalty/output
projects/example-loyalty collections.js
Done
```

> Ignore any warnings for `duplicate definition`.

Now you should see a new folder in `projects/example-omo` called `output`, and inside 2 JSON files:
- collection-parent.json
- collection-child-Hats.json

## Step 4: Upload the Schema JSON to IPFS.
