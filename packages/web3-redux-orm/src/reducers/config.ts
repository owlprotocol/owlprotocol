import { ConfigId, Config, ConfigName, ConfigWithObjects } from "@owlprotocol/web3-models";
import { ConfigCRUDActions } from "@owlprotocol/web3-actions";
import { validateWithReduxConfig } from "@owlprotocol/web3-models";
import { createCRUDReducer } from "@owlprotocol/crud-redux-orm";

export const ConfigReducer = createCRUDReducer<typeof ConfigName, ConfigId, Config, ConfigWithObjects>(
    ConfigName,
    { validateWithRedux: validateWithReduxConfig },
    {
        //@ts-expect-error
        isReduxUpsertAction: ConfigCRUDActions.actions.reduxUpsert.match,
        //@ts-expect-error
        isReduxUpsertBatchedAction: ConfigCRUDActions.actions.reduxUpsertBatched.match,
        //@ts-expect-error
        isReduxDeleteAction: ConfigCRUDActions.actions.reduxDelete.match,
    },
);
