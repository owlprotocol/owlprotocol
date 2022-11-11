import { createAction2 } from '../../crud/createAction.js';
import { ReduxErrorModel } from '../model/interface.js';
import { name } from '../common.js';

/** @internal */
export const CREATE = `${name}/CREATE`;
/** @category Actions */
export const create = createAction2(CREATE, (payload: ReduxErrorModel) => {
    return payload
});
