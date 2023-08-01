import { createCRUDHooks } from "@owlprotocol/crud-redux-orm-hooks";
import {
    EthLogSubscribe,
    EthLogSubscribeId,
    EthLogSubscribeName,
    EthLogSubscribeWithObjects,
} from "@owlprotocol/web3-models";
import { EthLogSubscribeSelectors } from "@owlprotocol/web3-redux-orm";

export const EthLogSubscribeSelectorHooks = createCRUDHooks<
    typeof EthLogSubscribeName,
    EthLogSubscribeId,
    EthLogSubscribe,
    any,
    EthLogSubscribeWithObjects
>(EthLogSubscribeSelectors);
