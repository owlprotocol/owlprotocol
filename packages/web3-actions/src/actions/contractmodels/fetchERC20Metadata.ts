import type { AnyAction } from "@reduxjs/toolkit";
import { ContractActionHelpers } from "./contracts.js";

export function fetchERC20Metadata(networkId: string, address: string): AnyAction[] {
    const actions: AnyAction[] = [];
    actions.push(
        ContractActionHelpers.IERC20Metadata.name({
            networkId,
            to: address,
            args: [],
            maxCacheAge: Number.MAX_SAFE_INTEGER,
        }),
        ContractActionHelpers.IERC20Metadata.symbol({
            networkId,
            to: address,
            args: [],
            maxCacheAge: Number.MAX_SAFE_INTEGER,
        }),
        ContractActionHelpers.IERC20Metadata.decimals({
            networkId,
            to: address,
            args: [],
            maxCacheAge: Number.MAX_SAFE_INTEGER,
        }),
        ContractActionHelpers.IERC20Metadata.totalSupply({
            networkId,
            to: address,
            args: [],
        }),
    );
    return actions;
}
