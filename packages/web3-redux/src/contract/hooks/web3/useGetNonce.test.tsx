import { assert } from 'chai';
import { renderHook } from '@testing-library/react-hooks';
import { Provider } from 'react-redux';
import Web3 from 'web3';

import { useGetNonce } from './useGetNonce.js';
import { getWeb3Provider, expectThrowsAsync } from '../../../test/index.js';
import { networkId, ADDRESS_0 } from '../../../test/data.js';

import { name } from '../../common.js';
import { createStore, StoreType } from '../../../store.js';
import BlockCRUD from '../../../block/crud.js';
import TransactionCRUD from '../../../transaction/crud.js';
import ContractCRUD from '../../crud.js';
import NetworkCRUD from '../../../network/crud.js';

describe(`${name}/hooks/useGetNonce.test.tsx`, () => {
    let web3: Web3;
    let store: StoreType;
    let wrapper: any;
    let address: string;

    before(async () => {
        const provider = getWeb3Provider();
        //@ts-ignore
        web3 = new Web3(provider);

        const accounts = await web3.eth.getAccounts();
        address = accounts[0];
    });

    beforeEach(() => {
        store = createStore();
        store.dispatch(NetworkCRUD.actions.create({ networkId, web3 }));
        store.dispatch(ContractCRUD.actions.create({ networkId, address }));
        wrapper = ({ children }: any) => <Provider store={store}> {children} </Provider>;
    });

    describe('useGetNonce', () => {
        it('(networkId, address, false)', async () => {
            const { result, waitForNextUpdate } = renderHook(() => useGetNonce(networkId, address, false), {
                wrapper,
            });
            assert.isUndefined(result.current[0]);
            //No additional re-renders from background tasks
            await expectThrowsAsync(waitForNextUpdate, 'Timed out in waitForNextUpdate after 1000ms.');
        });

        it('(networkId, address, ifnull)', async () => {
            const { result, waitForNextUpdate } = renderHook(() => useGetNonce(networkId, address, 'ifnull'), {
                wrapper,
            });
            await waitForNextUpdate();
            const expected = await web3.eth.getTransactionCount(address);
            assert.equal(result.current[0], expected, 'contract.nonce != expected');
            //No additional re-renders frm background tasks
            await expectThrowsAsync(waitForNextUpdate, 'Timed out in waitForNextUpdate after 1000ms.');
        });

        it('(networkId, address, Transaction)', async () => {
            const { result, waitForNextUpdate } = renderHook(() => useGetNonce(networkId, address, 'Transaction'), {
                wrapper,
            });

            await waitForNextUpdate();
            const expected1 = await web3.eth.getTransactionCount(address);
            const value1 = result.current[0];
            assert.equal(value1, expected1, 'contract.nonce != expected');

            await web3.eth.sendTransaction({ from: address, to: ADDRESS_0, value: '1' });
            //Fetch transaction, triggering a refresh
            store.dispatch(
                TransactionCRUD.actions.create({
                    networkId,
                    hash: '0x1',
                    from: address,
                    to: ADDRESS_0,
                }),
            );
            await waitForNextUpdate();

            const expected2 = await web3.eth.getTransactionCount(address);
            const value2 = result.current[0];
            assert.equal(value2, expected2, 'contract.nonce != expected');
            //No additional re-renders frm background tasks
            await expectThrowsAsync(waitForNextUpdate, 'Timed out in waitForNextUpdate after 1000ms.');
        });

        it('(networkId, address, Block)', async () => {
            const { result, waitForNextUpdate } = renderHook(() => useGetNonce(networkId, address, 'Block'), {
                wrapper,
            });

            await waitForNextUpdate();
            const expected1 = await web3.eth.getTransactionCount(address);
            assert.equal(result.current[0], expected1, 'contract.nonce != expected');

            await web3.eth.sendTransaction({ from: address, to: ADDRESS_0, value: '1' });
            //Create block, triggering a refresh
            store.dispatch(
                BlockCRUD.actions.create({
                    networkId,
                    number: 1,
                }),
            );
            //synchronous re-render due to Network/SET/LATESTBLOCKNUMBER
            assert.equal(result.all.length, 3, 'result.all.length');
            await waitForNextUpdate(); //re-render due to Contract/SET/NONCE

            const expected2 = await web3.eth.getTransactionCount(address);
            assert.equal(result.current[0], expected2, 'contract.nonce != expected');
            assert.equal(result.all.length, 4, 'result.all.length');
            //No additional re-renders from background tasks
            await expectThrowsAsync(waitForNextUpdate, 'Timed out in waitForNextUpdate after 1000ms.');
        });
    });
});
