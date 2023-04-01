import type { AnyAction } from "@reduxjs/toolkit";
import { ContractActionHelpers } from "./contracts.js";

export function fetchERC1820(networkId: string, address: string): AnyAction[] {
    const actions: AnyAction[] = [];
    actions.push(
        ContractActionHelpers.IERC1820.InterfaceImplementerSet.getPast({
            networkId,
            address,
        }),
        ContractActionHelpers.IERC1820.InterfaceImplementerSet.subscribe({
            networkId,
            address,
        }),
    );
    return actions;
}
