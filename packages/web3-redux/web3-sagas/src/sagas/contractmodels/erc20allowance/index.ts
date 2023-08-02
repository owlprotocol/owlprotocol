import { all, takeEvery } from "typed-redux-saga";
import { wrapSagaWithErrorHandler } from "@owlprotocol/crud-sagas";
import { ERC20AllowanceCRUDActions } from "@owlprotocol/web3-actions";
import { dbCreatingSaga } from "./dbChange.js";

/** @internal */
export function* erc20AllowanceSaga() {
    yield* all([
        takeEvery(ERC20AllowanceCRUDActions.actionTypes.DB_CREATING, wrapSagaWithErrorHandler(dbCreatingSaga)),
        //takeEvery(ERC20AllowanceCRUDActions.actionTypes.DB_UPDATING, wrapSagaWithErrorHandler(dbUpdatingSaga)),
        //takeEvery(ERC20AllowanceCRUDActions.actionTypes.DB_DELETING, wrapSagaWithErrorHandler(dbDeletingSaga)),
    ]);
}
