import type { HardhatRuntimeEnvironment } from "hardhat/types";
import { BalancesDeploy } from "../deploy/Balances.js";

const deploy = async ({ ethers, network }: HardhatRuntimeEnvironment) => {
    await BalancesDeploy({ provider: ethers.provider, network, signers: [] });
    return;
};

deploy.tags = BalancesDeploy.tags;
deploy.dependencies = BalancesDeploy.dependencies;
// eslint-disable-next-line import/no-default-export
export default deploy;
