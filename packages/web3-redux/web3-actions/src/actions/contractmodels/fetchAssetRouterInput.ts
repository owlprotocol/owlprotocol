import type { AnyAction } from "@reduxjs/toolkit";
import { ContractCustomActions } from "../contract/contracts.js";

export function fetchAssetRouterInput(
    networkId: string,
    address: string,
    account: string | undefined | null,
): AnyAction[] {
    //Actions to dispatch
    const actions: AnyAction[] = [];
    if (account) {
        actions.push(
            ContractCustomActions.IAssetRouterInput.SupportsInputAsset.getPast({
                networkId,
                address,
            }),
        );
    }
    return actions;
}
