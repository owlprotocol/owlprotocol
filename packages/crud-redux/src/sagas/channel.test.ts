import { take, put, delay, race } from "typed-redux-saga";
import { expectSaga } from "redux-saga-test-plan";
import { buffers, channel, END } from "redux-saga";
import { assert } from "chai";
//@ts-expect-error
import * as mochaGen from "mocha-generators";
import {
    channelTakeEveryPut,
    channelBuffer,
    channelSplit,
    channelBufferBySplit,
    channelFilter,
    channelMap,
    channelReduce,
    isChannel,
    channelDebounce,
} from "./channel.js";
import { sleep } from "../utils/sleep.js";

mochaGen.install();

describe("sagas/channel.test.ts", () => {
    it("promise as generator", function* () {
        async function fn() {
            await sleep(10);
            return true;
        }
        const p = fn();
        const r = (yield p) as number;
        assert.isTrue(r);
    });

    it("isChannel()", () => {
        const chan = channel();
        assert.isTrue(isChannel(chan));
    });

    it("channelTakeEveryPut(chan)", async function () {
        const action = { type: "START" as const };
        const chan = channel(buffers.expanding<typeof action>());
        chan.put(action);
        chan.put(END);

        function* mainSaga(c: typeof chan) {
            yield* channelTakeEveryPut(c);
        }

        await expectSaga(mainSaga, chan).put(action).run();
    });

    it("channelFilter(chan)", async function () {
        const action = { type: "START" as const, val: 1 };
        const chan = channel(buffers.expanding<typeof action>());
        chan.put(action);
        chan.put(END);

        function* mainSaga(c: typeof chan) {
            const chanFilter = yield* channelFilter(c, (e) => e.val === 1);
            const a = yield* take(chanFilter);
            yield* put(a);
        }

        await expectSaga(mainSaga, chan).put(action).run();
    });

    it("channelDebounce(chan)", async function () {
        const action = { type: "START" as const, val: 1 };
        const chan = channel(buffers.expanding<typeof action>());
        chan.put(action);
        chan.put(action);
        chan.put(END);

        function* mainSaga(c: typeof chan) {
            const chanDebounce = yield* channelDebounce(
                c,
                (e) => {
                    return `${e.val}`;
                },
                5,
            );
            const a = yield* take(chanDebounce);
            const { action } = yield* race({
                action: take(chanDebounce),
                timeout: delay(5),
            });
            yield* put(a);
            yield* put(action ?? END);
        }

        await expectSaga(mainSaga, chan).put({ type: "START", val: 1 }).put(END).run();
    });

    it("channelMap(chan)", async function () {
        const action = { type: "START" as const, val: 1 };
        const chan = channel(buffers.expanding<typeof action>());
        chan.put(action);
        chan.put(END);

        function* mainSaga(c: typeof chan) {
            const chanMap = yield* channelMap(c, (e) => {
                return { ...e, val: e.val * 2 };
            });
            const a = yield* take(chanMap);
            yield* put(a);
        }

        await expectSaga(mainSaga, chan).put({ type: "START", val: 2 }).run();
    });

    it("channelReduce(chan)", async function () {
        const action1 = { type: "START" as const, val: 1 };
        const action2 = { type: "START" as const, val: 2 };
        const chan = channel(buffers.expanding<typeof action1>());
        chan.put(action1);
        chan.put(action2);
        chan.put(END);

        function* mainSaga(c: typeof chan) {
            const chanReduce = yield* channelReduce(
                c,
                (acc, e) => {
                    return { type: "SUM", val: e.val + acc.val };
                },
                { type: "SUM", val: 0 },
            );
            const a1 = yield* take(chanReduce);
            const a2 = yield* take(chanReduce);
            const a3 = yield* take(chanReduce);
            yield* put(a1);
            yield* put(a2);
            yield* put(a3);
        }

        await expectSaga(mainSaga, chan)
            .put({ type: "SUM", val: 0 })
            .put({ type: "SUM", val: 1 })
            .put({ type: "SUM", val: 3 })
            .run();
    });

    it("channelBuffer(chan)", async function () {
        const action = { type: "START", val: 1 };
        const chan = channel(buffers.expanding<typeof action>());
        chan.put(action);
        chan.put(END);

        function* mainSaga(c: typeof chan) {
            const chanBuffer = yield* channelBuffer(c, 2, 10);
            const a = yield* take(chanBuffer);
            yield* put(a);
        }

        await expectSaga(mainSaga, chan)
            .put([{ type: "START", val: 1 }])
            .run({ timeout: 20, silenceTimeout: true });
    });

    it("channelSplit(chan)", async function () {
        const action1 = { type: "START", val: 1 };
        const action2 = { type: "START", val: 2 };
        const chan = channel(buffers.expanding<typeof action1>());
        chan.put(action1);
        chan.put(action2);
        chan.put(END);

        function* mainSaga(c: typeof chan) {
            const chanOut = yield* channelSplit(c, (e) => `${e.val}`);
            const c1 = yield* take(chanOut);
            const c2 = yield* take(chanOut);
            const a1 = yield* take(c1);
            const a2 = yield* take(c2);
            yield* put(a1);
            yield* put(a2);
        }

        await expectSaga(mainSaga, chan).put(action1).put(action2).run();
    });

    it("channelBufferBySplit(chan)", function* () {
        const action1 = { type: "START", val: 1 };
        const action2 = { type: "START", val: 2 };

        //const chanIdx = 0;
        const chan = channel(buffers.expanding<typeof action1>());
        chan.put(action1);
        chan.put(action2);
        chan.put(END);

        function* mainSaga(c: typeof chan) {
            const chanBufferBySplit = yield* channelBufferBySplit(c, 2, 20, (e) => `${e.val}`);
            const a1 = yield* take(chanBufferBySplit);
            const a2 = yield* take(chanBufferBySplit);
            yield* put(a1);
            yield* put(a2);
        }

        yield expectSaga(mainSaga, chan).put([action1]).put([action2]).run({ timeout: 20, silenceTimeout: true });
    });
});
