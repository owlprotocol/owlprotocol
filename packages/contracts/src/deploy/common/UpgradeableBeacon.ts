import { mapValues, omit, zipObject } from '../../lodash.js';

import { logDeployment, RunTimeEnvironment } from '../utils.js';
import { getFactories } from '../../ethers/factories.js';
import {
    getDeterministicFactories,
    getDeterministicInitializeFactories,
    NoInitFactories,
} from '../../ethers/deterministicFactories.js';

/**
 * Deployment is always the same regardless of contract.
 * We get the bytecode & name for a deterministic deployment from the Proxy Factory.
 */
const deployUpgradeableBeacon = async ({ provider, signers, network }: RunTimeEnvironment) => {
    const signer = signers[0];
    const signerAddress = await signer.getAddress();
    let nonce = await provider.getTransactionCount(signerAddress);

    const factories = getFactories(signer);
    const deterministicFactories = getDeterministicFactories(factories);
    const deterministicInitializeFactories = getDeterministicInitializeFactories(factories, signerAddress);
    const UpgradeableBeaconFactory = deterministicInitializeFactories.UpgradeableBeacon;
    const implementationFactories = omit(deterministicFactories, 'UpgradeableBeacon', 'BeaconProxy') as NoInitFactories;

    const promises = mapValues(implementationFactories, async (factory) => {
        const implementationAddress = factory.getAddress();
        const address = UpgradeableBeaconFactory.getAddress(signerAddress, implementationAddress);

        try {
            if (await UpgradeableBeaconFactory.exists(signerAddress, implementationAddress)) {
                return {
                    address,
                    contract: UpgradeableBeaconFactory.attach(address),
                    deployed: false,
                };
            } else {
                return {
                    address,
                    contract: await UpgradeableBeaconFactory.deploy(signerAddress, implementationAddress, {
                        nonce: nonce++,
                        gasLimit: 10e6,
                        type: 2,
                    }),
                    deployed: true,
                };
            }
        } catch (error) {
            return { address, error };
        }
    });

    const results = zipObject(Object.keys(promises), await Promise.all(Object.values(promises)));

    mapValues(results, ({ address, error, deployed }, name: string) => {
        if (error) {
            logDeployment(network.name, name, address, 'beacon', 'failed');
            console.error(error);
        } else {
            logDeployment(network.name, name, address, 'beacon', deployed ? 'deployed' : 'exists');
        }
    });

    return results;
};

deployUpgradeableBeacon.tags = ['UpgradeableBeacon'];
deployUpgradeableBeacon.dependencies = ['Implementations'];
export { deployUpgradeableBeacon };
export default deployUpgradeableBeacon;
