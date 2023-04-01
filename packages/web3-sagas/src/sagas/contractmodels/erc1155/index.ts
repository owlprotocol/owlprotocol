import { all, takeEvery } from "typed-redux-saga";
import { wrapSagaWithErrorHandler } from "@owlprotocol/crud-sagas";
import { ERC1155CRUDActions } from "@owlprotocol/web3-actions";
import { dbCreatingSaga } from "./dbChange.js";

/** @internal */
export function* erc1155Saga() {
    yield* all([
        takeEvery(ERC1155CRUDActions.actionTypes.DB_CREATING, wrapSagaWithErrorHandler(dbCreatingSaga)),
        //takeEvery(ERC1155CRUDActions.actionTypes.DB_UPDATING, wrapSagaWithErrorHandler(dbUpdatingSaga)),
        //takeEvery(ERC1155CRUDActions.actionTypes.DB_DELETING, wrapSagaWithErrorHandler(dbDeletingSaga)),
    ]);
}
