import type { HardhatRuntimeEnvironment } from "hardhat/types";
import { ERC2981SetterDeploy } from "../../../deploy/plugins/ERC2981/ERC2981Setter.js";

const deploy = async ({ ethers, network, deployments }: HardhatRuntimeEnvironment) => {
    const results = await ERC2981SetterDeploy({
        provider: ethers.provider,
        signers: await ethers.getSigners(),
        network,
        instances: 1,
    });

    const { save, getOrNull } = deployments;

    await Promise.all(
        Object.entries(results).map(async ([k, v]) => {
            const submission = await getOrNull(k);
            if (!!submission) await deployments.delete(k);
            if (!v.error && v.address) {
                await save(k, { address: v.address, abi: [] });
            }
        }),
    );

    return results;
};

deploy.tags = ERC2981SetterDeploy.tags;
deploy.dependencies = ERC2981SetterDeploy.dependencies;
// eslint-disable-next-line import/no-default-export
export default deploy;
