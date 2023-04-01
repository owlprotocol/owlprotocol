import { all, takeEvery, spawn } from "typed-redux-saga";
import { wrapSagaWithErrorHandler } from "@owlprotocol/crud-redux";
import { dbCreatingSaga } from "./dbChange.js";
import { ERC1155CRUD } from "../crud.js";

/** @internal */
export function* erc1155Saga() {
    yield* all([
        spawn(ERC1155CRUD.sagas.crudRootSaga),
        takeEvery(ERC1155CRUD.actionTypes.DB_CREATING, wrapSagaWithErrorHandler(dbCreatingSaga)),
        //takeEvery(ERC1155CRUD.actionTypes.DB_UPDATING, wrapSagaWithErrorHandler(dbUpdatingSaga)),
        //takeEvery(ERC1155CRUD.actionTypes.DB_DELETING, wrapSagaWithErrorHandler(dbDeletingSaga)),
    ]);
}
