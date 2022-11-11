import { assert } from 'chai';
import { omit } from 'lodash-es'

import { name } from './common.js';
import { block1 } from './data.js';
import BlockCRUD from './crud.js';
import { createStore, StoreType } from '../store.js';

describe(`${name}/crud.test.js`, () => {
    describe('store', () => {
        let store: StoreType;

        beforeEach(async () => {
            store = createStore();
        });

        it('create', async () => {
            store.dispatch(BlockCRUD.actions.create(block1));

            //Dexie
            const block1Dexie = await BlockCRUD.db.get({ networkId: block1.networkId, number: block1.number });
            assert.deepEqual(omit(block1Dexie, 'updatedAt'), block1);
        });
    });
});
