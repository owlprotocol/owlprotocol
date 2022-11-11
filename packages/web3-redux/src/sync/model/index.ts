import { fromPairs, isUndefined, omitBy } from 'lodash-es';
import { AnyAction } from 'redux';
import { BaseSync, BaseSyncId } from './BaseSync.js';
import { BlockSync, createBlockSyncEveryBlock } from './BlockSync.js';
import { EventSync } from './EventSync.js';
import { TransactionSync, createSyncForAddress } from './TransactionSync.js';

export * from './BaseSync.js';

/**
 * Sync Middleware Type
 */
export type Sync = BlockSync | TransactionSync | EventSync;
export type { BlockSync, EventSync, TransactionSync };

/**
 * Sync Middleware Type + simplified notation
 */
export type GenericSync = EventSync | 'Block' | 'Transaction' | number;

/**
 * Create a Sync object from generic parameters
 * @category Actions
 */
export function createSyncForActions(
    id: string,
    networkId: string,
    actions: AnyAction[],
    sync: GenericSync,
    address: string,
): Sync {
    //Default sync
    if (sync === 'Transaction') {
        return createSyncForAddress(id, networkId, actions, address);
    } else if (sync === 'Block') {
        return createBlockSyncEveryBlock(id, networkId, actions);
    } else if (typeof sync === 'number') {
        return createBlockSyncEveryBlock(id, networkId, actions, sync);
    } else {
        return { ...sync, id, actions };
    }
}

export type SyncIndexInput =
    | BaseSyncId
    | { networkId: string; type: BaseSync['type'] }
    | { networkId: string }
    | { type: BaseSync['type'] };
export const SyncIndex = 'id,[networkId+type],type';

/** @internal */
export function validateId({ id }: BaseSyncId) {
    return { id };
}

export function actionEncode(action: AnyAction | string) {
    if (typeof action != 'string') return JSON.stringify(action);
    return action;
}

export function actionDecode(action: AnyAction | string) {
    if (typeof action == 'string') return JSON.parse(action);
    return action;
}

/** @internal */
export function validate(item: Partial<Sync>): Sync {
    const actions = item.actions?.map(actionEncode)
    return omitBy({ ...item, actions }, isUndefined) as Sync;
}

export default Sync;
