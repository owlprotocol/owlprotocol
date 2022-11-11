import type { HardhatRuntimeEnvironment } from 'hardhat/types';
import { mapValues, zipObject } from '../../lodash.js';
import Implementations from '../../deploy/common/Implementations.js';

//@ts-expect-error
const deploy = async ({ ethers, network, deployments }: HardhatRuntimeEnvironment) => {
    const { save } = deployments;

    //@ts-expect-error
    const results = await Implementations({ provider: ethers.provider, signers: await ethers.getSigners(), network });

    const promises = mapValues(results, async ({ address, contract }, k) => {
        if (address && contract?.interface) {
            const { abi, bytecode, deployedBytecode, devdoc, solcInputHash, metadata, storageLayout } =
                await deployments.getExtendedArtifact(k);

            return save(k + 'Implementation', {
                address,
                args: [],
                abi,
                bytecode,
                deployedBytecode,
                devdoc,
                solcInputHash,
                metadata,
                storageLayout,
            });
        }
    });

    const results2 = zipObject(Object.keys(results), await Promise.all(Object.values(promises)));
    return results2;
};

deploy.tags = Implementations.tags;
deploy.dependencies = Implementations.dependencies;
export default deploy;
