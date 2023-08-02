import type { AnyAction } from "@reduxjs/toolkit";
import { ContractCustomActions } from "../contract/contracts.js";

export function fetchERC721Metadata(networkId: string, address: string): AnyAction[] {
    const actions: AnyAction[] = [];
    actions.push(
        ContractCustomActions.IERC721Metadata.name({
            networkId,
            to: address,
            args: [],
            maxCacheAge: Number.MAX_SAFE_INTEGER,
        }),
        ContractCustomActions.IERC721Metadata.symbol({
            networkId,
            to: address,
            args: [],
            maxCacheAge: Number.MAX_SAFE_INTEGER,
        }),
    );
    return actions;
}
