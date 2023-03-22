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

import { NFTGenerativeCollectionClass, NFTGenerativeItemClass } from '@owlprotocol/nft-sdk';

export const command = 'burnNFT';

export const describe = `Burns the NFT and all children (if any)

e.g. node dist/index.cjs burnNFT --contract=0x74Dbc83C18fE41B8db1d8A31A9B5E665d974D55b --tokenId=3



`;

export const builder = (yargs: ReturnType<yargs.Argv>) => {
    return yargs
        .option('debug', {
            describe: 'Outputs debug statements',
            type: 'boolean',
        })
        .option('contractAddr', {
            describe: 'contract address',
            alias: ['contract'],
            type: 'string',
        })
        .option('tokenId', {
            describe: 'tokenId',
            alias: ['token'],
            type: 'number',
        })
        .demandOption(['contractAddr']);
};

export const handler = async (argv: Argv) => {
    console.log(`Burn ERC721TopDownDnaMintable ${argv.contractAddr} with tokenId: ${argv.tokenId} on ${NETWORK}`);

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

    const contractAddr = argv.contractAddr as string;
    const tokenId = argv.tokenId as number;

    const rootContract = new ethers.Contract(contractAddr, Artifacts.ERC721TopDownDnaMintable.abi, signers[0]);

    const tx = await rootContract.burn(tokenId);

    const receipt = await tx.wait(1);

    debug && console.debug(receipt);

    console.log('Done');
};
