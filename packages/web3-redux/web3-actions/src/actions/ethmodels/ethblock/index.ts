export * from "./fetch.js";
export * from "./subscribe.js";
export * from "./unsubscribe.js";

import { fetchBlockAction } from "./fetch.js";
import { subscribeAction } from "./subscribe.js";
import { unsubscribeAction } from "./unsubscribe.js";
import { EthBlockCRUDActions } from "../../../crudactions/ethmodels/ethblock.js";

export const EthBlockActions = {
    ...EthBlockCRUDActions,
    actions: {
        ...EthBlockCRUDActions.actions,
        fetchBlock: fetchBlockAction,
        subscribeBlocks: subscribeAction,
        unsubscribeBlocks: unsubscribeAction,
    },
};
