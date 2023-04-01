import { all, spawn } from "typed-redux-saga";
import { ERC165AbiCRUD } from "../crud.js";

/** @internal */
export function* contractInterfaceSaga() {
    yield* all([spawn(ERC165AbiCRUD.sagas.crudRootSaga)]);
}
