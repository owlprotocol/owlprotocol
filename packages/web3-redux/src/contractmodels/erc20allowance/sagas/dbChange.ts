import { put } from "typed-redux-saga";
import { ContractHelpers } from "../../../common/contracts.js";
import { ERC20AllowanceCRUD } from "../crud.js";

//Handle contract creation
export function* dbCreatingSaga(action: ReturnType<typeof ERC20AllowanceCRUD.actions.dbCreating>): Generator<any, any> {
    const { payload } = action;
    const { networkId, address, account, spender, balance } = payload.obj;

    if (!balance) {
        yield* put(
            ContractHelpers.IERC20.allowance({
                networkId,
                to: address,
                args: [account, spender],
            }),
        );
    }
}

/*
export function* dbUpdatingSaga(
    action: ReturnType<typeof ERC20AllowanceCRUD.actions.dbUpdating>
): Generator<any, any> { }

//Handle contract creation
export function* dbDeletingSaga(
    action: ReturnType<typeof ERC20AllowanceCRUD.actions.dbDeleting>
): Generator<any, any> { }
*/
