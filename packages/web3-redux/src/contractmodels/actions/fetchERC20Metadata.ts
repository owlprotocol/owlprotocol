import { Action } from "redux";
import { ContractHelpers } from "../../common/contracts.js";

export function fetchERC20Metadata(networkId: string, address: string): Action[] {
    const actions: Action[] = [];
    actions.push(
        ContractHelpers.IERC20Metadata.name({
            networkId,
            to: address,
            args: [],
            maxCacheAge: Number.MAX_SAFE_INTEGER,
        }),
        ContractHelpers.IERC20Metadata.symbol({
            networkId,
            to: address,
            args: [],
            maxCacheAge: Number.MAX_SAFE_INTEGER,
        }),
        ContractHelpers.IERC20Metadata.decimals({
            networkId,
            to: address,
            args: [],
            maxCacheAge: Number.MAX_SAFE_INTEGER,
        }),
        ContractHelpers.IERC20Metadata.totalSupply({
            networkId,
            to: address,
            args: [],
        }),
    );
    return actions;
}
