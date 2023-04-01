import { NotUndefined } from "@redux-saga/types";
import { pickBy } from "lodash-es";
import { Action } from "redux";
import { buffers, Channel, channel, MulticastChannel } from "redux-saga";
import { Pattern } from "redux-saga/effects";
import { delay, spawn, put, race, take as take2 } from "typed-redux-saga";

type ChannelAny<T extends NotUndefined = any> = Channel<T> | MulticastChannel<T>;

export function isChannel<T extends NotUndefined = any>(c: any): c is Channel<T> {
    return (c as Channel<T>).flush !== undefined;
}
export function take<T extends NotUndefined = any>(channel: ChannelAny<T>, multicastPattern?: Pattern<T>) {
    if (isChannel(channel)) {
        return take2(channel);
    } else {
        return take2(channel, multicastPattern);
    }
}

/**
 * Opposite of actionChannel, put all actions to redux store
 * @param chan
 */
export function* channelTakeEveryPut<T extends Action = Action>(chan: ChannelAny<T>) {
    while (true) {
        const a = yield* take(chan, "*");
        yield* put(a);
    }
}

export function* channelFilter<T extends NotUndefined = any>(inChan: ChannelAny<T>, filter: (e: T) => boolean) {
    const outChan = channel(buffers.expanding<T>());
    yield* spawn(channelFilterPut, inChan, filter, outChan);
    return outChan;
}

export function* channelFilterPut<T extends NotUndefined = any>(
    inChan: ChannelAny<T>,
    filter: (e: T) => boolean,
    outChan: ChannelAny<T>,
) {
    while (true) {
        const a = yield* take(inChan, "*");

        if (filter(a)) {
            yield* put(outChan, a);
        }
    }
}

export function* channelDebounce<T extends NotUndefined = any>(
    inChan: ChannelAny<T>,
    debounceId: (e: T) => string,
    ms: number | ((e: T) => number),
) {
    const outChan = channel(buffers.expanding<T>());
    yield* spawn(channelDebouncePut, inChan, debounceId, ms, outChan);
    return outChan;
}

export function* channelDebouncePut<T extends NotUndefined = any>(
    inChan: ChannelAny<T>,
    debounceId: (e: T) => string,
    ms: number | ((e: T) => number),
    outChan: ChannelAny<T>,
) {
    let cache: { [k: string]: { ts: number; cacheMaxAge: number } } = {};
    while (true) {
        const a = yield* take(inChan, "*");
        const id = debounceId(a);
        const cacheAge = cache[id]?.ts ? Date.now() - cache[id].ts : undefined;
        const cacheMaxAge = typeof ms === "number" ? ms : ms(a);
        if (!cacheAge) {
            cache[id] = { ts: Date.now(), cacheMaxAge };
            yield* put(outChan, a);
        } else {
            if (cacheAge >= cacheMaxAge) {
                cache[id] = { ts: Date.now(), cacheMaxAge };
                yield* put(outChan, a);
            }
        }
        cache = pickBy(cache, (v) => Date.now() - v.ts < v.cacheMaxAge);
    }
}

export function* channelMap<T extends NotUndefined = any, U extends NotUndefined = T>(
    inChan: ChannelAny<T>,
    map: (e: T) => U,
) {
    const outChan = channel(buffers.expanding<U>());
    yield* spawn(channelMapPut, inChan, map, outChan);
    return outChan;
}

export function* channelMapPut<T extends NotUndefined = any, U extends NotUndefined = any>(
    inChan: ChannelAny<T>,
    map: (e: T) => U,
    outChan: ChannelAny<U>,
) {
    while (true) {
        const a = yield* take(inChan, "*");
        yield* put(outChan, map(a));
    }
}

export function* channelReduce<T extends NotUndefined = any, U extends NotUndefined = any>(
    inChan: ChannelAny<T>,
    reduce: (acc: U, e: T) => U,
    accInit: U,
) {
    const outChan = channel(buffers.expanding<U>());
    yield* spawn(channelReducePut, inChan, reduce, accInit, outChan);
    return outChan;
}

export function* channelReducePut<T extends NotUndefined = any, U extends NotUndefined = any>(
    inChan: ChannelAny<T>,
    reduce: (acc: U, e: T) => U,
    accInit: U,
    outChan: ChannelAny<U>,
) {
    let acc = accInit;
    yield* put(outChan, acc);

    while (true) {
        const a = yield* take(inChan, "*");

        acc = reduce(acc, a);
        yield* put(outChan, acc);
    }
}

/**
 * Buffer channel
 * @param inChan
 * @param size
 * @param timeout
 */
export function* channelBuffer<T extends NotUndefined = any>(inChan: ChannelAny<T>, size = 100, timeout = 100) {
    const outChan = channel(buffers.expanding<T[]>());
    yield* spawn(channelBufferPut, inChan, size, timeout, outChan);
    return outChan;
}

export function* channelBufferPut<T extends NotUndefined = any>(
    inChan: ChannelAny<T>,
    size = 10,
    timeout = 100,
    outChan: ChannelAny<T[]>,
) {
    while (true) {
        const bufferStart = Date.now();
        let elapsed = 0;
        const buffer: T[] = [];
        while (buffer.length < size! && elapsed < timeout) {
            // Build batch using action channel, complete batch after `bufferBatchTimeout` ms
            const { action } = yield* race({
                action: take(inChan, "*"),
                timeout: delay(Math.max(timeout - elapsed, 0)),
            });
            if (action) {
                buffer.push(action);
                elapsed = Date.now() - bufferStart;
            } else break;
        }
        if (buffer.length > 0) {
            yield* put(outChan, buffer);
        }
    }
}

export function* channelSplit<T extends NotUndefined = any>(inChan: ChannelAny<T>, splitBy: (e: T) => string) {
    const outChan = channel(buffers.expanding<Channel<T>>());
    yield* spawn(channelSplitPut, inChan, outChan, splitBy);
    return outChan;
}

export function* channelSplitPut<T extends NotUndefined = any>(
    inChan: ChannelAny<T>,
    outChan: ChannelAny<Channel<T>>,
    splitBy: (e: T) => string,
) {
    const groups: { [k: string]: Channel<T> } = {};

    while (true) {
        const a = yield* take(inChan, "*");
        const groupId = splitBy(a);
        let outGroupChan = groups[groupId];
        if (!outGroupChan) {
            outGroupChan = channel(buffers.expanding<T>());
            //new channel
            outChan.put(outGroupChan);
            groups[groupId] = outGroupChan;
        }
        outGroupChan.put(a);
    }
}

/**
 * Buffer channel
 * @param inChan
 * @param size
 * @param timeout
 */
export function* channelBufferBySplit<T extends NotUndefined = any>(
    inChan: ChannelAny<T>,
    size = 100,
    timeout = 100,
    splitBy: (e: T) => string,
) {
    const outChan = channel(buffers.expanding<T[]>());
    yield* spawn(channelBufferBySplitPut, inChan, size, timeout, splitBy, outChan);
    return outChan;
}

/**
 * Buffer channel
 * @param inChan
 * @param size
 * @param timeout
 */
export function* channelBufferBySplitPut<T extends NotUndefined = any>(
    inChan: ChannelAny<T>,
    size = 100,
    timeout = 100,
    splitBy: (e: T) => string,
    outChan: ChannelAny<T[]>,
) {
    const splitChan = yield* channelSplit(inChan, splitBy);
    while (true) {
        const c = yield* take(splitChan);
        yield* spawn(channelBufferPut, c, size, timeout, outChan);
    }
}
