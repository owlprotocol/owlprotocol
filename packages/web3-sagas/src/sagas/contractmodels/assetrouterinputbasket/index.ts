import { all, takeEvery } from "typed-redux-saga";
import { wrapSagaWithErrorHandler } from "@owlprotocol/crud-sagas";
import { AssetRouterInputBasketCRUDActions } from "@owlprotocol/web3-actions";
import { dbCreatingSaga } from "./dbChange.js";

/** @internal */
export function* assetRouterInputBasketSaga() {
    yield* all([
        takeEvery(AssetRouterInputBasketCRUDActions.actionTypes.DB_CREATING, wrapSagaWithErrorHandler(dbCreatingSaga)),
        //takeEvery(AssetRouterInputBasketCRUDActions.actionTypes.DB_UPDATING, wrapSagaWithErrorHandler(dbUpdatingSaga)),
        //takeEvery(AssetRouterInputBasketCRUDActions.actionTypes.DB_DELETING, wrapSagaWithErrorHandler(dbDeletingSaga)),
    ]);
}
