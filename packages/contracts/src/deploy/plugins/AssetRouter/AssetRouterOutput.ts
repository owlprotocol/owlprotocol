import { logDeployment, RunTimeEnvironment } from '../../utils';
import { flatten, mapValues } from '../../../lodash.js';
import { getFactories } from '../../../ethers/factories';
import { getDeterministicFactories, getDeterministicInitializeFactories } from '../../../ethers/deterministicFactories';
import { AssetRouterOutputInitializeArgs, flattenInitArgsAssetRouterOutput } from '../../../utils/AssetRouterOutput';
import { getBeaconProxyFactories } from '../../../ethers/beaconProxyFactories';
import { AssetRouterOutput } from '../../../ethers';
import { MINTER_ROLE } from '../../../utils/IAccessControl';

const deploy = async ({ provider, signers, network }: RunTimeEnvironment) => {
    const signer = signers[0];
    const signerAddress = await signer.getAddress();
    let nonce = await provider.getTransactionCount(signerAddress);

    const factories = getFactories(signer);
    const deterministicFactories = getDeterministicFactories(signer, factories);
    const deterministicInitializeFactories = getDeterministicInitializeFactories(signer, factories, signerAddress);
    const beaconFactory = deterministicInitializeFactories.UpgradeableBeacon;
    const beconProxyFactories = getBeaconProxyFactories(signer, deterministicFactories, beaconFactory, signerAddress);
    const AssetRouterOutputFactory = beconProxyFactories.AssetRouterOutput;

    //Contracts
    const deployments: { [key: string]: AssetRouterOutputInitializeArgs } = {
        assetRouterOutput_0: {
            admin: signerAddress,
            contractUri: '',
            outputBaskets: [
                {
                    outputableAmount: 0,
                    erc20Transfer: [],
                    erc20Mint: [],
                    erc1155Transfer: [],
                    erc1155Mint: [
                        {
                            contractAddr: '0xd8B46A266347806b065211ca198939415607018D',
                            tokenIds: [2],
                            amounts: [1],
                        },
                    ],
                    erc721Transfer: [],
                    erc721Mint: [],
                    erc721MintAutoId: [],
                },
            ],
            routers: ['0x1fc49c34F4617C2D87fFc9d37B8Df0cEfAFF536D'],
        },
    };

    const promises = mapValues(deployments, async (initArgs) => {
        const args = flattenInitArgsAssetRouterOutput(initArgs);
        const address = AssetRouterOutputFactory.getAddress(...args);

        try {
            //Compute Deployment Address
            let result: { address: string; contract: AssetRouterOutput; deployed: boolean; error?: Error };
            if (await AssetRouterOutputFactory.exists(...args)) {
                result = {
                    address,
                    contract: AssetRouterOutputFactory.attach(address),
                    deployed: false,
                };
            } else {
                result = {
                    address,
                    contract: await AssetRouterOutputFactory.deploy(...args, { nonce: nonce++, gasLimit: 10e6 }),
                    deployed: true,
                };
            }

            const mints = initArgs.outputBaskets.map((b) => {
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

            return result;
        } catch (error) {
            return { address, error, deployed: false };
        }
    });

    await Promise.all(Object.values(promises));

    return mapValues(promises, async (p, k) => {
        const r = await p;
        if (r.error) {
            logDeployment(network.name, k, r.address, 'beacon-proxy', 'failed');
            console.error(r.error);
        } else {
            logDeployment(network.name, k, r.address, 'beacon-proxy', r.deployed ? 'deployed' : 'exists');
        }
        return r;
    });
};

deploy.tags = ['AssetRouterOutputBeaconProxy'];
deploy.dependencies = ['ERC1155MintableBeaconProxy', 'AssetRouterInputBeaconProxy'];
export default deploy;
