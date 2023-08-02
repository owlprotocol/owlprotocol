import { ERC721Id, ERC721, validateIdERC721, validateERC721, toPrimaryKeyERC721 } from "@owlprotocol/web3-models";
import { ERC721Name } from "@owlprotocol/web3-models";
import { createCRUDActions } from "@owlprotocol/crud-actions";
import { toReduxOrmId } from "@owlprotocol/utils";

export const ERC721CRUDActions = createCRUDActions<typeof ERC721Name, ERC721Id, ERC721, ERC721>(ERC721Name, {
    validateId: validateIdERC721,
    validate: validateERC721,
    toPrimaryKeyString: (id: ERC721Id) => toReduxOrmId(toPrimaryKeyERC721(id)),
});
