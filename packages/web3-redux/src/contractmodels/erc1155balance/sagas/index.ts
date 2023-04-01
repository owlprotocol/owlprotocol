import { all, takeEvery, spawn } from "typed-redux-saga";
import { wrapSagaWithErrorHandler } from "@owlprotocol/crud-redux";
import { dbCreatingSaga } from "./dbChange.js";
import { ERC1155BalanceCRUD } from "../crud.js";

/** @internal */
export function* erc1155BalanceSaga() {
    yield* all([
        spawn(ERC1155BalanceCRUD.sagas.crudRootSaga),
        takeEvery(ERC1155BalanceCRUD.actionTypes.DB_CREATING, wrapSagaWithErrorHandler(dbCreatingSaga)),
        //takeEvery(ERC1155BalanceCRUD.actionTypes.DB_UPDATING, wrapSagaWithErrorHandler(dbUpdatingSaga)),
        //takeEvery(ERC1155BalanceCRUD.actionTypes.DB_DELETING, wrapSagaWithErrorHandler(dbDeletingSaga)),
    ]);
}
