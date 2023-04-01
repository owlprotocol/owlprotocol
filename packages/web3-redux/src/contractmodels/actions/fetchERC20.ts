import { Action } from "redux";
import { ContractHelpers } from "../../common/contracts.js";

export function fetchERC20(networkId: string, address: string, account: string | undefined): Action[] {
    const actions: Action[] = [];
    if (account) {
        actions.push(
            ContractHelpers.IERC20.balanceOf({
                networkId,
                to: address,
                args: [account],
            }),
        );
    }
    return actions;
}
