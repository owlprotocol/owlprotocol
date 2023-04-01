import { Action } from "redux";
import { ContractHelpers } from "../../common/contracts.js";

export function fetchERC1820(networkId: string, address: string): Action[] {
    const actions: Action[] = [];
    actions.push(
        ContractHelpers.IERC1820.InterfaceImplementerSet.getPast({
            networkId,
            address,
        }),
        ContractHelpers.IERC1820.InterfaceImplementerSet.subscribe({
            networkId,
            address,
        }),
    );
    return actions;
}
