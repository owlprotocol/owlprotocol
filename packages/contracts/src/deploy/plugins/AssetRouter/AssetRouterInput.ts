import { getContractURIs, logDeployment, RunTimeEnvironment } from '../../utils.js';
import { mapValues } from '../../../lodash.js';
import { getFactories } from '../../../ethers/factories.js';
import { getDeterministicFactories, getDeterministicInitializeFactories } from '../../../ethers/deterministicFactories.js';
import { AssetRouterInputInitializeArgs, flattenInitArgsAssetRouterInput } from '../../../utils/AssetRouterInput.js';
import { constants } from 'ethers';
import { getBeaconProxyFactories } from '../../../ethers/beaconProxyFactories.js';
import { ERC1167FactoryAddress } from '../../../utils/ERC1167Factory/index.js';
import { validateAssetBasketInput } from '../../../utils/AssetLib.js';

export interface AssetRouterInputDeployParams extends RunTimeEnvironment {
    routers: Pick<AssetRouterInputInitializeArgs, 'inputBaskets'>[]
}
export const AssetRouterInputDeploy = async ({ provider, signers, network, routers }: AssetRouterInputDeployParams) => {
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
    const AssetRouterInputFactory = beconProxyFactories.AssetRouterInput;

    const { chainId } = network.config;

    //Contracts
    const deployments: { [key: string]: AssetRouterInputInitializeArgs } = {}
    routers.forEach((r, i) => {
        const name = `AssetRouterInput-${i}`;

        deployments[name] = {
            admin: signerAddress,
            inputBaskets: r.inputBaskets.map(validateAssetBasketInput),
            contractUri: getContractURIs({ chainId, name }).contractUri,
        }
    })

    const promises = mapValues(deployments, async (initArgs) => {
        const args = flattenInitArgsAssetRouterInput(initArgs);
        const address = AssetRouterInputFactory.getAddress(...args);

        try {
            //Compute Deployment Address
            if (await AssetRouterInputFactory.exists(...args)) {
                return {
                    address,
                    contract: AssetRouterInputFactory.attach(address),
                    deployed: false,
                };
            } else {
                return {
                    address,
                    contract: await AssetRouterInputFactory.deploy(...args, { nonce: nonce++, gasLimit: 10e6 }),
                    deployed: true,
                };
            }
        } catch (error) {
            return { address, error, deployed: false };
        }
    });

    const results = await awaitAllObj(promises)

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

AssetRouterInputDeploy.tags = ['AssetRouterInput'];
AssetRouterInputDeploy.dependencies = [
    'ERC20Mintable',
    'ERC721Mintable',
    'ERC1155Mintable'
];
