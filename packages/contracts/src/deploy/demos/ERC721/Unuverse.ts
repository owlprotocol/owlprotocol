//@ts-nocheck
import { logDeployment, RunTimeEnvironment } from '../../utils';
import { mapValues } from '../../../lodash.js';
import { getFactories } from '../../../ethers/factories';
import { getDeterministicInitializeFactories } from '../../../ethers/deterministicFactories';
import { ERC721Mintable } from '../../../ethers/types';
import { ERC721MintableInitializeArgs } from '../../../utils/ERC721Mintable';
import { constants, utils } from 'ethers';

const deploy = async ({ provider, signers, network }: RunTimeEnvironment) => {
    const signer = signers[0];
    const signerAddress = await signer.getAddress();
    let nonce = await provider.getTransactionCount(signerAddress);

    const factories = getFactories(signer);
    const deterministicFactories = getDeterministicInitializeFactories(factories, signerAddress);
    const ERC721MintableFactory = deterministicFactories.ERC721Mintable;

    //Contracts
    const julian = '0xC71136017a1e3A4af067aB1BD295F7ded6668d34'.toLowerCase();
    const deployments: { [key: string]: ERC721MintableInitializeArgs } = {
        unuverse: {
            admin: signerAddress,

            name: 'Unuverse',
            symbol: 'UNU',
            initBaseURI: '',
            feeReceiver: julian,

        },
    };

    const mintsUnuverse: { [k: string]: string } = {};
    for (let i = 1; i <= 3333; i++) {
        mintsUnuverse[i] = julian;
    }
    const mints: { [k: keyof typeof deployments]: { [tokenId: string]: string } } = {
        unuverse: mintsUnuverse,
    };

    const promises = mapValues(deployments, async (initArgs, k) => {
        const { admin, contractUri, gsnForwarder, name, symbol, initBaseURI, feeReceiver, feeNumerator } = initArgs;
        const args = [
            admin,
            contractUri,
            gsnForwarder,
            name,
            symbol,
            initBaseURI,
            feeReceiver,
            feeNumerator,
        ] as Parameters<ERC721Mintable['initialize']>;
        const address = ERC721MintableFactory.getAddress(...args);

        //Deploy
        try {
            let response: { address: string; contract: ERC721Mintable; deployed: boolean };
            //Compute Deployment Address
            if (await ERC721MintableFactory.exists(...args)) {
                response = {
                    address,
                    contract: ERC721MintableFactory.attach(address.toLowerCase()),
                    deployed: false,
                };
            } else {
                response = {
                    address,
                    contract: await ERC721MintableFactory.deploy(...args, {
                        nonce: nonce++,
                    }),
                    deployed: true,
                };
            }

            const contract = response.contract;
            const tokens = mints[k];
            let batch = [];
            for (const [tokenId, to] of Object.entries(tokens)) {
                try {
                    const owner = await contract.ownerOf(tokenId);
                    console.debug(`Exists ${tokenId}, owned: ${owner}`);
                } catch (error) {
                    //Not minted
                    const tx = await contract.safeMint(to, tokenId, {
                        nonce: nonce++,
                        type: 2,
                        maxFeePerGas: utils.parseUnits('250', 'gwei').toNumber(),
                        maxPriorityFeePerGas: utils.parseUnits('100', 'gwei').toNumber(),
                    });
                    batch.push(tx.wait(1));
                    console.debug(`Minting ${tokenId}, tx: ${tx.hash}`);
                    if (batch.length > 100) {
                        console.debug('Waiting for 100 tx to be confirmed');
                        await Promise.all(batch);
                        batch = [];
                    }
                }
            }

            return response;
        } catch (error) {
            return { address, error };
        }
    });

    await Promise.all(Object.values(promises));

    return mapValues(promises, async (p, k) => {
        const r = await p;
        if (r.error) {
            logDeployment(network.name, k, r.address, 'deterministic', 'failed');
            console.error(r.error);
        } else {
            logDeployment(network.name, k, r.address, 'deterministic', r.deployed ? 'deployed' : 'exists');
        }

        console.debug(r.mints);
        return r;
    });
};

deploy.tags = ['Unuverse'];
deploy.dependencies = ['ProxyFactory', 'ERC1820'];
export default deploy;
