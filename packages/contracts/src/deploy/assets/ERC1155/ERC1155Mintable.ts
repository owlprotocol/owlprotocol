import log from "loglevel";
import { getFactoriesWithSigner } from "@owlprotocol/contracts-proxy";
import { factories } from "../../../ethers/factories.js";
import { getContractURIs, logDeployment, RunTimeEnvironment } from "../../utils.js";
import { mapValues } from "../../../lodash.js";
import { ERC1155MintableInitializeArgs, initializeUtil } from "../../../utils/initializeUtils/ERC1155Mintable.js";

interface Params extends RunTimeEnvironment {
    instances: Omit<ERC1155MintableInitializeArgs, "admin">[],
    balanceTarget: number;
}
export const ERC1155MintableDeploy = async ({ provider, signers, network, instances, balanceTarget }: Params) => {
    const { awaitAllObj } = await import("@owlprotocol/utils");

    const signer = signers[0];
    const signerAddress = await signer.getAddress();
    let nonce = await provider.getTransactionCount(signerAddress);

    const ERC1155MintableFactory = getFactoriesWithSigner(factories, signer).factoriesBeaconProxies.ERC1155Mintable;


    const { chainId } = network.config;

    //Contracts
    const deployments: { [key: string]: ERC1155MintableInitializeArgs } = {};
    for (let i = 0; i < instances.length; i++) {
        const name = `ERC1155Mintable-${i}`;

        deployments[name] = {
            admin: signerAddress,
            contractUri: getContractURIs({ chainId, name }).contractUri,
            ...instances[i],
        };
    }

    const promises = mapValues(deployments, async (initArgs) => {
        const args = initializeUtil(initArgs);
        const address = ERC1155MintableFactory.getAddress(...args);

        try {
            //Compute Deployment Address
            if (await ERC1155MintableFactory.exists(...args)) {
                return {
                    address,
                    contract: ERC1155MintableFactory.attach(address),
                    deployed: false,
                };
            } else {
                return {
                    address,
                    contract: await ERC1155MintableFactory.deploy(...args, { nonce: nonce++, gasLimit: 10e6 }),
                    deployed: true,
                };
            }
        } catch (error) {
            return { address, error };
        }
    });

    const results = await awaitAllObj(promises);

    //Mint to balanceTarget
    const promisesMint = mapValues(results, async (r) => {
        if (!r.error) {
            const contract = r.contract!;
            const balance = await contract.balanceOf(signerAddress, 1);
            const deficit = balanceTarget - balance.toNumber();
            if (deficit > 0) {
                const tx = await contract.mint(signerAddress, 1, deficit, "0x", { nonce: nonce++ });
                return tx.wait();
            }
        }
    });
    await awaitAllObj(promisesMint);

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

ERC1155MintableDeploy.tags = ["ERC1155Mintable"];
ERC1155MintableDeploy.dependencies = [
    "Implementations",
    "UpgradeableBeacon",
    "ERC2981Setter",
    "ERC1155Mintable",
    "ERC1155MintableBaseURI",
    "ERC1155MintableDna",
];
