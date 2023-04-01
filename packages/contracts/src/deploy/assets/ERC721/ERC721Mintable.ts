import { TransactionReceipt } from "@ethersproject/providers";
import { getContractURIs, logDeployment, RunTimeEnvironment } from "../../utils.js";
import { mapValues } from "../../../lodash.js";
import { getFactories } from "../../../ethers/factories.js";
import {
    getDeterministicFactories,
    getDeterministicInitializeFactories,
} from "../../../ethers/deterministicFactories.js";
import { ERC721MintableInitializeArgs, flattenInitArgsERC721Mintable } from "../../../utils/ERC721Mintable.js";
import { getBeaconProxyFactories } from "../../../ethers/beaconProxyFactories.js";
import { ERC1167FactoryAddress } from "../../../utils/ERC1167Factory/index.js";

interface Params extends RunTimeEnvironment {
    tokens: number;
    balanceTarget: number;
}
export const ERC721MintableDeploy = async ({ provider, signers, network, tokens, balanceTarget }: Params) => {
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
    const ERC721MintableFactory = beconProxyFactories.ERC721Mintable;

    const { chainId } = network.config;

    //Contracts
    const deployments: { [key: string]: ERC721MintableInitializeArgs } = {};
    for (let i = 0; i < tokens; i++) {
        const name = `ERC721Mintable-${i}`;

        deployments[name] = {
            admin: signerAddress,
            name,
            symbol: `NFT${i}`,
            initBaseURI: getContractURIs({ chainId, name, tokenId: i }).tokenUri,
            contractUri: getContractURIs({ chainId, name }).contractUri,
        };
    }

    const promises = mapValues(deployments, async (initArgs) => {
        const args = flattenInitArgsERC721Mintable(initArgs);
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
            console.error(r.error);
        } else {
            logDeployment(network.name, k, r.address, "beacon-proxy", r.deployed ? "deployed" : "exists");
        }
        return r;
    });
};

ERC721MintableDeploy.tags = ["ERC721Mintable"];
ERC721MintableDeploy.dependencies = ["Implementations", "ERC1820", "UpgradeableBeacon"];
