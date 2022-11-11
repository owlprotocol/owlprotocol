import type { HardhatRuntimeEnvironment } from 'hardhat/types';
import { mapValues, zipObject } from '../../lodash.js';
import UpgradeableBeacon from '../../deploy/common/UpgradeableBeacon.js';

//@ts-expect-error
const deploy = async ({ ethers, network, deployments }: HardhatRuntimeEnvironment) => {
    const { save } = deployments;

    //@ts-expect-error
    const results = await UpgradeableBeacon({ provider: ethers.provider, signers: await ethers.getSigners(), network });

    const promises = mapValues(results, async ({ address, contract }, k) => {
        if (address && contract?.interface) {
            //TODO: For verification, verify as beacon
            const { abi } = await deployments.getExtendedArtifact(k);

            return save(k + 'Beacon', {
                address,
                args: [],
                abi,
            });
        }
    });

    const results2 = zipObject(Object.keys(results), await Promise.all(Object.values(promises)));
    return results2;
};

deploy.tags = UpgradeableBeacon.tags;
deploy.dependencies = UpgradeableBeacon.dependencies;
export default deploy;
