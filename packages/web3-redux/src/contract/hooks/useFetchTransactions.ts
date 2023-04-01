import { useEffect, useMemo } from "react";
import { useDispatch } from "react-redux";

import { fetchTransactions } from "../actions/index.js";
import { FetchTransactionOptions } from "../actions/fetchTransactions.js";
import { EthTransactionCRUD } from "../../ethmodels/ethtransaction/crud.js";
import { NetworkCRUD } from "../../network/crud.js";

/**
 * Fetch transactions from/to contract using Etherscan API
 * @category Hooks
 *
 */
export function useFetchTransactions(
    networkId: string | undefined,
    address: string | undefined,
    options = {} as FetchTransactionOptions,
) {
    const dispatch = useDispatch();
    const { startblock, endblock, page, offset, sort } = options;

    const network = NetworkCRUD.hooks.useSelectByIdSingle(networkId);
    const transactionsFrom = EthTransactionCRUD.hooks.useWhere(
        address && networkId ? { from: address, networkId } : undefined,
    );
    const transactionsTo =
        EthTransactionCRUD.hooks.useWhere(address && networkId ? { to: address, networkId } : undefined) ?? [];
    //const transactionsGenesisTx =
    //  EthTransactionCRUD.hooks.useWhere(address ? { contractAddress: address } : undefined) ?? [];

    const explorerApiExists = !!network?.explorerApiClient;

    //Fetch transactions (Etherscan)
    const fetchTransactionsAction = useMemo(() => {
        if (networkId && address && explorerApiExists) {
            return fetchTransactions({ networkId, address, ...options });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [networkId, address, options, startblock, endblock, page, offset, sort, explorerApiExists]);

    useEffect(() => {
        if (fetchTransactionsAction) dispatch(fetchTransactionsAction);
    }, [dispatch, fetchTransactionsAction]);

    return {
        from: transactionsFrom,
        to: transactionsTo,
        //genesis: transactionsGenesisTx,
    };
}
