import {
    EthLogSubscribeId,
    EthLogSubscribe,
    validateIdEthLogSubscribe,
    validateEthLogSubscribe,
    toPrimaryKeyEthLogSubscribe,
    EthLogSubscribePartial,
    EthLogSubscribeWithObjects,
} from "@owlprotocol/web3-models";
import { EthLogSubscribeName } from "@owlprotocol/web3-models";
import { createCRUDActions } from "@owlprotocol/crud-actions";
import { toReduxOrmId } from "@owlprotocol/utils";

export const EthLogSubscribeCRUDActions = createCRUDActions<
    typeof EthLogSubscribeName,
    EthLogSubscribeId,
    EthLogSubscribe,
    EthLogSubscribePartial,
    EthLogSubscribeWithObjects
>(EthLogSubscribeName, {
    validateId: validateIdEthLogSubscribe,
    validate: validateEthLogSubscribe,
    toPrimaryKeyString: (id: EthLogSubscribeId) => toReduxOrmId(toPrimaryKeyEthLogSubscribe(id)),
});
