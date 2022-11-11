import { v4 as uuidv4 } from 'uuid';
import { createAction } from '@owlprotocol/crud-redux';
import { name } from '../common.js';

/** @internal */
export const GET_INTERFACE_IMPLEMENTER = `${name}/GET_INTERFACE_IMPLEMENTER`;
/** @internal */
export interface GetInterfaceImplementerActionInput {
    networkId: string;
    address: string;
    interfaceId: string;
}
/**
 * @category Actions
 * Get interface implementer
 */
export const getInterfaceImplementer = createAction(
    GET_INTERFACE_IMPLEMENTER,
    (payload: GetInterfaceImplementerActionInput, uuid?: string) => {
        return {
            payload: { ...payload },
            meta: {
                uuid: uuid ?? uuidv4(),
            },
        };
    },
);
/** @internal */
export type GetInterfaceImplementerAction = ReturnType<typeof getInterfaceImplementer>;
/** @internal */
export const isGetInterfaceImplementerAction = getInterfaceImplementer.match;
