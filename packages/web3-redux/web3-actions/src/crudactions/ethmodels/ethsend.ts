import {
    EthSendId,
    EthSend,
    validateIdEthSend,
    validateEthSend,
    toPrimaryKeyEthSend,
    EthSendPartial,
} from "@owlprotocol/web3-models";
import { EthSendName } from "@owlprotocol/web3-models";
import { createCRUDActions } from "@owlprotocol/crud-actions";
import { toReduxOrmId } from "@owlprotocol/utils";

export const EthSendCRUDActions = createCRUDActions<typeof EthSendName, EthSendId, EthSend, EthSendPartial>(
    EthSendName,
    {
        validateId: validateIdEthSend,
        validate: validateEthSend,
        toPrimaryKeyString: (id: EthSendId) => toReduxOrmId(toPrimaryKeyEthSend(id)),
    },
);
