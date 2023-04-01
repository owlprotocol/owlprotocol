import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { setAccount, setNetworkId } from "../actions/index.js";
import { ConfigCRUD } from "../crud.js";

/**
 * @category Hooks
 * Returns the Config.withId(0).
 * Create/validateWithRedux depending on db state.
 */
export function useConfig() {
    const dispatch = useDispatch();
    const [config, returnOptions] = ConfigCRUD.hooks.useGet("0");

    const setAccountCallback = useCallback(
        (account: string) => {
            dispatch(setAccount(account));
        },
        [dispatch],
    );

    const setNetworkIdCallback = useCallback(
        (networkId: string) => {
            dispatch(setNetworkId(networkId));
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
