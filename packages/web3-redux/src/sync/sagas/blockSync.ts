import { put, call, all } from 'typed-redux-saga';
import { Action } from 'redux';
import { actionDecode, BlockSync } from '../model/index.js';
import { SyncCRUD } from '../crud.js';
import type { BlockCRUD } from '../../block/crud.js';

//Handle on block update
export function* blockSync({ payload }: ReturnType<typeof BlockCRUD.actions.create | typeof BlockCRUD.actions.update>) {
    const syncs = (yield* call(SyncCRUD.db.where, { type: 'Block' })) as BlockSync[];

    const actions: Action[] = []; //triggered actions

    syncs.map((s) => {
        if (
            s.networkId === payload.networkId &&
            (!s.matchBlockNumberModulo || payload.number % s.matchBlockNumberModulo)
        ) {
            //Block matches
            actions.push(...s.actions.map(actionDecode));
        }
    });

    //Note these are arbitrary actions
    //TODO: Should we instead use fork() or spawn()?
    const tasks = actions.map((a) => put(a));
    yield* all(tasks);
}
