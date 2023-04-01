import { useEffect, useMemo } from "react";
import { useDispatch } from "react-redux";
import { fetchAction } from "../actions/index.js";
import { BlockCRUD } from "../crud.js";
import { NetworkCRUD } from "../../../network/crud.js";

/**
 * Reads block from store and makes a call to fetch block.
 * @category Hooks
 * */
export const useBlock = (
    networkId: string | undefined,
    number: number | undefined,
    returnTransactionObjects = false,
) => {
    const dispatch = useDispatch();

    const network = NetworkCRUD.hooks.useSelectByIdSingle(networkId);
    const [block, { isLoading }] = BlockCRUD.hooks.useGet({
        networkId,
        number,
    });
    const exists = isLoading || !!block;
    const web3Exists = !!(network?.web3 ?? network?.web3Sender);

    const action = useMemo(() => {
        if (networkId && number && web3Exists) {
            if (!exists) {
                return fetchAction({
                    networkId,
                    blockNumber: number,
                    returnTransactionObjects,
                });
            }
        }
    }, [networkId, number, web3Exists, exists, returnTransactionObjects]);

    useEffect(() => {
        if (action) dispatch(action);
    }, [dispatch, action]);

    return block;
};
