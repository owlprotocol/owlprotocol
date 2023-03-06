import type { HardhatRuntimeEnvironment } from 'hardhat/types';
import { IERC1155Mintable } from '../../../artifacts.js';
import { ERC1155MintableDeploy } from '../../../deploy/assets/ERC1155/ERC1155Mintable.js';

const deploy = async ({ ethers, network, deployments }: HardhatRuntimeEnvironment) => {
    const results = await ERC1155MintableDeploy({
        provider: ethers.provider, signers: await ethers.getSigners(), network,
        tokens: 10, balanceTarget: 10
    });

    const { save, getOrNull } = deployments

    await Promise.all(Object.entries(results).map(async ([k, v]) => {
        const submission = await getOrNull(k)
        if (!submission?.numDeployments) {
            return save(k, { address: v.address, abi: IERC1155Mintable.abi })
        }
    }))

    return results;
};

deploy.tags = ERC1155MintableDeploy.tags;
deploy.dependencies = ERC1155MintableDeploy.dependencies;
export default deploy;
