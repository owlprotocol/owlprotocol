import type { HardhatRuntimeEnvironment } from "hardhat/types";
import { ERC1155MintableDeploy } from "../../../deploy/assets/ERC1155/ERC1155Mintable.js";

const deploy = async ({ ethers, network, deployments }: HardhatRuntimeEnvironment) => {
    const { save, getOrNull, get } = deployments;
    const tokenRoyaltyProvider = (await get(`ERC2981Setter-${0}`)).address;
    const tokenUriProvider = (await get(`TokenURIDna-${0}`)).address;

    const results = await ERC1155MintableDeploy({
        provider: ethers.provider,
        signers: await ethers.getSigners(),
        network,
        instances: [
            {
                tokenRoyaltyProvider,
                tokenUriProvider,
            },
        ],
        balanceTarget: 10,
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

deploy.tags = ERC1155MintableDeploy.tags;
deploy.dependencies = ERC1155MintableDeploy.dependencies;
// eslint-disable-next-line import/no-default-export
export default deploy;
