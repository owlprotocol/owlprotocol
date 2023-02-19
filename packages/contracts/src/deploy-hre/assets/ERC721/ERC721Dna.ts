import type { HardhatRuntimeEnvironment } from 'hardhat/types';
import { IERC721Dna } from '../../../artifacts.js';
import { ERC721DnaDeploy } from '../../../deploy/assets/ERC721/ERC721Dna.js';

//@ts-expect-error
const deploy = async ({ ethers, network, deployments }: HardhatRuntimeEnvironment) => {
    const results = await ERC721DnaDeploy({
        provider: ethers.provider, signers: await ethers.getSigners(), network,
        tokens: 10, balanceTarget: 10
    });

    const { save, getOrNull } = deployments

    await Promise.all(Object.entries(results).map(async ([k, v]) => {
        const submission = await getOrNull(k)
        if (!submission?.numDeployments) {
            return save(k, { address: v.address, abi: IERC721Dna.abi })
        }
    }))

    return results;
};

deploy.tags = ERC721DnaDeploy.tags;
deploy.dependencies = ERC721DnaDeploy.dependencies;
export default deploy;
