import { mapValues, zipObject } from "../../lodash.js";
import { logDeployment, RunTimeEnvironment } from "../utils.js";
import { getDeterministicFactories, getExamples } from '../../ethers';

export const ExamplesDeploy = async ({ provider, signers, network }: RunTimeEnvironment) => {
    const signer = signers[0];
    let nonce = await provider.getTransactionCount(await signer.getAddress());

    const examples = getExamples(signer);
    const deterministicExamples = getDeterministicFactories(examples);

    const promises = mapValues(deterministicExamples, async (factory) => {
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
            logDeployment(network.name, name, address, "example", "failed");
            console.error(error);
        } else {
            logDeployment(network.name, name, address, "example", deployed ? "deployed" : "exists");
        }
    });

    return results;
};

ExamplesDeploy.tags = ["Examples"];
ExamplesDeploy.dependencies = ["ProxyFactory", "Implementations"];
