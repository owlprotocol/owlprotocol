import { v4 as uuidv4 } from 'uuid';
import { createAction } from '@owlprotocol/crud-redux';
import { name } from '../common.js';
import { NFTGenerativeItemId } from '../model/interface.js';

/** @internal */
export const CHILD_ATTACH = `${name}/CHILD_ATTACH`;

/** @internal */
export interface ChildAttachActionInput extends NFTGenerativeItemId {
    children: NFTGenerativeItemId[];
    from?: string
}
/** @category Actions */
export const childAttachAction = createAction(CHILD_ATTACH, (payload: ChildAttachActionInput, uuid?: string) => {
    return {
        payload: { ...payload, address: payload.address.toLowerCase() },
        meta: {
            uuid: uuid ?? uuidv4(),
        },
    };
});

/** @internal */
export type ChildAttachAction = ReturnType<typeof childAttachAction>;
/** @internal */
export const isChildAttachAction = childAttachAction.match;
