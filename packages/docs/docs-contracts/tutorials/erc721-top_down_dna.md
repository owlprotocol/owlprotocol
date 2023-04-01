---
sidebar_position: 3
sidebar_label: 'NFT Image Layers'
slug: '/tutorials/nft-image-layers'
---

import { SimpleGrid } from '@chakra-ui/react'

# DNA Image Layers - ERC721TopDownDna

In this tutorial we will create an NFT with a detachable hat. See final code on [GitHub](https://github.com/owlprotocol/starter-cli/tree/main/projects/example-omo).

## Tutorial

The [ERC721TopDownDna.sol](https://github.com/owlprotocol/owlprotocol/blob/main/packages/contracts/contracts/assets/ERC721/ERC721TopDownDna.sol) smart contract combines two of our primary features:

1. **TopDown** ([ERC721TopDownBase.sol](https://github.com/owlprotocol/owlprotocol/blob/main/packages/contracts/contracts/assets/ERC721/ERC721TopDownBase.sol))
    * Allows an NFT to own other NFTs on-chain
    * Exposes all owned NFT data to their owner
2. **DNA** ([ERC721DnaBase.sol](https://github.com/owlprotocol/owlprotocol/blob/main/packages/contracts/contracts/assets/ERC721/ERC721DnaBase.sol))
    * Allows a standard encoding of NFTs on-chain using an off-chain schema

## Use Case: PFPs with Detachable Accessories or Equipment

<SimpleGrid className="features-grid" columns={{sm: 2, md: 4}} spacing={10}>
<Box>
    <div>
    <img src="/img/tutorial/attached.png"/>
    <p>NFT with Hat</p>
    </div>
</Box>
<Box>
    <div>
    <img src="/img/tutorial/detached.png"/>
    <p>NFT with Hat <strong>Removed</strong></p>
    </div>
</Box>
</SimpleGrid>

In this tutorial, we will create a Dynamic PFP ([Profile Picture NFT](https://learn.bybit.com/nft/nft-pfps-profile-pictures/)).

- **The hat is its own NFT**: it can be detached and re-attached to the main NFT.
- When you attach the hat, the PFP will show the hat.
- When you remove the hat, it can be tradeable with other hats or sold.
- The on-chain data, and JSON Schema is all that is required to render the NFT graphics.

<!-- TODO @ClarenceL: a quick getting started step -->
:::caution
Ensure you're able to build the entire project before starting: see [Getting Started](/contracts/getting-started/).
:::

---

## Step 1: Prepare the layers

:::info
The sample will have a small number of layers for each `trait`:

These **must** be transparent PNGs. These will be combined, so the positioning must be taken into account.

:::

### Background

<SimpleGrid className="features-grid" columns={{sm: 2, md: 4}} spacing={8}>
<Box>
    <div>
    <img src="/img/tutorial/bg-dunes.png"/>
    <br/>
    <strong>Dunes</strong>
    </div>
</Box>
<Box>
    <div>
    <img src="/img/tutorial/bg-downtown.png"/>
    <br/>
    <strong>Downtown</strong>
    </div>
</Box>
</SimpleGrid>

Note: no background at all is also an option.

### Body

<SimpleGrid className="features-grid" columns={{sm: 2, md: 4}} spacing={8}>
<Box>
    <div>
    <img src="/img/tutorial/body-base.png"/>
    <br/>
    <strong>Common</strong>
    </div>
</Box>
<Box>
    <div>
    <img src="/img/tutorial/body-albino.png"/>
    <br/>
    <strong>Albino</strong>
    </div>
</Box>
</SimpleGrid>

### Hats (the detachable accessory)

<SimpleGrid className="features-grid" columns={{sm: 2, md: 4}} spacing={8}>
<Box>
    <div>
    <img src="/img/tutorial/hats-cap.png"/>
    <br/>
    <strong>Regular Cap</strong>
    </div>
</Box>
<Box>
    <div>
    <img src="/img/tutorial/hats-beanie.png"/>
    <br/>
    <strong>Beanie</strong>
    </div>
</Box>
<Box>
    <div>
    <img src="/img/tutorial/hats-beret.png"/>
    <br/>
    <strong>Beret</strong>
    </div>
</Box>
<Box>
    <div>
    <img src="/img/tutorial/hats-cowboy.png"/>
    <br/>
    <strong>Cowboy Hat</strong>
    </div>
</Box>
</SimpleGrid>

We'll also encode into the DNA/on-chain data of the NFT an `enum` **Vibe**, which has 3 values:
- Chill
- Boring
- Eccentric

---

## Step 2: Setup the project folder

You will need to clone our [starter-cli](https://github.com/owlprotocol/starter-cli) repository, install the dependencies and create a folder for your project, say `my-example-omo`.

```bash
git@github.com:owlprotocol/starter-cli.git
cd starter-cli

# Note: npm is sufficent, but we recommend using pnpm
pnpm install

mkdir projects/my-example-omo
cd projects/my-example-omo
```

This is recommended so that you can have a working `package.json`, and `tsconfig`.

---

## Step 3: Declare the traits in JavaScript

For the `traits` in this example we will use the `nft-sdk` to instantiate an [NFTGenerativeCollectionClass](https://github.com/owlprotocol/owlprotocol/blob/main/packages/nft-sdk/src/classes/NFTGenerativeCollection/NFTGenerativeCollectionClass.ts) and use the CLI
tool to generate the **JSON Schema**, which we upload to IPFS.

> The `nft-sdk` needs this JSON Schema to translate the on-chain data (DNA).


We start by defining the traits as [NFTGenerativeTraits](https://github.com/owlprotocol/owlprotocol/tree/main/packages/nft-sdk/src/classes/NFTGenerativeTrait).
, then add them to the `NFTGenerativeCollection`.

### `traits.ts`
```typescript
import { NFTGenerativeTraitEnum, NFTGenerativeTraitImage } from '@owlprotocol/nft-sdk';

export const traitEnumVibe: NFTGenerativeTraitEnum = {
    name: 'Vibe',
    type: 'enum',
    options: ['Chill', 'Boring', 'Eccentric'],
    probabilities: [70, 20, 10],
};

export const traitImageBg: NFTGenerativeTraitImage = {
    name: 'Background',
    type: 'image',
    image_type: 'png',
    options: [
        {
            value: 'None',
            image_url: 'ipfs://QmeYhQsx2PGeKoCco8Ck4gUcoSNN7ecShKcZaXDsHardQL',
        },
        {
            value: 'Dunes',
            image_url: 'ipfs://QmfSABDaq7V2WKrdTnK3ofnnbucax4e5jBcztXqL34zsrL/bg-dunes.png',
        },
        {
            value: 'Downtown',
            image_url: 'ipfs://QmfSABDaq7V2WKrdTnK3ofnnbucax4e5jBcztXqL34zsrL/bg-downtown.png',
        },
    ],
    probabilities: [1, 5, 5],
};

[...]
```

See `traits.ts` on [GitHub](https://github.com/owlprotocol/owlprotocol/blob/main/packages/cli/projects/example-omo/traits.ts)

:::info
`probabilities` are normalized, correspond in order with the values, and there must be as many probabilities as values.
:::

:::caution About IPFS Hashes for Images

You need to manually upload images to IPFS, and add the `image_url` as `ipfs://[hash]/[path]`.

The `ipfs://` will be replaced by the environemnt variable `IPFS_GATEWAY` that used by our provided API, so you don't need to be concerned about that.

We will have more tools and a UI for uploading to IPFS soon.

:::

We will then define a collection that uses these traits.

---

## Step 4: Create the `collection.ts` that connects the traits and collection:

### `collection.ts`
```typescript
import {
    traitEnumVibe,
    traitImageBg,
    traitImageBody,
    traitImageHats
} from './traits.js';

import {
    NFTGenerativeCollection,
    NFTGenerativeCollectionClass,
    NFTGenerativeTraitEnumClass,
    NFTGenerativeTraitImageClass,
} from '@owlprotocol/nft-sdk';

const collHatsChildDef: NFTGenerativeCollection = {
    name: 'Tutorial Example - NFT Hats Sub-Collection',
    description: 'Example from https://docs.owlprotocol.xyz/contracts/tutorials/nft-image-layers',
    external_url: 'https://docs.owlprotocol.xyz/contracts/tutorials/nft-image-layers',
    seller_fee_basis_points: 5000,
    fee_recipient: '0x7E5F4552091A69125d5DfCb7b8C2659029395Bdf',
    generatedImageType: 'png',
    traits: {
        Hats: traitImageHats,
    },
};

const collNestedDef: NFTGenerativeCollection = {
    name: 'Thread Haus - Innovot NFT Collection',
    description: 'Example from https://docs.owlprotocol.xyz/contracts/tutorials/nft-image-layers',
    external_url: 'https://docs.owlprotocol.xyz/contracts/tutorials/nft-image-layers',
    seller_fee_basis_points: 10000,
    fee_recipient: '0x7E5F4552091A69125d5DfCb7b8C2659029395Bdf',
    generatedImageType: 'png',
    traits: {
        Vibe: traitEnumVibe,
        Background: traitImageBg,
        Body: traitImageBody,
    },
    //@ts-ignore
    children: {
        Hats: collHatsChildDef,
    },
};

export const collHatsChild = NFTGenerativeCollectionClass.fromData(collHatsChildDef) as NFTGenerativeCollectionClass<{
    Hat: NFTGenerativeTraitImageClass;
}>;

export const collExample = NFTGenerativeCollectionClass.fromData(collNestedDef) as NFTGenerativeCollectionClass<
    {
        Vibe: NFTGenerativeTraitEnumClass;
        Background: NFTGenerativeTraitImageClass;
        Body: NFTGenerativeTraitImageClass;
    },
    {
        Hat: NFTGenerativeCollectionClass<{
            Hats: NFTGenerativeTraitImageClass;
        }>;
    }
>;

export default collExample;
```

See `collection.ts` on [GitHub](https://github.com/owlprotocol/owlprotocol/blob/main/packages/cli/projects/example-omo/collection.ts)

:::caution
The trait key must be the same as the trait name and is case sensitive.

For example, `traitImageBg` has the trait key `Background` capitalized. Therefore `collExample` must also declares `Background`, capitalized.
:::

---

## Step 5: Generate the JSON Schema using the [CLI Tool](/contracts/getting-started/cli)

The **JSON Schema** is used to interpret and translate the on-chain DNA to data that can be rendered or executed.

> We believe storing the on-chain data in a single binary encoded format is ideal because it minimizes the number of esoteric methods on the smart contract. Rather we leave it up to the client to interpret and parse the schema.

:::info
This is not to be confused with the **Metadata JSON**, which is what NFT Marketplaces use to describe the NFT.
:::

### Using the CLI to Generate the JSON Schema

1. Install the CLI package in the [owlprotocol repository](https://github.com/owlprotocol/owlprotocol/tree/main/packages/cli).

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

3. Now call the `generateJsonSchema` command on the CLI Tool.

```
owl-cli generateJsonSchema collections.js --projectFolder=projects/my-example-omo
```

Which should output:

```
getProjectSubfolder ~/starter-cli/projects/my-example-omo/output
Creating JSON(s) for collections.js to folder: ~/start-cli/projects/my-example-omo/output
projects/my-example-omo collections.js
Done
```

> Ignore any warnings for `duplicate definition`.

Now you should see a new folder in `projects/my-example-omo` called `output`, and with two JSON files:
- collection-parent.json
- collection-child-Hats.json

---

## Step 6: Upload the JSON Schemas to IPFS

We use [Pinata](https://www.pinata.cloud/) for this tutorial, but you can upload the schema to any IPFS provider including your own.

:::info
We have 2 collections here: the main NFT collection and the hat collection.
When we mint the NFT from the parent collection, the hat NFT also automatically gets minted, and it gets attached to the newly-minted parent NFT.
:::

For this tutorial you can see the uploaded schemas there:
- [collection-parent.json](https://leovigna.mypinata.cloud/ipfs/QmRNrcuGtaqefB72NHuGdDtvzEZjNvX6m2E1AgBXW65EKq)
- [collection-child-Hats.json](https://leovigna.mypinata.cloud/ipfs/QmcYC3fcqxU2gqS7VWEeC7jLDjpFQunMXmfkijXq325RHf)

:::info
Keep the IPFS hashes handy. In this example, they are:
- Parent hash: `QmRNrcuGtaqefB72NHuGdDtvzEZjNvX6m2E1AgBXW65EKq`
- Hats hash: `QmcYC3fcqxU2gqS7VWEeC7jLDjpFQunMXmfkijXq325RHf`
:::

<!--

## Step 7: Generate the randomized individual NFTs

To generate NFTs, use the CLI command: `generateRandomNFT`:

```
owl-cli generateRandomNFT collections.js 3 --project=projects/my-example-omo
```

This will generate **three** items in the subfolder `output/items` of the project folder with their respective DNAs.

We then pass these outputs to the `deployTopDown` command to deploy these NFTs.

:::info
See `createFromFullDna` in [NFTGenerativeCollectionClass](https://github.com/owlprotocol/owlprotocol/blob/main/packages/nft-sdk/src/classes/NFTGenerativeCollection/NFTGenerativeCollectionClass.ts) for more infromation on how an NFT is instantiated form its DNA.
:::
-->
---

## Step 7: Declare collection information in the metadata file

Create a file called `owlproject.json` in the project folder. This will contain metadata about the collection.

### `owlproject.json`
```json
{
  "rootContract": {
    "tokenSymbol": "ExampleOmoNFT",
    "tokenIdStart": 1,
    "cfg": {
      "jsonSchemaEndpoint": "https://leovigna.mypinata.cloud/ipfs",
      "sdkApiEndpoint": "https://metadata.owlprotocol.xyz",
      "apiPath": "metadata/getMetadata",
      "jsonSchemaIpfs": "QmRNrcuGtaqefB72NHuGdDtvzEZjNvX6m2E1AgBXW65EKq"
    }
  },
  "children": {
    "Hats": {
      "tokenIdStart": 1,
      "cfg": {
        "jsonSchemaIpfs": "QmcYC3fcqxU2gqS7VWEeC7jLDjpFQunMXmfkijXq325RHf"
      }
    }
  }
}
```

:::caution
You should not rely on our API and IPFS endpoints as they are centralized.

Ideally, `sdkApiEndpoint` should point to your own web app. For this tutorial, leave it as is.
:::

### Important
- You need a working IPFS endpoint. We recommend using [Pinata](https://pinata.cloud/)
- Do not change `sdkApiEndpoint`, this is the fallback API for browsers/clients that do not support the `nft-sdk`
- Replace the `schemaJsonIpfs` for the parent and children according to the **JSON Schema** from earlier, this is misnamed at the moment.

---

## Step 8: Deploy and mint NFTs

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

3. Double check to ensure that the `accounts` in the CLI (`networks.json`) match the first account shown by `ganache`, and that `NETWORK` is set to `ganache`.

:::tip Using a Private Key
We also support using a single **private key**.

To use a private key, **do not set** `HD_WALLET_MNEMONIC` and instead declare the environment variable `PRIVATE_KEY_0` in `.env.development`.
:::

### Deploy Common

If you are deploying to a new chain, or a fresh ganache blockchain, the common [beacon proxies](https://docs.owlprotocol.xyz/contracts/advanced/contract-deployment#beacon-proxy) and implementations need to be deployed first.

We enable this by passing `--deployCommon=true` into the deployment command. Don't worry if you forget to remove this flag later. Our deployer always deploys the beacons to the same addresses. Therefore, the deployer will skip deploying beacons if they already exist.

<!-- TODO: make this make sense
:::info
Owl Protocol uses advanced smart contract beacons including:
- **Deterministic Deployment** - giving us the same addresses for registries and implementations across multiple blockchains.
- **Beacon Proxies** - minimal additional overhead on initial deployment, but all subsequent NFT contracts are just proxies and lower gas.
- **Upgradeable Proxies** - revokable upgradability allows new projects to upgrade to new Dynamic NFT features as we roll them out, or revoke it to suit their needs.

Docs are coming soon that explain this in depth, for now you can follow the deployment strategies here: [deployCommon.ts](https://github.com/owlprotocol/owlprotocol/blob/tutorial-example-omo/packages/cli/src/commands/deployCommon.ts)
:::
-->

### Deploy contracts and mint NFTs

We will define an NFT instance (or item):

Add the following file to the `items` folder in your project folder:
`collection-item-1.ts`
```typescript
import { collExampleLoyalty } from '../collections.js';

const nftItem = collExampleLoyalty.create({
    attributes: {
        'Member ID': 1009855,
        'Status Tier': 'Silver',
        Background: 'Dark',
        'Tier Badge': 'Silver',
        Points: 123600,
        'Sub Group': 'Yacht Club',
    },
});

export default nftItem;
```

Now, run the build process to compile the file into JavaScript:
```bash
pnpm run build
```

We then need to generate the NFT's JSON schema. From the `start-cli` folder, run:
```bash
owl-cli generateItemNFT items/collection-item-1.js --projectFolder projects/my-example-loyalty
```

This will output the NFT's JSON schema to `projects/my-example-loyalty/output/items/`.

Check it out for yourself!

---

If everything is set up properly, you can now run:

```
owl-cli deployTopDown --projectFolder=projects/my-example-omo --deployCommon=true --debug=true
```

:::note
This will deploy and mint all NFT JSONs in the project's `/output/items` folder.
:::

At this point make sure you have the following:
- A JSON Schema uploaded to IPFS, and the corresponding IPFS hash in the `owlproject.json` file.
- The network configured properly in `.env.development` file and `networks.json`.
- JSON files of the NFTs you will mint in `output/items`.

If the command succeeds you should see an output similar to:
```
Minted ~/start-cli/projects/my-example-omo/output/items/collection-item-1.json
Mint: Hats at 0x91a4Df19DE444cDA86ef24f61A6190838Cec2b22 - tokenId: 1 & dna: 0x00
Mint: root at 0xe3f62b8f72E49e75081B991685AeA19dd783b44a - tokenId: 1 & dna: 0x000101
```

Also the NFT item JSON files will be updated to track the deployment:

```json
{
  "fullDna": "0x00000000000000...",
  "children": {
    "Hats": {
      "fullDna": "0x000000000000..."
    }
  },
  "deployments": {
    "ganache": {
      "root": {
        "contractAddress": "0xe3f62b8f72E49e75081B991685AeA19dd783b44a",
        "tokenId": 1
      },
      "children": {
        "Hats": {
          "key": "Hats",
          "contractAddress": "0x91a4Df19DE444cDA86ef24f61A6190838Cec2b22",
          "tokenId": 1,
          "dna": "0x00"
        }
      }
    }
  }
}
```

---

## Step 9: View and check the NFTs

You can use the `viewTopDown` command on the CLI to quickly view the NFT:

```bash
owl-cli viewTopDown --root=0xe3f62b8f72E49e75081B991685AeA19dd783b44a --tokenId=1
```

The output should be similar to this:
```
View ERC721TopDownDna 0xe3f62b8f72E49e75081B991685AeA19dd783b44a on ganache
Fetching Metadata JSON Schema from: https:/leovigna.mypinata.cloud/ipfs/Qmc7Aih1P67dmHF4PDMg5KfLABMtR6DXmDaxRvgF8Wgoe9
```

And the following object:
```javascript
{
  Body: {
    value: 'Downtown',
    image_url: 'ipfs://QmfSABDaq7V2WKrdTnK3ofnnbucax4e5jBcztXqL34zsrL/body-albino.png'
  },
  Background: {
    value: 'Downtown',
    image_url: 'ipfs://QmfSABDaq7V2WKrdTnK3ofnnbucax4e5jBcztXqL34zsrL/bg-downtown.png'
  },
  Vibe: 'Chill'
}
Hats {
  Hats: {
    value: 'Beanie',
    image_url: 'ipfs://QmfSABDaq7V2WKrdTnK3ofnnbucax4e5jBcztXqL34zsrL/hats-beanie.png'
  }
}
```

### View the rendered NFT PFP

<!-- Confusing -->
Typically your app should use the `nft-sdk`, instantiate the collection class from the JSON Schema, and read the NFT's DNA to render the NFT.

To do this, we call the `viewTopDown` command again, but with the `--debug` option.

This will call the NFT contract's `tokenURI` method, which is that a NFT Marketplace that does not support the `nft-sdk`
would typically call.

```bash
owl-cli viewTopDown --root=0xe3f62b8f72E49e75081B991685AeA19dd783b44a --tokenId=1 --debug
```

The output at the end shows:

```
tokenUri http://metadata.owlprotocol.xyz:32001/metadata/getMetadata/Qmc7Aih1P67dmHF4PDMg5KfLABMtR6DXmDaxRvgF8Wgoe9/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADAAEBAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAKAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEBAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA
fullDna 0x0000000000000...
```

:::info
This `tokenUri` is never seen by users, so its complexity is not an issue.
:::

`curl` the `tokenURI` URL:

```bash
curl -s https://metadata.owlprotocol.xyz/metadata/getMetadata/Qmc7Aih1P67dmHF4PDMg5KfLABMtR6DXmDaxRvgF8Wgoe9/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADAAEBAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAKAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEBAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA
```

You should get the following JSON:
```json
{
  "description": "Example from https://docs.owlprotocol.xyz/contracts/tutorials/nft-image-layers",
  "external_url": "https://docs.owlprotocol.xyz/contracts/tutorials/nft-image-layers",
  "image": "http://metadata.owlprotocol.xyz:32001/metadata/getImage/Qmc7Aih1P67dmHF4PDMg5KfLABMtR6DXmDaxRvgF8Wgoe9/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADAAEBAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAKAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEBAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA",
  "name": "Thread Haus - Innovot NFT Collection",
  "attributes": [
    {
      "trait_type": "Body",
      "value": "Downtown"
    },
    {
      "trait_type": "Background",
      "value": "Downtown"
    },
    {
      "trait_type": "Hats (detachable)",
      "value": "Beanie"
    }
  ]
}
```

> This is the metadata that an NFT marketplace is looking for.

And you can also see the `image` field is a link to the actual image:

`http://metadata.owlprotocol.xyz:32001/metadata/getImage/Qmc7Aih1P67dmHF4PDMg5KfLABMtR6DXmDaxRvgF8Wgoe9/AAAAAA...`

Which is this image:

![NFT](/img/tutorial/attached.png)

---

## Step 10: Detach the hat

We use the `detachTopDown` command to remove/detach the NFT:

```bash
owl-cli detachTopDown --root=0xe3f62b8f72E49e75081B991685AeA19dd783b44a -c 0x91a4Df19DE444cDA86ef24f61A6190838Cec2b22 --tokenId=1
```

Outputs:

```
Detaching from ERC721TopDownDna on ganache
Fetching Metadata JSON Schema from: https:/leovigna.mypinata.cloud/ipfs/Qmc7Aih1P67dmHF4PDMg5KfLABMtR6DXmDaxRvgF8Wgoe9
```
```javascript
{
  Body: {
    value: 'Downtown',
    image_url: 'ipfs://QmfSABDaq7V2WKrdTnK3ofnnbucax4e5jBcztXqL34zsrL/body-albino.png'
  },
  Background: {
    value: 'Downtown',
    image_url: 'ipfs://QmfSABDaq7V2WKrdTnK3ofnnbucax4e5jBcztXqL34zsrL/bg-downtown.png'
  },
  Vibe: 'Chill'
}
```

Now let's view the NFT again:

```
owl-cli viewTopDown --root=0xe3f62b8f72E49e75081B991685AeA19dd783b44a  --tokenId=1 --debug
```

This gives us different the `tokenUri`. Notice that the image is simply accessible via the `/getImage` path instead of `/getMetadata`.

So calling: [https://metadata.owlprotocol.xyz/metadata/getImage/Qmc7Aih1P67dmHF4PDMg5KfLABMtR6DXmDaxRvgF8Wgoe9/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADAAEBAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA=](http://metadata.owlprotocol.xyz:32001/metadata/getImage/Qmc7Aih1P67dmHF4PDMg5KfLABMtR6DXmDaxRvgF8Wgoe9/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADAAEBAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA=)

Gives us:

![NFT Detached](/img/tutorial/detached.png)

## More Info

Have questions? Join us in Discord: [https://discord.com/invite/7sANzfGUfe](https://discord.com/invite/7sANzfGUfe)
