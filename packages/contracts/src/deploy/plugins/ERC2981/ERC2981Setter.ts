import log from "loglevel";
import { getFactoriesWithSigner } from "@owlprotocol/contracts-proxy";
import { factories } from "../../../ethers/factories.js";
import { getContractURIs, logDeployment, RunTimeEnvironment } from "../../utils.js";
import { mapValues } from "../../../lodash.js";
import { ERC2981SetterInitializeArgs, initializeUtil } from "../../../utils/initializeUtils/ERC2981Setter.js";

interface Params extends RunTimeEnvironment {
    instances: number;
}
export const ERC2981SetterDeploy = async ({ provider, signers, network, instances }: Params) => {
    const { awaitAllObj } = await import("@owlprotocol/utils");

    const signer = signers[0];
    const signerAddress = await signer.getAddress();
    let nonce = await provider.getTransactionCount(signerAddress);

    const ERC2981SetterFactory = getFactoriesWithSigner(factories, signer).factoriesBeaconProxies.ERC2981Setter;

    const { chainId } = network.config;

    //Contracts
    const deployments: { [key: string]: ERC2981SetterInitializeArgs } = {};
    for (let i = 0; i < instances; i++) {
        const name = `ERC2981Setter-${i}`;

        deployments[name] = {
            admin: signerAddress,
            contractUri: getContractURIs({ chainId, name }).contractUri,
        };
    }

    const promises = mapValues(deployments, async (initArgs) => {
        const args = initializeUtil(initArgs);
        const address = ERC2981SetterFactory.getAddress(...args);

        try {
            //Compute Deployment Address
            if (await ERC2981SetterFactory.exists(...args)) {
                return {
                    address,
                    contract: ERC2981SetterFactory.attach(address),
                    deployed: false,
                };
            } else {
                return {
                    address,
                    contract: await ERC2981SetterFactory.deploy(...args, { nonce: nonce++, gasLimit: 10e6 }),
                    deployed: true,
                };
            }
        } catch (error) {
            return { address, error };
        }
    });

    const results = await awaitAllObj(promises);
    return mapValues(results, (r, k) => {
        if (r.error) {
            logDeployment(network.name, k, r.address, "beacon-proxy", "failed");
            log.error(r.error);
        } else {
            logDeployment(network.name, k, r.address, "beacon-proxy", r.deployed ? "deployed" : "exists");
        }
        return r;
    });
};

ERC2981SetterDeploy.tags = ["ERC2981Setter"];
ERC2981SetterDeploy.dependencies = ["Implementations", "UpgradeableBeacon"];
