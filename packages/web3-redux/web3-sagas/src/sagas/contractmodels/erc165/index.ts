import { all, takeEvery } from "typed-redux-saga";
import { wrapSagaWithErrorHandler } from "@owlprotocol/crud-sagas";
import { ERC165CRUDActions } from "@owlprotocol/web3-actions";
import { INFER_INTERFACE } from "@owlprotocol/web3-actions";
import { dbCreatingSaga, dbDeletingSaga, dbUpdatingSaga } from "./dbChange.js";
import { inferInterfaceSaga } from "./inferInterface.js";

/** @internal */
export function* erc165Saga() {
    yield* all([
        takeEvery(ERC165CRUDActions.actionTypes.DB_CREATING, wrapSagaWithErrorHandler(dbCreatingSaga)),
        takeEvery(ERC165CRUDActions.actionTypes.DB_UPDATING, wrapSagaWithErrorHandler(dbUpdatingSaga)),
        takeEvery(ERC165CRUDActions.actionTypes.DB_DELETING, wrapSagaWithErrorHandler(dbDeletingSaga)),
        takeEvery(INFER_INTERFACE, wrapSagaWithErrorHandler(inferInterfaceSaga, INFER_INTERFACE)),
    ]);
}
