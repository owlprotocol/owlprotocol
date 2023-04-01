import { createCRUDActions } from "@owlprotocol/crud-actions";
import { toReduxOrmId } from "@owlprotocol/utils";
import {
    Contract,
    ContractId,
    ContractName,
    toPrimaryKeyContract,
    validateContract,
    validateIdContract,
} from "@owlprotocol/web3-models";

export const ContractCRUDActions = createCRUDActions<typeof ContractName, ContractId, Contract>(ContractName, {
    validateId: validateIdContract,
    validate: validateContract,
    toPrimaryKeyString: (id: ContractId) => toReduxOrmId(toPrimaryKeyContract(id)),
});
