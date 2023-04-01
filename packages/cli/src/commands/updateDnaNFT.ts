import check from 'check-types';
import fs from 'fs';
import path from 'path';
import yargs from 'yargs';
import _ from 'lodash';
import fetchRetryWrapper from 'fetch-retry';
import { ethers } from 'ethers';

import { Artifacts } from '@owlprotocol/contracts';
import { NFTGenerativeCollectionClass, NFTGenerativeItemInterface } from '@owlprotocol/nft-sdk';

import { Argv } from '../utils/pathHandlers.js';
import { getNetworkCfg } from '../utils/networkCfg.js';

const fetchRetry = fetchRetryWrapper(fetch);
let debug = false;

export const command = 'updateDnaNFT';

export const describe = `Update an NFT's DNA data.
`;

export const example = `$0 updateDnaNFT -r <rootContractAddr> --tokenId=<id> --trait='xyz' --attr='abc'`;
export const exampleDescription =
    'update the trait <trait> with attribute <attr> for NFT <id> at contract <rootContractAddr>';
export const example2 = `$0 updateDnaNFT -r <rootContractAddr> --tokenId=<id> --json=<jsonFile>`;
export const exampleDescription2 = 'update NFT <id> at contract <rootContractAddr> with the attributes in <jsonFile>';

export const builder = (yargs: ReturnType<yargs.Argv>) => {
    return yargs
        .option('debug', {
            describe: 'Output debug statements',
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
    argvCheck(argv);
    debug = !!argv.debug || false;

    const { network, signers } = getNetworkCfg();

    console.log(`View ERC721TopDownDna ${argv.rootContractAddr} on ${network.name}`);

    const rootContractAddr = argv.rootContractAddr as string;
    const tokenId = argv.tokenId as number;

    const rootContract = new ethers.Contract(rootContractAddr, Artifacts.ERC721TopDownDna.abi, signers[0]);
    const contractURI = await rootContract.contractURI();

    let collMetadataRes;
    try {
        debug && console.debug(`Fetching JSON Schema from ${contractURI}`);
        collMetadataRes = await fetchRetry(contractURI, { retryDelay: 200 });
    } catch (err) {
        console.error(`Fetch Collection JSON Schema failed`);
        throw err;
    }

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
