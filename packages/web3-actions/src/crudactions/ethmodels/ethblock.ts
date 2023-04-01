import {
    EthBlockId,
    EthBlock,
    validateIdEthBlock,
    validateEthBlock,
    toPrimaryKeyEthBlock,
} from "@owlprotocol/web3-models";
import { EthBlockName } from "@owlprotocol/web3-models";
import { createCRUDActions } from "@owlprotocol/crud-actions";
import { toReduxOrmId } from "@owlprotocol/utils";

export const EthBlockCRUDActions = createCRUDActions<typeof EthBlockName, EthBlockId, EthBlock, EthBlock>(
    EthBlockName,
    {
        validateId: validateIdEthBlock,
        validate: validateEthBlock,
        toPrimaryKeyString: (id: EthBlockId) => toReduxOrmId(toPrimaryKeyEthBlock(id)),
    },
);
