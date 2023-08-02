import { ERC1155Id, ERC1155, validateIdERC1155, validateERC1155, toPrimaryKeyERC1155 } from "@owlprotocol/web3-models";
import { ERC1155Name } from "@owlprotocol/web3-models";
import { createCRUDActions } from "@owlprotocol/crud-actions";
import { toReduxOrmId } from "@owlprotocol/utils";

export const ERC1155CRUDActions = createCRUDActions<typeof ERC1155Name, ERC1155Id, ERC1155, ERC1155>(ERC1155Name, {
    validateId: validateIdERC1155,
    validate: validateERC1155,
    toPrimaryKeyString: (id: ERC1155Id) => toReduxOrmId(toPrimaryKeyERC1155(id)),
});
