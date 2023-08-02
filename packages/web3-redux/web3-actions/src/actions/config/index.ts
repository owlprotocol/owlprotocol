import { ConfigCRUDActions } from "../../crudactions/config.js";

/** @category Actions */
export const setConfigAccount = (account: string | null, uuid?: string | undefined, ts?: number | undefined) =>
    ConfigCRUDActions.actions.set({ id: { id: "0" }, key: "account", value: account }, uuid, ts);
/** @category Actions */
export const setConfigNetworkId = (networkId: string | null, uuid?: string | undefined, ts?: number | undefined) =>
    ConfigCRUDActions.actions.set({ id: { id: "0" }, key: "networkId", value: networkId }, uuid, ts);

export const ConfigActions = {
    ...ConfigCRUDActions,
    actions: {
        ...ConfigCRUDActions.actions,
        setAccount: setConfigAccount,
        setNetworkId: setConfigNetworkId,
    },
};
