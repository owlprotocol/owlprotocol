import type { HardhatRuntimeEnvironment } from 'hardhat/types';
import ERC721MintableDeterministic from '../../../deploy/assets/ERC721/ERC721MintableDeterministic.js';

//@ts-expect-error
const deploy = async ({ ethers, network }: HardhatRuntimeEnvironment) => {
    return await ERC721MintableDeterministic({
        provider: ethers.provider,
        signers: await ethers.getSigners(),
        //@ts-expect-error
        network,
    });
};

deploy.tags = ERC721MintableDeterministic.tags;
deploy.dependencies = ERC721MintableDeterministic.dependencies;
export default deploy;
