import { TransactionReceipt } from "@ethersproject/providers";
import log from "loglevel";
import { getFactoriesWithSigner } from "@owlprotocol/contracts-proxy";
import { factories } from "../../../ethers/factories.js";
import { getContractURIs, logDeployment, RunTimeEnvironment } from "../../utils.js";
import { mapValues } from "../../../lodash.js";
import {
    ERC721MintableAutoIdInitializeArgs,
    initializeUtil,
} from "../../../utils/initializeUtils/ERC721MintableAutoId.js";

interface Params extends RunTimeEnvironment {
    instances: Omit<ERC721MintableAutoIdInitializeArgs, "admin" | "name" | "symbol">[];
    balanceTarget: number;
}
export const ERC721MintableAutoIdDeploy = async ({ provider, signers, network, instances, balanceTarget }: Params) => {
    const { awaitAllObj } = await import("@owlprotocol/utils");

    const signer = signers[0];
    const signerAddress = await signer.getAddress();
    let nonce = await provider.getTransactionCount(signerAddress);

    const ERC721MintableAutoIdFactory = getFactoriesWithSigner(factories, signer).factoriesBeaconProxies
        .ERC721MintableAutoId;

    const { chainId } = network.config;

    //Contracts
    const deployments: { [key: string]: ERC721MintableAutoIdInitializeArgs } = {};
    for (let i = 0; i < instances.length; i++) {
        const name = `ERC721MintableAutoId-${i}`;

        deployments[name] = {
            admin: signerAddress,
            name,
            symbol: `NFT${i}`,
            contractUri: getContractURIs({ chainId, name }).contractUri,
            ...instances[i],
        };
    }

    const promises = mapValues(deployments, async (initArgs) => {
        const args = initializeUtil(initArgs);
        const address = ERC721MintableAutoIdFactory.getAddress(...args);

        try {
            //Compute Deployment Address
            if (await ERC721MintableAutoIdFactory.exists(...args)) {
                return {
                    address,
                    contract: ERC721MintableAutoIdFactory.attach(address),
                    deployed: false,
                };
            } else {
                return {
                    address,
                    contract: await ERC721MintableAutoIdFactory.deploy(...args, { nonce: nonce++, gasLimit: 10e6 }),
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
            const balance = await contract.balanceOf(signerAddress);
            let deficit = balanceTarget - balance.toNumber();
            const txList: Promise<TransactionReceipt>[] = [];
            while (deficit > 0) {
                try {
                    //Brute-force mints
                    const tx = await contract.mint(signerAddress, { nonce: nonce });
                    txList.push(tx.wait());
                    //No fail, decrement deficit, increment nonce
                    deficit--;
                    nonce++;
                } catch (error) {
                    //ignore
                }
            }
            return Promise.all(txList);
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

ERC721MintableAutoIdDeploy.tags = ["ERC721MintableAutoId"];
ERC721MintableAutoIdDeploy.dependencies = [
    "Implementations",
    "UpgradeableBeacon",
    "ERC2981Setter",
    "ERC721MintableAutoId",
    "ERC721MintableAutoIdBaseURI",
    "ERC721MintableAutoIdDna",
];
