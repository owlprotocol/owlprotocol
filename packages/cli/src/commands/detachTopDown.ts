import yargs from 'yargs';
import lodash from 'lodash';
import { Argv } from '../utils/pathHandlers.js';
import { HD_WALLET_MNEMONIC, NETWORK } from '../utils/environment.js';
import { ethers, utils } from 'ethers';

const { mapValues } = lodash;

import { Utils, Deploy, Artifacts } from '@owlprotocol/contracts';
import config from 'config';
import { NFTGenerativeCollectionClass } from '@owlprotocol/nft-sdk';

const jsonRpcEndpoint: string = config.get(`network.${NETWORK}.config.url`);
const provider = new ethers.providers.JsonRpcProvider(jsonRpcEndpoint);
let debug = false;

export const command = 'detachTopDown';

export const describe = `Deploy the collection to the configured chain

collectionJS - Relative path to the collection's JS file
itemsFolder - (Optional) The path to the folder with the item DNA JSONs, defaults to folder "items" in the same directory as the collectionJS

e.g. node lib/esm/index.js detachTopDown --root=0x48221206C91844aFE886445eCF4E53a4ec6acA55 -c 0xecB0Be88463C74C92c0D9855C94C0CBe271bBe80 --tokenId=1



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
        .option('childContractAddr', {
            describe: 'Child contract address for the NFT to detach',
            alias: ['c', 'child'],
            type: 'string',
        })
        .option('tokenId', {
            describe: 'tokenId of the parent/root NFT',
            type: 'number',
        })
        .demandOption(['rootContractAddr', 'childContractAddr', 'tokenId']);
};

export const handler = async (argv: Argv) => {
    console.log(`Detaching from ERC721TopDownDna on ${NETWORK}`);

    // argvCheck(argv);
    // TODO: consider LOG_LEVEL
    debug = !!argv.debug || false;

    const signers = new Array<ethers.Wallet>(ethers.Wallet.fromMnemonic(HD_WALLET_MNEMONIC).connect(provider));
    const network: Deploy.RunTimeEnvironment['network'] = config.get(`network.${NETWORK}`);

    const rootContractAddr = argv.rootContractAddr as string;
    const childContractAddr = argv.childContractAddr as string;
    const tokenId = argv.tokenId as number;

    const rootContract = new ethers.Contract(rootContractAddr, Artifacts.ERC721TopDownDna.abi, signers[0]);

    await detachTopDown({ provider, signers, network }, rootContract, childContractAddr, tokenId);

    const fullDna = await rootContract.getDna(tokenId);
    const contractURI = await rootContract.contractURI()

    console.log(`Fetching Metadata Schema JSON from: ${contractURI}`);
    const collMetadataRes = await fetch(contractURI);

    if (!collMetadataRes.ok) {
        console.error(`Error fetching ${contractURI}`);
        process.exit();
    }

    const collMetadata = await collMetadataRes.json();

    const collectionClass = NFTGenerativeCollectionClass.fromData(collMetadata);

    if (debug) {

        const [dna, fullDnaChildren] = utils.defaultAbiCoder.decode(['bytes', 'bytes[]'], fullDna);

        console.debug(dna);
        console.debug(fullDnaChildren);
        console.debug(fullDna);
    }

    const nftItem = collectionClass.createFromFullDna(fullDna);

    const attrWithChildren = nftItem.attributesFormattedWithChildren();

    console.log(nftItem.attributesFormatted());
    mapValues(attrWithChildren.children, (c: any, k) => {
        console.log(k, c.attributes);
    });

    console.log('Done');
};

const detachTopDown = async (
    { provider, signers, network }: Deploy.RunTimeEnvironment,
    rootContract: any,
    childContractAddr: string,
    tokenId: number,
) => {
    await rootContract.setChildren(
        ...Utils.ERC721TopDownDna.flattenSetChildrenArgsERC721TopDownDna({
            tokenId,
            childContracts721Set: [childContractAddr],
            childTokenIds721Set: [0],
        }),
        {
            gasPrice: 2e9,
            gasLimit: 10e6,
        },
    );
};
