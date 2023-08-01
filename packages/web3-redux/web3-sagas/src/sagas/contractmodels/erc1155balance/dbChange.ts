import { put } from "typed-redux-saga";
import { ContractCustomActions } from "@owlprotocol/web3-actions";
import { ERC1155BalanceCRUDActions } from "@owlprotocol/web3-actions";

//Handle contract creation
export function* dbCreatingSaga(
    action: ReturnType<typeof ERC1155BalanceCRUDActions.actions.dbCreating>,
): Generator<any, any> {
    const { payload } = action;
    const { networkId, address, id, account, balance } = payload.obj;

    if (!balance) {
        yield* put(
            ContractCustomActions.IERC1155.balanceOf({
                networkId,
                to: address,
                args: [account, id],
            }),
        );
    }
}

/*
export function* dbUpdatingSaga(
    action: ReturnType<typeof ERC1155BalanceCRUDActions.actions.dbUpdating>
): Generator<any, any> { }

//Handle contract creation
export function* dbDeletingSaga(
    action: ReturnType<typeof ERC1155BalanceCRUDActions.actions.dbDeleting>
): Generator<any, any> { }
*/
