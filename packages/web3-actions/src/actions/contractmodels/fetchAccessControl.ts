import type { AnyAction } from "@reduxjs/toolkit";
import { ContractActionHelpers } from "./contracts.js";

export function fetchAccessControl(networkId: string, address: string): AnyAction[] {
    const actions: AnyAction[] = [];
    actions.push(
        ContractActionHelpers.IAccessControl.RoleAdminChanged.getPast({
            networkId,
            address,
        }),
        ContractActionHelpers.IAccessControl.RoleGranted.getPast({
            networkId,
            address,
        }),
        ContractActionHelpers.IAccessControl.RoleRevoked.getPast({
            networkId,
            address,
        }),
    );
    return actions;
}
