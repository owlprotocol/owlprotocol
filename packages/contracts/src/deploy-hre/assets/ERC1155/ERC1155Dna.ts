import type { HardhatRuntimeEnvironment } from 'hardhat/types';
import { IERC1155Dna } from '../../../artifacts.js';
import { ERC1155DnaDeploy } from '../../../deploy/assets/ERC1155/ERC1155Dna.js';

//@ts-expect-error
const deploy = async ({ ethers, network, deployments }: HardhatRuntimeEnvironment) => {
    const results = await ERC1155DnaDeploy({
        provider: ethers.provider, signers: await ethers.getSigners(), network,
        tokens: 10, balanceTarget: 10
    });

    const { save, getOrNull } = deployments

    await Promise.all(Object.entries(results).map(async ([k, v]) => {
        const submission = await getOrNull(k)
        if (!submission?.numDeployments) {
            return save(k, { address: v.address, abi: IERC1155Dna.abi })
        }
    }))

    return results;
};

deploy.tags = ERC1155DnaDeploy.tags;
deploy.dependencies = ERC1155DnaDeploy.dependencies;
export default deploy;
