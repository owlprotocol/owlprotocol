import { all, takeEvery } from "typed-redux-saga";
import { wrapSagaWithErrorHandler } from "@owlprotocol/crud-sagas";
import { ERC20BalanceCRUDActions } from "@owlprotocol/web3-actions";
import { dbCreatingSaga } from "./dbChange.js";

/** @internal */
export function* erc20BalanceSaga() {
    yield* all([
        takeEvery(ERC20BalanceCRUDActions.actionTypes.DB_CREATING, wrapSagaWithErrorHandler(dbCreatingSaga)),
        //takeEvery(ERC20BalanceCRUDActions.actionTypes.DB_UPDATING, wrapSagaWithErrorHandler(dbUpdatingSaga)),
        //takeEvery(ERC20BalanceCRUDActions.actionTypes.DB_DELETING, wrapSagaWithErrorHandler(dbDeletingSaga)),
    ]);
}
