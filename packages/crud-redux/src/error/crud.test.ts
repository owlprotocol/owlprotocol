import { assert } from 'chai';
import { omit } from 'lodash-es'
import { ReduxErrorCRUD } from './crud.js';
import { createStore, StoreType } from '../store.js';
import { name } from './common.js';
import { getDB } from '../db.js';
import { sleep } from '../utils/sleep.js';

describe(`${name}/crud.test.js`, () => {
    describe('store', () => {
        let store: StoreType;
        let item1 = { id: '1', id2: 1, errorMessage: 'test' }

        beforeEach(async () => {
            store = createStore();
        });

        it.skip('create', async () => {
            store.dispatch(ReduxErrorCRUD.actions.create({ id: '1', errorMessage: 'test' }));

            //Dexie
            const item1Dexie = await ReduxErrorCRUD.db.get({ id: '1' });
            assert.deepEqual(omit(item1Dexie, 'updatedAt'), item1);
            await sleep(1000)
        });

        it('test', async () => {
            const db = getDB()
            await Promise.all([db.table(name).put(item1), db.table(name).put(item1)])
        })
    });
});
