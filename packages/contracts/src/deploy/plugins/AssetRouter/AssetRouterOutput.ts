import { getContractURIs, logDeployment, RunTimeEnvironment } from "../../utils.js";
import { mapValues } from "../../../lodash.js";
import { getFactories } from "../../../ethers/factories.js";
import {
    getDeterministicFactories,
    getDeterministicInitializeFactories,
} from "../../../ethers/deterministicFactories.js";
import { AssetRouterOutputInitializeArgs, flattenInitArgsAssetRouterOutput } from "../../../utils/AssetRouterOutput.js";
import { getBeaconProxyFactories } from "../../../ethers/beaconProxyFactories.js";
import { ERC1167FactoryAddress } from "../../../utils/ERC1167Factory/index.js";
import { MINTER_ROLE } from "../../../utils/IAccessControl.js";
import { validateAssetBasketOutput } from "../../../utils/AssetLib.js";

export interface AssetRouterOutputDeployParams extends RunTimeEnvironment {
    routers: Pick<AssetRouterOutputInitializeArgs, "outputBaskets" | "routers">[];
}
export const AssetRouterOutputDeploy = async ({
    provider,
    signers,
    network,
    routers,
}: AssetRouterOutputDeployParams) => {
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
    const AssetRouterOutputFactory = beconProxyFactories.AssetRouterOutput;

    const { chainId } = network.config;

    //Contracts
    const deployments: { [key: string]: AssetRouterOutputInitializeArgs } = {};
    routers.forEach((r, i) => {
        const name = `AssetRouterOutput-${i}`;

        deployments[name] = {
            admin: signerAddress,
            outputBaskets: r.outputBaskets.map(validateAssetBasketOutput),
            routers: r.routers,
            contractUri: getContractURIs({ chainId, name }).contractUri,
        };
    });

    //Deploy
    const promises = mapValues(deployments, async (initArgs) => {
        const args = flattenInitArgsAssetRouterOutput(initArgs);
        const address = AssetRouterOutputFactory.getAddress(...args);

        try {
            //Compute Deployment Address
            if (await AssetRouterOutputFactory.exists(...args)) {
                return {
                    address,
                    contract: AssetRouterOutputFactory.attach(address),
                    deployed: false,
                };
            } else {
                return {
                    address,
                    contract: await AssetRouterOutputFactory.deploy(...args, { nonce: nonce++, gasLimit: 10e6 }),
                    deployed: true,
                };
            }
        } catch (error) {
            return { address, error, deployed: false };
        }
    });

    const results = await awaitAllObj(promises);

    //Mint Permissions
    const outputPermissionsAndTransfers = mapValues(deployments, async (d) => {
        const args = flattenInitArgsAssetRouterOutput(d);
        const address = AssetRouterOutputFactory.getAddress(...args);
        return Promise.all(
            d.outputBaskets.map((b) => {
                //TODO: Non-mintable outputs
                const erc20MintPromises = b.erc20Mint!.map(async (c) => {
                    const contract = factories.ERC20Mintable.attach(c.contractAddr);
                    const allowed = await contract.hasRole(MINTER_ROLE, address);
                    if (!allowed) {
                        return contract.grantRole(MINTER_ROLE, address, { nonce: nonce++, gasLimit: 10e6 });
                    }
                });
                const erc721MintPromises = b.erc721MintAutoId!.map(async (c) => {
                    const contract = factories.ERC721Mintable.attach(c.contractAddr);
                    const allowed = await contract.hasRole(MINTER_ROLE, address);
                    if (!allowed) {
                        return contract.grantRole(MINTER_ROLE, address, { nonce: nonce++, gasLimit: 10e6 });
                    }
                });
                const erc1155MintPromises = b.erc1155Mint!.map(async (c) => {
                    const contract = factories.ERC1155Mintable.attach(c.contractAddr);
                    const allowed = await contract.hasRole(MINTER_ROLE, address);
                    if (!allowed) {
                        return contract.grantRole(MINTER_ROLE, address, { nonce: nonce++, gasLimit: 10e6 });
                    }
                });

                return Promise.all([...erc20MintPromises, ...erc721MintPromises, ...erc1155MintPromises]);
            }),
        );
    });

    awaitAllObj(outputPermissionsAndTransfers);

    /*
    initArgs.outputBaskets.map((b) => {
                return b.erc1155Mint.map(async (a) => {
                    const contract = factories.ERC1155Mintable.attach(a.contractAddr);
                    const allowed = await contract.hasRole(MINTER_ROLE, result.address);
                    console.debug(`hasRole(${MINTER_ROLE},${result.address}) = ${allowed}`);
                    if (!allowed) {
                        return contract.grantRole(MINTER_ROLE, result.address, { nonce: nonce++, gasLimit: 10e6 });
                    }
                });
            });

            const promises = flatten(mints);
            await Promise.all(promises);
            */

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

AssetRouterOutputDeploy.tags = ["AssetRouterOutput"];
AssetRouterOutputDeploy.dependencies = ["AssetRouterInput"];
