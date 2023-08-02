import log from "loglevel";
import { getFactoriesWithSigner } from "@owlprotocol/contracts-proxy";
import { factories } from "../../../ethers/factories.js";
import { getContractURIs, logDeployment, RunTimeEnvironment } from "../../utils.js";
import { mapValues } from "../../../lodash.js";

import { TokenURIInitializeArgs, initializeUtil } from "../../../utils/initializeUtils/TokenURI.js";


interface Params extends RunTimeEnvironment {
    instances: number;
}
export const TokenURIDeploy = async ({ provider, signers, network, instances }: Params) => {
    const { awaitAllObj } = await import("@owlprotocol/utils");

    const signer = signers[0];
    const signerAddress = await signer.getAddress();
    let nonce = await provider.getTransactionCount(signerAddress);

    const TokenURIFactory = getFactoriesWithSigner(factories, signer).factoriesBeaconProxies.TokenURI;

    const { chainId } = network.config;

    //Contracts
    const deployments: { [key: string]: TokenURIInitializeArgs } = {};
    for (let i = 0; i < instances; i++) {
        const name = `TokenURI-${i}`;

        deployments[name] = {
            admin: signerAddress,
            contractUri: getContractURIs({ chainId, name }).contractUri,
        };
    }

    const promises = mapValues(deployments, async (initArgs) => {
        const args = initializeUtil(initArgs);
        const address = TokenURIFactory.getAddress(...args);

        try {
            //Compute Deployment Address
            if (await TokenURIFactory.exists(...args)) {
                return {
                    address,
                    contract: TokenURIFactory.attach(address),
                    deployed: false,
                };
            } else {
                return {
                    address,
                    contract: await TokenURIFactory.deploy(...args, { nonce: nonce++, gasLimit: 10e6 }),
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

TokenURIDeploy.tags = ["TokenURI"];
TokenURIDeploy.dependencies = ["Implementations", "UpgradeableBeacon"];
