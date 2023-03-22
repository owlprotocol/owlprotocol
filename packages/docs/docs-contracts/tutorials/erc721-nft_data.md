---
sidebar_position: 2
sidebar_label: 'DNFT Data Encoding'
slug: '/tutorial-nftdata'
---

import { SimpleGrid } from '@chakra-ui/react'

# NFT Data Encoding - ERC721Dna

:::info
In this tutorial we'll create a simple Loyalty Program's NFT with a basic badge.

![loyalty-silver](/img/loyalty-silver.jpg)
:::

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

---

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
        <img src="/img/tutorial/loyalty/bg-squares.png"/>
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
    <Box>
        <div style={{textAlign: 'center'}}>
        <img src="/img/tutorial/loyalty/tier-silver.png"/>
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

We'll also have 2 image layers:

1. Background
2. Tier Badge

:::tip
You should upload the image layers to IPFS, but you can host them on S3, or any other way you wish as long as it's publicly accessible.
:::

In this example we declare the **Sub Group** attribute to be a `uint16`. This allows us to have up to 64,000+ different
sub groups in the future.

Also note that the **Last Transferred** comes immediately after **Sub Group**, so if we didn't declare it as a uint16,
then after 256 different enum options, it would start to overflow and overwrite the last transferred time.

---

## Step 2: Implementing the Traits and Collection

To implement our schema we need to declare our traits and the collection class.

We will create 2 files, one has all the traits/attributes:

### `traits.ts`

```js
import { NFTGenerativeTraitImage, NFTGenerativeTraitEnum, NFTGenerativeTraitNumber } from '@owlprotocol/nft-sdk';

export const attrMemberIdNumber: NFTGenerativeTraitNumber = {
    name: 'Member ID',
    type: 'number',
    description: `Owner's membership ID`,
    min: 1000000,
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

:::info Note
The `image_url` is up to you to declare, ensure it is publicly accessible.

> If you are using IPFS, the `ipfs://` is replaced by the `ENV` variable `IPFS_GATEWAY` in the fallback API.

However if you're using our client-side `nft-sdk`, you can easily integrate an **ipfs-client**.
:::

[https://github.com/owlprotocol/owlprotocol/tree/main/packages/cli/projects](https://github.com/owlprotocol/owlprotocol/tree/main/packages/cli/projects)



### `collections.ts`
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
[https://github.com/owlprotocol/owlprotocol/tree/main/packages/cli/projects](https://github.com/owlprotocol/owlprotocol/tree/main/packages/cli/projects)


:::caution Don't Forget the Default Export
The CLI expects that the base/parent collection is exported as the default:

e.g. `export default collExampleLoyaltyDef;`
:::

:::tip Attribute Order Matters
The order in which we declare our traits/attributes is important because this is the order in which
the NFT data is encoded on-chain.

## **For images traits, this is also the order in which they are rendered.**

> By default, we use 8-bits for a trait, unless its options are over 256, in which case we can increase that to any **Solidity ABI data type**.
> For example: `uint16, uint32` up to `uint256`

But it may also be the case that you may want to reserve extra space in anticipation that more traits may be added later.
This is necessary because once NFTs are minted, the data is encoded at specific offsets, and changing that is expensive
later.
:::

---

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

3. Now call the `generateSchemaJSON` command on the CLI Tool. This will create the file that the **nft-sdk** needs to translate the on-chain data.

```
| => node dist/index.cjs generateSchemaJSON collections.js --projectFolder=projects/example-loyalty
```

Which should output:

```
getProjectSubfolder ~/owlprotocol/packages/cli/projects/example-loyalty/output
Creating JSON(s) for collections.js to folder: ~/owlprotocol/packages/cli/projects/example-loyalty/output
projects/example-loyalty collections.js
Done
```

> Ignore any warnings for `duplicate definition`.

Now you should see a new folder in `projects/example-loyalty` called `output`, and within that 1 JSON file:
- `collection-parent.json`

---

## Step 4: Upload the Schema JSON to IPFS.

We use Pinata for this tutorial, but you can upload it to any IPFS provider including your own.

For our example you can see we have it uploaded at:
[https://leovigna.mypinata.cloud/ipfs/QmXrpPT5KveNCcMHXdZiknnGiLbNveoccpD7FmagxgtQbj](https://leovigna.mypinata.cloud/ipfs/QmXrpPT5KveNCcMHXdZiknnGiLbNveoccpD7FmagxgtQbj)


:::info
Keep the IPFS hash handy, in our example it's `QmXrpPT5KveNCcMHXdZiknnGiLbNveoccpD7FmagxgtQbj`
:::

---

## Step 5: Create a file called `owlproject.json` in the project folder.

This is a metadata/manifest file that declares some required info:

```json
{
  "rootContract": {
    "tokenSymbol": "ExampleLoyaltyNFT",
    "tokenIdStart": 1,
    "cfg": {
      "ipfsEndpoint": "https://leovigna.mypinata.cloud",
      "ipfsPath": "ipfs",
      "apiEndpoint": "https://metadata.owlprotocol.xyz",
      "apiPath": "metadata/getMetadata",
      "schemaJsonIpfs": "QmXrpPT5KveNCcMHXdZiknnGiLbNveoccpD7FmagxgtQbj"
    }
  }
}
```

> You can define your own `ipfsEndpoint` and `ipfsPath`, but keep the `apiEndpoint/Path` as-is.

---

## Step 6: Deploy and Mint the NFT

1. We need to start a local Ganache blockchain, or you can use any other chain you specify in the `.env.development` or appropriate `ENV` file.

2. If you are using a different chain, you must define the network config in `packages/cli/config/default.json`.

3. Double check to ensure that the `accounts` in the config match the first two corresponding to the `HD_WALLET_MNEMONIC` ENV Var, and `NETWORK` is correct.

:::caution
The default `.env.example` - `HD_WALLET_MNEMONIC` **MUST** be updated to whatever mnemonic that Ganache gives you:
```
HD Wallet
==================
Mnemonic:      [YOUR WORDS HERE]
Base HD Path:  m/44'/60'/0'/0/{account_index}
```
:::

:::tip Using a Private Key
We also support using a single **private key**.

To use a private key, DO NOT set `HD_WALLET_MNEMONIC` and instead declare the `ENV` variable `PRIVATE_KEY_0`.
:::

### Deploy Common

If you are deploying to a new chain, or freshly launched local ganache, the common beacon proxies and implementations need to be deployed first.

We enable this by passing `--deployCommon=true` into the deployment command. Don't worry if you forget to remove this, due to the deterministic deployer
subsequent deployments will simply skip it if it exists, since they always deploy to the same address.

:::info
Owl Protocol uses advanced smart contract beacons including:
- **Deterministic Deployment** - giving us the same addresses for registries and implementations across multiple blockchains.
- **Beacon Proxies** - minimal additional overhead on initial deployment, but all subsequent NFT contracts are just proxies and lower gas.
- **Upgradeable Proxies** - revokable upgradability allows new projects to upgrade to new Dynamic NFT features as we roll them out, or revoke it to suit their needs.

Docs are coming soon that explain this in depth, for now you can follow the deployment strategies here: [deployCommon.ts](https://github.com/owlprotocol/owlprotocol/blob/tutorial-example-omo/packages/cli/src/commands/deployCommon.ts)
:::

### Deploy Contracts and Mint NFTs

If everything is set up properly, you can now run:

```
node dist/index.cjs deployTopDown --projectFolder=projects/example-loyalty --deployCommon=true --debug=true
```

Requirements:
- Schema JSON uploaded to IPFS, and IPFS hashes specified in `owlproject.json` file.
- Network configured properly in `.env.[NODE_ENV]` file and `cli/config/default.json`.
- NFT item JSONs generated in `output/items`

**This will deploy and mint all NFT JSONs in that folder.**

If it works you should see something similar to:
```
Deploying NFT: 1


Minted ~/owl_protocol/workspace/packages-public/packages/cli/projects/example-loyalty/output/items/collection-item-1.json
Mint: root at 0xa2B01e08CeD3b06051B59966B540BFe0B90b364c - tokenId: 1 & dna: 0x0000000f68bf01040101e2d01100016410eeb4
Done
```

---

## Step 9: View and Check the NFTs

You can use the `viewTopDown` command on the CLI to quickly view the NFT:

```
node dist/index.cjs viewTopDown --root=0xa2B01e08CeD3b06051B59966B540BFe0B90b364c --tokenId=1
```

This show something similar to:
```json
View ERC721TopDownDna 0xa2B01e08CeD3b06051B59966B540BFe0B90b364c on ganache
Fetching Metadata Schema JSON from: https://leovigna.mypinata.cloud/ipfs/QmXrpPT5KveNCcMHXdZiknnGiLbNveoccpD7FmagxgtQbj
NFT tokenId: 1 - owned by 0xa1eF58670368eCCB27EdC6609dea0fEFC5884f09
{
  'Last Transferred': 1678831284,
  'Sub Group': 'Yacht Club',
  Country: 'Belgium',
  Points: 123600,
  'Tier Badge': {
    value: 'Silver',
    image_url: 'ipfs://QmTeQUXNbaXZctrhfztbWsvfrz1vBNvaqHui6LVbDp14YV/tier-silver.png'
  },
  Background: {
    value: 'Tunnels',
    image_url: 'ipfs://QmTeQUXNbaXZctrhfztbWsvfrz1vBNvaqHui6LVbDp14YV/bg-squares.png'
  },
  'Status Tier': 'Silver',
  'Member ID': 1009855
}
```

---

## Step 10: View the NFT Image

You can view the NFT image by passing in `--debug=true`:

```
node dist/index.cjs viewTopDown --root=0xa2B01e08CeD3b06051B59966B540BFe0B90b364c --tokenId=1 --debug=true
```

Which should show at the bottom:

`https://metadata.owlprotocol.xyz/metadata/getMetadata/QmXrpPT5KveNCcMHXdZiknnGiLbNveoccpD7FmagxgtQbj/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAATAAAAD2i_AQQBAeLQEQABZBDutAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA==`

This link will show the NFT Standard Metadata JSON:

[https://metadata.owlprotocol.xyz/metadata/getMetadata/QmXrpPT5KveNCcMHXdZiknnGiLbNveoccpD7FmagxgtQbj/AAAA...](https://metadata.owlprotocol.xyz/metadata/getMetadata/QmXrpPT5KveNCcMHXdZiknnGiLbNveoccpD7FmagxgtQbj/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAATAAAAD2i_AQQBAeLQEQABZBDutAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA==)

`{"description":"Example from https://docs.owlprotocol.xyz/contracts/tutorial-nftdata","external_url":"https://docs.owlprotocol.xyz/contracts/tutorial-nftdata","image":"https://metadata.owlprotocol.xyz/metadata/getImage/QmXrpPT5KveNCcMHXdZiknnGiLbNveoccpD7FmagxgtQbj/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAATAAAAD2i_AQQBAeLQEQABZBDutAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA==","name":"Tutorial Example - Loyalty Program","attributes":[{"trait_type":"Last Transferred","value":1678831284},{"trait_type":"Sub Group","value":"Yacht Club"},{"trait_type":"Country","value":"Belgium"},{"trait_type":"Points","value":123600},{"trait_type":"Tier Badge","value":"Silver"},{"trait_type":"Background","value":"Tunnels"},{"trait_type":"Status Tier","value":"Silver"},{"trait_type":"Member ID","value":1009855}]}`

:::info Note the `image` field here:

Which will show the actual image:

![ExampleLoyaltyImg](/img/loyalty-silver.jpg)
:::

---

## Step 11: Changing the NFT Data

We change the NFT's data by using the CLI's **updateDnaNFT** command.

### Changing One Trait at a Time

There are two ways to use this command, the simplest is to change a single trait or attribute.

`node dist/index.cjs updateDnaNFT --root=0xa2B01e08CeD3b06051B59966B540BFe0B90b364c --tokenId=1 --trait='Points' --attr=170555`

This will result in:

New:
```json
{
  'Last Transferred': 1678831284,
  'Sub Group': 'Yacht Club',
  Country: 'Belgium',
  Points: 170555,
  'Tier Badge': {
    value: 'Silver',
    image_url: 'ipfs://QmTeQUXNbaXZctrhfztbWsvfrz1vBNvaqHui6LVbDp14YV/tier-silver.png'
  },
  Background: {
    value: 'Tunnels',
    image_url: 'ipfs://QmTeQUXNbaXZctrhfztbWsvfrz1vBNvaqHui6LVbDp14YV/bg-squares.png'
  },
  'Status Tier': 'Silver',
  'Member ID': 1009855
}
```

Where you can notice that the **Points** has been updated to **170555**.

:::tip
You can also pass in a JSON file with multiple traits to update:

`
node dist/index.cjs updateDnaNFT --root=0xa2B01e08CeD3b06051B59966B540BFe0B90b364c --tokenId=1 --json=projects/example-loyalty/exampleUpdateDnaNFT.json
`

Such as:

```
{
  "Status Tier": "Gold",
  "Tier Badge": "Gold",
  "Points": 563600
}
```
:::

Now when we view the NFT, we can see:

```
node dist/index.cjs viewTopDown --root=0xa2B01e08CeD3b06051B59966B540BFe0B90b364c --tokenId=1 --debug=true
```

Returns an `image` field with:

`https://metadata.owlprotocol.xyz/metadata/getImage/QmXrpPT5KveNCcMHXdZiknnGiLbNveoccpD7FmagxgtQbj/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAATAAAAD2i_AgQCCJmQEQABZBDutAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA==`

Which at the moment, you can verify shows:

![Loyalty](https://metadata.owlprotocol.xyz/metadata/getImage/QmXrpPT5KveNCcMHXdZiknnGiLbNveoccpD7FmagxgtQbj/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAATAAAAD2i_AgQCCJmQEQABZBDutAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA==)

:::info
### Have questions? Join us in Discord: [https://discord.com/invite/7sANzfGUfe](https://discord.com/invite/7sANzfGUfe)
:::
