import { utils } from "ethers";
import type { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeterministicDeployerDeploy } from "../../deploy/common/DeterministicDeployer.js";
import { PRIVATE_KEY_0, PRIVATE_KEY_ANVIL } from "@owlprotocol/envvars";

const deploy = async ({ ethers, network, deployments }: HardhatRuntimeEnvironment) => {
    if (!PRIVATE_KEY_0) throw new Error(`PRIVATE_KEY_0 ${PRIVATE_KEY_0}`)
    const wallet = new ethers.Wallet(PRIVATE_KEY_0, ethers.provider);
    const walletAddress = await wallet.getAddress();

    if (network.name == "anvil") {
        //Fund wallet when using anvil
        const anvil = new ethers.Wallet(PRIVATE_KEY_ANVIL, ethers.provider);
        const balance = await ethers.provider.getBalance(walletAddress);
        if (balance.lt(ethers.utils.parseEther("10.0"))) {
            const tx = await anvil.sendTransaction({
                to: walletAddress,
                value: utils.parseEther("10.0").sub(balance),
                gasLimit: 21000,
                type: 2,
            });
            await tx.wait(1);
        }
    }

    const { address } = await DeterministicDeployerDeploy({
        provider: ethers.provider,
        //Manual transaction signing requires private key
        signers: [wallet],
        network,
    });

    const { save, getOrNull } = deployments;
    const submission = await getOrNull(DeterministicDeployerDeploy.tags[0]);
    if (submission?.address != address) {
        await save(DeterministicDeployerDeploy.tags[0], { address, abi: [] });
    }

    return { address };
};

deploy.tags = DeterministicDeployerDeploy.tags;
deploy.dependencies = DeterministicDeployerDeploy.dependencies;
// eslint-disable-next-line import/no-default-export
export default deploy;
