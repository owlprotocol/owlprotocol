import yargs from 'yargs';
import { ethers } from 'ethers';

import { Artifacts } from '@owlprotocol/contracts';

import { Argv } from '../utils/pathHandlers.js';
import { getNetworkCfg } from '../utils/networkCfg.js';

let debug = false;

export const command = 'burnNFT';

export const describe = `Burn the NFT and all children (if any).
`;

export const example = '$0 burnNFT --contract=<contract> --tokenId=<id>';
export const exampleDescription =
    'burn the NFT at the given contract and tokenId, including all of the NFTs the NFT owns';

export const builder = (yargs: ReturnType<yargs.Argv>) => {
    return yargs
        .option('debug', {
            describe: 'Output debug statements',
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
    debug = !!argv.debug || false;

    const { network, signers } = getNetworkCfg();

    console.log(`Burn ERC721TopDownDnaMintable ${argv.contractAddr} with tokenId: ${argv.tokenId} on ${network.name}`);

    const contractAddr = argv.contractAddr as string;
    const tokenId = argv.tokenId as number;

    const rootContract = new ethers.Contract(contractAddr, Artifacts.ERC721TopDownDnaMintable.abi, signers[0]);

    const tx = await rootContract.burn(tokenId);

    const receipt = await tx.wait(1);

    debug && console.debug(receipt);

    console.log('Done');
};
