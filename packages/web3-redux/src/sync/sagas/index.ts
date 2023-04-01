import { all, spawn } from "typed-redux-saga";
import { SyncCRUD } from "../crud.js";

//TODO: Rate-limit or cache block? This can avoid issues if a frontend component is dispatching
// too many actions. However, it is sensible that a block be overwritten or transaction updated.
/** @internal */
export function* syncSaga() {
    yield* all([spawn(SyncCRUD.sagas.crudRootSaga)]);
}
