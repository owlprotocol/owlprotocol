import { useEffect, useMemo } from "react";
import { useDispatch } from "react-redux";
import { NetworkCRUD } from "../../../network/crud.js";
import { fetchAction } from "../actions/fetch.js";
import { EthTransactionCRUD } from "../crud.js";

/**
 * Reads transaction from store and makes a call to fetch transaction.
 * @category Hooks
 * */
export const useTransaction = (networkId: string | undefined, hash: string | undefined) => {
    const dispatch = useDispatch();

    const network = NetworkCRUD.hooks.useSelectByIdSingle(networkId);
    const [transaction, { isLoading }] = EthTransactionCRUD.hooks.useGet({
        networkId,
        hash,
    });
    const exists = isLoading || !!transaction;
    const web3Exists = !!(network?.web3 ?? network?.web3Sender);

    const action = useMemo(() => {
        if (networkId && hash && web3Exists) {
            if (!exists) {
                return fetchAction({ networkId, hash });
            }
        }
    }, [networkId, hash, web3Exists, exists]);

    useEffect(() => {
        if (action) dispatch(action);
    }, [dispatch, action]);

    return transaction;
};
