import type { HardhatRuntimeEnvironment } from "hardhat/types";
import { mapValues, zipObject } from "../../lodash.js";
import { UpgradeableBeaconDeploy } from "../../deploy/common/UpgradeableBeacon.js";

const deploy = async ({ ethers, network, deployments }: HardhatRuntimeEnvironment) => {
    const { save, getOrNull } = deployments;

    const results = await UpgradeableBeaconDeploy({
        provider: ethers.provider,
        signers: await ethers.getSigners(),
        network,
    });

    const promises = mapValues(results, async (v, k) => {
        const subName = k + "Beacon";
        const submission = await getOrNull(subName);
        if (!!submission) await deployments.delete(subName);
        if (!v.error && v.address) {
            return save(subName, { address: v.address, abi: [] });
        }
    });

    const results2 = zipObject(Object.keys(results), await Promise.all(Object.values(promises)));
    return results2;
};

deploy.tags = UpgradeableBeaconDeploy.tags;
deploy.dependencies = UpgradeableBeaconDeploy.dependencies;
// eslint-disable-next-line import/no-default-export
export default deploy;
