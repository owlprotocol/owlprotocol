import { logDeployment, RunTimeEnvironment } from '../../utils.js';
import { mapValues } from '../../../lodash.js';
import { getFactories } from '../../../ethers/factories.js';
import { getDeterministicFactories, getDeterministicInitializeFactories } from '../../../ethers/deterministicFactories.js';
import { AssetRouterCraftInitializeArgs, flattenInitArgsAssetRouterCraft } from '../../../utils/AssetRouterCraft.js';
import { constants } from 'ethers';
import { getBeaconProxyFactories } from '../../../ethers/beaconProxyFactories.js';
import { ERC1167FactoryAddress } from '../../../utils/ERC1167Factory/index.js';
import { validateAssetBasketInput, validateAssetBasketOutput } from '../../../utils/AssetLib.js';
import { MINTER_ROLE } from '../../../utils/IAccessControl.js';

export interface AssetRouterCraftDeployParams extends RunTimeEnvironment {
    routers: Pick<AssetRouterCraftInitializeArgs, 'inputBaskets' | 'outputBaskets'>[],
}
export const AssetRouterCraftDeploy = async ({ provider, signers, network, routers }: AssetRouterCraftDeployParams) => {
    const { awaitAllObj } = await import('@owlprotocol/utils')

    const signer = signers[0];
    const signerAddress = await signer.getAddress();
    let nonce = await provider.getTransactionCount(signerAddress);

    const factories = getFactories(signer);
    const cloneFactory = factories.ERC1167Factory.attach(ERC1167FactoryAddress)
    const deterministicFactories = getDeterministicFactories(factories);
    const deterministicInitializeFactories = getDeterministicInitializeFactories(factories, cloneFactory, signerAddress);
    const beaconFactory = deterministicInitializeFactories.UpgradeableBeacon;
    const beconProxyFactories = getBeaconProxyFactories(deterministicFactories, cloneFactory, beaconFactory, signerAddress);
    const AssetRouterCraftFactory = beconProxyFactories.AssetRouterCraft;

    //Contracts
    const deployments: { [key: string]: AssetRouterCraftInitializeArgs } = {}
    routers.forEach((r, i) => {
        deployments[`AssetRouterCraft-${i}`] = {
            admin: signerAddress,
            inputBaskets: r.inputBaskets.map(validateAssetBasketInput),
            outputBaskets: r.outputBaskets.map(validateAssetBasketOutput)
        }
    })

    const promises = mapValues(deployments, async (initArgs) => {
        const args = flattenInitArgsAssetRouterCraft(initArgs);
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

    const results = await awaitAllObj(promises)

    //Mint Permissions
    const outputPermissionsAndTransfers = mapValues(deployments, async (d) => {
        const args = flattenInitArgsAssetRouterCraft(d);
        const address = AssetRouterCraftFactory.getAddress(...args);
        return Promise.all(d.outputBaskets.map((b) => {
            //TODO: Non-mintable outputs
            const erc20MintPromises = b.erc20Mint!.map(async (c) => {
                const contract = factories.ERC20Mintable.attach(c.contractAddr);
                const allowed = await contract.hasRole(MINTER_ROLE, address);
                if (!allowed) {
                    return contract.grantRole(MINTER_ROLE, address, { nonce: nonce++, gasLimit: 10e6 });
                }
            })
            const erc721MintPromises = b.erc721MintAutoId!.map(async (c) => {
                const contract = factories.ERC721Mintable.attach(c.contractAddr);
                const allowed = await contract.hasRole(MINTER_ROLE, address);
                if (!allowed) {
                    return contract.grantRole(MINTER_ROLE, address, { nonce: nonce++, gasLimit: 10e6 });
                }
            })
            const erc1155MintPromises = b.erc1155Mint!.map(async (c) => {
                const contract = factories.ERC1155Mintable.attach(c.contractAddr);
                const allowed = await contract.hasRole(MINTER_ROLE, address);
                if (!allowed) {
                    return contract.grantRole(MINTER_ROLE, address, { nonce: nonce++, gasLimit: 10e6 });
                }
            })

            return Promise.all([...erc20MintPromises, ...erc721MintPromises, ...erc1155MintPromises])
        }))
    })

    return mapValues(results, (r, k) => {
        if (r.error) {
            logDeployment(network.name, k, r.address, 'beacon-proxy', 'failed');
            console.error(r.error);
        } else {
            logDeployment(network.name, k, r.address, 'beacon-proxy', r.deployed ? 'deployed' : 'exists');
        }
        return r;
    });
};

AssetRouterCraftDeploy.tags = ['AssetRouterCraft'];
AssetRouterCraftDeploy.dependencies = [
    'ERC20Mintable',
    'ERC721Mintable',
    'ERC1155Mintable'
];
