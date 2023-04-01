import { assert } from "chai";
import { EthLogQueryName } from "@owlprotocol/web3-models";
import { findBuckets, splitBucket } from "./web3GetPastLogsBucket.js";

describe(`${EthLogQueryName}/web3GetPastLogsBucket.test.ts`, () => {
    describe("findBuckets", () => {
        it("0-1557", () => {
            const gen = findBuckets(0, 1557);
            assert.deepEqual(gen.next().value, { from: 1550, to: 1557 });
            assert.deepEqual(gen.next().value, { from: 1500, to: 1550 });
            assert.deepEqual(gen.next().value, { from: 1000, to: 1500 });
            assert.deepEqual(gen.next().value, { from: 0, to: 1000 });
            assert.isTrue(gen.next().done);
        });

        it("115-1557", () => {
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

    describe("splitBucket", () => {
        it("50-100", () => {
            const gen = splitBucket(50, 100);
            assert.deepEqual(gen.next().value, { from: 90, to: 100 });
            assert.deepEqual(gen.next().value, { from: 80, to: 90 });
            assert.deepEqual(gen.next().value, { from: 70, to: 80 });
            assert.deepEqual(gen.next().value, { from: 60, to: 70 });
            assert.deepEqual(gen.next().value, { from: 50, to: 60 });
            assert.isTrue(gen.next().done);
        });
    });
});
