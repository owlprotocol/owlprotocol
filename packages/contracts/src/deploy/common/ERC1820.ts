import { registryAddress, deploymentTx, deploymentSignerAddress, deploymentCostLimit } from "../../utils/ERC1820.js";
import { logDeployment, RunTimeEnvironment } from "../utils.js";

const name = "ERC1820Registry";

/**
 * Deployment is always the same regardless of contract.
 * We get the bytecode & name for a deterministic deployment from the Proxy Factory.
 */
export const ERC1820Deploy = async ({ provider, signers, network }: RunTimeEnvironment) => {
    const signer = signers[0];
    const nonce = await provider.getTransactionCount(await signer.getAddress());

    //Check if contract address exists
    if ((await provider.getCode(registryAddress)) != "0x") {
        logDeployment(network.name, name, registryAddress, "implementation", "exists");
        return { tx: deploymentTx, address: registryAddress };
    }

    //Check deployment signer address balance
    const balance = await provider.getBalance(deploymentSignerAddress);
    if (balance.lte(deploymentCostLimit)) {
        const tx = await signer.sendTransaction({
            nonce,
            to: deploymentSignerAddress,
            value: deploymentCostLimit.sub(balance),
            type: 2,
            gasLimit: 21000,
        });
        await tx.wait(1);
    }

    //Deploy contract
    await provider.sendTransaction(deploymentTx);
    if ((await provider.getCode(registryAddress)) == "0x") throw new Error(`${name} deployment failed`);
    logDeployment(network.name, name, registryAddress, "implementation", "deployed");

    return { tx: deploymentTx, address: registryAddress };
};

ERC1820Deploy.tags = ["ERC1820"];
ERC1820Deploy.dependencies = [] as string[];
