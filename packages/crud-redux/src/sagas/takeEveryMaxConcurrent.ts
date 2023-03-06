import { NotUndefined } from "@redux-saga/types";
import { Action } from 'redux';
import { buffers, Channel, } from 'redux-saga';
import { take, fork, call, actionChannel } from 'typed-redux-saga';

export function* takeEveryMaxWorkers<T extends Action = Action>(
    action: string,
    saga: (action: T) => Generator<any>,
    workers: number = 10
) {
    const chan = (yield* actionChannel(action, buffers.expanding())) as Channel<T>
    yield* takeEveryFromChannelMaxWorkers(chan, saga, workers)
}

export function* takeEveryFromChannelMaxWorkers<T extends NotUndefined = any>(
    chan: Channel<T>,
    saga: (e: T) => Generator<any>,
    workers: number = 10
) {
    for (let i = 0; i < workers; i++) {
        yield* fork(takeEveryFromChannel, chan, saga)
    }
}

export function* takeEveryFromChannel<T extends NotUndefined = any>(
    chan: Channel<T>,
    saga: (e: T) => Generator<any>
) {
    while (true) {
        const a = yield* take(chan)
        yield* call(saga, a);
    }
}
