import type { HardhatRuntimeEnvironment } from 'hardhat/types';
import All from '../deploy/all.js';

//@ts-expect-error
const deploy = async ({ ethers, network }: HardhatRuntimeEnvironment) => {
    //@ts-expect-error
    return await All({ provider: ethers.provider, signers: await ethers.getSigners(), network });
};

deploy.tags = All.tags;
deploy.dependencies = All.dependencies;
export default deploy;
