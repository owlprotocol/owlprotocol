import { assert } from 'chai';
import { Provider } from 'react-redux';
import { renderHook } from '@testing-library/react-hooks';
import sinon from 'sinon';

import { network1336 } from '../data.js';
import { name } from '../common.js';
import { createStore, StoreType } from '../../store.js';
import NetworkCRUD from '../crud.js';
import { useNetwork } from './useNetwork.js';

const networkId = network1336.networkId;
const web3 = network1336.web3!;

describe(`${name}/hooks/useNetwork.test.tsx`, () => {
    let store: StoreType;
    let dispatchSpy: sinon.SinonSpy;
    const createActionSpy = sinon.spy(NetworkCRUD.actions, 'create');
    let wrapper: any;

    let accounts: string[];
    let expected = { networkId, web3 };

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
    });

    afterEach(() => {
        dispatchSpy.restore();
    });

    describe('useNetwork', () => {
        it('(networkId)', async () => {
            const { result, waitForNextUpdate } = renderHook(() => useNetwork(
                networkId,
                { networkId, web3 }), {
                wrapper,
            });

            await waitForNextUpdate(); //Write to db

            const current = result.current;
            const [network] = current;
            assert.isDefined(network?.web3, 'result.current');

            assert.isTrue(dispatchSpy.calledWith(sinon.match(NetworkCRUD.actions.fetch.match)), 'fetchAction called');
            assert.isTrue(createActionSpy.calledOnce, 'createAction called');
        });
    });
});
