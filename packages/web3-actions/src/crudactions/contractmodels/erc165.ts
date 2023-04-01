import { ERC165Id, ERC165, validateIdERC165, validateERC165, toPrimaryKeyERC165 } from "@owlprotocol/web3-models";
import { ERC165Name } from "@owlprotocol/web3-models";
import { createCRUDActions } from "@owlprotocol/crud-actions";
import { toReduxOrmId } from "@owlprotocol/utils";

export const ERC165CRUDActions = createCRUDActions<typeof ERC165Name, ERC165Id, ERC165, ERC165>(ERC165Name, {
    validateId: validateIdERC165,
    validate: validateERC165,
    toPrimaryKeyString: (id: ERC165Id) => toReduxOrmId(toPrimaryKeyERC165(id)),
});
