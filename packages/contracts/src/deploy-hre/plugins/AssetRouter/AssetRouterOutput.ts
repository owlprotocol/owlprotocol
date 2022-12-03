import type { HardhatRuntimeEnvironment } from 'hardhat/types';
import AssetRouterOutput from '../../../deploy/plugins/AssetRouter/AssetRouterOutput.js';

//@ts-expect-error
const deploy = async ({ ethers, network }: HardhatRuntimeEnvironment) => {
    //@ts-expect-error
    return await AssetRouterOutput({ provider: ethers.provider, signers: await ethers.getSigners(), network });
};

deploy.tags = AssetRouterOutput.tags;
deploy.dependencies = AssetRouterOutput.dependencies;
export default deploy;
