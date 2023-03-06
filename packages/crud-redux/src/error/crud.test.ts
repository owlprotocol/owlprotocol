import { assert } from 'chai';
import { omit } from 'lodash-es'
import { ReduxErrorCRUD } from './crud.js';
import { createStore, StoreType } from '../store.js';
import { name } from './common.js';
import { getDB } from '../db.js';
import { sleep } from '../utils/sleep.js';
import { ReduxErrorId } from './model/interface.js';

describe(`${name}/crud.test.js`, () => {
    describe('store', () => {
        let store: StoreType;
        let item1 = { id: '1', id2: 1, errorMessage: 'test' }

        beforeEach(async () => {
            store = createStore();
        });

        it.skip('create', async () => {
            store.dispatch(ReduxErrorCRUD.actions.create({ id: '1', errorMessage: 'test' }));
            await sleep(1000)

            //Dexie
            const item1Dexie = await ReduxErrorCRUD.db.get({ id: '1' });
            assert.deepEqual(omit(item1Dexie, 'updatedAt'), item1);
        });

        it.skip('test', async () => {
            const db = getDB()
            try {
                await db.table(name).bulkAdd([item1, item1])
            } catch (error) {

            }
            const item1Dexie = await ReduxErrorCRUD.db.get({ id: '1' });
            assert.deepEqual(omit(item1Dexie, 'updatedAt'), item1);
        })

        it('bulk vs single', async () => {
            const db = getDB()
            const items: ReduxErrorId[] = []
            for (let i = 0; i < 1000; i++) {
                items.push({ id: `${i}` })
            }
            let t1 = Date.now()
            await db.table(name).bulkAdd(items)
            t1 = Date.now() - t1;

            await db.table(name).clear()

            let t2 = Date.now()
            await Promise.all(items.map((t) => db.table(name).add(t)))
            t2 = Date.now() - t2;

            console.debug({ t1, t2, diff: t2 - t1 })
        })
    });
});
