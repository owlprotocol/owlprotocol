import { createAction2 } from '@owlprotocol/crud-redux';
import * as Contracts from '@owlprotocol/contracts';
import type { AbiItem } from 'web3-utils';

import { name } from '../common.js';

/** @internal */
export const SUBSCRIBE_INTERFACE_IMPLEMENTER_SET = `${name}/SUBSCRIBE_INTERFACE_IMPLEMENTER_SET`;

export interface SubscribeInterfaceImplementerSetActionInput {
    networkId: string,
    intefaceIds?: {
        [interfaceId: string]: AbiItem[] | undefined
    }
}

/** @category Actions */
export const subscribeInterfaceImplementerSet = createAction2(SUBSCRIBE_INTERFACE_IMPLEMENTER_SET, (payload: SubscribeInterfaceImplementerSetActionInput) => {
    const interfaceIds = payload.intefaceIds ?? Contracts.interfaceIds
    return {
        networkId: payload.networkId,
        interfaceIds
    }
});

/** @internal */
export type SubscribeInterfaceImplementerSetAction = ReturnType<typeof subscribeInterfaceImplementerSet>;


/** @internal */
export const UNSUBSCRIBE_INTERFACE_IMPLEMENTER_SET = `${name}/UNSUBSCRIBE_INTERFACE_IMPLEMENTER_SET`;

export interface UnsubscribeInterfaceImplementerSetActionInput {
    networkId: string,
}

/** @category Actions */
export const unsubscribeInterfaceImplementerSet = createAction2(UNSUBSCRIBE_INTERFACE_IMPLEMENTER_SET, (payload: SubscribeInterfaceImplementerSetActionInput) => {
    return {
        networkId: payload.networkId,
    }
});

export type UnsubscribeInterfaceImplementerSetAction = ReturnType<typeof unsubscribeInterfaceImplementerSet>;
