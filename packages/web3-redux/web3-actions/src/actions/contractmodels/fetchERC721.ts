import type { AnyAction } from "@reduxjs/toolkit";
import { ContractCustomActions } from "../contract/contracts.js";

export function fetchERC721(networkId: string, address: string, account: string | undefined | null): AnyAction[] {
    const actions: AnyAction[] = [];
    if (account) {
        actions.push(
            ContractCustomActions.IERC721.balanceOf({
                networkId,
                to: address,
                args: [account],
            }),
        );
    }
    return actions;
}
