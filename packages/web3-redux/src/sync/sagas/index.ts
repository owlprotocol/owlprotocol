import { all, spawn, takeEvery } from 'typed-redux-saga';
import { blockSync } from './blockSync.js';
import { eventSync } from './eventSync.js';
import { transactionSync } from './transactionSync.js';
import { Block } from '../../block/index.js';
import { Transaction } from '../../transaction/index.js';
import { ContractEvent } from '../../contractevent/index.js'
import SyncCRUD from '../crud.js';

//TODO: Rate-limit or cache block? This can avoid issues if a frontend component is dispatching
// too many actions. However, it is sensible that a block be overwritten or transaction updated.
/** @internal */
export function* rootSaga() {
    yield* all([
        spawn(SyncCRUD.sagas.crudRootSaga),
        takeEvery(({ type }: { type: string }) => type.startsWith(Block.actionTypes.CREATE), blockSync),
        takeEvery(({ type }: { type: string }) => type.startsWith(Block.actionTypes.UPDATE), blockSync),
        takeEvery(({ type }: { type: string }) => type.startsWith(Transaction.actionTypes.CREATE), transactionSync),
        takeEvery(({ type }: { type: string }) => type.startsWith(Transaction.actionTypes.UPDATE), transactionSync),
        takeEvery(({ type }: { type: string }) => type.startsWith(ContractEvent.actionTypes.CREATE), eventSync),
        takeEvery(({ type }: { type: string }) => type.startsWith(ContractEvent.actionTypes.UPDATE), eventSync),
    ]);
}
