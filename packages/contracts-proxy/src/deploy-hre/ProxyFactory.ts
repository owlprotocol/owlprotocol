import type { HardhatRuntimeEnvironment } from "hardhat/types";
import { PRIVATE_KEY_FACTORY_DEPLOYER } from "@owlprotocol/envvars";
import type { Signer } from "ethers";
import { ProxyFactoryDeploy } from "../deploy/ProxyFactory.js";

const deploy = async ({ ethers, network, deployments }: HardhatRuntimeEnvironment) => {
    let signers: Signer[];
    if ((network.config as any).local) {
        signers = await ethers.getSigners();
    } else {
        const pkey0 = PRIVATE_KEY_FACTORY_DEPLOYER;
        if (!pkey0) throw new Error(`PRIVATE_KEY_FACTORY_DEPLOYER ${pkey0}`);
        signers = [new ethers.Wallet(pkey0, ethers.provider)];
    }

    const cloneFactory = await ProxyFactoryDeploy({
        provider: ethers.provider,
        //Manual transaction signing requires private key
        signers,
        network,
    });

    //TODO: Add back additional artifact info for verification?
    const { abi } = await deployments.getExtendedArtifact("ERC1167Factory");
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
