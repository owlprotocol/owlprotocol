import { useEffect, useMemo, useCallback } from "react";
import { useDispatch } from "react-redux";
import { getReduxErrorCRUD } from "@owlprotocol/crud-redux";

import { NetworkCRUD } from "../../../network/crud.js";
import { SyncCRUD } from "../../../sync/crud.js";
import { GenericSync } from "../../../sync/model/index.js";
import { getBalanceAction as getBalanceAction2, getBalanceSynced } from "../../actions/index.js";
import { ContractCRUD } from "../../crud.js";
import { getDB } from "../../../db.js";

/**
 * Get address balance
 * @category Hooks
 *
 */
export function useGetBalance(
    networkId: string | undefined,
    address: string | undefined,
    sync = "ifnull" as "ifnull" | GenericSync | false,
) {
    const dispatch = useDispatch();

    const contract = ContractCRUD.hooks.useSelectByIdSingle({
        networkId,
        address,
    });
    const balance = contract?.balance;

    const network = NetworkCRUD.hooks.useSelectByIdSingle(networkId);
    const web3Exists = !!(network?.web3 ?? network?.web3Sender);
    const balanceExists = !!contract?.balance;
    const executeSync = (sync === "ifnull" && !balanceExists) || (sync != false && sync !== "ifnull"); //refresh

    //Action
    const { getBalanceAction, syncAction } =
        useMemo(() => {
            if (networkId && address) {
                //@ts-expect-error
                if (!!sync && sync != "ifnull" && sync != "once") {
                    return getBalanceSynced({ networkId, address, sync });
                } else {
                    const getBalanceAction = getBalanceAction2({
                        networkId,
                        address,
                    });
                    return { getBalanceAction, syncAction: undefined };
                }
            }
            // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [networkId, address, JSON.stringify(sync)]) ?? {};
    //Callback
    const dispatchGetBalance = useCallback(() => {
        if (getBalanceAction) dispatch(getBalanceAction);
    }, [dispatch, getBalanceAction]);
    //Initial call
    useEffect(() => {
        if (web3Exists && executeSync) dispatchGetBalance();
    }, [dispatchGetBalance, web3Exists, executeSync]);

    //Sync
    const syncId = syncAction?.payload.id;
    useEffect(() => {
        if (syncAction) dispatch(syncAction);
        return () => {
            if (syncId) dispatch(SyncCRUD.actions.delete({ id: syncId }));
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch, syncId]);

    //Error
    const [reduxError] = getReduxErrorCRUD(getDB).hooks.useGet(getBalanceAction?.meta.uuid);
    const error = useMemo(() => {
        if (!networkId) return new Error("networkId undefined");
        else if (!address) return new Error("address undefined");
        else if (!!reduxError) {
            const err = new Error(reduxError.errorMessage);
            err.stack = reduxError.stack;
            return err;
        }
    }, [networkId, address, reduxError]);

    const returnOptions = {
        dispatchGetBalance,
        getBalanceAction,
        error,
    };

    return [balance, returnOptions] as [typeof balance, typeof returnOptions];
}
