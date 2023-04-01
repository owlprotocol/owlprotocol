import { all, takeEvery } from "typed-redux-saga";
import { wrapSagaWithErrorHandler } from "@owlprotocol/crud-sagas";
import { ERC721CRUDActions } from "@owlprotocol/web3-actions";
import { dbCreatingSaga } from "./dbChange.js";

/** @internal */
export function* erc721Saga() {
    yield* all([
        takeEvery(ERC721CRUDActions.actionTypes.DB_CREATING, wrapSagaWithErrorHandler(dbCreatingSaga)),
        //takeEvery(ERC721CRUDActions.actionTypes.DB_UPDATING, wrapSagaWithErrorHandler(dbUpdatingSaga)),
        //takeEvery(ERC721CRUDActions.actionTypes.DB_DELETING, wrapSagaWithErrorHandler(dbDeletingSaga)),
    ]);
}
