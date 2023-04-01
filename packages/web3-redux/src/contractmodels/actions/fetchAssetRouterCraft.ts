import { Action } from "redux";
import { ContractHelpers } from "../../common/contracts.js";

export function fetchAssetRouterCraft(networkId: string, address: string, account: string | undefined): Action[] {
    //Actions to dispatch
    const actions: Action[] = [];
    if (account) {
        actions.push(
            ContractHelpers.IAssetRouterCraft.SupportsInputAsset.getPast({
                networkId,
                address,
            }),
            ContractHelpers.IAssetRouterCraft.SupportsOutputAsset.getPast({
                networkId,
                address,
            }),
        );
    }
    return actions;
}
