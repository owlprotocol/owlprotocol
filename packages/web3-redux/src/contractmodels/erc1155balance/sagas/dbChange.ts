import { put } from "typed-redux-saga";
import { ContractHelpers } from "../../../common/contracts.js";
import { ERC1155BalanceCRUD } from "../crud.js";

//Handle contract creation
export function* dbCreatingSaga(action: ReturnType<typeof ERC1155BalanceCRUD.actions.dbCreating>): Generator<any, any> {
    const { payload } = action;
    const { networkId, address, id, account, balance } = payload.obj;

    if (!balance) {
        yield* put(
            ContractHelpers.IERC1155.balanceOf({
                networkId,
                to: address,
                args: [account, id],
            }),
        );
    }
}

/*
export function* dbUpdatingSaga(
    action: ReturnType<typeof ERC1155BalanceCRUD.actions.dbUpdating>
): Generator<any, any> { }

//Handle contract creation
export function* dbDeletingSaga(
    action: ReturnType<typeof ERC1155BalanceCRUD.actions.dbDeleting>
): Generator<any, any> { }
*/
