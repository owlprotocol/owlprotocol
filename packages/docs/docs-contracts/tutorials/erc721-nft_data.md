---
sidebar_position: 2
sidebar_label: 'NFT Data Encoding'
slug: '/tutorials/nft-data'
---

import { SimpleGrid } from '@chakra-ui/react'

# NFT Data Encoding - ERC721Dna

In this tutorial we will create an NFT for a **loyalty program** with a basic badge. See final code on [GitHub](https://github.com/owlprotocol/starter-cli/tree/main/projects/example-loyalty).

![loyalty-silver](/img/loyalty-silver.jpg)

## Tutorial

The **ERC721Dna** smart contract is used to encode useful data on-chain for an NFT. It has a `dna` field that is a binary encoding of the NFT's data.

> Contract: [ERC721DnaBase.sol](https://github.com/owlprotocol/owlprotocol/blob/main/packages/contracts/contracts/assets/ERC721/ERC721DnaBase.sol)

This smart contract overrides `tokenURI(tokenId)` to include the `dna` along with the `baseURI` as such: `<baseURI>/<dna>`.

You have to use the **NFT-SDK** and a [JSON Schema](https://json-schema.org/) to make sense of that DNA because your data schema will be off-chain.

---

## Step 1: Define the data schema

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

We will first define the NFT data and its representation. This includes all the **traits and attributes** you expect to need for the lifetime of the NFT.

For our loyalty program, we will use these traits:

- Member ID
- Status Tier
- Points
- Sub Group

We will also have two image layers:

1. Background
2. Tier Badge

:::tip
We recommend you to upload the image layers to IPFS for decentralization, or GitHub for simplicity (see [Stack Overflow](https://stackoverflow.com/a/23602286))
:::


---

## Step 2: Setup the project folder

You will need to clone our [starter-cli](https://github.com/owlprotocol/starter-cli) repository, install the dependencies and create a folder for your project, say `my-example-loyalty`.

```bash
git@github.com:owlprotocol/starter-cli.git
cd starter-cli

# Note: npm is sufficent, but we recommend using pnpm
pnpm install

mkdir projects/my-example-loyalty
cd projects/my-example-loyalty
```

This is recommended so that you can have a working `package.json`, and `tsconfig`.

---

## Step 3: Implement the traits and collection

To implement our schema we need to declare our traits and the collection class.

We will create two files: one with all the traits and one that defines the collection class (see [NFTGenerativeCollectionClass](https://github.com/owlprotocol/owlprotocol/blob/main/packages/nft-sdk/src/classes/NFTGenerativeCollection/NFTGenerativeCollectionClass.ts) code).

### `traits.ts`

```javascript
import {NFTGenerativeTraitImage, NFTGenerativeTraitEnum, NFTGenerativeTraitNumber} from '@owlprotocol/nft-sdk';

export const attrMemberIdNumber: NFTGenerativeTraitNumber = {
    name: 'Member ID',
    type: 'number',
    description: `Owner's membership ID`,
    min: 1000000,
    max: 99999999999,
    abi: 'uint48',
};

export const attrTierEnum: NFTGenerativeTraitEnum = {
    name: 'Status Tier',
    type: 'enum',
    description: 'Status tier in the loyalty program, can be one of: Bronze, Silver or Gold',
    options: ['Bronze', 'Silver', 'Gold'],
};

export const attrTierBgImage: NFTGenerativeTraitImage = {
    name: 'Background',
    type: 'image',
    image_type: 'png',
    options: [
        {
            value: 'Basic',
            image_url: 'https://leovigna.mypinata.cloud/ipfs/QmTeQUXNbaXZctrhfztbWsvfrz1vBNvaqHui6LVbDp14YV/bg-blue.png',
        },
        {
            value: 'Facets',
            image_url: 'https://leovigna.mypinata.cloud/ipfs/QmTeQUXNbaXZctrhfztbWsvfrz1vBNvaqHui6LVbDp14YV/bg-silver.png',
        },
        {
            value: 'Dark',
            image_url: 'https://leovigna.mypinata.cloud/ipfs/QmTeQUXNbaXZctrhfztbWsvfrz1vBNvaqHui6LVbDp14YV/bg-dark.png',
        },
    ],
};

export const attrTierIconImage: NFTGenerativeTraitImage = {
    name: 'Tier Badge',
    type: 'image',
    image_type: 'png',
    options: [
        {
            value: 'Bronze',
            image_url: 'https://leovigna.mypinata.cloud/ipfs/QmTeQUXNbaXZctrhfztbWsvfrz1vBNvaqHui6LVbDp14YV/tier-bronze.png',
        },
        {
            value: 'Silver',
            image_url: 'https://leovigna.mypinata.cloud/ipfs/QmTeQUXNbaXZctrhfztbWsvfrz1vBNvaqHui6LVbDp14YV/tier-silver.png',
        },
        {
            value: 'Gold',
            image_url: 'https://leovigna.mypinata.cloud/ipfs/QmTeQUXNbaXZctrhfztbWsvfrz1vBNvaqHui6LVbDp14YV/tier-gold.png',
        },
    ],
};

export const attrPointsNumber: NFTGenerativeTraitNumber = {
    name: 'Points',
    type: 'number',
    description: 'Points collected from participation',
    min: 0,
    max: 16777215,
    abi: 'uint24',
};

export const attrSubGroupEnum: NFTGenerativeTraitEnum = {
    name: 'Sub Group',
    type: 'enum',
    description: 'The special subgroup the user is part of, if any',
    options: ['None', 'Yacht Club', 'Car Club', 'Diving Club'],
    abi: 'uint16', // overrides the 'uint8' default
};
```

See `traits.ts` on [GitHub](https://github.com/owlprotocol/owlprotocol/blob/main/packages/cli/projects/example-loyalty/traits.ts)


### `collections.ts`

```javascript
import {
    attrMemberIdNumber,
    attrTierEnum,
    attrTierBgImage,
    attrTierIconImage,
    attrPointsNumber,
    attrSubGroupEnum,
} from './traits.js';

import {
    NFTGenerativeCollection,
    NFTGenerativeCollectionClass,
    NFTGenerativeTraitNumberClass,
    NFTGenerativeTraitEnumClass,
    NFTGenerativeTraitImageClass,
} from '@owlprotocol/nft-sdk';

const collExampleLoyaltyDef: NFTGenerativeCollection = {
    name: 'Tutorial Example - Loyalty Program',
    description: 'Example from https://docs.owlprotocol.xyz/contracts/tutorials/nft-data',
    external_url: 'https://docs.owlprotocol.xyz/contracts/tutorials/nft-data',
    seller_fee_basis_points: 0,
    fee_recipient: '0xc2A3cB7d4BF24e456051E3a710057ac61f5dB133',
    generatedImageType: 'png',
    traits: {
        'Member ID': attrMemberIdNumber,
        'Status Tier': attrTierEnum,
        Background: attrTierBgImage,
        'Tier Badge': attrTierIconImage,
        Points: attrPointsNumber,
        'Sub Group': attrSubGroupEnum,
    },
};

export const collExampleLoyalty = NFTGenerativeCollectionClass.fromData(
    collExampleLoyaltyDef,
) as NFTGenerativeCollectionClass<{
    'Member ID': NFTGenerativeTraitNumberClass;
    'Status Tier': NFTGenerativeTraitEnumClass;
    Background: NFTGenerativeTraitImageClass;
    'Tier Badge': NFTGenerativeTraitImageClass;
    Points: NFTGenerativeTraitNumberClass;
    'Sub Group': NFTGenerativeTraitEnumClass;
}>;

export default collExampleLoyaltyDef;
```

See `collections.ts` on [GitHub](https://github.com/owlprotocol/owlprotocol/blob/main/packages/cli/projects/example-loyalty/collections.ts)


:::tip Trait order matters
The order you declare traits in is important because it is also the encoding order in the NFT's data.

For **image traits**, this is also the order in which they are rendered.
:::

:::tip Avoid overflows

We use the `uint8` type default for a trait. This means that a trait can have `2^8 = 256` attributes by default. If a trait has more than 256 attributes, you must use a larger type to avoid overflows (see [Solidity docs](https://docs.soliditylang.org/en/v0.8.17/types.html#integers) for more types information). For example, `uint16` gives you up to `2^16 = 65536` attributes.
:::

---

## Step 4: Generate the JSON Schema using the [CLI Tool](/contracts/getting-started/cli)

We will now use the Owl Protocol command-line interface (CLI) to generate the JSON Schema.

1. Install the CLI package in the [owlprotocol repository](https://github.com/owlprotocol/owlprotocol/tree/main/packages/cli)

```
pnpm install -g @owlproject/nft-sdk-cli
```

2. Compile the `collections.ts` file

In the `starter-cli` folder, you can run:
```bash
pnpm run build
```

:::info
Under the hood, this command runs:
```bash
tsc --project tsconfig.projects.json
```
:::

This is needed as the CLI take a JavaScript file.

3. Now invoke `generateJsonSchema` in the CLI. This will create the file that the **nft-sdk** needs to translate the on-chain data.

```
owl-cli generateJsonSchema collections.js --projectFolder=projects/my-example-loyalty
```

This should output:

```
getProjectSubfolder ~/starter-cli/projects/my-example-loyalty/output
Creating JSON(s) for collections.js to folder: ~/starter-cli/projects/my-example-loyalty/output
projects/my-example-loyalty collections.js
Done
```

> Ignore any warnings for `duplicate definition`.

Now you should see a new folder in `projects/my-example-loyalty` called `output` with one JSON file: `collection-parent.json`

---

## Step 5: Upload the JSON Schema to IPFS.

We use [Pinata](https://www.pinata.cloud/) for this tutorial, but you can upload the schema to any IPFS provider including your own.

For this tutorial you can see the uploaded schema there:
[https://leovigna.mypinata.cloud/ipfs/QmXrpPT5KveNCcMHXdZiknnGiLbNveoccpD7FmagxgtQbj](https://leovigna.mypinata.cloud/ipfs/QmXrpPT5KveNCcMHXdZiknnGiLbNveoccpD7FmagxgtQbj)

:::info
Keep the IPFS hash handy. In this example, it is `QmXrpPT5KveNCcMHXdZiknnGiLbNveoccpD7FmagxgtQbj`.
:::

---

## Step 6: Declare collection information in the metadata file

Create a file called `owlproject.json` in the project folder. This will contain metadata about the collection.

### `owlproject.json`
```json
{
  "rootContract": {
    "tokenSymbol": "ExampleLoyaltyNFT",
    "tokenIdStart": 1,
    "cfg": {
      "jsonSchemaEndpoint": "https://leovigna.mypinata.cloud/ipfs",
      "sdkApiEndpoint": "https://metadata.owlprotocol.xyz/metadata/getMetadata",
      "jsonSchemaIpfs": "QmXrpPT5KveNCcMHXdZiknnGiLbNveoccpD7FmagxgtQbj"
    }
  }
}
```

:::caution
You should not rely on our API and IPFS endpoints as they are centralized.

Ideally, `sdkApiEndpoint` should point to your own web app. For this tutorial, leave it as is.
:::

---

## Step 7: Deploy and Mint the NFT

:::tip
For initial testing, prefer a local blockchain over a testnet. A local blockchain like Ganache is simpler and faster.
:::

1. Make sure you have a `.env.development` file. It should contain two values: `NETWORK`, and `HD_WALLET_MNEMONIC`.

### `.env.development`
```bash
NETWORK=ganache
HD_WALLET_MNEMONIC=test test test test test test test test test test test junk
```

2. Start a local Ganache blockchain (see [Ganache quickstart](https://trufflesuite.com/docs/ganache/quickstart/). Use the `--wallet.mnemonic` flag to force the same mnemonic as in your `.env.development` file:
```bash
ganache --wallet.mnemonic "test test test test test test test test test test test junk"
```

:::caution
Do not use this mnemonic for production!
:::

3. Double check to ensure that the `accounts` in the CLI network config (`networks.json`) match the first two accounts shown by `ganache`, and that `NETWORK` is set to `ganache`.

:::tip Using a Private Key
We also support using a single **private key**.

To use a private key, **do not set** `HD_WALLET_MNEMONIC` and instead declare the environment variable `PRIVATE_KEY_0` in `.env.development`.
:::

### Deploy Common

If you are deploying to a new chain, or a fresh ganache blockchain, the common [beacon proxies](https://docs.owlprotocol.xyz/contracts/advanced/contract-deployment#beacon-proxy) and implementations need to be deployed first.

We enable this by passing `--deployCommon=true` into the deployment command. Don't worry if you forget to remove this flag later. Our deployer always deploys the beacons to the same addresses. Therefore, the deployer will skip deploying beacons if they already exist.

<!-- TODO: make this make sense
:::info
Owl Protocol uses advanced smart contract beacons that feature:
- **Deterministic Deployment** - provides the same addresses for registries and implementations across multiple blockchains.
- **Beacon Proxies** - have minimal overhead on initial deployment, but all subsequent NFT contracts are just proxies and use less gas.
- **Upgradeable Proxies** - revokable upgradability allows new projects to upgrade to new Dynamic NFT features as we roll them out, or remove features.

Docs are coming soon that explain this in depth, for now you can follow the deployment strategies here: [deployCommon.ts](https://github.com/owlprotocol/owlprotocol/blob/tutorial-example-omo/packages/cli/src/commands/deployCommon.ts)
:::
-->

### Deploy contracts and mint NFTs

If everything is set up properly, you can now run in the CLI folder:

```
owl-cli deployTopDown --projectFolder=projects/my-example-loyalty --deployCommon=true --debug=true
```

:::note
This will deploy and mint all NFT JSONs in the project's `/output/items` folder.
:::

At this point make sure you have the following:
- A JSON Schema uploaded to IPFS, and the corresponding IPFS hash in the `owlproject.json` file.
- The network configured properly in `.env.development` file and `networks.json`.
- JSONs files of the NFTs you will mint in `output/items`.


If the command succeeds you should see an output similar to:
```
Deploying NFT: 1


Minted ~/starter-cli/projects/my-example-loyalty/output/items/collection-item-1.json
Mint: root at 0xfa737b19Dc58b3604fbBBEBD2ACE599a00449D2f - tokenId: 1 & dna: 0x0000000f68bf01020101e2d00001
Done
```

---

## Step 8: View and Check the NFTs

You can use the `viewTopDown` command on the CLI to quickly view the NFT:

```bash
owl-cli viewTopDown --root=0xfa737b19Dc58b3604fbBBEBD2ACE599a00449D2f --tokenId=1
```

The output should be similar to this:
```
View ERC721TopDownDna 0xfa737b19Dc58b3604fbBBEBD2ACE599a00449D2f on ganache
Fetching Metadata JSON Schema from: https://leovigna.mypinata.cloud/ipfs/QmXrpPT5KveNCcMHXdZiknnGiLbNveoccpD7FmagxgtQbj
NFT tokenId: 1 - owned by 0xa1eF58670368eCCB27EdC6609dea0fEFC5884f09
```

And the following object:
```javascript
{
  'Sub Group': 'Yacht Club',
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

## Step 9: View the NFT image

You can view the NFT image by passing in `--debug=true`:

```
owl-cli viewTopDown --root=0xfa737b19Dc58b3604fbBBEBD2ACE599a00449D2f --tokenId=1 --debug=true
```

Which should show at the bottom:

`https://metadata.owlprotocol.xyz/metadata/getMetadata/QmXrpPT5KveNCcMHXdZiknnGiLbNveoccpD7FmagxgtQbj/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAATAAAAD2i_AQQBAeLQEQABZBDutAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA==`

This link will show the NFT Standard Metadata JSON:

[https://metadata.owlprotocol.xyz/metadata/getMetadata/QmXrpPT5KveNCcMHXdZiknnGiLbNveoccpD7FmagxgtQbj/AAAA...](https://metadata.owlprotocol.xyz/metadata/getMetadata/QmXrpPT5KveNCcMHXdZiknnGiLbNveoccpD7FmagxgtQbj/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAATAAAAD2i_AQQBAeLQEQABZBDutAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA==)

```json
{"description":"Example from https://docs.owlprotocol.xyz/contracts/tutorials/nft-data","external_url":"https://docs.owlprotocol.xyz/contracts/tutorials/nft-data","image":"https://metadata.owlprotocol.xyz/metadata/getImage/QmXrpPT5KveNCcMHXdZiknnGiLbNveoccpD7FmagxgtQbj/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAATAAAAD2i_AQQBAeLQEQABZBDutAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA==","name":"Tutorial Example - Loyalty Program","attributes":["value":1678831284},{"trait_type":"Sub Group","value":"Yacht Club"},{"trait_type":"Points","value":123600},{"trait_type":"Tier Badge","value":"Silver"},{"trait_type":"Background","value":"Tunnels"},{"trait_type":"Status Tier","value":"Silver"},{"trait_type":"Member ID","value":1009855}]}
```

:::info
Note the `image` field here will show you the actual image:

![ExampleLoyaltyImg](/img/loyalty-silver.jpg)
:::

---

## Step 10: Change the NFT data

We can change the NFT's data by using the CLI's `updateDnaNFT` command.

### Changing a trait

There are two ways to use this command, the simplest is to change a single attribute:

```bash
owl-cli updateDnaNFT --root=0xfa737b19Dc58b3604fbBBEBD2ACE599a00449D2f --tokenId=1 --trait='Points' --attr=170555
```

This will give you:

```javascript
{
  'Sub Group': 'Yacht Club',
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

Where you can notice that `Points` has been updated to **170555**.

:::tip
You can also pass in a JSON file to update multiple traits as such:
```
{
"Status Tier": "Gold",
"Tier Badge": "Gold",
"Points": 563600
}
```

```bash
owl-cli updateDnaNFT --root=0xfa737b19Dc58b3604fbBBEBD2ACE599a00449D2f --tokenId=1 --json=projects/my-example-loyalty/exampleUpdateDnaNFT.json
```

:::

Now if we view the NFT:

```
owl-cli viewTopDown --root=0xfa737b19Dc58b3604fbBBEBD2ACE599a00449D2f --tokenId=1 --debug=true
```

The command returns an `image` field with:

```
https://metadata.owlprotocol.xyz/metadata/getImage/QmXrpPT5KveNCcMHXdZiknnGiLbNveoccpD7FmagxgtQbj/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAATAAAAD2i_AgQCCJmQEQABZBDutAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA==
```

As you can see the image is updated:

![Loyalty](https://metadata.owlprotocol.xyz/metadata/getImage/QmXrpPT5KveNCcMHXdZiknnGiLbNveoccpD7FmagxgtQbj/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAATAAAAD2i_AgQCCJmQEQABZBDutAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA==)

## More Info

For a more advanced loyalty program example, see this the `example-loyalty-advanced` project on [GitHub](https://github.com/owlprotocol/owlprotocol/tree/main/packages/cli/projects/example-loyalty-advanced).

Have questions? Join us in Discord: [https://discord.com/invite/7sANzfGUfe](https://discord.com/invite/7sANzfGUfe)
