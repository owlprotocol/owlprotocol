import type { HardhatRuntimeEnvironment } from 'hardhat/types';
import Craft from '../../../deploy/plugins/AssetRouter/Craft.js';

//@ts-expect-error
const deploy = async ({ ethers, network }: HardhatRuntimeEnvironment) => {
    //@ts-expect-error
    return await Craft({ provider: ethers.provider, signers: await ethers.getSigners(), network });
};

deploy.tags = Craft.tags;
deploy.dependencies = Craft.dependencies;
export default deploy;
