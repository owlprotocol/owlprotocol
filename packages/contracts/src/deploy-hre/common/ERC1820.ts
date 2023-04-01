import type { HardhatRuntimeEnvironment } from "hardhat/types";
import { ERC1820Deploy } from "../../deploy/common/ERC1820.js";
import { IERC1820Registry } from "../../artifacts.js";
import { PRIVATE_KEY_0 } from "../../environment.js";

const deploy = async ({ ethers, network, deployments }: HardhatRuntimeEnvironment) => {
    const wallet = new ethers.Wallet(PRIVATE_KEY_0, ethers.provider);
    const { address } = await ERC1820Deploy({
        provider: ethers.provider,
        //Manual transaction signing requires private key
        signers: [wallet],
        network,
    });

    const { save, getOrNull } = deployments;
    const submission = await getOrNull(ERC1820Deploy.tags[0]);
    if (submission?.address != address) {
        await save(ERC1820Deploy.tags[0], { address, abi: IERC1820Registry.abi });
    }

    return { address };
};

deploy.tags = ERC1820Deploy.tags;
deploy.dependencies = ERC1820Deploy.dependencies;
// eslint-disable-next-line import/no-default-export
export default deploy;
