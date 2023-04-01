import {
    ERC20AllowanceId,
    ERC20Allowance,
    validateIdERC20Allowance,
    validateERC20Allowance,
    toPrimaryKeyERC20Allowance,
} from "@owlprotocol/web3-models";
import { ERC20AllowanceName } from "@owlprotocol/web3-models";
import { createCRUDActions } from "@owlprotocol/crud-actions";
import { toReduxOrmId } from "@owlprotocol/utils";

export const ERC20AllowanceCRUDActions = createCRUDActions<
    typeof ERC20AllowanceName,
    ERC20AllowanceId,
    ERC20Allowance,
    ERC20Allowance
>(ERC20AllowanceName, {
    validateId: validateIdERC20Allowance,
    validate: validateERC20Allowance,
    toPrimaryKeyString: (id: ERC20AllowanceId) => toReduxOrmId(toPrimaryKeyERC20Allowance(id)),
});
