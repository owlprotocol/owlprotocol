import { Action } from "redux";
import { ContractHelpers } from "../../common/contracts.js";

export function fetchERC721Metadata(networkId: string, address: string): Action[] {
    const actions: Action[] = [];
    actions.push(
        ContractHelpers.IERC721Metadata.name({
            networkId,
            to: address,
            args: [],
            maxCacheAge: Number.MAX_SAFE_INTEGER,
        }),
        ContractHelpers.IERC721Metadata.symbol({
            networkId,
            to: address,
            args: [],
            maxCacheAge: Number.MAX_SAFE_INTEGER,
        }),
    );
    return actions;
}
