import { assert } from 'chai';
import { ReduxErrorCRUD } from './crud.js';
import { createStore, StoreType } from '../store.js';
import { name } from './common.js';

describe(`${name}/crud.test.js`, () => {
    describe('store', () => {
        let store: StoreType;
        let item1 = { id: '1', id2: 1, errorMessage: 'test' }

        beforeEach(async () => {
            store = createStore();
        });

        it('create', async () => {
            store.dispatch(ReduxErrorCRUD.actions.create({ id: '1', errorMessage: 'test' }));

            //Dexie
            const item1Dexie = await ReduxErrorCRUD.db.get({ id: '1' });
            assert.deepEqual(item1Dexie, item1);
        });
    });
});
