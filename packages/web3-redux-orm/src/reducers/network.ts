import { NetworkId, Network, NetworkName, NetworkWithObjects } from "@owlprotocol/web3-models";
import { NetworkCRUDActions } from "@owlprotocol/web3-actions";
import { validateWithReduxNetwork } from "@owlprotocol/web3-models";
import { createCRUDReducer } from "@owlprotocol/crud-redux-orm";

export const NetworkReducer = createCRUDReducer<typeof NetworkName, NetworkId, Network, NetworkWithObjects>(
    NetworkName,
    { validateWithRedux: validateWithReduxNetwork },
    {
        //@ts-expect-error
        isReduxUpsertAction: NetworkCRUDActions.actions.reduxUpsert.match,
        //@ts-expect-error
        isReduxUpsertBatchedAction: NetworkCRUDActions.actions.reduxUpsertBatched.match,
        //@ts-expect-error
        isReduxDeleteAction: NetworkCRUDActions.actions.reduxDelete.match,
    },
);
