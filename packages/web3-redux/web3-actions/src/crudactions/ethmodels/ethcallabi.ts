import {
    EthCallAbiId,
    EthCallAbi,
    validateIdEthCallAbi,
    validateEthCallAbi,
    toPrimaryKeyEthCallAbi,
    EthCallAbiPartial,
} from "@owlprotocol/web3-models";
import { EthCallAbiName } from "@owlprotocol/web3-models";
import { createCRUDActions } from "@owlprotocol/crud-actions";
import { toReduxOrmId } from "@owlprotocol/utils";

export const EthCallAbiCRUDActions = createCRUDActions<
    typeof EthCallAbiName,
    EthCallAbiId,
    EthCallAbi,
    EthCallAbiPartial
>(EthCallAbiName, {
    validateId: validateIdEthCallAbi,
    validate: validateEthCallAbi,
    toPrimaryKeyString: (id: EthCallAbiId) => toReduxOrmId(toPrimaryKeyEthCallAbi(id)),
});
