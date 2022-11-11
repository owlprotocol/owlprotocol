import type { HardhatRuntimeEnvironment } from 'hardhat/types';
import ERC721Mintable1167Proxy from '../../../deploy/assets/ERC721/ERC721Mintable1167Proxy.js';

//@ts-expect-error
const deploy = async ({ ethers, network }: HardhatRuntimeEnvironment) => {
    //@ts-expect-error
    return await ERC721Mintable1167Proxy({ provider: ethers.provider, signers: await ethers.getSigners(), network });
};

deploy.tags = ERC721Mintable1167Proxy.tags;
deploy.dependencies = ERC721Mintable1167Proxy.dependencies;
export default deploy;
