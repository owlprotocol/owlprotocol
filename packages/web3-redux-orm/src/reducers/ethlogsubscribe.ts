import {
    EthLogSubscribeId,
    EthLogSubscribe,
    EthLogSubscribeName,
    EthLogSubscribeWithObjects,
} from "@owlprotocol/web3-models";
import { EthLogSubscribeCRUDActions } from "@owlprotocol/web3-actions";
import { validateWithReduxEthLogSubscribe } from "@owlprotocol/web3-models";
import { createCRUDReducer } from "@owlprotocol/crud-redux-orm";

export const EthLogSubscribeReducer = createCRUDReducer<
    typeof EthLogSubscribeName,
    EthLogSubscribeId,
    EthLogSubscribe,
    EthLogSubscribeWithObjects
>(
    EthLogSubscribeName,
    { validateWithRedux: validateWithReduxEthLogSubscribe },
    {
        //@ts-expect-error
        isReduxUpsertAction: EthLogSubscribeCRUDActions.actions.reduxUpsert.match,
        //@ts-expect-error
        isReduxUpsertBatchedAction: EthLogSubscribeCRUDActions.actions.reduxUpsertBatched.match,
        //@ts-expect-error
        isReduxDeleteAction: EthLogSubscribeCRUDActions.actions.reduxDelete.match,
    },
);
