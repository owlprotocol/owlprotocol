import { assert } from 'chai';
import { Provider } from 'react-redux';
import { renderHook } from '@testing-library/react-hooks';
import sinon from 'sinon';

import { network1336 } from '../../network/data.js';

import { name } from '../common.js';
import { createStore, StoreType } from '../../store.js';
import { Transaction, validate } from '../model/interface.js';
import NetworkCRUD from '../../network/crud.js';
import TransactionCRUD from '../crud.js';
import { useTransaction } from './index.js';
import { omit } from 'lodash-es';

const networkId = network1336.networkId;
const web3 = network1336.web3!;

describe(`${name}/hooks/useTransaction.test.tsx`, () => {
    let store: StoreType;
    let dispatchSpy: sinon.SinonSpy;
    const createActionSpy = sinon.spy(TransactionCRUD.actions, 'create');
    let wrapper: any;

    let accounts: string[];
    let expected: Transaction;

    before(async () => {
        accounts = await web3.eth.getAccounts();
    });

    after(() => {
        createActionSpy.restore();
    });

    beforeEach(async () => {
        store = createStore();
        dispatchSpy = sinon.spy(store, 'dispatch');
        createActionSpy.resetHistory();
        wrapper = ({ children }: any) => <Provider store={store}> {children} </Provider>;

        store.dispatch(NetworkCRUD.actions.create({ networkId, web3 }));

        const txSent = await web3.eth.sendTransaction({ from: accounts[0], to: accounts[1], value: '1' });
        const tx = await web3.eth.getTransaction(txSent.transactionHash);
        expected = validate({ networkId, ...tx });
    });

    afterEach(() => {
        dispatchSpy.restore();
    });

    describe('useTransaction', () => {
        it('(networkId, hash)', async () => {
            const { result, waitForNextUpdate } = renderHook(() => useTransaction(networkId, expected.hash), {
                wrapper,
            });

            await waitForNextUpdate(); //fetch
            await waitForNextUpdate(); //load result

            const current = result.current;
            const [transaction] = current;
            assert.deepEqual(omit(transaction, 'updatedAt'), expected, 'result.current');

            //assert.isTrue(dispatchSpy.calledWith(sinon.match(TransactionCRUD.actions.fetch.match)), 'fetchAction called');
            //assert.isTrue(createActionSpy.calledOnce, 'createAction called');
        });
    });
});
