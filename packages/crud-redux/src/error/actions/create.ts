import { createAction2 } from "../../crud/createAction.js";
import { ReduxError } from "../model/interface.js";
import { ReduxErrorName } from "../common.js";

/** @internal */
export const CREATE_REDUX_ERROR = `${ReduxErrorName}/CREATE`;
/** @category Actions */
export const createReduxError = createAction2(CREATE_REDUX_ERROR, (payload: ReduxError) => {
    return payload;
});
