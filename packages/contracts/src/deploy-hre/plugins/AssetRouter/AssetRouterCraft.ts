import { utils } from "ethers";
import type { HardhatRuntimeEnvironment } from "hardhat/types";
import { IAssetRouterCraft } from "../../../artifacts.js";
import { ADDRESS_ONE } from "../../../constants.js";
import {
    AssetRouterCraftDeploy,
    AssetRouterCraftDeployParams,
} from "../../../deploy/plugins/AssetRouter/AssetRouterCraft.js";

const deploy = async ({ ethers, network, deployments }: HardhatRuntimeEnvironment) => {
    const signers = await ethers.getSigners();
    const { get, save, getOrNull } = deployments;

    const routers: AssetRouterCraftDeployParams["routers"] = [
        {
            inputBaskets: [
                {
                    burnAddress: ADDRESS_ONE,
                    erc20Unaffected: [
                        {
                            contractAddr: (await get("ERC20Mintable-0")).address,
                            amount: utils.parseUnits("1"),
                        },
                    ],
                },
                {
                    burnAddress: ADDRESS_ONE,
                    erc20Burned: [
                        {
                            contractAddr: (await get("ERC20Mintable-1")).address,
                            amount: utils.parseUnits("1"),
                        },
                    ],
                },
                {
                    burnAddress: ADDRESS_ONE,
                    erc721Unaffected: [
                        {
                            contractAddr: (await get("ERC721MintableAutoId-0")).address,
                        },
                    ],
                },
                {
                    burnAddress: ADDRESS_ONE,
                    erc721Burned: [
                        {
                            contractAddr: (await get("ERC721MintableAutoId-1")).address,
                        },
                    ],
                },
                {
                    burnAddress: ADDRESS_ONE,
                    erc721NTime: [
                        {
                            contractAddr: (await get("ERC721MintableAutoId-2")).address,
                        },
                    ],
                    erc721NTimeMax: [3],
                },
                {
                    burnAddress: ADDRESS_ONE,
                    erc1155Burned: [
                        {
                            contractAddr: (await get("ERC1155Mintable-0")).address,
                            tokenIds: [1],
                            amounts: [1],
                        },
                    ],
                },
                {
                    burnAddress: ADDRESS_ONE,
                    erc1155Unaffected: [
                        {
                            contractAddr: (await get("ERC1155Mintable-1")).address,
                            tokenIds: [1],
                            amounts: [1],
                        },
                    ],
                },
            ],
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
        },
    ];
    const results = await AssetRouterCraftDeploy({ provider: ethers.provider, signers, network, routers });
    await Promise.all(
        Object.entries(results).map(async ([k, v]) => {
            const submission = await getOrNull(k);
            if (submission?.address != v.address) {
                return save(k, { address: v.address, abi: IAssetRouterCraft.abi });
            }
        }),
    );

    return results;
};

deploy.tags = AssetRouterCraftDeploy.tags;
deploy.dependencies = AssetRouterCraftDeploy.dependencies;
// eslint-disable-next-line import/no-default-export
export default deploy;
