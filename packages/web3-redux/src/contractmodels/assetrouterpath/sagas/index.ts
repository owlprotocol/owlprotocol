import { all, takeEvery, spawn } from "typed-redux-saga";
import { wrapSagaWithErrorHandler } from "@owlprotocol/crud-redux";
import { dbCreatingSaga, dbDeletingSaga, dbUpdatingSaga } from "./dbChange.js";
import { AssetRouterPathCRUD } from "../crud.js";

/** @internal */
export function* assetRouterPathSaga() {
    yield* all([
        spawn(AssetRouterPathCRUD.sagas.crudRootSaga),
        takeEvery(AssetRouterPathCRUD.actionTypes.DB_CREATING, wrapSagaWithErrorHandler(dbCreatingSaga)),
        takeEvery(AssetRouterPathCRUD.actionTypes.DB_UPDATING, wrapSagaWithErrorHandler(dbUpdatingSaga)),
        takeEvery(AssetRouterPathCRUD.actionTypes.DB_DELETING, wrapSagaWithErrorHandler(dbDeletingSaga)),
    ]);
}
