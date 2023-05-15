import { getContractURIs, logDeployment, RunTimeEnvironment } from "../../utils.js";
import { mapValues } from "../../../lodash.js";
import { getFactories } from "../../../ethers/factories.js";
import {
    getDeterministicFactories,
    getDeterministicInitializeFactories,
} from "../../../ethers/deterministicFactories.js";
import { ERC1155MintableInitializeArgs, flattenInitArgsERC1155Mintable } from "../../../utils/ERC1155Mintable.js";
import { getBeaconProxyFactories } from "../../../ethers/beaconProxyFactories.js";
import { ERC1167FactoryAddress } from "../../../utils/ERC1167Factory/index.js";
import log from "loglevel";

interface Params extends RunTimeEnvironment {
    tokens: number;
    balanceTarget: number;
}
export const ERC1155MintableDeploy = async ({ provider, signers, network, tokens, balanceTarget }: Params) => {
    const { awaitAllObj } = await import("@owlprotocol/utils");
    const signer = signers[0];
    const signerAddress = await signer.getAddress();
    let nonce = await provider.getTransactionCount(signerAddress);

    const factories = getFactories(signer);
    const cloneFactory = factories.ERC1167Factory.attach(ERC1167FactoryAddress);
    const deterministicFactories = getDeterministicFactories(factories);
    const deterministicInitializeFactories = getDeterministicInitializeFactories(
        factories,
        cloneFactory,
        signerAddress,
    );
    const beaconFactory = deterministicInitializeFactories.UpgradeableBeacon;
    const beconProxyFactories = getBeaconProxyFactories(
        deterministicFactories,
        cloneFactory,
        beaconFactory,
        signerAddress,
    );
    const ERC1155MintableFactory = beconProxyFactories.ERC1155Mintable;

    const { chainId } = network.config;

    //Contracts
    const deployments: { [key: string]: ERC1155MintableInitializeArgs } = {};
    for (let i = 0; i < tokens; i++) {
        const name = `ERC1155Mintable-${i}`;

        deployments[name] = {
            admin: signerAddress,
            uri: `${getContractURIs({ chainId, name, tokenId: i }).tokenUri}/{id}`,
            contractUri: getContractURIs({ chainId, name }).contractUri,
        };
    }

    const promises = mapValues(deployments, async (initArgs) => {
        const args = flattenInitArgsERC1155Mintable(initArgs);
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
ERC1155MintableDeploy.dependencies = ["Implementations", "ERC1820", "UpgradeableBeacon"];
