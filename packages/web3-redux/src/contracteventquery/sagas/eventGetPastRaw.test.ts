import { assert, expect } from 'chai';
import type { Contract as Web3Contract } from 'web3-eth-contract';
import { testSaga } from 'redux-saga-test-plan';
import { mineUpTo } from '@nomicfoundation/hardhat-network-helpers';

import { AbiItem } from '../../utils/web3-utils/index.js';

import { name } from '../../contract/common.js';
import * as Contracts from '@owlprotocol/contracts';
import { eventGetPastRawAction } from '../actions/index.js';
import { ContractCRUD } from '../../contract/crud.js';
import { network1336 } from '../../network/data.js';
import { ADDRESS_0 } from '../../data.js';
import { eventGetPastRawSaga } from './eventGetPastRaw.js';
import { fetchSaga } from '../../contract/sagas/fetch.js';
import { ContractEventQueryCRUD } from '../crud.js';
import { createStore, StoreType } from '../../store.js';
import { NetworkCRUD } from '../../network/crud.js';
import { sleep } from '../../utils/index.js';
import { ContractEventCRUD } from '../../contractevent/crud.js';
import { isUndefined, omit, omitBy } from 'lodash-es';

const networkId = network1336.networkId;
const web3 = network1336.web3!;

describe(`${name}/sagas/eventGetPastRaw.test.ts`, () => {
    let accounts: string[];

    before(async () => {
        accounts = await web3.eth.getAccounts();
    });

    describe('unit', () => {
        const address = ADDRESS_0;
        const web3Contract = new web3.eth.Contract(Contracts.Artifacts.BlockNumber.abi as AbiItem[], address);
        const blockNumber = 20;

        const action = eventGetPastRawAction({
            networkId,
            address,
            eventName: 'NewValue',
            fromBlock: 0,
            toBlock: blockNumber
        }, "", 0);

        //@ts-expect-error
        const eventQuery = ContractEventQueryCRUD.validate({
            networkId,
            address,
            eventName: 'NewValue',
            fromBlock: action.payload.fromBlock,
            toBlock: action.payload.toBlock,
        })

        it('eventGetPastRaw - no results', async () => {
            testSaga(eventGetPastRawSaga, action)
                .next()
                .call(fetchSaga, ContractCRUD.actions.fetch({ networkId, address }, action.meta.uuid, action.meta.ts))
                .next({ network: network1336, contract: { web3Contract } })
                .call(ContractEventQueryCRUD.db.get, eventQuery)
                .next(undefined)
                .call([web3Contract, web3Contract.getPastEvents], 'NewValue', {
                    fromBlock: action.payload.fromBlock,
                    toBlock: action.payload.toBlock
                })
                .next([])
                .put(ContractEventQueryCRUD.actions.upsert({ ...eventQuery, events: [] }, action.meta.uuid, action.meta.ts))
                .next()
                .returns({ network: network1336, contract: { web3Contract }, events: [] })
                .next()
                .isDone();
        });

        it('eventGetPastRaw - error too many', async () => {
            const action0 = eventGetPastRawAction({
                networkId,
                address,
                eventName: 'NewValue',
                fromBlock: 10,
                toBlock: 20
            }, "", 0);

            const action1 = eventGetPastRawAction({
                networkId,
                address,
                eventName: 'NewValue',
                fromBlock: 0,
                toBlock: 10
            }, "", 0);

            testSaga(eventGetPastRawSaga, action)
                .next()
                .call(fetchSaga, ContractCRUD.actions.fetch({ networkId, address }, action.meta.uuid, action.meta.ts))
                .next({ network: network1336, contract: { web3Contract } })
                .call(ContractEventQueryCRUD.db.get, eventQuery)
                .next(undefined)
                .call([web3Contract, web3Contract.getPastEvents], 'NewValue', {
                    fromBlock: action.payload.fromBlock,
                    toBlock: action.payload.toBlock
                })
                .throw(new Error('Returned error: query returned more than 10000 results'))
                .put(ContractEventQueryCRUD.actions.upsert({ ...eventQuery, errorId: action.meta.uuid }, action.meta.uuid, action.meta.ts))
                .next()
                .returns({ network: network1336, contract: { web3Contract }, actions: [action0, action1] })
                .next()
                .isDone();
        });
    });

    describe('store', () => {
        let web3Contract: Web3Contract;
        let address: string;
        let store: StoreType;

        beforeEach(async () => {
            web3Contract = await new web3.eth.Contract(Contracts.Artifacts.BlockNumber.abi as AbiItem[])
                .deploy({
                    data: Contracts.Artifacts.BlockNumber.bytecode,
                })
                .send({ from: accounts[0], gas: 1000000, gasPrice: '875000000' });
            address = web3Contract.options.address.toLowerCase();

            store = createStore();
            store.dispatch(NetworkCRUD.actions.create(network1336));
            store.dispatch(
                ContractCRUD.actions.create({
                    networkId,
                    address,
                    abi: Contracts.Artifacts.BlockNumber.abi as AbiItem[],
                }),
            );
        });

        it('eventGetPastRaw - no results', async () => {
            store.dispatch(
                eventGetPastRawAction({
                    networkId,
                    address,
                    eventName: 'NewValue',
                    fromBlock: 0,
                    toBlock: 20
                }),
            );

            await sleep(2000);

            //@ts-ignore
            const events1 = await ContractEventCRUD.db.where({ networkId, address, name: 'NewValue' });
            assert.deepEqual(events1, []);
        });

        it('eventGetPastRaw - 1 result', async () => {
            await web3Contract.methods
                .setValue(42)
                .send({ from: accounts[0], gas: 1000000, gasPrice: '875000000' });

            store.dispatch(
                eventGetPastRawAction({
                    networkId,
                    address,
                    eventName: 'NewValue',
                    fromBlock: 0,
                    toBlock: 20
                }),
            );

            await sleep(2000);

            const expectedEvents = (await web3Contract.getPastEvents('NewValue')).map((e) => {
                return omitBy({
                    ...e,
                    networkId,
                    address,
                    name: 'NewValue',
                    topic0: undefined,
                    topic1: undefined,
                    topic2: undefined,
                    topic3: undefined,
                }, isUndefined) as any;
            });

            //@ts-ignore
            const events1 = (await ContractEventCRUD.db.where({ networkId, address, name: 'NewValue' })).map((e) => {
                return omit(e, 'updatedAt')
            });
            assert.deepEqual(events1, expectedEvents);
        });
    });
});
