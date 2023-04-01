/**
 * Config module
 * Global Config for current network, account, and api urls.
 * @module Config
 */

import * as Actions from "./actions/index.js";
import { ConfigCRUD } from "./crud.js";
import { configSaga } from "./sagas/index.js";
import * as Hooks from "./hooks/index.js";

export const Config = {
    name: ConfigCRUD.name,
    actionTypes: ConfigCRUD.actionTypes,
    actions: {
        ...ConfigCRUD.actions,
        set: Actions.set,
        setAccount: Actions.setAccount,
        setNetworkId: Actions.setNetworkId,
    },
    sagas: {
        ...ConfigCRUD.sagas,
        rootSaga: configSaga,
    },
    hooks: {
        ...ConfigCRUD.hooks,
        useConfig: Hooks.useConfig,
        useAccount: Hooks.useAccount,
        useNetworkId: Hooks.useNetworkId,
    },
    selectors: ConfigCRUD.selectors,
    isAction: ConfigCRUD.isAction,
    reducer: ConfigCRUD.reducer,
    validate: ConfigCRUD.validate,
    validateId: ConfigCRUD.validateId,
    validateWithRedux: ConfigCRUD.validateWithRedux,
    encode: ConfigCRUD.encode,
};
