import { all, takeEvery, spawn } from "typed-redux-saga";
import { wrapSagaWithErrorHandler } from "@owlprotocol/crud-redux";
import { dbCreatingSaga } from "./dbChange.js";
import { AssetRouterInputBasketCRUD } from "../crud.js";

/** @internal */
export function* assetRouterInputBasketSaga() {
    yield* all([
        spawn(AssetRouterInputBasketCRUD.sagas.crudRootSaga),
        takeEvery(AssetRouterInputBasketCRUD.actionTypes.DB_CREATING, wrapSagaWithErrorHandler(dbCreatingSaga)),
        //takeEvery(AssetRouterInputBasketCRUD.actionTypes.DB_UPDATING, wrapSagaWithErrorHandler(dbUpdatingSaga)),
        //takeEvery(AssetRouterInputBasketCRUD.actionTypes.DB_DELETING, wrapSagaWithErrorHandler(dbDeletingSaga)),
    ]);
}
