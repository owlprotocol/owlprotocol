import type { HardhatRuntimeEnvironment } from "hardhat/types";
import { ProxyFactoryDeploy } from "../../deploy/common/ProxyFactory.js";
import { PRIVATE_KEY_0 } from "@owlprotocol/envvars";

const deploy = async ({ ethers, network, deployments }: HardhatRuntimeEnvironment) => {
    if (!PRIVATE_KEY_0) throw new Error(`PRIVATE_KEY_0 ${PRIVATE_KEY_0}`)
    const wallet = new ethers.Wallet(PRIVATE_KEY_0, ethers.provider);
    const { abi } = await deployments.getExtendedArtifact("ERC1167Factory");

    const cloneFactory = await ProxyFactoryDeploy({
        provider: ethers.provider,
        //Manual transaction signing requires private key
        signers: [wallet],
        network,
    });

    //TODO: Add back additional artifact info for verification?
    const { save, getOrNull } = deployments;
    const submission = await getOrNull(ProxyFactoryDeploy.tags[0]);
    if (submission?.address != cloneFactory.address) {
        await save(ProxyFactoryDeploy.tags[0], {
            address: cloneFactory.address,
            //args: [],
            abi,
            /*
            bytecode,
            deployedBytecode,
            devdoc,
            solcInputHash,
            metadata,
            storageLayout,
            */
        });
    }

    return cloneFactory;
};

deploy.tags = ProxyFactoryDeploy.tags;
deploy.dependencies = ProxyFactoryDeploy.dependencies;
// eslint-disable-next-line import/no-default-export
export default deploy;
