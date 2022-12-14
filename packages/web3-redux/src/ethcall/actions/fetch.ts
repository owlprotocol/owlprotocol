import { v4 as uuidv4 } from 'uuid';
import { createAction } from '@owlprotocol/crud-redux';
import { name } from '../common.js';
import { EthCall, validate } from '../model/interface.js';

/** @internal */
export const FETCH = `${name}/FETCH`;
/** @category Actions */
export const fetch = createAction(FETCH, (payload: EthCall, uuid?: string) => {
    return {
        payload: validate(payload),
        meta: {
            uuid: uuid ?? uuidv4(),
        },
    };
});

/** @internal */
export type FetchAction = ReturnType<typeof fetch>;
/** @internal */
export const isFetchAction = fetch.match;

export default fetch;
