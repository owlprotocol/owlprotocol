import { utils } from 'ethers';
import type { HardhatRuntimeEnvironment } from 'hardhat/types';
import DeterministicDeployer from '../../deploy/common/DeterministicDeployer.js';
import { PRIVATE_KEY_0, PRIVATE_KEY_ANVIL } from '../../environment.js';

//@ts-expect-error
const deploy = async ({ ethers, network, deployments }: HardhatRuntimeEnvironment) => {
    const wallet = new ethers.Wallet(PRIVATE_KEY_0, ethers.provider);
    const walletAddress = await wallet.getAddress();

    if (network.name == 'anvil') {
        //Fund wallet when using anvil
        const anvil = new ethers.Wallet(
            PRIVATE_KEY_ANVIL,
            ethers.provider,
        );
        const balance = await ethers.provider.getBalance(walletAddress);
        if (balance.lt(ethers.utils.parseEther('10.0'))) {
            const tx = await anvil.sendTransaction({
                to: walletAddress,
                value: utils.parseEther('10.0').sub(balance),
                gasLimit: 21000,
                type: 2,
            });
            await tx.wait(1);
        }
    }

    const { address } = await DeterministicDeployer({
        provider: ethers.provider,
        //Manual transaction signing requires private key
        signers: [wallet],
        network,
    });

    const { save, getOrNull } = deployments;
    const submission = await getOrNull(DeterministicDeployer.tags[0])
    if (!submission?.numDeployments) {
        await save(DeterministicDeployer.tags[0], { address, abi: [] });
    }

    return { address };
};

deploy.tags = DeterministicDeployer.tags;
deploy.dependencies = DeterministicDeployer.dependencies;
export default deploy;
