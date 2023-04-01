import { put, call, takeEvery, actionChannel, all, spawn, select } from "typed-redux-saga";
import { Channel, multicastChannel } from "redux-saga";
import {
    channelBufferBySplit,
    channelDebouncePut,
    channelFilter,
    channelMap,
    wrapSagaWithErrorHandler,
} from "@owlprotocol/crud-redux";
import { web3CallBatchedSaga } from "./web3CallBatched.js";
import { EthCallCRUD } from "../crud.js";
import { NetworkCRUD } from "../../../network/crud.js";
import { EthCall, EthCallStatus, validateEthCall, WithArgs } from "../model/interface.js";
import { web3CallAction, Web3CallAction, Web3CallActionInputBase, WEB3_CALL } from "../actions/web3Call.js";
import { web3CallBatchedAction, Web3CallBatchedAction, WEB3_CALL_BATCHED } from "../actions/web3CallBatched.js";

export function* web3CallSaga<Args extends any[] = any[], Ret = any>(
    action: Web3CallAction<Args>,
): Generator<any, EthCall<Args, Ret>> {
    const { payload, meta } = action;
    const { networkId, from, to, data, gas, defaultBlock, maxCacheAge } = payload;

    const dbSelected = yield* call(EthCallCRUD.db.get, { networkId, to, data });
    if (dbSelected?.updatedAt && Date.now() - dbSelected.updatedAt < maxCacheAge) {
        return dbSelected as EthCall<Args, Ret>;
    }

    //const ethcallLoading = { ...payload, status: 'LOADING' as const }
    //yield* put(EthCallCRUD.actions.upsert(ethcallLoading, action.meta.uuid));

    const network = yield* select(NetworkCRUD.selectors.selectByIdSingle, networkId);
    if (!network) throw new Error(`Network ${networkId} undefined`);
    const web3 = network?.web3;
    if (!web3) throw new Error(`Network ${networkId} missing web3`);

    try {
        const gasDefined = gas ?? (yield* call(web3.eth.estimateGas, { from, to, data })); //default gas
        const returnData: string = yield* call(
            //@ts-ignore
            web3.eth.call,
            { from, to, data, gas: gasDefined },
            defaultBlock,
        );
        const ethcall = validateEthCall({
            ...payload,
            gas: gasDefined,
            returnData,
            status: EthCallStatus.SUCCESS,
        }) as EthCall<Args, Ret>;

        yield* put(EthCallCRUD.actions.upsert(ethcall, meta.uuid, meta.ts));
        return ethcall;
    } catch (err) {
        const ethcall = validateEthCall({
            ...payload,
            status: EthCallStatus.ERROR,
            errorId: meta.uuid,
        }) as EthCall<Args, Ret>;

        yield* put(EthCallCRUD.actions.upsert(ethcall, meta.uuid, meta.ts));
        throw err;
    }
}

// Omit<Web3CallAction<Args>, 'payload'> & { payload: Omit<Web3CallAction<Args>['payload'], 'methodFormatFull'> }
export function web3CallSagaFactory<Args extends any[] = any[], Ret = any>(methodFormatFull: string) {
    return function (
        payload: Web3CallActionInputBase & WithArgs<Args>,
        uuid?: string | undefined,
        ts?: number | undefined,
    ) {
        const action = web3CallAction<Args>({ ...payload, methodFormatFull }, uuid, ts);
        return web3CallSaga<Args, Ret>(action);
    };
}

export function* watchWeb3CallSaga() {
    const chan = yield* actionChannel<Web3CallAction>(WEB3_CALL);
    const chanMulti = multicastChannel<Web3CallAction>();

    //Register receivers on multicastChannel
    const chanSingle: Channel<Web3CallAction> = yield* channelFilter(chanMulti, (c) => !c.payload.batch);
    //Batch calls
    const chanSingleBatched: Channel<Web3CallAction> = yield* channelFilter(chanMulti, (c) => !!c.payload.batch);
    //Put to multicast
    yield* spawn(
        channelDebouncePut,
        chan,
        ({ payload }: Web3CallAction) => `${payload.networkId}-${payload.to}-${payload.data}`,
        (e: Web3CallAction) => e.payload.maxCacheAge,
        chanMulti,
    );

    //TODO: Batch by gas sum
    //Buffer calls by networkId & gas defined & multicall
    const chanBufferByNetworkGas: Channel<Web3CallAction[]> = yield* channelBufferBySplit<Web3CallAction>(
        chanSingleBatched,
        10,
        100,
        (e) => {
            if (e.payload.batchMulticall) {
                //Ignore gas, cannot define gas limit for multicall
                return `${e.payload.networkId}-${false}-${e.payload.batchMulticall}`;
            }
            return `${e.payload.networkId}-${!!e.payload.gas}-${false}`;
        },
    );
    const chanBatched = yield* call(
        channelMap<Web3CallAction[], Web3CallBatchedAction>,
        chanBufferByNetworkGas,
        (e: Web3CallAction[]) => {
            return web3CallBatchedAction({
                networkId: e[0].payload.networkId,
                multicall: e[0].payload.batchMulticall,
                calls: e.map((e) => e.payload),
            });
        },
    );

    yield* all([
        takeEvery(chanSingle, wrapSagaWithErrorHandler(web3CallSaga, WEB3_CALL)),
        takeEvery(chanBatched, wrapSagaWithErrorHandler(web3CallBatchedSaga, WEB3_CALL_BATCHED)),
    ]);
}
