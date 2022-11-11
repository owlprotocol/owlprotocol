import { utils } from 'ethers';
import type { HardhatRuntimeEnvironment } from 'hardhat/types';
import DeterministicDeployer from '../../deploy/common/DeterministicDeployer.js';

//@ts-expect-error
const deploy = async ({ ethers, network, deployments }: HardhatRuntimeEnvironment) => {
    const wallet = new ethers.Wallet(process.env.PK_0 as string, ethers.provider);
    const walletAddress = await wallet.getAddress();

    if (network.name == 'anvil') {
        //Fund wallet when using anvil
        const anvil = new ethers.Wallet(
            '0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80',
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
        //@ts-expect-error
        network,
    });

    const { save } = deployments;
    await save(DeterministicDeployer.tags[0], { address, abi: [] });

    return { address };
};

deploy.tags = DeterministicDeployer.tags;
deploy.dependencies = DeterministicDeployer.dependencies;
export default deploy;
