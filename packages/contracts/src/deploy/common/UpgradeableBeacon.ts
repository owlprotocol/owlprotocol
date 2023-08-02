import log from "loglevel";
import { connectFactories } from "@owlprotocol/contracts-proxy";
import { mapValues, zipObject } from "../../lodash.js";

import { logDeployment, RunTimeEnvironment } from "../utils.js";
import { factoriesBeacons } from "../../ethers/factories.js";

/**
 * Deployment is always the same regardless of contract.
 * We get the bytecode & name for a deterministic deployment from the Proxy Factory.
 */
export const UpgradeableBeaconDeploy = async ({ provider, signers, network }: RunTimeEnvironment) => {
    const signer = signers[0];
    const signerAddress = await signer.getAddress();
    let nonce = await provider.getTransactionCount(signerAddress);

    const promises = mapValues(connectFactories(factoriesBeacons, signer), async (factory) => {
        const address = factory.getAddress();

        try {
            //Compute Deployment Address
            if (await factory.exists()) {
                return {
                    address,
                    contract: factory.attach(address),
                    deployed: false,
                };
            } else {
                return {
                    address,
                    contract: await factory.deploy({
                        nonce: nonce++,
                        type: (network.config.eip1559 as boolean) ? 2 : 0,
                        gasLimit: 10e6,
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
            logDeployment(network.name, name, address, "beacon", "failed");
            log.error(error);
        } else {
            logDeployment(network.name, name, address, "beacon", deployed ? "deployed" : "exists");
        }
    });

    return results;
};

UpgradeableBeaconDeploy.tags = ["UpgradeableBeacon"];
UpgradeableBeaconDeploy.dependencies = ["Implementations"];
