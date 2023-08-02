import { interfaceIdNames, interfaces } from "@owlprotocol/contracts";
import type { AnyAction } from "@reduxjs/toolkit";
import { ContractCustomActions } from "../contract/contracts.js";

export function fetchERC165(networkId: string, address: string): AnyAction[] {
    const actions = Object.keys(interfaceIdNames)
        //Only fetch ERC165 if it is supported
        .filter((interfaceId) => interfaceId != interfaces.IERC165.interfaceId)
        .map((interfaceId) =>
            ContractCustomActions.IERC165.supportsInterface({
                networkId,
                to: address,
                args: [interfaceId],
                maxCacheAge: Number.MAX_SAFE_INTEGER,
            }),
        );
    return actions;
}

export function fetchERC165Supported(networkId: string, address: string): AnyAction[] {
    const action = ContractCustomActions.IERC165.supportsInterface({
        networkId,
        to: address,
        args: [interfaces.IERC165.interfaceId],
        maxCacheAge: Number.MAX_SAFE_INTEGER,
    });
    return [action];
}
