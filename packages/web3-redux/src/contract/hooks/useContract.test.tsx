import { assert } from 'chai';
import { renderHook } from '@testing-library/react-hooks';
import { Provider } from 'react-redux';

import { useContract } from './useContract.js';
import { name } from '../common.js';
import { createStore, StoreType } from '../../store.js';
import NetworkCRUD from '../../network/crud.js';
import ContractCRUD from '../crud.js';
import { network1336 } from '../../network/data.js';
import expectThrowsAsync from '../../test/expectThrowsAsync.js';
import * as Contracts from '@owlprotocol/contracts';
import { sleep } from '../../utils/index.js';

const networkId = network1336.networkId;
const web3 = network1336.web3!;

describe(`${name}/hooks/useContract.test.tsx`, () => {
    let store: StoreType;
    let from: string;
    let address: string;

    let wrapper: any;
    before(async () => {
        const accounts = await web3.eth.getAccounts();
        from = accounts[0];
    });

    beforeEach(async () => {
        const web3Contract = await new web3.eth.Contract(Contracts.Artifacts.BlockNumber.abi)
            .deploy({
                data: Contracts.Artifacts.BlockNumber.bytecode,
            })
            .send({ from: from, gas: 1000000, gasPrice: '875000000' });
        address = web3Contract.options.address.toLowerCase()

        store = createStore();
        store.dispatch(NetworkCRUD.actions.create({ networkId, web3 }));
        store.dispatch(ContractCRUD.actions.create({ networkId, address, web3Contract }));
        wrapper = ({ children }: any) => <Provider store={store}> {children} </Provider>;
    });

    it('useContract', async () => {
        const { result, waitForNextUpdate } = renderHook(
            () => useContract(networkId, address),
            {
                wrapper,
            },
        );

        await waitForNextUpdate();
        const contract = result.current[0];

        assert.isDefined(contract);
        //No additional re-renders frm background tasks
        await expectThrowsAsync(waitForNextUpdate, 'Timed out in waitForNextUpdate after 1000ms.');
    });
});
