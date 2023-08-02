import {
    EthLogQueryId,
    EthLogQuery,
    validateIdEthLogQuery,
    validateEthLogQuery,
    toPrimaryKeyEthLogQuery,
    EthLogQueryPartial,
} from "@owlprotocol/web3-models";
import { EthLogQueryName } from "@owlprotocol/web3-models";
import { createCRUDActions } from "@owlprotocol/crud-actions";
import { toReduxOrmId } from "@owlprotocol/utils";

export const EthLogQueryCRUDActions = createCRUDActions<
    typeof EthLogQueryName,
    EthLogQueryId,
    EthLogQuery,
    EthLogQueryPartial
>(EthLogQueryName, {
    validateId: validateIdEthLogQuery,
    validate: validateEthLogQuery,
    toPrimaryKeyString: (id: EthLogQueryId) => toReduxOrmId(toPrimaryKeyEthLogQuery(id)),
});
