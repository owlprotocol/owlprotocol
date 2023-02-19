import { utils } from 'ethers';
import type { HardhatRuntimeEnvironment } from 'hardhat/types';
import { IAssetRouterInput } from '../../../artifacts.js';
import { ADDRESS_ONE } from '../../../constants.js';
import { AssetRouterInputDeploy, AssetRouterInputDeployParams } from '../../../deploy/plugins/AssetRouter/AssetRouterInput.js';

//@ts-expect-error
const deploy = async ({ ethers, network, deployments }: HardhatRuntimeEnvironment) => {
    const signers = await ethers.getSigners()
    const { get, save, getOrNull } = deployments;

    const routers: AssetRouterInputDeployParams['routers'] = [
        {
            inputBaskets: [{
                burnAddress: ADDRESS_ONE,
                erc20Unaffected: [{
                    contractAddr: (await get('ERC20Mintable-0')).address,
                    amount: utils.parseUnits('1'),
                }],
                erc20Burned: [],
                erc721Unaffected: [],
                erc721Burned: [],
                erc721NTime: [],
                erc721NTimeMax: [],
                erc1155Unaffected: [],
                erc1155Burned: [],
            }, {
                burnAddress: ADDRESS_ONE,
                erc20Unaffected: [],
                erc20Burned: [{
                    contractAddr: (await get('ERC20Mintable-1')).address,
                    amount: utils.parseUnits('1'),
                }],
                erc721Unaffected: [],
                erc721Burned: [],
                erc721NTime: [],
                erc721NTimeMax: [],
                erc1155Unaffected: [],
                erc1155Burned: [],
            }, {
                burnAddress: ADDRESS_ONE,
                erc20Unaffected: [],
                erc20Burned: [],
                erc721Unaffected: [{
                    contractAddr: (await get('ERC721Mintable-0')).address,
                    tokenIds: []
                }],
                erc721Burned: [],
                erc721NTime: [],
                erc721NTimeMax: [],
                erc1155Unaffected: [],
                erc1155Burned: [],
            }, {
                burnAddress: ADDRESS_ONE,
                erc20Unaffected: [],
                erc20Burned: [],
                erc721Unaffected: [],
                erc721Burned: [{
                    contractAddr: (await get('ERC721Mintable-1')).address,
                    tokenIds: []
                }],
                erc721NTime: [],
                erc721NTimeMax: [],
                erc1155Unaffected: [],
                erc1155Burned: [],
            }, {
                burnAddress: ADDRESS_ONE,
                erc20Unaffected: [],
                erc20Burned: [],
                erc721Unaffected: [],
                erc721Burned: [],
                erc721NTime: [{
                    contractAddr: (await get('ERC721Mintable-2')).address,
                    tokenIds: []
                }],
                erc721NTimeMax: [3],
                erc1155Unaffected: [],
                erc1155Burned: [],
            }, {
                burnAddress: ADDRESS_ONE,
                erc20Unaffected: [],
                erc20Burned: [],
                erc721Unaffected: [],
                erc721Burned: [],
                erc721NTime: [],
                erc721NTimeMax: [],
                erc1155Unaffected: [],
                erc1155Burned: [{
                    contractAddr: (await get('ERC1155Mintable-0')).address,
                    tokenIds: [1],
                    amounts: [1]
                }],
            }, {
                burnAddress: ADDRESS_ONE,
                erc20Unaffected: [],
                erc20Burned: [],
                erc721Unaffected: [],
                erc721Burned: [],
                erc721NTime: [],
                erc721NTimeMax: [],
                erc1155Unaffected: [{
                    contractAddr: (await get('ERC1155Mintable-1')).address,
                    tokenIds: [1],
                    amounts: [1]
                }],
                erc1155Burned: []
            }]
        },
    ]
    const results = await AssetRouterInputDeploy({ provider: ethers.provider, signers, network, routers });
    await Promise.all(Object.entries(results).map(async ([k, v]) => {
        const submission = await getOrNull(k)
        if (!submission?.numDeployments) {
            return save(k, { address: v.address, abi: IAssetRouterInput.abi })
        }
    }))

    return results;
};

deploy.tags = AssetRouterInputDeploy.tags;
deploy.dependencies = AssetRouterInputDeploy.dependencies;
export default deploy;
