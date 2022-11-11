import { assert } from 'chai';
import Web3 from 'web3';
import { name } from '../common.js';
import NetworkCRUD from '../crud.js';
import { network1336 } from '../data.js';
import { createStore, StoreType } from '../../store.js';
import sleep from '../../utils/sleep.js';

const networkId = network1336.networkId;

describe(`${name}/sagas/fetch.test.ts`, () => {
    describe('store', () => {
        let store: StoreType;
        const web3 = network1336.web3

        beforeEach(async () => {
            store = createStore();
        });

        it('fetch', async () => {
            //Redux undefined
            const selected1 = NetworkCRUD.selectors.selectByIdSingle(store.getState(), networkId);
            assert.isNull(selected1, 'selected1');

            store.dispatch(NetworkCRUD.actions.fetch({ networkId, web3 }));
            await sleep(400);

            const selected2 = NetworkCRUD.selectors.selectByIdSingle(store.getState(), networkId);
            assert.isDefined(selected2, 'selected2');
            assert.isDefined(selected2?.web3, 'selected2.web3');
            assert.equal(selected2?.web3, web3);
        });
    });
});
