import type { AnyAction } from "@reduxjs/toolkit";
import { ContractActionHelpers } from "./contracts.js";

export function fetchAssetRouterCraft(
    networkId: string,
    address: string,
    account: string | undefined | null,
): AnyAction[] {
    //Actions to dispatch
    const actions: AnyAction[] = [];
    if (account) {
        actions.push(
            ContractActionHelpers.IAssetRouterCraft.SupportsInputAsset.getPast({
                networkId,
                address,
            }),
            ContractActionHelpers.IAssetRouterCraft.SupportsOutputAsset.getPast({
                networkId,
                address,
            }),
        );
    }
    return actions;
}
