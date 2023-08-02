import { assert } from "chai";
import { renderHook } from "@testing-library/react-hooks";
import { omit } from "lodash-es";
import { Child, ChildId, getChildDexie, createTestDexie } from "@owlprotocol/crud-dexie/test";
import {  getChildDexieHooks } from "./child.js";

describe(`hook.test.tsx`, () => {
    const ChildDexie = getChildDexie(createTestDexie());
    const ChildDexieHooks = getChildDexieHooks(ChildDexie)
    const id0: ChildId = { firstName: "John", lastName: "Doe" };
    const item0: Child = { ...id0, age: 42 };

    const id1: ChildId = { firstName: "Jane", lastName: "Doe" };
    const item1: Child = { ...id1, age: 69 };

    const id2: ChildId = { firstName: "Jack", lastName: "Doe" };
    const item2: Child = { ...id2, age: 420 };

    it("useAll()", async () => {
        const { result, waitForNextUpdate } = renderHook(() => ChildDexieHooks.useAll());

        const [results0, options0] = result.current;
        assert.deepEqual(results0, [], "result0");
        assert.isTrue(options0.isLoading, "options0.isLoading");

        await waitForNextUpdate();
        const [results1, options1] = result.current;
        assert.deepEqual(results1, [], "result1");
        assert.isFalse(options1.isLoading, "options1.isLoading");

        await ChildDexie.add(item0);
        await waitForNextUpdate();
        const [results2, options2] = result.current;
        assert.deepEqual(
            results2.map((r) => omit(r, "relatives")),
            [item0],
            "result1",
        );
        assert.isFalse(options2.isLoading, "options1.isLoading");
    });
    it("useGet()", async () => {
        const { result, waitForNextUpdate } = renderHook(() => ChildDexieHooks.useGet(id0));

        const [results0, options0] = result.current;
        assert.deepEqual(results0, undefined, "result0");
        assert.isTrue(options0.isLoading, "options0.isLoading");

        await waitForNextUpdate();
        const [results1, options1] = result.current;
        assert.deepEqual(results1, undefined, "result1");
        assert.isFalse(options1.isLoading, "options1.isLoading");

        await ChildDexie.add(item0);
        await waitForNextUpdate();
        const [results2, options2] = result.current;
        assert.deepEqual(omit(results2, "relatives"), item0, "result1");
        assert.isFalse(options2.isLoading, "options1.isLoading");
    });
    it("useGetBulk()", async () => {
        const { result, waitForNextUpdate } = renderHook(() => ChildDexieHooks.useGetBulk([id0]));

        const [results0, options0] = result.current;
        assert.deepEqual(results0, [], "result0");
        assert.isTrue(options0.isLoading, "options0.isLoading");

        await waitForNextUpdate();
        const [results1, options1] = result.current;
        assert.deepEqual(results1, [undefined], "result1");
        assert.isFalse(options1.isLoading, "options1.isLoading");

        await ChildDexie.add(item0);
        await waitForNextUpdate();
        const [results2, options2] = result.current;
        assert.deepEqual(
            results2.map((r) => omit(r, "relatives")),
            [item0],
            "result1",
        );
        assert.isFalse(options2.isLoading, "options1.isLoading");
    });
    it("useWhere()", async () => {
        const { result, waitForNextUpdate } = renderHook(() =>
            ChildDexieHooks.useWhere({ firstName: item0.firstName }),
        );

        const [results0, options0] = result.current;
        assert.deepEqual(results0, [], "result0");
        assert.isTrue(options0.isLoading, "options0.isLoading");

        await waitForNextUpdate();
        const [results1, options1] = result.current;
        assert.deepEqual(results1, [], "result1");
        assert.isFalse(options1.isLoading, "options1.isLoading");

        await ChildDexie.add(item0);
        await waitForNextUpdate();
        const [results2, options2] = result.current;
        assert.deepEqual(
            results2.map((r) => omit(r, "relatives")),
            [item0],
            "result1",
        );
        assert.isFalse(options2.isLoading, "options1.isLoading");
    });
    it("useAnyOf()", async () => {
        const { result, waitForNextUpdate } = renderHook(() => ChildDexieHooks.useAnyOf("lastName", [item0.lastName]));

        const [results0, options0] = result.current;
        assert.deepEqual(results0, [], "result0");
        assert.isTrue(options0.isLoading, "options0.isLoading");

        await waitForNextUpdate();
        const [results1, options1] = result.current;
        assert.deepEqual(results1, [], "result1");
        assert.isFalse(options1.isLoading, "options1.isLoading");

        await ChildDexie.add(item0);
        await waitForNextUpdate();
        const [results2, options2] = result.current;
        assert.deepEqual(
            results2.map((r) => omit(r, "relatives")),
            [item0],
            "result1",
        );
        assert.isFalse(options2.isLoading, "options1.isLoading");
    });
    it("useWhereMany()", async () => {
        const { result, waitForNextUpdate } = renderHook(() =>
            ChildDexieHooks.useWhereMany([{ firstName: item0.firstName }, { lastName: item0.lastName }]),
        );

        const [results0, options0] = result.current;
        assert.deepEqual(results0, [], "result0");
        assert.isTrue(options0.isLoading, "options0.isLoading");

        await waitForNextUpdate();
        const [results1, options1] = result.current;
        assert.deepEqual(results1, [[], []], "result1");
        assert.isFalse(options1.isLoading, "options1.isLoading");

        await ChildDexie.add(item0);
        await waitForNextUpdate();
        const [results2, options2] = result.current;
        assert.deepEqual(
            results2.map((results) => results.map((r) => omit(r, "relatives"))),
            [[item0], [item0]],
            "result2",
        );
        assert.isFalse(options2.isLoading, "options2.isLoading");

        await ChildDexie.add(item1);
        await ChildDexie.add(item2);
        await waitForNextUpdate();
        const [results3, options3] = result.current;
        assert.deepEqual(
            results3.map((results) => results.map((r) => omit(r, "relatives"))),
            [[item0], [item2, item1, item0]],
            "result3",
        );
        assert.isFalse(options3.isLoading, "options3.isLoading");
    });
    it("useWhereAnyOf()", async () => {
        const { result, waitForNextUpdate } = renderHook(() =>
            ChildDexieHooks.useWhereAnyOf({ firstName: [item0.firstName, item1.firstName, item2.firstName] }),
        );

        const [results0, options0] = result.current;
        assert.deepEqual(results0, [], "result0");
        assert.isTrue(options0.isLoading, "options0.isLoading");

        await waitForNextUpdate(); //fetch result
        const [results1, options1] = result.current;
        assert.deepEqual(results1, [[], [], []], "result1");
        assert.isFalse(options1.isLoading, "options1.isLoading");

        await ChildDexie.add(item0);
        await waitForNextUpdate(); //fetch result
        const [results2, options2] = result.current;
        assert.deepEqual(
            results2.map((results) => results.map((r) => omit(r, "relatives"))),
            [[item0], [], []],
            "result2",
        );
        assert.isFalse(options2.isLoading, "options2.isLoading");

        await ChildDexie.add(item1);
        await ChildDexie.add(item2);
        await waitForNextUpdate();
        const [results3, options3] = result.current;
        assert.deepEqual(
            results3.map((results) => results.map((r) => omit(r, "relatives"))),
            [[item0], [item1], [item2]],
            "result3",
        );
        assert.isFalse(options3.isLoading, "options3.isLoading");
    });
});
