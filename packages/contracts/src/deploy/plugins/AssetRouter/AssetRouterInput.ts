import { logDeployment, RunTimeEnvironment } from '../../utils';
import { mapValues, flatten } from '../../../lodash.js';
import { getFactories } from '../../../ethers/factories';
import { getDeterministicFactories, getDeterministicInitializeFactories } from '../../../ethers/deterministicFactories';
import { AssetRouterInputInitializeArgs, flattenInitArgsAssetRouterInput } from '../../../utils/AssetRouterInput';
import { BigNumber, BigNumberish, constants } from 'ethers';
import { getBeaconProxyFactories } from '../../../ethers/beaconProxyFactories';
import { AssetRouterInput } from '../../../ethers';
import { zip } from 'lodash';
import { ADDRESS_ONE } from '../../../constants';

const deploy = async ({ provider, signers, network }: RunTimeEnvironment) => {
    const signer = signers[0];
    const signerAddress = await signer.getAddress();
    let nonce = await provider.getTransactionCount(signerAddress);

    const factories = getFactories(signer);
    const deterministicFactories = getDeterministicFactories(signer, factories);
    const deterministicInitializeFactories = getDeterministicInitializeFactories(signer, factories, signerAddress);
    const beaconFactory = deterministicInitializeFactories.UpgradeableBeacon;
    const beconProxyFactories = getBeaconProxyFactories(signer, deterministicFactories, beaconFactory, signerAddress);
    const AssetRouterInputFactory = beconProxyFactories.AssetRouterInput;

    //Contracts
    const deployments: { [key: string]: AssetRouterInputInitializeArgs } = {
        assetRouterInput_0: {
            admin: signerAddress,
            contractUri: '',
            gsnForwarder: constants.AddressZero,
            inputBaskets: [
                {
                    burnAddress: ADDRESS_ONE,
                    erc20Unaffected: [],
                    erc20Burned: [],
                    erc1155Unaffected: [],
                    erc1155Burned: [
                        {
                            contractAddr: '0xd8B46A266347806b065211ca198939415607018D',
                            tokenIds: [1],
                            amounts: [1],
                        },
                    ],
                    erc721Unaffected: [],
                    erc721Burned: [],
                    erc721NTime: [],
                    erc721NTimeMax: [],
                },
            ],
        },
    };

    const promises = mapValues(deployments, async (initArgs) => {
        const args = flattenInitArgsAssetRouterInput(initArgs);
        const address = AssetRouterInputFactory.getAddress(...args);

        try {
            //Compute Deployment Address
            let result: { address: string; contract: AssetRouterInput; deployed: boolean };
            if (await AssetRouterInputFactory.exists(...args)) {
                result = {
                    address,
                    contract: AssetRouterInputFactory.attach(address),
                    deployed: false,
                };
            } else {
                result = {
                    address,
                    contract: await AssetRouterInputFactory.deploy(...args, { nonce: nonce++, gasLimit: 10e6 }),
                    deployed: true,
                };
            }

            const mints = initArgs.inputBaskets.map((b) => {
                return b.erc1155Burned.map(async (a) => {
                    const contract = factories.ERC1155Mintable.attach(a.contractAddr);
                    const balances = await contract.balanceOfBatch(
                        a.tokenIds.map(() => signerAddress),
                        a.tokenIds,
                    );
                    const mints = zip(a.tokenIds, a.amounts, balances)
                        .map(([tokenId, expected, current]) => {
                            if (current!.lte(expected!)) {
                                return [tokenId, BigNumber.from(expected).sub(current!)] as [BigNumberish, BigNumber];
                            } else {
                                return [tokenId, BigNumber.from(0)] as [BigNumberish, BigNumber];
                            }
                        })
                        .filter(([, amount]) => amount.gt(0));

                    console.debug('ERC1155Burned Mints: ', mints);

                    return contract.mintBatch(
                        signerAddress,
                        mints.map((m) => m[0]),
                        mints.map((m) => m[1]),
                        '0x',
                        { nonce: nonce++, gasLimit: 10e6 },
                    );
                });
            });

            const promises = flatten(mints);
            await Promise.all(promises);

            return { ...result, mints };
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

deploy.tags = ['AssetRouterInputBeaconProxy'];
deploy.dependencies = ['ERC1155MintableBeaconProxy'];
export default deploy;
