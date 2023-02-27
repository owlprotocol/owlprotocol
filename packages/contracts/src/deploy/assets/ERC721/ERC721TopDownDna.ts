import { logDeployment, RunTimeEnvironment } from '../../utils.js';
import { mapValues } from '../../../lodash.js';
import { getFactories } from '../../../ethers/factories.js';
import { getDeterministicFactories, getDeterministicInitializeFactories } from '../../../ethers/deterministicFactories.js';
import { ERC721TopDownDnaInitializeArgs, flattenInitArgsERC721TopDownDna } from '../../../utils/ERC721TopDownDna.js';
import { constants } from 'ethers';
import { getBeaconProxyFactories } from '../../../ethers/beaconProxyFactories.js';
import { ERC1167FactoryAddress } from '../../../utils/ERC1167Factory/index.js';
import { TransactionReceipt } from '@ethersproject/providers';

export interface ERC721TopDownDnaDeployParams extends RunTimeEnvironment {
    tokens: {
        childContracts721: string[],
        childContracts1155: string[]
    }[],
    balanceTarget: number
}
export const ERC721TopDownDnaDeploy = async ({ provider, signers, network, tokens, balanceTarget }: ERC721TopDownDnaDeployParams) => {
    const { awaitAllObj } = await import('@owlprotocol/utils');
    const signer = signers[0];
    const signerAddress = await signer.getAddress();
    let nonce = await provider.getTransactionCount(signerAddress);

    const factories = getFactories(signer);
    const cloneFactory = factories.ERC1167Factory.attach(ERC1167FactoryAddress)
    const deterministicFactories = getDeterministicFactories(factories);
    const deterministicInitializeFactories = getDeterministicInitializeFactories(factories, cloneFactory, signerAddress);
    const beaconFactory = deterministicInitializeFactories.UpgradeableBeacon;
    const beaconProxyFactories = getBeaconProxyFactories(deterministicFactories, cloneFactory, beaconFactory, signerAddress);
    const ERC721TopDownDnaFactory = beaconProxyFactories.ERC721TopDownDna;

    //Contracts
    const deployments: { [key: string]: ERC721TopDownDnaInitializeArgs } = {}
    tokens.forEach((t, i) => {
        deployments[`ERC721TopDownDna-${i}`] = {
            admin: signerAddress,

            name: `ERC721TopDownDna-${i}`,
            symbol: `NFT${i}`,
            initBaseURI: `http://localhost:8080/erc721/${i}/`,


            childContracts721: t.childContracts721,
            childContracts1155: t.childContracts1155
        }
    })

    const promises = mapValues(deployments, async (initArgs) => {
        const args = flattenInitArgsERC721TopDownDna(initArgs);
        const address = ERC721TopDownDnaFactory.getAddress(...args);

        try {
            //Compute Deployment Address
            if (await ERC721TopDownDnaFactory.exists(...args)) {
                return {
                    address,
                    contract: ERC721TopDownDnaFactory.attach(address),
                    deployed: false,
                };
            } else {
                return {
                    address,
                    contract: await ERC721TopDownDnaFactory.deploy(...args, { nonce: nonce++, gasLimit: 10e6 }),
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

ERC721TopDownDnaDeploy.tags = ['ERC721TopDownDna'];
ERC721TopDownDnaDeploy.dependencies = ['Implementations', 'ERC1820', 'UpgradeableBeacon', 'ERC721Dna', 'ERC1155Dna'];
