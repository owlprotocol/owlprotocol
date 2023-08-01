import type { AnyAction } from "@reduxjs/toolkit";
import { ContractCustomActions } from "../contract/contracts.js";

export function fetchERC1820(networkId: string, address: string): AnyAction[] {
    const actions: AnyAction[] = [];
    actions.push(
        ContractCustomActions.IERC1820.InterfaceImplementerSet.getPast({
            networkId,
            address,
        }),
        ContractCustomActions.IERC1820.InterfaceImplementerSet.subscribe({
            networkId,
            address,
        }),
    );
    return actions;
}
