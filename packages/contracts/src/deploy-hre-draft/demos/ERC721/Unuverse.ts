//@ts-nocheck
import type { HardhatRuntimeEnvironment } from 'hardhat/types';
import Unuverse from '../../../deploy/demos/ERC721/Unuverse.js';

const deploy = async ({ ethers, network }: HardhatRuntimeEnvironment) => {
    return await Unuverse({ provider: ethers.provider, signers: await ethers.getSigners(), network });
};

deploy.tags = Unuverse.tags;
deploy.dependencies = Unuverse.dependencies;
export default deploy;
