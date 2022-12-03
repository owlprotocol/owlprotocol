import type { HardhatRuntimeEnvironment } from 'hardhat/types';
import AssetRouterInput from '../../../deploy/plugins/AssetRouter/AssetRouterInput.js';

//@ts-expect-error
const deploy = async ({ ethers, network }: HardhatRuntimeEnvironment) => {
    //@ts-expect-error
    return await AssetRouterInput({ provider: ethers.provider, signers: await ethers.getSigners(), network });
};

deploy.tags = AssetRouterInput.tags;
deploy.dependencies = AssetRouterInput.dependencies;
export default deploy;
