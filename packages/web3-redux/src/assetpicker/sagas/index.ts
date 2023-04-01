import { all, spawn } from "typed-redux-saga";
import { AssetPickerCRUD } from "../crud.js";

/** @internal */
export function* assetPickerSaga() {
    yield* all([spawn(AssetPickerCRUD.sagas.crudRootSaga)]);
}
