import type { AnyAction } from "@reduxjs/toolkit";
import { ContractCustomActions } from "../contract/contracts.js";

export function fetchAssetRouterOutput(
    networkId: string,
    address: string,
    account: string | undefined | null,
): AnyAction[] {
    //Actions to dispatch
    const actions: AnyAction[] = [];
    if (account) {
        actions.push(
            ContractCustomActions.IAssetRouterOutput.SupportsOutputAsset.getPast({
                networkId,
                address,
            }),
        );
    }
    return actions;
}
