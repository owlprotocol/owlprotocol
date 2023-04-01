import type { AnyAction } from "@reduxjs/toolkit";
import { ContractActionHelpers } from "./contracts.js";

export function fetchERC721Metadata(networkId: string, address: string): AnyAction[] {
    const actions: AnyAction[] = [];
    actions.push(
        ContractActionHelpers.IERC721Metadata.name({
            networkId,
            to: address,
            args: [],
            maxCacheAge: Number.MAX_SAFE_INTEGER,
        }),
        ContractActionHelpers.IERC721Metadata.symbol({
            networkId,
            to: address,
            args: [],
            maxCacheAge: Number.MAX_SAFE_INTEGER,
        }),
    );
    return actions;
}
