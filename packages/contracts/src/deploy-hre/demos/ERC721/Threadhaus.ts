//@ts-nocheck
import type { HardhatRuntimeEnvironment } from 'hardhat/types';
import Threadhaus from '../../../deploy/demos/ERC721/Threadhaus.js';

const deploy = async ({ ethers, network }: HardhatRuntimeEnvironment) => {
    return await Threadhaus({ provider: ethers.provider, signers: await ethers.getSigners(), network });
};

deploy.tags = Threadhaus.tags;
deploy.dependencies = Threadhaus.dependencies;
export default deploy;
