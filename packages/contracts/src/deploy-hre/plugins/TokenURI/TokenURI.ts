import type { HardhatRuntimeEnvironment } from "hardhat/types";
import { TokenURIDeploy } from "../../../deploy/plugins/TokenURI/TokenURI.js";

const deploy = async ({ ethers, network, deployments }: HardhatRuntimeEnvironment) => {
    const results = await TokenURIDeploy({
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

deploy.tags = TokenURIDeploy.tags;
deploy.dependencies = TokenURIDeploy.dependencies;
// eslint-disable-next-line import/no-default-export
export default deploy;
