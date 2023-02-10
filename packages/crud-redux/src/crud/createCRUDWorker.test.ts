import { assert } from 'chai';
import { omit } from 'lodash-es'
import { ReduxErrorCRUD } from '../error/crud.js';
import { sleep } from '../utils/sleep.js';
import { createCRUDWorkers } from './createCRUDWorker.js';

describe('createCRUDWorker.test.ts', () => {
    let item1 = { id: '1', id2: 1, errorMessage: 'test' }

    it('create', async () => {
        const workers = createCRUDWorkers(2);
        workers[0].postMessage(ReduxErrorCRUD.actions.create({ id: '1', errorMessage: 'test' }));
        await sleep(1000)
        workers[1].postMessage(ReduxErrorCRUD.actions.create({ id: '1', errorMessage: 'test' }));
        await sleep(1000)

        /*
        //Dexie
        const item1Dexie = await ReduxErrorCRUD.db.get({ id: '1' });
        assert.deepEqual(omit(item1Dexie, 'updatedAt'), item1);
        */
    });
});
