import { v4 as uuidv4 } from 'uuid';
import { createAction } from '@owlprotocol/crud-redux';
import { name } from '../common.js';

/** @internal */
export const GET_INTERFACE_IMPLEMENTERS = `${name}/GET_INTERFACE_IMPLEMENTERS`;
/** @internal */
export interface GetInterfaceImplementersActionInput {
    networkId: string;
    address: string;
}
/**
 * @category Actions
 * Get interface implementer
 */
export const getInterfaceImplementers = createAction(
    GET_INTERFACE_IMPLEMENTERS,
    (payload: GetInterfaceImplementersActionInput, uuid?: string) => {
        return {
            payload: { ...payload },
            meta: {
                uuid: uuid ?? uuidv4(),
            },
        };
    },
);
/** @internal */
export type GetInterfaceImplementersAction = ReturnType<typeof getInterfaceImplementers>;
/** @internal */
export const isGetInterfaceImplementersAction = getInterfaceImplementers.match;
