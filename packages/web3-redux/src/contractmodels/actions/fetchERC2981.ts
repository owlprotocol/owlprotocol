import { Action } from "redux";
import { ContractHelpers } from "../../common/contracts.js";

export function fetchERC2981(networkId: string, address: string): Action[] {
    const actions: Action[] = [];
    actions.push(
        ContractHelpers.IERC2981.royaltyInfo({
            networkId,
            to: address,
            args: [1, 1000],
            maxCacheAge: Number.MAX_SAFE_INTEGER,
        }),
    );
    return actions;
}
