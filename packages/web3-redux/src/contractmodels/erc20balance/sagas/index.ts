import { all, takeEvery, spawn } from "typed-redux-saga";
import { wrapSagaWithErrorHandler } from "@owlprotocol/crud-redux";
import { dbCreatingSaga } from "./dbChange.js";
import { ERC20BalanceCRUD } from "../crud.js";

/** @internal */
export function* erc20BalanceSaga() {
    yield* all([
        spawn(ERC20BalanceCRUD.sagas.crudRootSaga),
        takeEvery(ERC20BalanceCRUD.actionTypes.DB_CREATING, wrapSagaWithErrorHandler(dbCreatingSaga)),
        //takeEvery(ERC20BalanceCRUD.actionTypes.DB_UPDATING, wrapSagaWithErrorHandler(dbUpdatingSaga)),
        //takeEvery(ERC20BalanceCRUD.actionTypes.DB_DELETING, wrapSagaWithErrorHandler(dbDeletingSaga)),
    ]);
}
