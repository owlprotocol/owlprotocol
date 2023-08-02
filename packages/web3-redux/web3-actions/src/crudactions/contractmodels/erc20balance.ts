import {
    ERC20BalanceId,
    ERC20Balance,
    validateIdERC20Balance,
    validateERC20Balance,
    toPrimaryKeyERC20Balance,
} from "@owlprotocol/web3-models";
import { ERC20BalanceName } from "@owlprotocol/web3-models";
import { createCRUDActions } from "@owlprotocol/crud-actions";
import { toReduxOrmId } from "@owlprotocol/utils";

export const ERC20BalanceCRUDActions = createCRUDActions<
    typeof ERC20BalanceName,
    ERC20BalanceId,
    ERC20Balance,
    ERC20Balance
>(ERC20BalanceName, {
    validateId: validateIdERC20Balance,
    validate: validateERC20Balance,
    toPrimaryKeyString: (id: ERC20BalanceId) => toReduxOrmId(toPrimaryKeyERC20Balance(id)),
});
