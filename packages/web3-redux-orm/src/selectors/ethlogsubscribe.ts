import { createCRUDSelectors } from "@owlprotocol/crud-redux-orm";
import {
    EthLogSubscribeId,
    EthLogSubscribe,
    EthLogSubscribeName,
    EthLogSubscribeWithObjects,
    toPrimaryKeyEthLogSubscribe,
} from "@owlprotocol/web3-models";
import { toReduxOrmId } from "@owlprotocol/utils";
import { orm } from "../orm.js";

export const EthLogSubscribeSelectors = createCRUDSelectors<
    typeof EthLogSubscribeName,
    EthLogSubscribeId,
    EthLogSubscribe,
    EthLogSubscribeWithObjects
>(
    EthLogSubscribeName,
    {
        toPrimaryKeyString: (id: EthLogSubscribeId | string) =>
            typeof id === "string" ? id : toReduxOrmId(toPrimaryKeyEthLogSubscribe(id)),
    },
    orm,
);
