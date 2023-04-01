import {
    EthCallId,
    EthCall,
    validateIdEthCall,
    validateEthCall,
    toPrimaryKeyEthCall,
    EthCallPartial,
} from "@owlprotocol/web3-models";
import { EthCallName } from "@owlprotocol/web3-models";
import { createCRUDActions } from "@owlprotocol/crud-actions";
import { toReduxOrmId } from "@owlprotocol/utils";

export const EthCallCRUDActions = createCRUDActions<typeof EthCallName, EthCallId, EthCall, EthCallPartial>(
    EthCallName,
    {
        validateId: validateIdEthCall,
        validate: validateEthCall,
        toPrimaryKeyString: (id: EthCallId) => toReduxOrmId(toPrimaryKeyEthCall(id)),
    },
);
