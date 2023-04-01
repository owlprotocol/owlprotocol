import { put } from "typed-redux-saga";
import { ContractActionHelpers } from "@owlprotocol/web3-actions";
import { ERC20AllowanceCRUDActions } from "@owlprotocol/web3-actions";

//Handle contract creation
export function* dbCreatingSaga(
    action: ReturnType<typeof ERC20AllowanceCRUDActions.actions.dbCreating>,
): Generator<any, any> {
    const { payload } = action;
    const { networkId, address, account, spender, balance } = payload.obj;

    if (!balance) {
        yield* put(
            ContractActionHelpers.IERC20.allowance({
                networkId,
                to: address,
                args: [account, spender],
            }),
        );
    }
}

/*
export function* dbUpdatingSaga(
    action: ReturnType<typeof ERC20AllowanceCRUDActions.actions.dbUpdating>
): Generator<any, any> { }

//Handle contract creation
export function* dbDeletingSaga(
    action: ReturnType<typeof ERC20AllowanceCRUDActions.actions.dbDeleting>
): Generator<any, any> { }
*/
