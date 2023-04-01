import {
    EthLogId,
    EthLog,
    validateIdEthLog,
    validateEthLog,
    toPrimaryKeyEthLog,
    EthLogPartial,
} from "@owlprotocol/web3-models";
import { EthLogName } from "@owlprotocol/web3-models";
import { createCRUDActions } from "@owlprotocol/crud-actions";
import { toReduxOrmId } from "@owlprotocol/utils";

export const EthLogCRUDActions = createCRUDActions<typeof EthLogName, EthLogId, EthLog, EthLogPartial>(EthLogName, {
    validateId: validateIdEthLog,
    validate: validateEthLog,
    toPrimaryKeyString: (id: EthLogId) => toReduxOrmId(toPrimaryKeyEthLog(id)),
});
