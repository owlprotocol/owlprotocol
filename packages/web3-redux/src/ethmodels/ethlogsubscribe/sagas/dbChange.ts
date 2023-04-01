/**
 * TODO
 * - onCreate/Update/Upsert/Put
 *      - newValue.active == true && !subscription.active => Start subscription
 *      - newValue.active == false && subscription.active => Stop subscription
 *      - Move saga from contract to ethlogsubscribe
 *
 * - Subscription validateWithReduxd => Use selector to add listener to subscription
 *
 */
import { put, take, fork, select, call } from "typed-redux-saga";
import { EventChannel } from "redux-saga";
import { EthLogSubscribeCRUD } from "../crud.js";
import { EthLogSubscribe, EthLogSubscribeId } from "../model/interface.js";
import { EthLogCRUD } from "../../ethlog/crud.js";
import { NetworkCRUD } from "../../../network/crud.js";
import { getEthLogFilter } from "../../ethlog/model/getEthLogFilter.js";
import {
    ethLogSubscribeChannel,
    EthLogSubscribeChannelMessage,
    EthLogSubscribeMessageType,
} from "../model/ethlogSubscribeChannel.js";

//Handle contract creation
export function* dbCreatingSaga(
    action: ReturnType<typeof EthLogSubscribeCRUD.actions.dbCreating>,
): Generator<any, any> {
    //Handle contract creation
    const { payload } = action;
    const { obj } = payload;
    if (obj.active) {
        //Redux
        const subscription = yield* call(createSubscription, obj);
        yield* put(
            EthLogSubscribeCRUD.actions.reduxUpsert({
                ...payload.obj,
                subscription,
            }),
        );
        if (subscription) {
            yield* fork(startSubscribe, subscription, obj.networkId, obj.eventFormatFull);
        }
    }
}

export function* dbUpdatingSaga(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    action: ReturnType<typeof EthLogSubscribeCRUD.actions.dbUpdating>,
): Generator<any, any> {
    //Handle contract creation
    /*
    const { payload } = action;

    if ("active" in payload.mods) {
        //Redux
        yield* put(
            EthLogSubscribeCRUD.actions.reduxUpsert({
                ...payload.obj,
                ...payload.mods,
            })
        );
        if (payload.mods.active)
            yield* fork(startSubscribe, { ...payload.obj, ...payload.mods });
        else yield* fork(endSubscribe, { ...payload.obj, ...payload.mods });
    }
    */
}

export function* dbDeletingSaga(
    action: ReturnType<typeof EthLogSubscribeCRUD.actions.dbDeleting>,
): Generator<any, any> {
    const { payload } = action;
    if (payload.obj) {
        const { networkId, address, topic0, topic1, topic2, topic3 } = payload.obj;
        yield* put(
            EthLogSubscribeCRUD.actions.reduxDelete({
                networkId,
                address,
                topic0,
                topic1,
                topic2,
                topic3,
            }),
        );
    }
}

export function* createSubscription({ networkId, address, topic0, topic1, topic2, topic3 }: EthLogSubscribe) {
    const options = getEthLogFilter({
        address,
        topic0,
        topic1,
        topic2,
        topic3,
    });

    const network = yield* select(NetworkCRUD.selectors.selectByIdSingle, networkId);
    const web3 = network?.web3;

    if (web3) {
        return ethLogSubscribeChannel(
            //@ts-expect-error
            web3.eth.subscribe("logs", options),
        );
    }
}

export function* startSubscribe(
    channel: EventChannel<EthLogSubscribeChannelMessage>,
    networkId: string,
    eventFormatFull: string | undefined,
): Generator<any, any> {
    //Select redux subscripton
    while (true) {
        const message: EthLogSubscribeChannelMessage = yield* take(channel);
        const { type, log, error } = message;
        if (type === EthLogSubscribeMessageType.data && log) {
            yield* put(
                EthLogCRUD.actions.put({
                    ...log,
                    networkId,
                    eventFormatFull,
                }),
            );
        } else if (type === EthLogSubscribeMessageType.error) {
            yield* put({ type: EthLogSubscribeMessageType.error, error });
        } else if (type === EthLogSubscribeMessageType.changed && log) {
            yield* put(
                EthLogCRUD.actions.put({
                    ...log,
                    networkId,
                    eventFormatFull,
                }),
            );
        }
    }
}

export function* endSubscribe({
    networkId,
    address,
    topic0,
    topic1,
    topic2,
    topic3,
}: EthLogSubscribeId): Generator<any, any> {
    //Select redux subscripton
    const item = yield* select(EthLogSubscribeCRUD.selectors.selectByIdSingle, {
        networkId,
        address,
        topic0,
        topic1,
        topic2,
        topic3,
    });
    const subscription = item?.subscription;
    if (subscription) {
        subscription.close();
    }
}
