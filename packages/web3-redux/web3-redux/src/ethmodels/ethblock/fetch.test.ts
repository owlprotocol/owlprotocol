import { assert } from "chai";
import Web3 from "web3";
import { sleep } from "@owlprotocol/utils";
import { EthBlockName, validateEthBlock } from "@owlprotocol/web3-models";
import { fetchBlockAction, NetworkCRUDActions } from "@owlprotocol/web3-actions";
import { EthBlockDexie } from "@owlprotocol/web3-dexie";
import { getTestNetwork, getTestWeb3Provider } from "@owlprotocol/web3-test-utils";

import { mineBlock } from "../../utils/index.js";
import { createStore, StoreType } from "../../store.js";

const network1336 = getTestNetwork();
const networkId = network1336.networkId;
const web3 = network1336.web3!;

describe(`${EthBlockName}/sagas/fetch.ts`, () => {
    describe("store", () => {
        let store: StoreType;

        beforeEach(async () => {
            store = createStore();
            store.dispatch(NetworkCRUDActions.actions.reduxUpsert(network1336));
        });

        describe("fetch", () => {
            it("({returnTransactionObjects:false})", async () => {
                await mineBlock(web3);

                store.dispatch(
                    fetchBlockAction({
                        networkId,
                        blockNumber: 1,
                        returnTransactionObjects: false,
                    }),
                );
                await sleep(100);

                const expected = validateEthBlock({
                    ...(await web3.eth.getBlock(1)),
                    networkId,
                });
                const selected = await EthBlockDexie.get({
                    networkId,
                    number: 1,
                });
                assert.deepEqual(selected, expected as any);
            });
        });
    });
});

describe(`${EthBlockName}.fetch.rpccalls`, () => {
    let web3: Web3; //Web3 loaded from store
    let store: StoreType;
    /*
    let rpcLogger: ReturnType<typeof ganacheLogger>;
    let ethGetBlockByNumber = 0;
    let ethSubscribe = 0;
    let ethUnsubscribe = 0;
    */

    before(async () => {
        /*
        rpcLogger = ganacheLogger();
        const ethGetBlockByNumberIncr = () => (ethGetBlockByNumber += 1);
        const ethSubscribeIncr = () => (ethSubscribe += 1);
        const ethUnsubscribeIncr = () => (ethUnsubscribe += 1);
        rpcLogger.addListener('eth_getBlockByNumber', ethGetBlockByNumberIncr);
        rpcLogger.addListener('eth_subscribe', ethSubscribeIncr);
        rpcLogger.addListener('eth_unsubscribe', ethUnsubscribeIncr);
        */

        const provider = getTestWeb3Provider();
        //@ts-ignore
        web3 = new Web3(provider);
    });

    beforeEach(async () => {
        store = createStore();
        store.dispatch(NetworkCRUDActions.actions.reduxUpsert({ networkId, web3 }));
    });

    it.skip("rpc calls", async () => {
        //const ethGetBlockByNumberInitial = ethGetBlockByNumber;
        await mineBlock(web3);
        store.dispatch(
            fetchBlockAction({
                networkId,
                blockHash: "latest",
                returnTransactionObjects: false,
            }),
        );
        //Count rpc calls since test began
        //assert.equal(ethGetBlockByNumber - ethGetBlockByNumberInitial, 1, 'eth_getBlockByNumber rpc calls != expected');
    });
});

//OLD TESTS
/*
it('BlockSagas.fetch({returnTransactionObjects:false})', async () => {
    const gen = BlockSagas.fetch(Block.fetch({ networkId, blockHashOrBlockNumber: 'latest' }));
    const block = await web3.eth.getBlock('latest');
    const expectedBlock: BlockTransactionString = { ...block, networkId, id: `${networkId}-${block.number}` };
    const expectedPutBlockAction = put(Block.create(expectedBlock));

    gen.next(); //select web3 TODO: pass mock state
    gen.next(); //call web3
    //@ts-ignore
    const putBlock = gen.next(expectedBlock).value;
    assert.deepEqual(putBlock, expectedPutBlockAction);
});

it('BlockSagas.fetch({returnTransactionObjects:true})', async () => {
    const gen = BlockSagas.fetch(
        Block.fetch({ networkId, blockHashOrBlockNumber: 'latest', returnTransactionObjects: true }),
    );
    const block = await web3.eth.getBlock('latest', true);
    //@ts-ignore
    const expectedBlock: BlockTransactionObject = { ...block, networkId, id: `${networkId}-${block.number}` };
    const expectedPutBlockAction = put(Block.create(expectedBlock));

    gen.next(); //select web3 TODO: pass mock state
    gen.next(); //call web3
    //@ts-ignore
    const putBlock = gen.next(expectedBlock).value;
    assert.deepEqual(putBlock, expectedPutBlockAction);
});
*/
