import { Action } from "redux";
import { ContractHelpers } from "../../common/contracts.js";

export function fetchAssetRouterInput(networkId: string, address: string, account: string | undefined): Action[] {
    //Actions to dispatch
    const actions: Action[] = [];
    if (account) {
        actions.push(
            ContractHelpers.IAssetRouterInput.SupportsInputAsset.getPast({
                networkId,
                address,
            }),
        );
    }
    return actions;
}
