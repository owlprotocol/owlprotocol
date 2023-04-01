import type { AnyAction } from "@reduxjs/toolkit";
import { ContractActionHelpers } from "./contracts.js";

export function fetchAssetRouterOutput(
    networkId: string,
    address: string,
    account: string | undefined | null,
): AnyAction[] {
    //Actions to dispatch
    const actions: AnyAction[] = [];
    if (account) {
        actions.push(
            ContractActionHelpers.IAssetRouterOutput.SupportsOutputAsset.getPast({
                networkId,
                address,
            }),
        );
    }
    return actions;
}
