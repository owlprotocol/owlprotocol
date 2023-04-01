import { all, takeEvery, spawn } from "typed-redux-saga";
import { wrapSagaWithErrorHandler } from "@owlprotocol/crud-redux";
import { dbCreatingSaga } from "./dbChange.js";
import { AssetRouterOutputBasketCRUD } from "../crud.js";

/** @internal */
export function* assetRouterOuputBasketSaga() {
    yield* all([
        spawn(AssetRouterOutputBasketCRUD.sagas.crudRootSaga),
        takeEvery(AssetRouterOutputBasketCRUD.actionTypes.DB_CREATING, wrapSagaWithErrorHandler(dbCreatingSaga)),
        //takeEvery(AssetRouterOutputBasketCRUD.actionTypes.DB_UPDATING, wrapSagaWithErrorHandler(dbUpdatingSaga)),
        //takeEvery(AssetRouterOutputBasketCRUD.actionTypes.DB_DELETING, wrapSagaWithErrorHandler(dbDeletingSaga)),
    ]);
}
