import type { HardhatRuntimeEnvironment } from 'hardhat/types';
import ERC721MintableBeaconProxy from '../../../deploy/assets/ERC721/ERC721MintableBeaconProxy.js';

//@ts-expect-error
const deploy = async ({ ethers, network }: HardhatRuntimeEnvironment) => {
    //@ts-expect-error
    return await ERC721MintableBeaconProxy({ provider: ethers.provider, signers: await ethers.getSigners(), network });
};

deploy.tags = ERC721MintableBeaconProxy.tags;
deploy.dependencies = ERC721MintableBeaconProxy.dependencies;
export default deploy;
