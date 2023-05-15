import { mapValues, zipObject } from "../../lodash.js";
import { logDeployment, RunTimeEnvironment } from "../utils.js";
import { getFactories } from "../../ethers/factories.js";
import { getDeterministicFactories } from "../../ethers/deterministicFactories.js";
import log from "loglevel";

/**
 * Deployment is always the same regardless of contract.
 * We get the bytecode & name for a deterministic deployment from the Proxy Factory.
 */
export const ImplementationsDeploy = async ({ provider, signers, network }: RunTimeEnvironment) => {
    const signer = signers[0];
    let nonce = await provider.getTransactionCount(await signer.getAddress());

    const factories = getFactories(signer);
    const deterministicFactories = getDeterministicFactories(factories);

    const promises = mapValues(deterministicFactories, async (factory) => {
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
                    contract: await factory.deploy({ nonce: nonce++, type: 2, gasLimit: 10e6 }),
                    deployed: true,
                };
            }
        } catch (error) {
            return { address, error };
        }
    });

    const results = zipObject(Object.keys(promises), await Promise.all(Object.values(promises))) as {
        [K in keyof typeof promises]: Awaited<(typeof promises)[K]>;
    };

    mapValues(results, ({ address, error, deployed }, name) => {
        if (error) {
            logDeployment(network.name, name, address, "implementation", "failed");
            log.error(error);
        } else {
            logDeployment(network.name, name, address, "implementation", deployed ? "deployed" : "exists");
        }
    });

    return results;
};

ImplementationsDeploy.tags = ["Implementations"];
ImplementationsDeploy.dependencies = ["ProxyFactory"];
