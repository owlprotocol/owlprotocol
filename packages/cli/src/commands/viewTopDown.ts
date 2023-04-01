import yargs from 'yargs';
import lodash from 'lodash';
import { ethers } from 'ethers';

import { Artifacts } from '@owlprotocol/contracts';
import { NFTGenerativeCollectionClass, NFTGenerativeItemInterface } from '@owlprotocol/nft-sdk';

import { Argv } from '../utils/pathHandlers.js';
import { getNetworkCfg } from '../utils/networkCfg.js';

const { mapValues } = lodash;

let debug = false;

export const command = 'viewTopDown';

export const describe = `View an NFT's DNA and attributes, and that of its children.
`;

export const example = '$0 viewTopDown -r <rootContractAddr> --tokenId=<id>';
export const exampleDescription =
    'view the DNA and attributes of the NFT at <rootContractAddr> with token id <id>, and that of its children';

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
        .demandOption(['rootContractAddr', 'tokenId']);
};

export const handler = async (argv: Argv) => {
    debug = !!argv.debug || false;

    const { network, signers, provider } = getNetworkCfg();

    console.log(`View ERC721TopDownDna ${argv.rootContractAddr} on ${network.name}`);

    const rootContractAddr = argv.rootContractAddr as string;
    const tokenId = argv.tokenId as number;

    const rootContract = new ethers.Contract(rootContractAddr, Artifacts.ERC721TopDownDnaMintable.abi, signers[0]);
    const contractURI = await rootContract.contractURI();

    console.log(`Fetching Metadata JSON Schema from: ${contractURI}`);
    const collMetadataRes = await fetch(contractURI);

    if (!collMetadataRes.ok) {
        console.error(`Error fetching ${contractURI}`);
        process.exit();
    }

    const collMetadata = await collMetadataRes.json();

    const collectionClass = NFTGenerativeCollectionClass.fromData(collMetadata);

    debug && console.debug(collectionClass);

    const fullDnaWithChildren = await rootContract.getDna(tokenId);
    const nftItem = collectionClass.createFromFullDna(fullDnaWithChildren);

    const owner = (await rootContract.ownerOf(tokenId)) as string;

    dumpInfoNFT(tokenId, owner, nftItem);

    debug && console.log('tokenUri', await rootContract.tokenURI(tokenId));
    debug && console.debug('fullDnaWithChildren', fullDnaWithChildren);
};

const dumpInfoNFT = (tokenId: number, owner: string, nftItem: NFTGenerativeItemInterface) => {
    console.log(`NFT tokenId: ${tokenId} - owned by ${owner}`);

    const attrWithChildren = nftItem.attributesFormattedWithChildren();

    console.log(nftItem.attributesFormatted());
    mapValues(attrWithChildren.children, (c: any, k) => {
        console.log(k, c.attributes);
    });
};
