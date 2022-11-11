import { v4 as uuidv4 } from 'uuid';
import { createAction } from '@owlprotocol/crud-redux';
import { name } from '../common.js';

/** @internal */
export const SET_INTERFACE_IMPLEMENTERS = `${name}/SET_INTERFACE_IMPLEMENTERS`;
/** @internal */
export interface SetInterfaceImplementersActionInput {
    networkId: string;
    address: string;
}
/**
 * @category Actions
 * Get interface implementer
 */
export const setInterfaceImplementers = createAction(
    SET_INTERFACE_IMPLEMENTERS,
    (payload: SetInterfaceImplementersActionInput, uuid?: string) => {
        return {
            payload: { ...payload },
            meta: {
                uuid: uuid ?? uuidv4(),
            },
        };
    },
);
/** @internal */
export type SetInterfaceImplementersAction = ReturnType<typeof setInterfaceImplementers>;
/** @internal */
export const isSetInterfaceImplementersAction = setInterfaceImplementers.match;
