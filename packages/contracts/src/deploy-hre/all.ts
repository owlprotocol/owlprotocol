import type { HardhatRuntimeEnvironment } from "hardhat/types";
import { AllDeploy } from "../deploy/all.js";

const deploy = async ({ ethers, network }: HardhatRuntimeEnvironment) => {
    //@ts-expect-error
    return await AllDeploy({ provider: ethers.provider, signers: await ethers.getSigners(), network });
};

deploy.tags = AllDeploy.tags;
deploy.dependencies = AllDeploy.dependencies;
// eslint-disable-next-line import/no-default-export
export default deploy;
