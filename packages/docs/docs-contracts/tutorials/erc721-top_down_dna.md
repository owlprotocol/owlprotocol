---
sidebar_position: 3
sidebar_label: 'DNFT Image Layers with DNA'
slug: '/tutorial-topdowndna'
---

import { SimpleGrid } from '@chakra-ui/react'

# DNA Encoding - ERC721TopDownDna

## Tutorial

The **ERC721TopDownDna** smart contract combines two of our primary features:

1. **TopDown** - Allows NFTs to own other child NFTs in a meaningful way onchain - [ERC721TopDownBase.sol](https://github.com/owlprotocol/owlprotocol/blob/main/packages/contracts/contracts/assets/ERC721/ERC721TopDownBase.sol)
2. **DNA** - Allows NFTs to encode data onchain in a universal way with offchain schemas - [ERC721DnaBase.sol](https://github.com/owlprotocol/owlprotocol/blob/main/packages/contracts/contracts/assets/ERC721/ERC721DnaBase.sol)

Combined we have the contract: [ERC721TopDownDna.sol](https://github.com/owlprotocol/owlprotocol/blob/main/packages/contracts/contracts/assets/ERC721/ERC721TopDownDna.sol)

## Use Case: PFPs with Detachable Accessories or Equipment

<SimpleGrid className="features-grid" columns={{sm: 2, md: 4}} spacing={8}>
<Box>
    <div>
    <img src="/img/tutorial/attached.png"/>
    <br/>
    <strong>NFT with Hat</strong>
    </div>
</Box>
<Box>
    <div>
    <img src="/img/tutorial/detached.png"/>
    <br/>
    <strong>NFT with Hat Removed</strong>
    </div>
</Box>
</SimpleGrid>

In this example we are creating a Dynamic PFP (Profile Picture NFT).

- **The hat is its own NFT!** And can be detached/removed, or re-attached to the base NFT.
- When attached/removed the NFT will show the hat on or off.
- The hat once removed can be traded on its own with other hats, or sold, it's up the owner.
- The onchain data, and IPFS hosted Schema JSON is all that is required to render the NFT graphics.
- No centralized back-ends, or dependencies on other tools. **Our `nft-sdk` is the only thing a client/browser needs to render the NFT.**

:::caution
Ensure you're able to build the entire project before starting - **READ: [Getting Started](/contracts/getting-started/)**.
:::

---

## Step 1: Prepare the layers

:::info
The sample will have a small number of layers for each `trait`:

> These **MUST** be transparent PNGs, which will be combined, therefore the positioning must be taken into account.

> You **MUST** upload these images to ideally IPFS, but an accessible image host works as well.
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

**And no background at all.**

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

### Hats (Detachable Accessory)

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

## Step 2: Setup the Project and Declare the Traits in Javascript

We will be using the [CLI Tool](/contracts/getting-started/cli) for this, so firstly
under `packages/cli/src/projects` we will need to create a folder for the project called `example-omo`.
```
.
└── packages/
    ├── cli/
    │   └── src/
    │       ├── classes
    │       ├── commands
    │       ├── deploy
    │       ├── projects/
    │       │   └── example-omo
    │       ├── types
    │       └── utils
    ├── contracts
    └── [...]
```

For the `traits` in this example we'll use the `nft-sdk` to instantiate the [NFTGenerativeCollectionClass](https://github.com/owlprotocol/owlprotocol/blob/main/packages/nft-sdk/src/classes/NFTGenerativeCollection/NFTGenerativeCollectionClass.ts) and use the CLI
tool to generate the **Schema JSON**, which is uploaded to IPFS.

> The `nft-sdk` needs this Schema JSON to translate the binary onchain data (DNA).

`packages/cli/src/projects/example-omo/traits.ts`

Traits are first instantiated as [NFTGenerativeTraits](https://github.com/owlprotocol/owlprotocol/tree/main/packages/nft-sdk/src/classes/NFTGenerativeTrait), then added
to the `NFTGenerativeCollection`.

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
See: [/packages/cli/src/projects/example-omo/traits.ts](https://github.com/owlprotocol/owlprotocol/blob/tutorial-example-omo/packages/cli/src/projects/example-omo/traits.ts)

:::info
`probabilities` are normalized, correspond in order with the values, and there must be the same number of probabilities as values.
:::

:::caution About IPFS Hashes for Images

You need to manually upload images to IPFS, and add the `image_url` as `ipfs://[hash]/[path]`.

The `ipfs://` will be replaced by the `ENV` variable `IPFS_GATEWAY` that used by our provided API, so you don't need to be concerned about that.

We'll have more tools and a UI for uploading to IPFS soon.

:::

---

## Step 3: Create the `collection.ts` that connects the traits/collection together:

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
    description: 'Example from https://docs.owlprotocol.xyz/contracts/tutorial-topdowndna',
    external_url: 'https://docs.owlprotocol.xyz/contracts/tutorial-topdowndna',
    seller_fee_basis_points: 5000,
    fee_recipient: '0x7E5F4552091A69125d5DfCb7b8C2659029395Bdf',
    generatedImageType: 'png',
    traits: {
        Hats: traitImageHats,
    },
};

const collNestedDef: NFTGenerativeCollection = {
    name: 'Thread Haus - Innovot NFT Collection',
    description: 'Example from https://docs.owlprotocol.xyz/contracts/tutorial-topdowndna',
    external_url: 'https://docs.owlprotocol.xyz/contracts/tutorial-topdowndna',
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

:::caution
For now the trait key must be the same as the trait name.

e.g. `traitImageBg` has the field name as `Background` capitalized, and therefore `collExample` also declares its trait as `Background`.
:::

See: [/packages/cli/projects/example-omo/collection.ts](https://github.com/owlprotocol/owlprotocol/blob/tutorial-example-omo/packages/cli/projects/example-omo/collection.ts)

---

## Step 4: Generate the Schema JSON

The **Schema JSON** is used to interpret and translate the on-chain DNA or NFT on-chain data to something that can be rendered
or executed upon.

> We believe storing the on-chain data in a single binary encoded format is ideal because it minimizes the number of esoteric methods on the smart contract. Rather we leave it up to the client to interpret and parse the schema.

:::info
This is not to confused with the **Metadata JSON**, which is what NFT Marketplaces use to describe the NFT.
:::

### Using the CLI to Generate the Schema JSON

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
| => node dist/index.cjs generateSchemaJSON collections.js --projectFolder=projects/example-omo
```

Which should output:

```
getProjectSubfolder ~/owl_protocol/owlprotocol/packages/cli/projects/example-omo/output
Creating JSON(s) for collections.js to folder: ~/owl_protocol/owlprotocol/packages/cli/projects/example-omo/output
projects/example-omo collections.js
Done
```

> Ignore any warnings for `duplicate definition`.

Now you should see a new folder in `projects/example-omo` called `output`, and inside 2 JSON files:
- collection-parent.json
- collection-child-Hats.json

---

## Step 5: Upload the Schema JSON to IPFS

:::info
We have 2 collections here, which should make sense because the **Hats** collection is a separate NFT.
However when we mint the NFT, we only mint the parent NFT, and we attach the minted **Hat** NFT to the parent NFT.
:::

### Upload to IPFS using your own provider, or [Pinata](https://www.pinata.cloud/)

We generally prefer Pinata, but of course you can choose a more decentralized option.

For this example we will use Pinata, **upload both Schema JSONs to IPFS, and take note of the IPFS hashes.**

In this case and for your reference, we have uploaded these example JSONs here:
- [collection-parent.json](https://leovigna.mypinata.cloud/ipfs/QmRNrcuGtaqefB72NHuGdDtvzEZjNvX6m2E1AgBXW65EKq) - Hash: `QmRNrcuGtaqefB72NHuGdDtvzEZjNvX6m2E1AgBXW65EKq`
- [collection-child-Hats.json](https://leovigna.mypinata.cloud/ipfs/QmcYC3fcqxU2gqS7VWEeC7jLDjpFQunMXmfkijXq325RHf) - Hahs: `QmcYC3fcqxU2gqS7VWEeC7jLDjpFQunMXmfkijXq325RHf`

---

## Step 6: Generate a Few NFTs

For generating NFTs we use the CLI command: `generateRandomNFT`.

```
| => node dist/index.cjs generateRandomNFT collections.js 3 --project=projects/example-omo
```

This will generate 3 items in the subfolder `output/items` in the project folder with their DNAs. For now these are the
full DNAs and unintelligible, but we will create a command to view these soon.

For now we just need to pass these to the `deployTopDown` command to deploy these.

:::info
In fact if you review the `nft-sdk` it's pretty straightforward, you can use the instantiated `[NFTCollectionClass (initialized)].createFromFullDna` function
to initialize the NFT.

Then use `nftItem.attributesFormattedWithChildren()` to view the traits in human readable format.

See: [cli/src/commands/viewTopDown.ts](https://github.com/owlprotocol/owlprotocol/blob/tutorial-example-omo/packages/cli/src/commands/viewTopDown.ts)
:::

---

## Step 7: Configure the Deployment

You will need to create an `owlproject.json` file in the project folder:

```json
{
  "rootContract": {
    "tokenSymbol": "ExampleOmoNFT",
    "tokenIdStart": 1,
    "cfg": {
      "ipfsEndpoint": "https://leovigna.mypinata.cloud",
      "ipfsPath": "ipfs",
      "apiEndpoint": "https://metadata.owlprotocol.xyz",
      "apiPath": "metadata/getMetadata",
      "schemaJsonIpfs": "QmRNrcuGtaqefB72NHuGdDtvzEZjNvX6m2E1AgBXW65EKq"
    }
  },
  "children": {
    "Hats": {
      "tokenIdStart": 1,
      "cfg": {
        "schemaJsonIpfs": "QmcYC3fcqxU2gqS7VWEeC7jLDjpFQunMXmfkijXq325RHf"
      }
    }
  }
}
```

### Important
- You need a working IPFS endpoint for now for `ipfsEndpoint`, we are using [Pinata](https://pinata.cloud/)
- Do not change `apiEndpoint`, this is the fallback API for browsers/clients that do not support the `nft-sdk`
- Replace the `schemaJsonIpfs` for the parent and children according to the **Schema JSON** from earlier, this is misnamed at the moment.

---

## Step 8: Deploy and Mint the NFTs

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
node dist/index.cjs deployTopDown --projectFolder=projects/example-omo --deployCommon=true --debug=true
```

Requirements:
- Schema JSON uploaded to IPFS, and IPFS hashes specified in `owlproject.json` file.
- Network configured properly in `.env.[NODE_ENV]` file and `cli/config/default.json`.
- NFT item JSONs generated in `output/items`

**This will deploy and mint all NFT JSONs in that folder.**

If it works you should see:
```
Minted /Users/clarencel/owl_protocol/owlprotocol/packages/cli/src/projects/example-omo/output/items/collection-item-1.json
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

## Step 9: View and Check the NFTs

You can use the `viewTopDown` command on the CLI to quickly view the NFT:

```
node dist/index.cjs viewTopDown --root=0xe3f62b8f72E49e75081B991685AeA19dd783b44a --tokenId=1
```

This should show something similar to:
```json
View ERC721TopDownDna 0xe3f62b8f72E49e75081B991685AeA19dd783b44a on ganache
Fetching Metadata Schema JSON from: https:/leovigna.mypinata.cloud/ipfs/Qmc7Aih1P67dmHF4PDMg5KfLABMtR6DXmDaxRvgF8Wgoe9
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

### View the Rendered NFT PFP

Typically your webapp should use the `nft-sdk`, instantiate the collection class from the Schema JSON, and read the
NFT's `dna` to render the NFT.

> But we can use the centralized fallback API to quickly use our deployed public endpoint, which does the same job, but should not be relied upon!

To do this, we call the `viewTopDown` command again, but with the `--debug` option.

This will call the NFT contract's `tokenURI` method, which is that a NFT Marketplace that does not support the `nft-sdk`
would typically call.

`node dist/index.cjs viewTopDown --root=0xe3f62b8f72E49e75081B991685AeA19dd783b44a --tokenId=1 --debug`

For our example, the result at the end shows:

```
tokenUri http://metadata.owlprotocol.xyz:32001/metadata/getMetadata/Qmc7Aih1P67d....
fullDna 0x0000000000000...
```

But we are only interested in the `tokenUri`:

`http://metadata.owlprotocol.xyz:32001/metadata/getMetadata/Qmc7Aih1P67dmHF4PDMg5KfLABMtR6DXmDaxRvgF8Wgoe9/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADAAEBAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAKAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEBAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA`

Yes, that's a very ugly `base64` encoded DNA string, but that's never seen by users.

If you `curl` that URL, you will get:

```json
| => curl -s https://metadata.owlprotocol.xyz/metadata/getMetadata/Qmc7Aih1P67dmHF4PDMg5KfLABMtR6DXmDaxRvgF8Wgoe9/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADAAEBAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAKAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEBAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA | jq '.'
{
  "description": "Example from https://docs.owlprotocol.xyz/contracts/tutorial-topdowndna",
  "external_url": "https://docs.owlprotocol.xyz/contracts/tutorial-topdowndna",
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

> This is exactly what an NFT Marketplace is looking for.

And you can also see the `image` field is a link to the actual image:

`http://metadata.owlprotocol.xyz:32001/metadata/getImage/Qmc7Aih1P67dmHF4PDMg5KfLABMtR6DXmDaxRvgF8Wgoe9/AAAAAA...`

Which is:

![NFT](/img/tutorial/attached.png)

---

## Step 10: Detaching / Removing the Hat!

We use the `detachTopDown` command to remove/detach the NFT:

`node dist/index.cjs detachTopDown --root=0xe3f62b8f72E49e75081B991685AeA19dd783b44a -c 0x91a4Df19DE444cDA86ef24f61A6190838Cec2b22 --tokenId=1`

Outputs:

```json
Detaching from ERC721TopDownDna on ganache
Fetching Metadata Schema JSON from: https:/leovigna.mypinata.cloud/ipfs/Qmc7Aih1P67dmHF4PDMg5KfLABMtR6DXmDaxRvgF8Wgoe9
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

Again we run:
```
node dist/index.cjs viewTopDown --root=0xe3f62b8f72E49e75081B991685AeA19dd783b44a  --tokenId=1 --debug
```

Which gives us the `tokenUri`, `https://metadata.owlprotocol.xyz/metadata/getMetadata/Qmc7Aih1P67dmHF4PDMg5KfLABMtR6DXmDaxRvgF8Wgoe9/AAAAAAAAAA...`

But you may have noticed the image is accessible simply via the `getImage` path instead of the `getMetadata` path.

So just calling: [https://metadata.owlprotocol.xyz/metadata/getImage/Qmc7Aih1P67dmHF4PDMg5KfLABMtR6DXmDaxRvgF8Wgoe9/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADAAEBAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA=](http://metadata.owlprotocol.xyz:32001/metadata/getImage/Qmc7Aih1P67dmHF4PDMg5KfLABMtR6DXmDaxRvgF8Wgoe9/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADAAEBAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA=)

Gives us:

![NFT Detached](/img/tutorial/detached.png)

