import type { HardhatRuntimeEnvironment } from "hardhat/types";
import { TokenURIDnaDeploy } from "../../../deploy/plugins/TokenURI/TokenURIDna.js";

const deploy = async ({ ethers, network, deployments }: HardhatRuntimeEnvironment) => {
    const { save, getOrNull, get } = deployments;
    const dnaProvider = (await get(`TokenDna-${0}`)).address;

    const results = await TokenURIDnaDeploy({
        provider: ethers.provider,
        signers: await ethers.getSigners(),
        network,
        instances: [
            {
                dnaProvider,
            },
        ],
    });

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

deploy.tags = TokenURIDnaDeploy.tags;
deploy.dependencies = TokenURIDnaDeploy.dependencies;
// eslint-disable-next-line import/no-default-export
export default deploy;
