import { getFactories } from "../../ethers/factories.js";
import { proxyAddress } from "../../utils/DeployerDeterministic.js";
import { ERC1167FactoryImplementation } from "../../utils/ERC1167Factory/getContractFactory.js";
import { DEFAULT_SALT } from "../../utils/ERC1167Factory/getSalt.js";
import { logDeployment, RunTimeEnvironment } from "../utils.js";

export const ProxyFactoryDeploy = async ({ provider, signers, network }: RunTimeEnvironment) => {
    const signer = signers[0];
    const signerAddress = await signer.getAddress();
    const nonce = await provider.getTransactionCount(signerAddress);
    const cloneFactoryFactory = getFactories(signers[0]).ERC1167Factory;
    const cloneFactory = ERC1167FactoryImplementation(signers[0]);

    const name = "ERC1167Factory";

    if ((await provider.getCode(cloneFactory.address)) != "0x") {
        logDeployment(network.name, name, cloneFactory.address, "deterministic", "exists");

        return cloneFactory;
    }

    const salt = DEFAULT_SALT;

    const initCode = cloneFactoryFactory.bytecode;
    const data = `${salt}${initCode.replace("0x", "")}`;

    const tx = await signer.sendTransaction({
        to: proxyAddress,
        value: 0,
        data,
        nonce,
        gasLimit: 600000,
        type: 2,
    });

    //Deploy contract
    await tx.wait(1);
    //console.debug(response.from);
    //const receipt = await response.wait(1);
    //console.debug(receipt);

    if ((await provider.getCode(cloneFactory.address)) == "0x") throw new Error(`${name} deployment failed`);

    logDeployment(network.name, name, cloneFactory.address, "deterministic", "deployed");
    return cloneFactory;
};

ProxyFactoryDeploy.tags = ["ProxyFactory"];
ProxyFactoryDeploy.dependencies = ["DeterministicDeployer"];
