import { assert } from 'chai';
import { Provider } from 'react-redux';
import { renderHook } from '@testing-library/react-hooks';
import { Artifacts } from '@owlprotocol/contracts'

import { name } from '../common.js';
import { createStore, StoreType } from '../../store.js';

import { ContractCRUD } from '../../contract/crud.js';
import { NetworkCRUD } from '../../network/crud.js';
import { network1336 } from '../../network/data.js';
import expectThrowsAsync from '../../test/expectThrowsAsync.js';
import { useEventFilter } from './useEventFilter.js';
import type { AbiItem } from 'web3-utils';
import { coder } from '../../utils/web3-eth-abi/index.js';

const networkId = network1336.networkId;
const web3 = network1336.web3!;

describe(`${name}/hooks/useEventFilter.tsx`, () => {
    let store: StoreType;
    let wrapper: any;

    let accounts: string[];
    let address: string;

    const eventAbi = Artifacts.BlockNumber.abi.find((a: AbiItem) => a.type === 'event' && a.name === 'NewValue')

    before(async () => {
        accounts = await web3.eth.getAccounts();
    });

    beforeEach(async () => {
        const web3Contract = await new web3.eth.Contract(Artifacts.BlockNumber.abi)
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

    describe('useEventFilter', () => {
        it('(networkId, address, eventName)', async () => {
            const { result, waitForNextUpdate } = renderHook(
                () => useEventFilter(networkId, address, 'NewValue'),
                {
                    wrapper,
                },
            );

            await waitForNextUpdate();
            const eventFilter = result.current;
            const expectedEventFilter = {
                index: {
                    networkId,
                    address,
                    topic0: coder.encodeEventSignature(eventAbi)
                },
            }
            assert.deepEqual(eventFilter, expectedEventFilter, 'result.current');

            //No additional re-renders frm background tasks
            await expectThrowsAsync(waitForNextUpdate, 'Timed out in waitForNextUpdate after 1000ms.');
        });
    });
});
