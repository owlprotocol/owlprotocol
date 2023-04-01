import type { AnyAction } from "@reduxjs/toolkit";
import { ContractActionHelpers } from "./contracts.js";

export function fetchContractURI(networkId: string, address: string): AnyAction[] {
    const actions: AnyAction[] = [];
    actions.push(
        ContractActionHelpers.IContractURI.contractURI({
            networkId,
            to: address,
            args: [],
            maxCacheAge: Number.MAX_SAFE_INTEGER,
        }),
    );
    return actions;
}
