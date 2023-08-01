import { createCRUDDexieHooks } from "@owlprotocol/crud-dexie-hooks";
import {
    ConfigDexie,
    Config,
    ConfigKeyId,
    ConfigKeyIdx,
    ConfigKeyIdEq,
    ConfigKeyIdxEq,
    ConfigKeyIdxEqAny,
} from "@owlprotocol/web3-dexie";
import { ConfigActions } from "@owlprotocol/web3-actions";
import { useCallback } from "react";
import { useDispatch } from "react-redux";

const ConfigDexieHooksBase = createCRUDDexieHooks<
    Config,
    ConfigKeyId,
    ConfigKeyIdx,
    ConfigKeyIdEq,
    ConfigKeyIdxEq,
    ConfigKeyIdxEqAny
>(ConfigDexie);

/**
 * @category Hooks
 * Returns the Config.withId(0).
 * Create/validateWithRedux depending on db state.
 */
export function useConfig() {
    const dispatch = useDispatch();
    const [config, returnOptions] = ConfigDexieHooksBase.useGet({ id: "0" });

    const setAccountCallback = useCallback(
        (account: string) => {
            dispatch(ConfigActions.actions.setAccount(account));
        },
        [dispatch],
    );

    const setNetworkIdCallback = useCallback(
        (networkId: string) => {
            dispatch(ConfigActions.actions.setNetworkId(networkId));
        },
        [dispatch],
    );

    const returnOptions2 = {
        ...returnOptions,
        setAccount: setAccountCallback,
        setNetworkId: setNetworkIdCallback,
    };

    return [config, returnOptions2] as [typeof config, typeof returnOptions2];
}

/**
 * @category Hooks
 * Returns the currently globally configured account and a setAccount
 * callback that will automatically dispatch an action.
 */
export function useAccount() {
    const [config, { setAccount }] = useConfig();
    const account = config?.account;
    return [account, setAccount] as [typeof account, typeof setAccount];
}

/**
 * @category Hooks
 * Returns the currently globally configured networkId and a setNetworkId
 * callback that will automatically dispatch an action.
 */
export function useNetworkId() {
    const [config, { setNetworkId }] = useConfig();
    const networkId = config?.networkId;
    return [networkId, setNetworkId] as [typeof networkId, typeof setNetworkId];
}

export const ConfigDexieHooks = {
    ...ConfigDexieHooksBase,
    useConfig,
    useAccount,
    useNetworkId,
};
