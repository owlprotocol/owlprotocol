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

    const promises = mapValues(results, async ({ address, contract }, k) => {
        if (address && contract?.interface) {
            //TODO: For verification, verify as beacon
            const { abi } = await deployments.getExtendedArtifact(k);

            const submission = await getOrNull(k + "Beacon");
            if (submission?.address != address) {
                return save(k + "Beacon", {
                    address,
                    //args: [],
                    abi,
                });
            }
        }
    });

    const results2 = zipObject(Object.keys(results), await Promise.all(Object.values(promises)));
    return results2;
};

deploy.tags = UpgradeableBeaconDeploy.tags;
deploy.dependencies = UpgradeableBeaconDeploy.dependencies;
// eslint-disable-next-line import/no-default-export
export default deploy;
