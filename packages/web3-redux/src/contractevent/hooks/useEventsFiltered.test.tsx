import { assert } from 'chai';
import { Provider } from 'react-redux';
import { renderHook } from '@testing-library/react-hooks';
import * as Contracts from '@owlprotocol/contracts';

import { name } from '../common.js';
import { createStore, StoreType } from '../../store.js';

import { ContractCRUD } from '../../contract/crud.js';
import { NetworkCRUD } from '../../network/crud.js';
import { network1336 } from '../../network/data.js';
import expectThrowsAsync from '../../test/expectThrowsAsync.js';
import type { AbiItem } from 'web3-utils';
import { coder } from '../../utils/web3-eth-abi/index.js';
import { useEventsFiltered } from './useEventsFiltered.js';
import ContractEventCRUD from '../crud.js';
import { omit } from 'lodash-es';

const networkId = network1336.networkId;
const web3 = network1336.web3!;

describe(`${name}/hooks/useEventsFiltered.tsx`, () => {
    let store: StoreType;
    let wrapper: any;

    let accounts: string[];
    let address: string;

    const eventAbi = Contracts.Artifacts.BlockNumber.abi.find((a: AbiItem) => a.type === 'event' && a.name === 'NewValue')

    before(async () => {
        accounts = await web3.eth.getAccounts();
    });

    beforeEach(async () => {
        const web3Contract = await new web3.eth.Contract(Contracts.Artifacts.BlockNumber.abi)
            .deploy({
                data: Contracts.Artifacts.BlockNumber.bytecode,
            })
            .send({ from: accounts[0], gas: 1000000, gasPrice: '875000000' });
        address = web3Contract.options.address.toLowerCase();

        store = createStore();
        store.dispatch(NetworkCRUD.actions.create({ networkId, web3 }));
        store.dispatch(ContractCRUD.actions.create({ networkId, address, web3Contract }));
        wrapper = ({ children }: any) => <Provider store={store}> {children} </Provider>;
    });

    describe('useEventsFiltered', () => {
        it('(networkId, address, eventName)', async () => {
            const event = {
                networkId,
                address,
                name: 'NewValue',
                blockHash: '0x1',
                blockNumber: 1,
                logIndex: 1,
                topic0: eventAbi.signature
            }
            store.dispatch(ContractEventCRUD.actions.create(event))
            const { result, waitForNextUpdate } = renderHook(
                () => useEventsFiltered(networkId, address, 'NewValue'),
                {
                    wrapper,
                },
            );

            await waitForNextUpdate();
            await waitForNextUpdate();
            await waitForNextUpdate();
            const events = result.current[0]?.map((e) => omit(e, 'updatedAt'));
            assert.deepEqual(events, [event], 'result.current');

            //No additional re-renders frm background tasks
            await expectThrowsAsync(waitForNextUpdate, 'Timed out in waitForNextUpdate after 1000ms.');
        });
    });
});
