import type { HardhatRuntimeEnvironment } from "hardhat/types";
import { IERC721Mintable } from "../../../artifacts.js";
import { ERC721MintableDeploy } from "../../../deploy/assets/ERC721/ERC721Mintable.js";

const deploy = async ({ ethers, network, deployments }: HardhatRuntimeEnvironment) => {
    const results = await ERC721MintableDeploy({
        provider: ethers.provider,
        signers: await ethers.getSigners(),
        network,
        tokens: 10,
        balanceTarget: 10,
    });

    const { save, getOrNull } = deployments;

    await Promise.all(
        Object.entries(results).map(async ([k, v]) => {
            const submission = await getOrNull(k);
            if (submission?.address != v.address) {
                return save(k, { address: v.address, abi: IERC721Mintable.abi });
            }
        }),
    );

    return results;
};

deploy.tags = ERC721MintableDeploy.tags;
deploy.dependencies = ERC721MintableDeploy.dependencies;
// eslint-disable-next-line import/no-default-export
export default deploy;
