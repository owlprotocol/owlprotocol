import log from "loglevel";
import { getFactoriesWithSigner } from "@owlprotocol/contracts-proxy";
import { factories } from "../../../ethers/factories.js";
import { getContractURIs, logDeployment, RunTimeEnvironment } from "../../utils.js";
import { mapValues } from "../../../lodash.js";
import { AssetRouterCraftInitializeArgs, initializeUtil } from "../../../utils/initializeUtils/AssetRouterCraft.js";
import { validateAssetBasketInput, validateAssetBasketOutput } from "../../../utils/AssetLib.js";
import { MINTER_ROLE } from "../../../utils/IAccessControl.js";

export interface AssetRouterCraftDeployParams extends RunTimeEnvironment {
    routers: Pick<AssetRouterCraftInitializeArgs, "inputBaskets" | "outputBaskets">[];
}
export const AssetRouterCraftDeploy = async ({ provider, signers, network, routers }: AssetRouterCraftDeployParams) => {
    const { awaitAllObj } = await import("@owlprotocol/utils");

    const signer = signers[0];
    const signerAddress = await signer.getAddress();
    let nonce = await provider.getTransactionCount(signerAddress);

    const AssetRouterCraftFactory = getFactoriesWithSigner(factories, signer).factoriesBeaconProxies.AssetRouterCraft;

    const { chainId } = network.config;

    //Contracts
    const deployments: { [key: string]: AssetRouterCraftInitializeArgs } = {};
    routers.forEach((r, i) => {
        const name = `AssetRouterCraft-${i}`;

        deployments[name] = {
            admin: signerAddress,
            inputBaskets: r.inputBaskets.map(validateAssetBasketInput),
            outputBaskets: r.outputBaskets.map(validateAssetBasketOutput),
            contractUri: getContractURIs({ chainId, name }).contractUri,
        };
    });

    const promises = mapValues(deployments, async (initArgs) => {
        const args = initializeUtil(initArgs);
        const address = AssetRouterCraftFactory.getAddress(...args);

        try {
            //Compute Deployment Address
            if (await AssetRouterCraftFactory.exists(...args)) {
                return {
                    address,
                    contract: AssetRouterCraftFactory.attach(address),
                    deployed: false,
                };
            } else {
                return {
                    address,
                    contract: await AssetRouterCraftFactory.deploy(...args, { nonce: nonce++, gasLimit: 10e6 }),
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
        const args = initializeUtil(d);
        const address = AssetRouterCraftFactory.getAddress(...args);
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
    await awaitAllObj(outputPermissionsAndTransfers);

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

AssetRouterCraftDeploy.tags = ["AssetRouterCraft"];
AssetRouterCraftDeploy.dependencies = ["ERC20Mintable", "ERC721Mintable", "ERC1155Mintable"];
