import { Action } from "redux";
import { ContractHelpers } from "../../common/contracts.js";

export function fetchAccessControl(networkId: string, address: string): Action[] {
    const actions: Action[] = [];
    actions.push(
        ContractHelpers.IAccessControl.RoleAdminChanged.getPast({
            networkId,
            address,
        }),
        ContractHelpers.IAccessControl.RoleGranted.getPast({
            networkId,
            address,
        }),
        ContractHelpers.IAccessControl.RoleRevoked.getPast({
            networkId,
            address,
        }),
    );
    return actions;
}
