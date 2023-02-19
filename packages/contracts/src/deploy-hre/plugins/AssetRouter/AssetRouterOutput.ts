import { utils } from 'ethers';
import type { HardhatRuntimeEnvironment } from 'hardhat/types';
import { IAssetRouterOutput } from '../../../artifacts.js';
import { AssetRouterOutputDeploy, AssetRouterOutputDeployParams } from '../../../deploy/plugins/AssetRouter/AssetRouterOutput.js';

//@ts-expect-error
const deploy = async ({ ethers, network, deployments }: HardhatRuntimeEnvironment) => {
    const signers = await ethers.getSigners()
    const { get, save, getOrNull } = deployments;

    const routers: AssetRouterOutputDeployParams['routers'] = [{
        outputBaskets: [{
            outputableAmount: 10,
            erc20Transfer: [],
            erc20Mint: [{
                contractAddr: (await get('ERC20Mintable-2')).address,
                amount: utils.parseUnits('1')
            }],
            erc721Transfer: [],
            erc721Mint: [],
            erc721MintAutoId: [],
            erc1155Transfer: [],
            erc1155Mint: [],
        }, {
            outputableAmount: 10,
            erc20Transfer: [],
            erc20Mint: [],
            erc721Transfer: [],
            erc721Mint: [{
                contractAddr: (await get('ERC721Mintable-3')).address,
                tokenIds: [100, 101, 102, 103, 104, 105, 106, 107, 108, 109]
            }],
            erc721MintAutoId: [],
            erc1155Transfer: [],
            erc1155Mint: [],
        }, {
            outputableAmount: 10,
            erc20Transfer: [],
            erc20Mint: [],
            erc721Transfer: [],
            erc721Mint: [],
            erc721MintAutoId: [],
            erc1155Transfer: [],
            erc1155Mint: [{
                contractAddr: (await get('ERC1155Mintable-2')).address,
                tokenIds: [1],
                amounts: [1]
            }],
        }],
        routers: [(await get('AssetRouterInput-0')).address]
    }]

    const results = await AssetRouterOutputDeploy({ provider: ethers.provider, signers, network, routers });
    await Promise.all(Object.entries(results).map(async ([k, v]) => {
        const submission = await getOrNull(k)
        if (!submission?.numDeployments) {
            return save(k, { address: v.address, abi: IAssetRouterOutput.abi })
        }
    }))

    return results;
};

deploy.tags = AssetRouterOutputDeploy.tags;
deploy.dependencies = AssetRouterOutputDeploy.dependencies;
export default deploy;
