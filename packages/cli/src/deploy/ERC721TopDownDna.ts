import path from 'path';
import fs from 'fs';
import _ from 'lodash';
import { constants, ethers, Signer, utils } from 'ethers';

// TODO: rewrite to make this generic
import { NFTGenerativeItemInterface, NFTGenerativeCollectionInterface } from '@owlprotocol/nft-sdk';
import { Ethers, Utils, Deploy, Artifacts } from '@owlprotocol/contracts';
import { OwlProject, FactoriesResult, MintNFTResult } from '../classes/owlProject.js';
import { NETWORK } from '../utils/environment.js';

const { map, mapValues, zip, values, omit, pick, zipObject } = _;

/**
 *
 * @param provider
 * @param signers
 * @param network
 * @param nftItem
 * @param owlProject - from the owlproject.json
 * @param collMetadata - Schema JSON from IPFS
 * @param contracts
 * @param factories - pre-initialized factories, this function cannot be called without these ready
 * @param nonce
 */
export const deployERC721TopDownDna = async (
    { provider, signers, network }: Deploy.RunTimeEnvironment,
    owlProject: OwlProject,
    nftItem: NFTGenerativeItemInterface,
    contracts: Record<string, any>,
    factories: FactoriesResult,
) => {
    if (!factories.initialized) {
        console.error('Call to deployERC721TopDownDna does not have factories initialized');
        process.exit();
    }

    const { awaitAllObj } = await import('@owlprotocol/utils');
    const signer = signers[0];
    const signerAddress = await signer.getAddress();

    let rootTokenId: number;
    let nonce = await provider.getTransactionCount(signerAddress);

    const contractPromises = mapValues(contracts, async (c, k): Promise<MintNFTResult> => {
        let tokenId: number;
        const contract = c.contract;
        let dna: string;

        if (k === 'root') {
            tokenId = owlProject.rootContract.tokenIdStart;
            rootTokenId = tokenId;
            owlProject.rootContract.tokenIdStart++;
            dna = nftItem.dna();
        } else {
            tokenId = owlProject.children[k].tokenIdStart;
            owlProject.children[k].tokenIdStart++;
            dna = (nftItem.children![k] as NFTGenerativeItemInterface).dna();
        }

        try {
            const owner = await contract.ownerOf(tokenId);
            const fullDna = await contract.getDna(tokenId);
            const [dna, fullDnaChildren] = utils.defaultAbiCoder.decode(['bytes', 'bytes[]'], fullDna);
            return {
                owner,
                contractAddress: contract.address,
                tokenId,
                dna,
                deployed: false,
            };
        } catch (err) {
            //Not minted
            // TODO: capture the mints and return to caller for faster processing with respect to nonce
            const tx = await contract.safeMintWithDna(signerAddress, tokenId, dna, {
                nonce: nonce++,
                type: 2,
            });
            const receipt = await tx.wait(1);

            return {
                owner: signerAddress,
                contractAddress: tx.to,
                tokenId,
                dna,
                deployed: true,
                tx,
                receipt,
            };
        }
    });

    const mints = await awaitAllObj(contractPromises);

    const rootContractAddr = mints.root.contractAddress;
    const rootContract = new ethers.Contract(rootContractAddr, Artifacts.ERC721TopDownDna.abi, signer);

    let tokenIdUpdates = new Array<any>();

    mapValues(mints, (mint, k) => {
        if (k === 'root') return;
        tokenIdUpdates.push([mint.contractAddress, mint.tokenId]);
    });

    tokenIdUpdates = zip(...tokenIdUpdates);

    const txSetChildren = await rootContract.setChildren(
        ...Utils.ERC721TopDownDna.flattenSetChildrenArgsERC721TopDownDna({
            tokenId: rootTokenId!,
            childContracts721Set: tokenIdUpdates[0],
            childTokenIds721Set: tokenIdUpdates[1],
        }),
        {
            gasPrice: 3e9,
            gasLimit: 10e6,
        },
    );

    await txSetChildren.wait(1);

    return mints;
};
