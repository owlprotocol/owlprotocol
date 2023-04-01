import { ERC20Id, ERC20, validateIdERC20, validateERC20, toPrimaryKeyERC20 } from "@owlprotocol/web3-models";
import { ERC20Name } from "@owlprotocol/web3-models";
import { createCRUDActions } from "@owlprotocol/crud-actions";
import { toReduxOrmId } from "@owlprotocol/utils";

export const ERC20CRUDActions = createCRUDActions<typeof ERC20Name, ERC20Id, ERC20, ERC20>(ERC20Name, {
    validateId: validateIdERC20,
    validate: validateERC20,
    toPrimaryKeyString: (id: ERC20Id) => toReduxOrmId(toPrimaryKeyERC20(id)),
});
