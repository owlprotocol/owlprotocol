import { TransactionReceipt } from "@ethersproject/providers";
import log from "loglevel";
import { getFactoriesWithSigner } from "@owlprotocol/contracts-proxy";
import { factories } from "../../../ethers/factories.js";
import { getContractURIs, logDeployment, RunTimeEnvironment } from "../../utils.js";
import { mapValues } from "../../../lodash.js";
import { ERC721MintableInitializeArgs, initializeUtil } from "../../../utils/initializeUtils/ERC721Mintable.js";


interface Params extends RunTimeEnvironment {
    instances: Omit<ERC721MintableInitializeArgs, "admin" | "name" | "symbol">[];
    balanceTarget: number;
}
export const ERC721MintableDeploy = async ({ provider, signers, network, instances, balanceTarget }: Params) => {
    const { awaitAllObj } = await import("@owlprotocol/utils");

    const signer = signers[0];
    const signerAddress = await signer.getAddress();
    let nonce = await provider.getTransactionCount(signerAddress);

    const ERC721MintableFactory = getFactoriesWithSigner(factories, signer).factoriesBeaconProxies.ERC721Mintable;

    const { chainId } = network.config;

    //Contracts
    const deployments: { [key: string]: ERC721MintableInitializeArgs } = {};
    for (let i = 0; i < instances.length; i++) {
        const name = `ERC721Mintable-${i}`;

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
        const address = ERC721MintableFactory.getAddress(...args);

        try {
            //Compute Deployment Address
            if (await ERC721MintableFactory.exists(...args)) {
                return {
                    address,
                    contract: ERC721MintableFactory.attach(address),
                    deployed: false,
                };
            } else {
                return {
                    address,
                    contract: await ERC721MintableFactory.deploy(...args, { nonce: nonce++, gasLimit: 10e6 }),
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
            let tokenId = 0;
            while (deficit > 0) {
                try {
                    //Brute-force mints
                    tokenId++;
                    const tx = await contract.mint(signerAddress, tokenId, { nonce: nonce });
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

ERC721MintableDeploy.tags = ["ERC721Mintable"];
ERC721MintableDeploy.dependencies = [
    "Implementations",
    "UpgradeableBeacon",
    "ERC2981Setter",
    "ERC721Mintable",
    "ERC721MintableBaseURI",
    "ERC721MintableDna",
];
