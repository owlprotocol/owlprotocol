/**
 * EVM network config module.
 * Store EVM network parameters such as RPC url, web3/web3Sender instances
 * and other relevant data such as block explorer urls.
 * @module Network
 */

import * as Actions from "./actions/index.js";
import { NetworkCRUD } from "./crud.js";
import { networkSaga } from "./sagas/index.js";
import * as Hooks from "./hooks/index.js";
import { defaultNetworks } from "./defaults.js";

export type { NetworkWithObjects, Network as NetworkData } from "./model/index.js";

export const Network = {
    name: NetworkCRUD.name,
    actionTypes: NetworkCRUD.actionTypes,
    actions: {
        ...NetworkCRUD.actions,
        getBlockNumber: Actions.getBlockNumberAction,
        getChainId: Actions.getChainId,
    },
    db: NetworkCRUD.db,
    sagas: {
        ...NetworkCRUD.sagas,
        rootSaga: networkSaga,
    },
    hooks: {
        ...NetworkCRUD.hooks,
        useLatestBlock: Hooks.useLatestBlock,
        useLatestBlockNumber: Hooks.useLatestBlockNumber,
        useNetworkIds: Hooks.useNetworkIds,
    },
    defaultNetworks,
    selectors: NetworkCRUD.selectors,
    isAction: NetworkCRUD.isAction,
    reducer: NetworkCRUD.reducer,
    validate: NetworkCRUD.validate,
    validateId: NetworkCRUD.validateId,
    validateWithRedux: NetworkCRUD.validateWithRedux,
    encode: NetworkCRUD.encode,
};
