import { put } from "typed-redux-saga";
import { ContractActionHelpers } from "@owlprotocol/web3-actions";
import { ERC20BalanceCRUDActions } from "@owlprotocol/web3-actions";

//Handle contract creation
export function* dbCreatingSaga(
    action: ReturnType<typeof ERC20BalanceCRUDActions.actions.dbCreating>,
): Generator<any, any> {
    const { payload } = action;
    const { networkId, address, account, balance } = payload.obj;

    if (!balance) {
        yield* put(
            ContractActionHelpers.IERC20.balanceOf({
                networkId,
                to: address,
                args: [account],
            }),
        );
    }
}

/*
export function* dbUpdatingSaga(
    action: ReturnType<typeof ERC20BalanceCRUDActions.actions.dbUpdating>
): Generator<any, any> { }

//Handle contract creation
export function* dbDeletingSaga(
    action: ReturnType<typeof ERC20BalanceCRUDActions.actions.dbDeleting>
): Generator<any, any> { }
*/
