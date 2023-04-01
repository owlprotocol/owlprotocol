import { interfaceIdNames, interfaces } from "@owlprotocol/contracts";
import { Action } from "redux";
import { ContractHelpers } from "../../common/contracts.js";

export function fetchERC165(networkId: string, address: string): Action[] {
    const actions = Object.keys(interfaceIdNames)
        //Only fetch ERC165 if it is supported
        .filter((interfaceId) => interfaceId != interfaces.IERC165.interfaceId)
        .map((interfaceId) =>
            ContractHelpers.IERC165.supportsInterface({
                networkId,
                to: address,
                args: [interfaceId],
                maxCacheAge: Number.MAX_SAFE_INTEGER,
            }),
        );
    return actions;
}

export function fetchERC165Supported(networkId: string, address: string): Action[] {
    const action = ContractHelpers.IERC165.supportsInterface({
        networkId,
        to: address,
        args: [interfaces.IERC165.interfaceId],
        maxCacheAge: Number.MAX_SAFE_INTEGER,
    });
    return [action];
}
