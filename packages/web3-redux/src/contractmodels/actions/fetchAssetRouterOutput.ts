import { Action } from "redux";
import { ContractHelpers } from "../../common/contracts.js";

export function fetchAssetRouterOutput(networkId: string, address: string, account: string | undefined): Action[] {
    //Actions to dispatch
    const actions: Action[] = [];
    if (account) {
        actions.push(
            ContractHelpers.IAssetRouterOutput.SupportsOutputAsset.getPast({
                networkId,
                address,
            }),
        );
    }
    return actions;
}
