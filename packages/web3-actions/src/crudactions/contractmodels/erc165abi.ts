import {
    ERC165AbiId,
    ERC165Abi,
    validateIdERC165Abi,
    validateERC165Abi,
    toPrimaryKeyERC165Abi,
} from "@owlprotocol/web3-models";
import { ERC165AbiName } from "@owlprotocol/web3-models";
import { createCRUDActions } from "@owlprotocol/crud-actions";
import { toReduxOrmId } from "@owlprotocol/utils";

export const ERC165AbiCRUDActions = createCRUDActions<typeof ERC165AbiName, ERC165AbiId, ERC165Abi, ERC165Abi>(
    ERC165AbiName,
    {
        validateId: validateIdERC165Abi,
        validate: validateERC165Abi,
        toPrimaryKeyString: (id: ERC165AbiId) => toReduxOrmId(toPrimaryKeyERC165Abi(id)),
    },
);
