import { Action } from "redux";
import { ContractHelpers } from "../../common/contracts.js";

export function fetchERC721TopDown(networkId: string, address: string): Action[] {
    const actions: Action[] = [];
    actions.push(
        ContractHelpers.IERC721TopDown.getChildContracts({
            networkId,
            to: address,
            args: [],
            maxCacheAge: Number.MAX_SAFE_INTEGER,
        }),
    );
    return actions;
}
