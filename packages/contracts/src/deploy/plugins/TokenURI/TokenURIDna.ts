import log from "loglevel";
import { getFactoriesWithSigner } from "@owlprotocol/contracts-proxy";
import { factories } from "../../../ethers/factories.js";

import { getContractURIs, logDeployment, RunTimeEnvironment } from "../../utils.js";
import { mapValues } from "../../../lodash.js";
import { TokenURIDnaInitializeArgs, initializeUtil } from "../../../utils/initializeUtils/TokenURIDna.js";

interface Params extends RunTimeEnvironment {
    instances: Omit<TokenURIDnaInitializeArgs, "admin">[];
}
export const TokenURIDnaDeploy = async ({ provider, signers, network, instances }: Params) => {
    const { awaitAllObj } = await import("@owlprotocol/utils");

    const signer = signers[0];
    const signerAddress = await signer.getAddress();
    let nonce = await provider.getTransactionCount(signerAddress);

    const TokenURIDnaFactory = getFactoriesWithSigner(factories, signer).factoriesBeaconProxies.TokenURIDna;

    const { chainId } = network.config;

    //Contracts
    const deployments: { [key: string]: TokenURIDnaInitializeArgs } = {};
    for (let i = 0; i < instances.length; i++) {
        const name = `TokenURIDna-${i}`;

        deployments[name] = {
            admin: signerAddress,
            contractUri: getContractURIs({ chainId, name }).contractUri,
            ...instances[i],
        };
    }

    const promises = mapValues(deployments, async (initArgs) => {
        const args = initializeUtil(initArgs);
        const address = TokenURIDnaFactory.getAddress(...args);

        try {
            //Compute Deployment Address
            if (await TokenURIDnaFactory.exists(...args)) {
                return {
                    address,
                    contract: TokenURIDnaFactory.attach(address),
                    deployed: false,
                };
            } else {
                return {
                    address,
                    contract: await TokenURIDnaFactory.deploy(...args, { nonce: nonce++, gasLimit: 10e6 }),
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

TokenURIDnaDeploy.tags = ["TokenURIDna"];
TokenURIDnaDeploy.dependencies = ["Implementations", "UpgradeableBeacon", "TokenDna"];
