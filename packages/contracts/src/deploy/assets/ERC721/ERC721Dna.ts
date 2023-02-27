import { logDeployment, RunTimeEnvironment } from '../../utils.js';
import { mapValues } from '../../../lodash.js';
import { getFactories } from '../../../ethers/factories.js';
import { getDeterministicFactories, getDeterministicInitializeFactories } from '../../../ethers/deterministicFactories.js';
import { ERC721DnaInitializeArgs, flattenInitArgsERC721Dna } from '../../../utils/ERC721Dna.js';
import { constants } from 'ethers';
import { getBeaconProxyFactories } from '../../../ethers/beaconProxyFactories.js';
import { ERC1167FactoryAddress } from '../../../utils/ERC1167Factory/index.js';
import { TransactionReceipt } from '@ethersproject/providers';

interface Params extends RunTimeEnvironment {
    tokens: number,
    balanceTarget: number
}
export const ERC721DnaDeploy = async ({ provider, signers, network, tokens, balanceTarget }: Params) => {
    const { awaitAllObj } = await import('@owlprotocol/utils')
    const signer = signers[0];
    const signerAddress = await signer.getAddress();
    let nonce = await provider.getTransactionCount(signerAddress);

    const factories = getFactories(signer);
    const cloneFactory = factories.ERC1167Factory.attach(ERC1167FactoryAddress)
    const deterministicFactories = getDeterministicFactories(factories);
    const deterministicInitializeFactories = getDeterministicInitializeFactories(factories, cloneFactory, signerAddress);
    const beaconFactory = deterministicInitializeFactories.UpgradeableBeacon;
    const beconProxyFactories = getBeaconProxyFactories(deterministicFactories, cloneFactory, beaconFactory, signerAddress);
    const ERC721DnaFactory = beconProxyFactories.ERC721Dna;

    //Contracts
    const deployments: { [key: string]: ERC721DnaInitializeArgs } = {}
    for (let i = 0; i < tokens; i++) {
        deployments[`ERC721Dna-${i}`] = {
            admin: signerAddress,

            name: `ERC721Dna-${i}`,
            symbol: `NFT${i}`,
            initBaseURI: `http://localhost:8080/erc721/${i}/`,


        }
    };

    const promises = mapValues(deployments, async (initArgs) => {
        const args = flattenInitArgsERC721Dna(initArgs);
        const address = ERC721DnaFactory.getAddress(...args);

        try {
            //Compute Deployment Address
            if (await ERC721DnaFactory.exists(...args)) {
                return {
                    address,
                    contract: ERC721DnaFactory.attach(address),
                    deployed: false,
                };
            } else {
                return {
                    address,
                    contract: await ERC721DnaFactory.deploy(...args, { nonce: nonce++, gasLimit: 10e6 }),
                    deployed: true,
                };
            }
        } catch (error) {
            return { address, error };
        }
    });

    const results = await awaitAllObj(promises)

    //TODO: Encode proper data into dna
    //Mint to balanceTarget
    const promisesMint = mapValues(results, async (r) => {
        if (!r.error) {
            const contract = r.contract!
            const balance = await contract.balanceOf(signerAddress)
            let deficit = balanceTarget - balance.toNumber()
            const txList: Promise<TransactionReceipt>[] = []
            let tokenId = 0;
            while (deficit > 0) {
                try {
                    //Brute-force mints
                    tokenId++
                    const tx = await contract.mintWithDna(signerAddress, '0x', { nonce: nonce })
                    txList.push(tx.wait())
                    //No fail, decrement deficit, increment nonce
                    deficit--
                    nonce++
                } catch (error) {
                    //ignore
                }
            }
            return Promise.all(txList)
        }
    });
    await awaitAllObj(promisesMint)

    return mapValues(results, (r, k) => {
        if (r.error) {
            logDeployment(network.name, k, r.address, 'beacon-proxy', 'failed');
            console.error(r.error);
        } else {
            logDeployment(network.name, k, r.address, 'beacon-proxy', r.deployed ? 'deployed' : 'exists');
        }
        return r;
    });
};

ERC721DnaDeploy.tags = ['ERC721Dna'];
ERC721DnaDeploy.dependencies = ['Implementations', 'ERC1820', 'UpgradeableBeacon'];
