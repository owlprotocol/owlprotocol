import type { HardhatRuntimeEnvironment } from "hardhat/types";
import { IERC721Dna, IERC721TopDown } from "../../../artifacts.js";
import {
    ERC721TopDownDnaDeploy,
    ERC721TopDownDnaDeployParams,
} from "../../../deploy/assets/ERC721/ERC721TopDownDna.js";

const deploy = async ({ ethers, network, deployments }: HardhatRuntimeEnvironment) => {
    const signers = await ethers.getSigners();
    const { get, save, getOrNull } = deployments;

    const tokens: ERC721TopDownDnaDeployParams["tokens"] = [
        { childContracts721: [(await get("ERC721Dna-0")).address], childContracts1155: [] },
        { childContracts721: [], childContracts1155: [(await get("ERC1155Dna-0")).address] },
    ];
    const results = await ERC721TopDownDnaDeploy({
        provider: ethers.provider,
        signers,
        network,
        tokens,
        balanceTarget: 10,
    });

    await Promise.all(
        Object.entries(results).map(async ([k, v]) => {
            const submission = await getOrNull(k);
            if (submission?.address != v.address) {
                return save(k, { address: v.address, abi: [...IERC721Dna.abi, ...IERC721TopDown.abi] });
            }
        }),
    );

    return results;
};

deploy.tags = ERC721TopDownDnaDeploy.tags;
deploy.dependencies = ERC721TopDownDnaDeploy.dependencies;
// eslint-disable-next-line import/no-default-export
export default deploy;
