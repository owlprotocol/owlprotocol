import { assert, expect } from 'chai';
import type { Contract as Web3Contract } from 'web3-eth-contract';
import { testSaga } from 'redux-saga-test-plan';
import { mineUpTo } from '@nomicfoundation/hardhat-network-helpers';

import { eventGetPast, findBuckets, splitBucket } from './eventGetPast.js';
import { AbiItem } from '../../utils/web3-utils/index.js';

import { name } from '../common.js';

import * as Contracts from '@owlprotocol/contracts';
import { mineBlocks, sleep } from '../../utils/index.js';

import { createStore, StoreType } from '../../store.js';
import {
    eventGetPast as eventGetPastAction,
    eventGetPastRawAction as eventGetPastRawAction,
} from '../actions/index.js';
import { NetworkCRUD } from '../../network/crud.js';
import { ContractCRUD } from '../crud.js';
import { ContractEventCRUD } from '../../contractevent/crud.js';
import { network1336 } from '../../network/data.js';
import { ADDRESS_0 } from '../../data.js';
import { fetchSaga as fetchNetworkSaga } from '../../network/sagas/fetch.js';
import { eventGetPastRaw } from './eventGetPastRaw.js';
import { all, call } from 'typed-redux-saga';
import { omit } from 'lodash-es';
import { fromEventData } from '../../contractevent/model/interface.js';
import { getEventFilter } from '../../contractevent/sagas/getEventFilter.js';

const networkId = network1336.networkId;
const web3 = network1336.web3!;

describe(`${name}/sagas/eventGetPast.test.ts`, () => {
    let accounts: string[];
    const eventAbi = Contracts.Artifacts.BlockNumber.abi.find((a: AbiItem) => a.type === 'event' && a.name === 'NewValue')

    before(async () => {
        accounts = await web3.eth.getAccounts();
    });

    describe('findBuckets', () => {
        it('0-1557', () => {
            const gen = findBuckets(0, 1557);
            assert.deepEqual(gen.next().value, { from: 1550, to: 1557 });
            assert.deepEqual(gen.next().value, { from: 1500, to: 1550 });
            assert.deepEqual(gen.next().value, { from: 1000, to: 1500 });
            assert.deepEqual(gen.next().value, { from: 0, to: 1000 });
            assert.isTrue(gen.next().done);
        });

        it('115-1557', () => {
            const gen = findBuckets(115, 1557);
            assert.deepEqual(gen.next().value, { from: 1550, to: 1557 });
            assert.deepEqual(gen.next().value, { from: 1500, to: 1550 });
            assert.deepEqual(gen.next().value, { from: 1000, to: 1500 });
            assert.deepEqual(gen.next().value, { from: 500, to: 1000 });
            assert.deepEqual(gen.next().value, { from: 400, to: 500 });
            assert.deepEqual(gen.next().value, { from: 300, to: 400 });
            assert.deepEqual(gen.next().value, { from: 200, to: 300 });
            assert.deepEqual(gen.next().value, { from: 150, to: 200 });
            assert.deepEqual(gen.next().value, { from: 140, to: 150 });
            assert.deepEqual(gen.next().value, { from: 130, to: 140 });
            assert.deepEqual(gen.next().value, { from: 120, to: 130 });
            assert.deepEqual(gen.next().value, { from: 115, to: 120 });
            assert.isTrue(gen.next().done);
        });
    });

    describe('splitBucket', () => {
        it('50-100', () => {
            const gen = splitBucket(50, 100);
            assert.deepEqual(gen.next().value, { from: 90, to: 100 });
            assert.deepEqual(gen.next().value, { from: 80, to: 90 });
            assert.deepEqual(gen.next().value, { from: 70, to: 80 });
            assert.deepEqual(gen.next().value, { from: 60, to: 70 });
            assert.deepEqual(gen.next().value, { from: 50, to: 60 });
            assert.isTrue(gen.next().done);
        });
    });

    describe('unit', () => {
        const address = ADDRESS_0;
        it('eventGetPast - latestBlock', async () => {
            const action = eventGetPastAction({
                networkId,
                address,
                eventName: 'NewValue',
                fromBlock: 0,
            });

            await mineBlocks(web3, 1);
            const blockNumber = await web3.eth.getBlockNumber();
            //console.debug({ blockNumber })

            const a = eventGetPastRawAction(
                {
                    networkId,
                    address,
                    eventName: 'NewValue',
                    filter: undefined,
                    fromBlock: 0,
                    toBlock: blockNumber,
                },
                action.meta.uuid,
                action.meta.ts
            )
            const expected = all([call(eventGetPastRaw, a)])
            //console.debug(expected)
            testSaga(eventGetPast, action)
                .next()
                .call(fetchNetworkSaga, NetworkCRUD.actions.fetch({ networkId }, action.meta.uuid, action.meta.ts))
                .next({ network: network1336 })
                .call(web3.eth.getBlockNumber)
                .next(blockNumber)
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

        it('eventGetPast - no results', async () => {
            const { index } = getEventFilter({ networkId, address }, eventAbi)
            store.dispatch(
                eventGetPastAction({
                    networkId,
                    address,
                    eventName: 'NewValue',
                }),
            );

            await sleep(2000);

            const eventFilter = getEventFilter({ networkId, address }, eventAbi)
            const events1 = (await ContractEventCRUD.db.where(index))
            assert.deepEqual(events1, []);
        });

        it('eventGetPast - 1 result', async () => {
            const { index } = getEventFilter({ networkId, address }, eventAbi)
            await web3Contract.methods
                .setValue(42)
                .send({ from: accounts[0], gas: 1000000, gasPrice: '875000000' });

            store.dispatch(
                eventGetPastAction({
                    networkId,
                    address,
                    eventName: 'NewValue',
                }),
            );

            await sleep(2000);

            const expectedEvents = (await web3Contract.getPastEvents('NewValue')).map((e) => fromEventData(e, networkId));
            const eventFilter = getEventFilter({ networkId, address }, eventAbi)
            const events1 = (await ContractEventCRUD.db.where(index)).map((e) => {
                return omit(e, 'updatedAt')
            });;
            assert.deepEqual(events1, expectedEvents);
        });

        it('eventGetPast - 100 result', async () => {
            const { index } = getEventFilter({ networkId, address }, eventAbi)

            await mineBlocks(web3, 5)
            const fromBlock = await web3.eth.getBlockNumber();
            const eventsCount = 100
            for (let i = 0; i < eventsCount; i++) {
                await web3Contract.methods
                    .setValue(i)
                    .send({ from: accounts[0], gas: 1000000, gasPrice: '875000000' });
            }
            const toBlock = await web3.eth.getBlockNumber()

            store.dispatch(
                eventGetPastAction({
                    networkId,
                    address,
                    eventName: 'NewValue',
                    fromBlock,
                    toBlock
                }),
            );

            await sleep(2000);

            const expectedEvents = (await web3Contract.getPastEvents('NewValue', { fromBlock, toBlock }))
                .map((e) => fromEventData(e, networkId))
                .sort((a, b) => a.blockNumber - b.blockNumber);

            const events1 = (await ContractEventCRUD.db.where(index)).map((e) => {
                return omit(e, 'updatedAt')
            }).sort((a, b) => a.blockNumber - b.blockNumber);
            assert.equal(events1.length, eventsCount, 'events.length')
            assert.equal(expectedEvents.length, eventsCount, 'expected.length')
            assert.deepEqual(events1, expectedEvents);
        });

        it('eventGetPast - filtered', async () => {
            const { index } = getEventFilter({ networkId, address, filter: { value: 5 } }, eventAbi)
            console.debug({ index })

            const fromBlock = await web3.eth.getBlockNumber();
            const eventsCount = 10
            for (let i = 0; i < eventsCount; i++) {
                await web3Contract.methods
                    .setValue(i)
                    .send({ from: accounts[0], gas: 1000000, gasPrice: '875000000' });
            }
            const toBlock = await web3.eth.getBlockNumber()

            store.dispatch(
                eventGetPastAction({
                    networkId,
                    address,
                    eventName: 'NewValue',
                    fromBlock,
                    toBlock,
                    filter: { value: 5 }
                }),
            );

            await sleep(2000);

            const expectedEvents = (await web3Contract.getPastEvents('NewValue', { fromBlock, toBlock }))
                .filter((e) => { return e.returnValues.value == 5 })
                .map((e) => fromEventData(e, networkId))
                .sort((a, b) => a.blockNumber - b.blockNumber);
            console.debug(await ContractEventCRUD.db.all())

            const events1 = (await ContractEventCRUD.db.where(index)).map((e) => {
                return omit(e, 'updatedAt')
            }).sort((a, b) => a.blockNumber - b.blockNumber);
            assert.equal(events1.length, 1, 'events.length')
            assert.equal(expectedEvents.length, 1, 'expected.length')
            assert.deepEqual(events1, expectedEvents);
        });
    });
});
