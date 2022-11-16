import { assert } from 'chai';
import { Provider } from 'react-redux';
import type { Contract as Web3Contract } from 'web3-eth-contract';
import { renderHook } from '@testing-library/react-hooks';
import { Artifacts } from '@owlprotocol/contracts'

import { name } from '../common.js';
import { createStore, StoreType } from '../../store.js';

import { useEvents } from '../hooks/useEvents.js';
import ContractCRUD from '../crud.js';
import NetworkCRUD from '../../network/crud.js';
import ContractEventCRUD from '../../contractevent/crud.js';
import { network1336 } from '../../network/data.js';
import expectThrowsAsync from '../../test/expectThrowsAsync.js';
import { fromEventData } from '../../contractevent/model/interface.js';
import { omit } from 'lodash-es';
import sleep from '../../utils/sleep.js';

const networkId = network1336.networkId;
const web3 = network1336.web3!;

describe(`${name}/hooks/useEvents.tsx`, () => {
    let store: StoreType;
    let wrapper: any;

    let accounts: string[];
    let web3Contract: Web3Contract;
    let address: string;

    before(async () => {
        accounts = await web3.eth.getAccounts();
    });

    beforeEach(async () => {
        web3Contract = await new web3.eth.Contract(Artifacts.BlockNumber.abi)
            .deploy({
                data: Artifacts.BlockNumber.bytecode,
            })
            .send({ from: accounts[0], gas: 1000000, gasPrice: '875000000' });
        address = web3Contract.options.address.toLowerCase();

        store = createStore();
        store.dispatch(NetworkCRUD.actions.create({ networkId, web3 }));
        store.dispatch(ContractCRUD.actions.create({ networkId, address, web3Contract }));
        wrapper = ({ children }: any) => <Provider store={store}> {children} </Provider>;
    });

    describe('useEvents', () => {
        it.skip('(networkId, address, eventName)', async () => {
            const expectedEvents: any[] = [];
            web3Contract.events['NewValue']().on('data', (event: any) => {
                expectedEvents.push(ContractEventCRUD.validate({ networkId, address, name: 'NewValue', ...event }));
            });

            const { result, waitForNextUpdate } = renderHook(
                () => useEvents(networkId, address, 'NewValue', undefined, { sync: true }),
                {
                    wrapper,
                },
            );

            web3Contract.methods.setValue(42).send({ from: accounts[0], gas: 1000000, gasPrice: '875000000' });
            await waitForNextUpdate();
            await waitForNextUpdate();

            const currentEvents = result.current[0];
            assert.deepEqual(currentEvents, expectedEvents, 'result.current');

            //No additional re-renders frm background tasks
            await expectThrowsAsync(waitForNextUpdate, 'Timed out in waitForNextUpdate after 1000ms.');
        });

        it.skip('(...,filter)', async () => {
            const expectedEvents: any[] = [];
            web3Contract.events['NewValue']({ filter: { value: 42 } }).on('data', (event: any) => {
                expectedEvents.push(ContractEventCRUD.validate({ networkId, address, name: 'NewValue', ...event }));
            });

            const { result, waitForNextUpdate } = renderHook(
                () => useEvents(networkId, address, 'NewValue', { value: '42' }, { sync: true }),
                {
                    wrapper,
                },
            );

            web3Contract.methods.setValue(42).send({ from: accounts[0], gas: 1000000, gasPrice: '875000000' });
            await waitForNextUpdate();

            //This is ignored by the hook
            await web3Contract.methods.setValue(43).send({ from: accounts[0], gas: 1000000, gasPrice: '875000000' });

            const currentEvents = result.current[0];
            assert.deepEqual(currentEvents, expectedEvents, 'result.current');
        });

        it('(networkId, address, eventName, { past: true })', async () => {
            const expectedEvents: any[] = [];
            web3Contract.events['NewValue']().on('data', (event: any) => {
                expectedEvents.push(fromEventData(event, networkId));
            });

            await web3Contract.methods.setValue(42).send({ from: accounts[0], gas: 1000000, gasPrice: '875000000' });

            const { result, waitForNextUpdate } = renderHook(
                () => useEvents(networkId, address, 'NewValue', undefined, { past: true }),
                {
                    wrapper,
                },
            );

            await waitForNextUpdate();
            await waitForNextUpdate();
            await waitForNextUpdate();
            await waitForNextUpdate();
            await waitForNextUpdate();
            await waitForNextUpdate();

            const currentEvents = result.current[0]?.map((e) => omit(e, 'updatedAt'));
            assert.deepEqual(currentEvents, expectedEvents, 'result.current');

            //No additional re-renders frm background tasks
            await expectThrowsAsync(waitForNextUpdate, 'Timed out in waitForNextUpdate after 1000ms.');
        });
    });
});
