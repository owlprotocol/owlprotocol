import { all, takeEvery, spawn } from "typed-redux-saga";
import { wrapSagaWithErrorHandler } from "@owlprotocol/crud-redux";
import { dbCreatingSaga } from "./dbChange.js";
import { ERC20AllowanceCRUD } from "../crud.js";

/** @internal */
export function* erc20AllowanceSaga() {
    yield* all([
        spawn(ERC20AllowanceCRUD.sagas.crudRootSaga),
        takeEvery(ERC20AllowanceCRUD.actionTypes.DB_CREATING, wrapSagaWithErrorHandler(dbCreatingSaga)),
        //takeEvery(ERC20AllowanceCRUD.actionTypes.DB_UPDATING, wrapSagaWithErrorHandler(dbUpdatingSaga)),
        //takeEvery(ERC20AllowanceCRUD.actionTypes.DB_DELETING, wrapSagaWithErrorHandler(dbDeletingSaga)),
    ]);
}
