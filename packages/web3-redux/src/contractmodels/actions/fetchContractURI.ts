import { Action } from "redux";
import { ContractHelpers } from "../../common/contracts.js";

export function fetchContractURI(networkId: string, address: string): Action[] {
    const actions: Action[] = [];
    actions.push(
        ContractHelpers.IContractURI.contractURI({
            networkId,
            to: address,
            args: [],
            maxCacheAge: Number.MAX_SAFE_INTEGER,
        }),
    );
    return actions;
}
