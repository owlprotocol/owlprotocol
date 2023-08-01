import type { HardhatRuntimeEnvironment } from "hardhat/types";
import { TokenDnaDeploy } from "../../../deploy/plugins/TokenDna/TokenDna.js";

const deploy = async ({ ethers, network, deployments }: HardhatRuntimeEnvironment) => {
    const results = await TokenDnaDeploy({
        provider: ethers.provider,
        signers: await ethers.getSigners(),
        network,
        instances: [{}],
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

deploy.tags = TokenDnaDeploy.tags;
deploy.dependencies = TokenDnaDeploy.dependencies;
// eslint-disable-next-line import/no-default-export
export default deploy;
