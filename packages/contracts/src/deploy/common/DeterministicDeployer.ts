import {
    proxyAddress,
    deploymentTx,
    deploymentSignerAddress,
    deploymentCostLimit,
} from '../../utils/DeployerDeterministic.js';
import { logDeployment, RunTimeEnvironment } from '../utils.js';

const name = 'DeterministicDeploymentProxy';

/**
 * Deployment is always the same regardless of contract.
 * We get the bytecode & name for a deterministic deployment from the Proxy Factory.
 */
const deployDeterministicDeployer = async ({ provider, signers, network }: RunTimeEnvironment) => {
    const signer = signers[0];
    const nonce = await provider.getTransactionCount(await signer.getAddress());

    //Check if contract address exists
    if ((await provider.getCode(proxyAddress)) != '0x') {
        logDeployment(network.name, name, proxyAddress, 'nicks', 'exists');
        return { address: proxyAddress };
    }

    //Check deployment signer address balance
    const balance = await provider.getBalance(deploymentSignerAddress);
    if (balance.lte(deploymentCostLimit)) {
        const tx = await signer.sendTransaction({
            nonce,
            to: deploymentSignerAddress,
            value: deploymentCostLimit.sub(balance),
            gasLimit: 21000,
            type: 2,
        });
        await tx.wait(1);
    }

    //Deploy contract
    await provider.sendTransaction(deploymentTx);
    if ((await provider.getCode(proxyAddress)) == '0x') throw new Error(`${name} deployment failed`);
    logDeployment(network.name, name, proxyAddress, 'nicks', 'deployed');

    return { tx: deploymentTx, address: proxyAddress };
};

deployDeterministicDeployer.tags = ['DeterministicDeployer'];
deployDeterministicDeployer.dependencies = [] as string[];
export { deployDeterministicDeployer };
export default deployDeterministicDeployer;
