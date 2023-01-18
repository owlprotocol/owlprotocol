import { assert } from 'chai';
import { Provider } from 'react-redux';
import type { Contract as Web3Contract } from 'web3-eth-contract';
import { renderHook } from '@testing-library/react-hooks';
import sinon from 'sinon';
import * as Contracts from '@owlprotocol/contracts';

import { cloneDeep } from 'lodash-es';
import { expectThrowsAsync } from '../../test/index.js';

import { network1336 } from '../../network/data.js';

import { name } from '../common.js';
import { createStore, StoreType } from '../../store.js';

import { useContractCall } from '../hooks/useContractCall.js';
//import { createEventSync } from '../../sync/model/EventSync.js';
import { ZERO_ADDRESS } from '../../utils/index.js';
//import ContractEventCRUD from '../../contractevent/crud.js';
//import BlockCRUD from '../../block/crud.js';
//import TransactionCRUD from '../../transaction/crud.js';
import { NetworkCRUD } from '../../network/crud.js';
import { ContractCRUD } from '../crud.js';
import { TransactionCRUD } from '../../transaction/crud.js';
import { BlockCRUD } from '../../block/crud.js';
import { createEventSync } from '../../sync/model/EventSync.js';
import { ContractEventCRUD } from '../../contractevent/crud.js';

const networkId = network1336.networkId;
const web3 = network1336.web3!;

describe(`${name}/hooks/useContractCall.test.tsx`, () => {
    let store: StoreType;
    let dispatchSpy: sinon.SinonSpy;
    const createActionSpy = sinon.spy(ContractCRUD.actions, 'create');
    let wrapper: any;

    let accounts: string[];
    let web3Contract: Web3Contract;
    let address: string;

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
    });

    afterEach(() => {
        dispatchSpy.restore();
    });

    describe('Errors', () => {
        it.skip('networkId undefined', async () => {
            const { result, waitForNextUpdate } = renderHook(
                () => useContractCall(undefined, ZERO_ADDRESS, 'invalidFunction', []),
                {
                    wrapper,
                },
            );

            await waitForNextUpdate();
            const currentCall = result.current[0];
            const currentCallError = result.current[1].error;
            assert.isUndefined(currentCall, 'result.current');
            assert.isDefined(currentCallError, 'error');
            assert.equal(currentCallError?.message, 'networkId undefined', 'error.message');

            //No additional re-renders frm background tasks
            await expectThrowsAsync(waitForNextUpdate, 'Timed out in waitForNextUpdate after 1000ms.');
        });
        it.skip('address undefined', async () => {
            const { result, waitForNextUpdate } = renderHook(
                () => useContractCall(networkId, undefined, 'invalidFunction', []),
                {
                    wrapper,
                },
            );

            await waitForNextUpdate();
            const currentCall = result.current[0];
            const currentCallError = result.current[1].error;
            assert.isUndefined(currentCall, 'result.current');
            assert.isDefined(currentCallError, 'error');
            assert.equal(currentCallError?.message, 'address undefined', 'error.message');

            //No additional re-renders frm background tasks
            await expectThrowsAsync(waitForNextUpdate, 'Timed out in waitForNextUpdate after 1000ms.');
        });
        it.skip('method undefined', async () => {
            const { result, waitForNextUpdate } = renderHook(
                () => useContractCall(networkId, ZERO_ADDRESS, undefined, []),
                {
                    wrapper,
                },
            );

            await waitForNextUpdate();
            const currentCall = result.current[0];
            const currentCallError = result.current[1].error;
            assert.isUndefined(currentCall, 'result.current');
            assert.isDefined(currentCallError, 'error');
            assert.equal(currentCallError?.message, 'method undefined', 'error.message');

            //No additional re-renders frm background tasks
            await expectThrowsAsync(waitForNextUpdate, 'Timed out in waitForNextUpdate after 1000ms.');
        });
        it.skip('Contract {id} undefined', async () => {
            store.dispatch(NetworkCRUD.actions.create({ networkId }));

            const { result, waitForNextUpdate } = renderHook(
                () => useContractCall(networkId, ZERO_ADDRESS, 'invalidFunction', []),
                {
                    wrapper,
                },
            );

            await waitForNextUpdate();
            await waitForNextUpdate();
            await waitForNextUpdate(); //load error
            const currentCall = result.current[0];
            const currentCallError = result.current[1].error;
            assert.isUndefined(currentCall, 'result.current');
            assert.isDefined(currentCallError, 'error');
            assert.equal(currentCallError?.message, `Contract ${networkId}-${ZERO_ADDRESS} undefined`, 'error.message');

            //No additional re-renders frm background tasks
            await expectThrowsAsync(waitForNextUpdate, 'Timed out in waitForNextUpdate after 1000ms.');
        });
        it.skip('Contract {id} has no web3 contract', async () => {
            store.dispatch(NetworkCRUD.actions.create({ networkId }));
            store.dispatch(
                ContractCRUD.actions.create({
                    networkId,
                    address: ZERO_ADDRESS,
                    abi: cloneDeep(Contracts.Artifacts.BlockNumber.abi) as any,
                }),
            );

            const { result, waitForNextUpdate } = renderHook(
                () => useContractCall(networkId, ZERO_ADDRESS, 'invalidFunction', []),
                {
                    wrapper,
                },
            );

            await waitForNextUpdate();
            await waitForNextUpdate();
            await waitForNextUpdate(); //load error
            const currentCall = result.current[0];
            const currentCallError = result.current[1].error;
            assert.isUndefined(currentCall, 'result.current');
            assert.isDefined(currentCallError, 'error');
            assert.equal(
                currentCallError?.message,
                `Contract ${networkId}-${ZERO_ADDRESS} has no web3 contract`,
                'error.message',
            );

            //No additional re-renders frm background tasks
            await expectThrowsAsync(waitForNextUpdate, 'Timed out in waitForNextUpdate after 1000ms.');
        });
        it.skip('Contract {id} has no such method {method}', async () => {
            store.dispatch(NetworkCRUD.actions.create({ networkId, web3 }));
            web3Contract = await new web3.eth.Contract(cloneDeep(Contracts.Artifacts.BlockNumber.abi) as any)
                .deploy({
                    data: Contracts.Artifacts.BlockNumber.bytecode,
                })
                .send({ from: accounts[0], gas: 1000000, gasPrice: '875000000' });
            address = web3Contract.options.address;
            store.dispatch(
                ContractCRUD.actions.create({
                    networkId,
                    address,
                    abi: cloneDeep(Contracts.Artifacts.BlockNumber.abi) as any,
                }),
            );

            const { result, waitForNextUpdate } = renderHook(
                () => useContractCall(networkId, address, 'invalidFunction', []),
                {
                    wrapper,
                },
            );

            await waitForNextUpdate();
            await waitForNextUpdate();
            await waitForNextUpdate(); //load error

            const currentCall = result.current[0];
            const currentCallError = result.current[1].error;
            assert.isUndefined(currentCall, 'result.current');
            assert.isDefined(currentCallError, 'error');
            assert.equal(
                currentCallError?.message,
                `Contract ${networkId},${address.toLowerCase()} has no such method invalidFunction`,
                'error.message',
            );

            //No additional re-renders frm background tasks
            await expectThrowsAsync(waitForNextUpdate, 'Timed out in waitForNextUpdate after 1000ms.');
        });
    });

    describe('Network & Contract initialized', () => {
        beforeEach(async () => {
            store.dispatch(NetworkCRUD.actions.create({ networkId, web3 }));

            web3Contract = await new web3.eth.Contract(cloneDeep(Contracts.Artifacts.BlockNumber.abi) as any)
                .deploy({
                    data: Contracts.Artifacts.BlockNumber.bytecode,
                })
                .send({ from: accounts[0], gas: 1000000, gasPrice: '875000000' });
            address = web3Contract.options.address.toLowerCase();
            store.dispatch(
                ContractCRUD.actions.create({
                    networkId,
                    address,
                    abi: cloneDeep(Contracts.Artifacts.BlockNumber.abi) as any,
                }),
            );
        });

        describe('useContractCall', () => {
            it.skip('error contract revert', async () => {
                const { result, waitForNextUpdate } = renderHook(
                    () => useContractCall(networkId, address, 'revertTx', []),
                    {
                        wrapper,
                    },
                );

                await waitForNextUpdate();
                await waitForNextUpdate();
                await waitForNextUpdate();
                await waitForNextUpdate();
                await waitForNextUpdate(); //load error

                const currentCall = result.current[0];
                const currentCallError = result.current[1].error;
                assert.isUndefined(currentCall, 'result.current');
                assert.isDefined(currentCallError, 'error');
                assert.equal(
                    currentCallError?.message,
                    "VM Exception while processing transaction: reverted with reason string 'Transaction reverted'",
                    'error.message',
                );

                //No additional re-renders frm background tasks
                await expectThrowsAsync(waitForNextUpdate, 'Timed out in waitForNextUpdate after 1000ms.');
            });

            it('(networkId, address, method, [])', async () => {
                const { result, waitForNextUpdate } = renderHook(
                    () => useContractCall(networkId, address, 'getValue', []),
                    {
                        wrapper,
                    },
                );

                await waitForNextUpdate();
                await waitForNextUpdate();
                await waitForNextUpdate();
                await waitForNextUpdate();
                await waitForNextUpdate();

                const currentCall = result.current[0];
                assert.equal(currentCall, '0', 'result.current');

                //No additional re-renders frm background tasks
                await expectThrowsAsync(waitForNextUpdate, 'Timed out in waitForNextUpdate after 1000ms.');
            });

            it('(networkId, address, method, [], { sync: Transaction })', async () => {
                const { result, waitForNextUpdate } = renderHook(
                    () => useContractCall(networkId, address, 'getValue', [], undefined, 0, 'Transaction'),
                    {
                        wrapper,
                    },
                );

                await waitForNextUpdate();
                await waitForNextUpdate();
                await waitForNextUpdate();
                await waitForNextUpdate();
                await waitForNextUpdate();

                const currentCall = result.current[0];
                const currentOptions = result.current[1];
                assert.equal(currentCall, '0', 'result.current');
                assert.isFalse(currentOptions.isLoading, 'isLoading');
                assert.isDefined(currentOptions.callAction);

                await web3Contract.methods
                    .setValue(42)
                    .send({ from: accounts[0], gas: 1000000, gasPrice: '875000000' });
                //Create transaction, triggering a refresh
                store.dispatch(
                    TransactionCRUD.actions.create({
                        networkId,
                        hash: '0x1',
                        from: accounts[0],
                        to: address,
                    }),
                );
                await waitForNextUpdate();
                await waitForNextUpdate()

                const currentCall2 = result.current[0];
                assert.equal(currentCall2, '42', 'result.current');
                //No additional re-renders frm background tasks
                await expectThrowsAsync(waitForNextUpdate, 'Timed out in waitForNextUpdate after 1000ms.');
            });

            it('(networkId, address, method, [], { sync: Block })', async () => {
                const { result, waitForNextUpdate } = renderHook(
                    () => useContractCall(networkId, address, 'getValue', [], undefined, 0, 'Block'),
                    {
                        wrapper,
                    },
                );

                await waitForNextUpdate();
                await waitForNextUpdate();
                await waitForNextUpdate();
                await waitForNextUpdate();
                await waitForNextUpdate();

                const currentCall = result.current[0];
                const currentOptions = result.current[1];
                assert.equal(currentCall, '0', 'result.current');
                assert.isFalse(currentOptions.isLoading, 'isLoading');
                assert.isDefined(currentOptions.callAction);

                await web3Contract.methods
                    .setValue(42)
                    .send({ from: accounts[0], gas: 1000000, gasPrice: '875000000' });
                //Create block, triggering a refresh
                store.dispatch(
                    BlockCRUD.actions.create({
                        networkId,
                        number: 1,
                    }),
                );
                await waitForNextUpdate();
                await waitForNextUpdate();

                const currentCall2 = result.current[0];
                assert.equal(currentCall2, '42', 'result.current');
                //No additional re-renders frm background tasks
                await expectThrowsAsync(waitForNextUpdate, 'Timed out in waitForNextUpdate after 1000ms.');
            });

            it('(networkId, address, method, [], { sync: Event })', async () => {
                //Matches all NewValue updates
                const eventSync = createEventSync('NewValue', networkId, [], address, 'NewValue');
                const { result, waitForNextUpdate } = renderHook(
                    () => useContractCall(networkId, address, 'getValue', [], undefined, 0, eventSync),
                    {
                        wrapper,
                    },
                );

                await waitForNextUpdate();
                await waitForNextUpdate();
                await waitForNextUpdate();
                await waitForNextUpdate();
                await waitForNextUpdate();

                const currentCall = result.current[0];
                const currentOptions = result.current[1];
                assert.equal(currentCall, '0', 'result.current');
                assert.isFalse(currentOptions.isLoading, 'isLoading');
                assert.isDefined(currentOptions.callAction);

                await web3Contract.methods
                    .setValue(42)
                    .send({ from: accounts[0], gas: 1000000, gasPrice: '875000000' });
                //Create event, triggering a refresh
                store.dispatch(
                    ContractEventCRUD.actions.create({
                        networkId,
                        address,
                        blockNumber: 1,
                        blockHash: '0x1',
                        logIndex: 0,
                        name: 'NewValue',
                        returnValues: {},
                    }),
                );
                await waitForNextUpdate();
                await waitForNextUpdate();

                const currentCall2 = result.current[0];
                assert.equal(currentCall2, '42', 'result.current');
                //No additional re-renders frm background tasks
                await expectThrowsAsync(waitForNextUpdate, 'Timed out in waitForNextUpdate after 1000ms.');
            });
        });
    });
});
