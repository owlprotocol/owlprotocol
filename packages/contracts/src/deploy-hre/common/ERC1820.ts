import type { HardhatRuntimeEnvironment } from 'hardhat/types';
import ERC1820 from '../../deploy/common/ERC1820.js';
import { IERC1820Registry } from '../../artifacts.js';

//@ts-expect-error
const deploy = async ({ ethers, network, deployments }: HardhatRuntimeEnvironment) => {
    const { address } = await ERC1820({
        provider: ethers.provider,
        //Manual transaction signing requires private key
        signers: [new ethers.Wallet(process.env.PK_0, ethers.provider)],
        network,
    });

    const { save, getOrNull } = deployments;
    const submission = await getOrNull(ERC1820.tags[0])
    if (!submission?.numDeployments) {
        await save(ERC1820.tags[0], { address, abi: IERC1820Registry.abi });
    }

    return { address };
};

deploy.tags = ERC1820.tags;
deploy.dependencies = ERC1820.dependencies;
export default deploy;
