# Owl Protocol CLI Tool

Developer tool for deploying, introspecting, and managing Owl Protocol's smart contracts

## Features

### ERC721TopDownDna
- [x] Initialize a NFT TopDownDna Collection and Output the Metadata JSON for IPFS Upload
- [x] Generate Randomized NFTs with DNA, including for children NFTs
- [x] Deploy all common smart contracts, implementations and beacon architecture
- [x] Deploy multiple TopDownDna NFTs from Item JSON files
- [x] Detach a child NFT from a parent NFT
- [ ] Attach a NFT to a parent NFT
- [x] View a NFT's information by tokenId, including DNA and attributes
- [ ] Create a test with a local IPFS, and ganache

### AssetRouter
- [ ] Deploy an AssetRouter smart contract for NFT logic


## Tutorials
- [Deploying a ERC721TopDownDna](https://docs.owlprotocol.xyz/contracts/tutorial-topdowndna)

## Setup / Install

### Configuration

- `.env.[NODE_ENV]` - Must be one of `.env`, `.env.development`, or `.env.test`

Must have the `NETWORK` and `HD_WALLET_MNEMONIC`, e.g.
```
NETWORK=ganache
HD_WALLET_MNEMONIC="second supreme disorder tunnel pizza candy lamp elbow special attend accuse agent"
```

- `config/default.json` - network configuration, add other chains here as necessary.

## Commands

*For example / reference only:*

#### GenerateSchemaJSON

`node dist/index.cjs generateSchemaJSON collections.js --project=projects/example-omo`

#### GenerateRandomNFT

`node dist/index.cjs generateRandomNFT collections.js 3 --project=projects/example-omo`

#### Deploy Common

`node dist/index.cjs deployCommon`

#### Deploy and Mint NFTs

`node dist/index.cjs deployTopDown --projectFolder=projects/example-omo --deployCommon=true --debug=true`

#### View NFT

`node dist/index.cjs viewTopDown --root=0xE56ce67A412417c1a3dE60026cBe59477B230338 --tokenId=1 --debug=true`

#### Detach Child NFT

`node dist/index.cjs detachTopDown --root=0xC627f2756822dFEc6fB81615340FA133129bE19d -c 0x6b42e97a042AECdd27c8798F9cd5b8C860C423FC --tokenId=1`

