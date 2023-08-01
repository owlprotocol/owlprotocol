import { utils } from "ethers";
import type { HardhatRuntimeEnvironment } from "hardhat/types";
import {
    AssetRouterOutputDeploy,
    AssetRouterOutputDeployParams,
} from "../../../deploy/plugins/AssetRouter/AssetRouterOutput.js";

const deploy = async ({ ethers, network, deployments }: HardhatRuntimeEnvironment) => {
    const signers = await ethers.getSigners();
    const { get, save, getOrNull } = deployments;

    const routers: AssetRouterOutputDeployParams["routers"] = [
        {
            outputBaskets: [
                {
                    outputableAmount: 10,
                    erc20Mint: [
                        {
                            contractAddr: (await get("ERC20Mintable-2")).address,
                            amount: utils.parseUnits("1"),
                        },
                    ],
                },
                {
                    outputableAmount: 10,
                    erc721MintAutoId: [
                        {
                            contractAddr: (await get("ERC721MintableAutoId-3")).address,
                        },
                    ],
                },
                {
                    outputableAmount: 10,
                    erc1155Mint: [
                        {
                            contractAddr: (await get("ERC1155Mintable-2")).address,
                            tokenIds: [1],
                            amounts: [1],
                        },
                    ],
                },
            ],
            routers: [(await get("AssetRouterInput-0")).address],
        },
    ];

    const results = await AssetRouterOutputDeploy({ provider: ethers.provider, signers, network, routers });
    await Promise.all(
        Object.entries(results).map(async ([k, v]) => {
            const submission = await getOrNull(k);
            if (submission?.address != v.address) {
                return save(k, {
                    address: v.address,
                    abi: [],
                });
            }
        }),
    );

    return results;
};

deploy.tags = AssetRouterOutputDeploy.tags;
deploy.dependencies = AssetRouterOutputDeploy.dependencies;
// eslint-disable-next-line import/no-default-export
export default deploy;
