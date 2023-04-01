import { put } from "typed-redux-saga";
import { ContractHelpers } from "../../../common/contracts.js";
import { ERC20BalanceCRUD } from "../crud.js";

//Handle contract creation
export function* dbCreatingSaga(action: ReturnType<typeof ERC20BalanceCRUD.actions.dbCreating>): Generator<any, any> {
    const { payload } = action;
    const { networkId, address, account, balance } = payload.obj;

    if (!balance) {
        yield* put(
            ContractHelpers.IERC20.balanceOf({
                networkId,
                to: address,
                args: [account],
            }),
        );
    }
}

/*
export function* dbUpdatingSaga(
    action: ReturnType<typeof ERC20BalanceCRUD.actions.dbUpdating>
): Generator<any, any> { }

//Handle contract creation
export function* dbDeletingSaga(
    action: ReturnType<typeof ERC20BalanceCRUD.actions.dbDeleting>
): Generator<any, any> { }
*/
