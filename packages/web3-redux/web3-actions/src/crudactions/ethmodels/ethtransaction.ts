import {
    EthTransactionId,
    EthTransaction,
    validateIdEthTransaction,
    validateEthTransaction,
    toPrimaryKeyEthTransaction,
} from "@owlprotocol/web3-models";
import { EthTransactionName } from "@owlprotocol/web3-models";
import { createCRUDActions } from "@owlprotocol/crud-actions";
import { toReduxOrmId } from "@owlprotocol/utils";

export const EthTransactionCRUDActions = createCRUDActions<
    typeof EthTransactionName,
    EthTransactionId,
    EthTransaction,
    EthTransaction
>(EthTransactionName, {
    validateId: validateIdEthTransaction,
    validate: validateEthTransaction,
    toPrimaryKeyString: (id: EthTransactionId) => toReduxOrmId(toPrimaryKeyEthTransaction(id)),
});
