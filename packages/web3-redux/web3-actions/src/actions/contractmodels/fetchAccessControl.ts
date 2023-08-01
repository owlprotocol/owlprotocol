import type { AnyAction } from "@reduxjs/toolkit";
import { ContractCustomActions } from "../contract/contracts.js";

export function fetchAccessControl(networkId: string, address: string): AnyAction[] {
    const actions: AnyAction[] = [];
    actions.push(
        ContractCustomActions.IAccessControl.RoleAdminChanged.getPast({
            networkId,
            address,
        }),
        ContractCustomActions.IAccessControl.RoleGranted.getPast({
            networkId,
            address,
        }),
        ContractCustomActions.IAccessControl.RoleRevoked.getPast({
            networkId,
            address,
        }),
    );
    return actions;
}
