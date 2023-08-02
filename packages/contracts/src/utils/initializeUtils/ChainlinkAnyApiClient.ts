import type { ChainlinkAnyApiClient } from "../../typechain/ethers/contracts/chainlink/ChainlinkAnyApiClient.js";

export interface ChainlinkAnyApiClientInitializeArgs {
    admin: Parameters<ChainlinkAnyApiClient["initialize"]>[0];
    contractUri?: Parameters<ChainlinkAnyApiClient["initialize"]>[1];
    token: Parameters<ChainlinkAnyApiClient["initialize"]>[2];
    oracle: Parameters<ChainlinkAnyApiClient["initialize"]>[3];
}

export function initializeUtil(args: ChainlinkAnyApiClientInitializeArgs) {
    const { admin, contractUri, token, oracle } = args;
    return [admin, contractUri ?? "", token, oracle] as [
        Parameters<ChainlinkAnyApiClient["initialize"]>[0],
        Parameters<ChainlinkAnyApiClient["initialize"]>[1],
        Parameters<ChainlinkAnyApiClient["initialize"]>[2],
        Parameters<ChainlinkAnyApiClient["initialize"]>[3],
    ];
}
