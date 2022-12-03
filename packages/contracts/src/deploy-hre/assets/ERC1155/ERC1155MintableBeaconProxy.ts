import type { HardhatRuntimeEnvironment } from 'hardhat/types';
import ERC1155MintableBeaconProxy from '../../../deploy/assets/ERC1155/ERC1155MintableBeaconProxy.js';

//@ts-expect-error
const deploy = async ({ ethers, network }: HardhatRuntimeEnvironment) => {
    //@ts-expect-error
    return await ERC1155MintableBeaconProxy({ provider: ethers.provider, signers: await ethers.getSigners(), network });
};

deploy.tags = ERC1155MintableBeaconProxy.tags;
deploy.dependencies = ERC1155MintableBeaconProxy.dependencies;
export default deploy;
