import { logDeployment, RunTimeEnvironment } from '../../utils.js';
import { mapValues } from '../../../lodash.js';
import { getFactories } from '../../../ethers/factories.js';
import { getDeterministicFactories, getDeterministicInitializeFactories } from '../../../ethers/deterministicFactories.js';
import { ERC1155DnaInitializeArgs, flattenInitArgsERC1155Dna } from '../../../utils/ERC1155Dna.js';
import { constants, utils } from 'ethers';
import { getBeaconProxyFactories } from '../../../ethers/beaconProxyFactories.js';
import { ERC1167FactoryAddress } from '../../../utils/ERC1167Factory/index.js';

interface Params extends RunTimeEnvironment {
    tokens: number,
    balanceTarget: number
}
export const ERC1155DnaDeploy = async ({ provider, signers, network, tokens, balanceTarget }: Params) => {
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
    const ERC1155DnaFactory = beconProxyFactories.ERC1155Dna;

    //Contracts
    const deployments: { [key: string]: ERC1155DnaInitializeArgs } = {}
    for (let i = 0; i < tokens; i++) {
        deployments[`ERC1155Dna-${i}`] = {
            admin: signerAddress,

            uri: `http://localhost:8080/erc1155/${i}/{id}`,


        }
    };

    const promises = mapValues(deployments, async (initArgs) => {
        const args = flattenInitArgsERC1155Dna(initArgs);
        const address = ERC1155DnaFactory.getAddress(...args);

        try {
            //Compute Deployment Address
            if (await ERC1155DnaFactory.exists(...args)) {
                return {
                    address,
                    contract: ERC1155DnaFactory.attach(address),
                    deployed: false,
                };
            } else {
                return {
                    address,
                    contract: await ERC1155DnaFactory.deploy(...args, { nonce: nonce++, gasLimit: 10e6 }),
                    deployed: true,
                };
            }
        } catch (error) {
            return { address, error };
        }
    });

    const results = await awaitAllObj(promises)

    //Mint to balanceTarget
    const promisesMint = mapValues(results, async (r) => {
        if (!r.error) {
            const contract = r.contract!
            const balance = await contract.balanceOf(signerAddress, 1)
            const deficit = balanceTarget - balance.toNumber()
            if (deficit > 0) {
                const tx = await contract.mint(signerAddress, 1, deficit, '0x', { nonce: nonce++ })
                return tx.wait();
            }
        }
    });
    await awaitAllObj(promisesMint)

    //Set DNA for tokenIds
    //TODO: Encode dna in tokenIds
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

ERC1155DnaDeploy.tags = ['ERC1155Dna'];
ERC1155DnaDeploy.dependencies = ['Implementations', 'ERC1820', 'UpgradeableBeacon'];
