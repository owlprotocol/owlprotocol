import yargs from 'yargs';
import _ from 'lodash';

import { Argv } from '../utils/pathHandlers.js';
import { HD_WALLET_MNEMONIC, NETWORK, PRIVATE_KEY_0 } from '../utils/environment.js';

import { ethers } from 'ethers';

const { mapValues } = _;

import { Artifacts, Deploy } from '@owlprotocol/contracts';
import config from 'config';

const jsonRpcEndpoint: string = config.get(`network.${NETWORK}.config.url`);
const provider = new ethers.providers.JsonRpcProvider(jsonRpcEndpoint);
let debug = false;

import { NFTGenerativeCollectionClass, NFTGenerativeItemClass, NFTGenerativeItemInterface } from '@owlprotocol/nft-sdk';
import check from 'check-types';
import fs from 'fs';
import path from 'path';

export const command = 'updateDnaNFT';

export const describe = `Introspect and view the NFT TopDownDna contract

e.g. node dist/index.cjs updateDnaNFT --root=0xbE705Ab239b7CE7c078E84965A518834Cb7CFE4b --tokenId=1 --trait='xyz' --attr='abc'

OR

node dist/index.cjs updateDnaNFT --root=0xbE705Ab239b7CE7c078E84965A518834Cb7CFE4b --tokenId=1 --json=src/projects/example-loyalty/exampleUpdateDnaNFT.json

`;

export const builder = (yargs: ReturnType<yargs.Argv>) => {
    return yargs
        .option('debug', {
            describe: 'Outputs debug statements',
            type: 'boolean',
        })
        .option('rootContractAddr', {
            describe: 'Parent/root contract address',
            alias: ['r', 'root'],
            type: 'string',
        })
        .option('tokenId', {
            describe: 'tokenId',
            alias: ['token'],
            type: 'number',
        })
        .option('trait', {
            describe: 'trait to edit',
            type: 'string',
        })
        .option('attribute', {
            describe: 'new attribute/value',
            alias: ['attr'],
        })
        .option('updateJSON', {
            describe: 'JSON file of the attrs to update, relative from the current directory of the CLI',
            alias: ['json'],
        })
        .demandOption(['rootContractAddr', 'tokenId']);
};

export const handler = async (argv: Argv) => {
    console.log(`View ERC721TopDownDna ${argv.rootContractAddr} on ${NETWORK}`);

    argvCheck(argv);
    debug = !!argv.debug || false;

    const signers = new Array<ethers.Wallet>();
    if (HD_WALLET_MNEMONIC) {
        signers[0] = ethers.Wallet.fromMnemonic(HD_WALLET_MNEMONIC);
    } else if (PRIVATE_KEY_0) {
        signers[0] = new ethers.Wallet(PRIVATE_KEY_0);
    } else {
        throw new Error('ENV variable HD_WALLET_MNEMONIC or PRIVATE_KEY_0 must be provided');
    }
    signers[0] = signers[0].connect(provider);

    const rootContractAddr = argv.rootContractAddr as string;
    const tokenId = argv.tokenId as number;

    const rootContract = new ethers.Contract(rootContractAddr, Artifacts.ERC721TopDownDna.abi, signers[0]);
    const contractURI = await rootContract.contractURI();

    console.log(`Fetching Metadata Schema JSON from: ${contractURI}`);
    const collMetadataRes = await fetch(contractURI);

    if (!collMetadataRes.ok) {
        console.error(`Error fetching ${contractURI}`);
        process.exit();
    }

    const collMetadata = await collMetadataRes.json();

    const collectionClass = NFTGenerativeCollectionClass.fromData(collMetadata);

    debug && console.debug(collectionClass);

    // this returns the abi encoded parent + children arrayify
    const fullDnaWithChildren = await rootContract.getDna(tokenId);
    const nftItem = collectionClass.createFromFullDna(fullDnaWithChildren);

    console.log('Initial', nftItem.attributesFormatted());

    debug && console.debug('fullDnaWithChildren', fullDnaWithChildren);

    let nftItemUpdated: NFTGenerativeItemInterface;
    if (!check.undefined(argv.trait)) {
        nftItemUpdated = getNftItemUpdatedByTrait(nftItem, argv.trait as string, argv.attribute as string | number);
    } else {
        nftItemUpdated = getNftItemUpdatedByJSON(nftItem, argv.updateJSON as string);
    }

    console.log('New', nftItemUpdated.attributesFormatted());

    debug && console.debug(nftItemUpdated.dna());

    const txUpdate = await rootContract.updateDna(tokenId, nftItemUpdated.dna());

    await txUpdate.wait(1);

    console.log('Done');
};

const getNftItemUpdatedByTrait = (
    nftItem: NFTGenerativeItemInterface,
    trait: string,
    attribute: string | number,
): NFTGenerativeItemInterface => {
    return nftItem.withAttribute(trait, attribute);
};

/**
 * @param nftItem
 * @param jsonFilepath
 */
const getNftItemUpdatedByJSON = (
    nftItem: NFTGenerativeItemInterface,
    jsonFilepath: string,
): NFTGenerativeItemInterface => {
    const newAttrs = JSON.parse(fs.readFileSync(path.resolve(process.cwd(), jsonFilepath)).toString());

    const traitKeys = _.keys(newAttrs);
    let nftItemUpdated: NFTGenerativeItemInterface = nftItem;

    for (let i = 0; i < traitKeys.length; i++) {
        const attr = newAttrs[traitKeys[i]];
        nftItemUpdated = nftItemUpdated.withAttribute(traitKeys[i], attr);
    }

    return nftItemUpdated;
};

const argvCheck = (argv: Argv) => {
    if (
        (!check.undefined(argv.trait) || !check.undefined(argv.attr)) &&
        (check.undefined(argv.trait) || check.undefined(argv.attr))
    ) {
        console.error(`ERROR: Args "trait" and "attribute" MUST both be defined, if either is passed in.`);
        process.exit();
    }

    if ((!check.undefined(argv.trait) || !check.undefined(argv.attr)) && !check.undefined(argv.json)) {
        console.error(
            `ERROR: Args "updateJSON" file, and args "trait" and "attribute" are both defined, please choose one.`,
        );
        process.exit();
    }

    if (check.undefined(argv.trait) && check.undefined(argv.attr) && check.undefined(argv.json)) {
        console.error(`ERROR: Args "updateJSON", or "trait" and "attribute" are required.`);
        process.exit();
    }
};
