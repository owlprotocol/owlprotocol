import {
    ERC1155BalanceId,
    ERC1155Balance,
    validateIdERC1155Balance,
    validateERC1155Balance,
    toPrimaryKeyERC1155Balance,
} from "@owlprotocol/web3-models";
import { ERC1155BalanceName } from "@owlprotocol/web3-models";
import { createCRUDActions } from "@owlprotocol/crud-actions";
import { toReduxOrmId } from "@owlprotocol/utils";

export const ERC1155BalanceCRUDActions = createCRUDActions<
    typeof ERC1155BalanceName,
    ERC1155BalanceId,
    ERC1155Balance,
    ERC1155Balance
>(ERC1155BalanceName, {
    validateId: validateIdERC1155Balance,
    validate: validateERC1155Balance,
    toPrimaryKeyString: (id: ERC1155BalanceId) => toReduxOrmId(toPrimaryKeyERC1155Balance(id)),
});
