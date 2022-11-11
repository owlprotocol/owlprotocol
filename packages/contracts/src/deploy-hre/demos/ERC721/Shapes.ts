//@ts-nocheck
import type { HardhatRuntimeEnvironment } from 'hardhat/types';
import Shapes from '../../../deploy/demos/ERC721/Shapes.js';

const deploy = async ({ ethers, network }: HardhatRuntimeEnvironment) => {
    return await Shapes({ provider: ethers.provider, signers: await ethers.getSigners(), network });
};

deploy.tags = Shapes.tags;
deploy.dependencies = Shapes.dependencies;
export default deploy;
