import {
    EthLogAbiId,
    EthLogAbi,
    validateIdEthLogAbi,
    validateEthLogAbi,
    toPrimaryKeyEthLogAbi,
    EthLogAbiPartial,
} from "@owlprotocol/web3-models";
import { EthLogAbiName } from "@owlprotocol/web3-models";
import { createCRUDActions } from "@owlprotocol/crud-actions";
import { toReduxOrmId } from "@owlprotocol/utils";

export const EthLogAbiCRUDActions = createCRUDActions<typeof EthLogAbiName, EthLogAbiId, EthLogAbi, EthLogAbiPartial>(
    EthLogAbiName,
    {
        validateId: validateIdEthLogAbi,
        validate: validateEthLogAbi,
        toPrimaryKeyString: (id: EthLogAbiId) => toReduxOrmId(toPrimaryKeyEthLogAbi(id)),
    },
);
