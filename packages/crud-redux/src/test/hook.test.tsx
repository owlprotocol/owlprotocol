import { assert } from "chai";
import { renderHook } from "@testing-library/react-hooks";
import { Provider } from "react-redux";

import { omit } from "lodash-es";
import { Child, ChildId } from "./child/model/interface.js";
import { ChildCRUD } from "./child/crud.js";
import { createStore, StoreType } from "./store.js";

describe(`hook.test.tsx`, () => {
    const id0: ChildId = { firstName: "John", lastName: "Doe" };
    const item0: Child = { ...id0, age: 42 };

    const id1: ChildId = { firstName: "Jane", lastName: "Doe" };
    const item1: Child = { ...id1, age: 69 };

    const id2: ChildId = { firstName: "Jack", lastName: "Doe" };
    const item2: Child = { ...id2, age: 420 };

    let store: StoreType;
    let wrapper: any;

    beforeEach(async () => {
        store = createStore();
        wrapper = ({ children }: any) => <Provider store={store}> {children} </Provider>;

        await ChildCRUD.db.add(item0);
    });

    it("useAll()", async () => {
        const { result, waitForNextUpdate } = renderHook(() => ChildCRUD.hooks.useAll(), {
            wrapper,
        });

        const [results0, options0] = result.current;
        assert.deepEqual(results0, [], "result0");
        assert.isTrue(options0.isLoading, "options0.isLoading");

        await waitForNextUpdate();
        const [results1, options1] = result.current;
        assert.deepEqual(
            results1.map((r) => omit(r, "relatives")),
            [item0],
            "result1",
        );
        assert.isFalse(options1.isLoading, "options1.isLoading");
    });
    it("useGet()", async () => {
        const { result, waitForNextUpdate } = renderHook(() => ChildCRUD.hooks.useGet(id0), {
            wrapper,
        });

        const [results0, options0] = result.current;
        assert.deepEqual(results0, undefined, "result0");
        assert.isTrue(options0.isLoading, "options0.isLoading");

        await waitForNextUpdate();
        const [results1, options1] = result.current;
        assert.deepEqual(omit(results1, "relatives"), item0, "result1");
        assert.isFalse(options1.isLoading, "options1.isLoading");
    });
    it("useGetBulk()", async () => {
        const { result, waitForNextUpdate } = renderHook(() => ChildCRUD.hooks.useGetBulk([id0]), {
            wrapper,
        });

        const [results0, options0] = result.current;
        assert.deepEqual(results0, [], "result0");
        assert.isTrue(options0.isLoading, "options0.isLoading");

        await waitForNextUpdate();
        const [results1, options1] = result.current;
        assert.deepEqual(
            results1.map((r) => omit(r, "relatives")),
            [item0],
            "result1",
        );
        assert.isFalse(options1.isLoading, "options1.isLoading");
    });
    it("useWhere()", async () => {
        const { result, waitForNextUpdate } = renderHook(
            () => ChildCRUD.hooks.useWhere({ firstName: item0.firstName }),
            {
                wrapper,
            },
        );

        const [results0, options0] = result.current;
        assert.deepEqual(results0, [], "result0");
        assert.isTrue(options0.isLoading, "options0.isLoading");

        await waitForNextUpdate();
        const [results1, options1] = result.current;
        assert.deepEqual(
            results1.map((r) => omit(r, "relatives")),
            [item0],
            "result1",
        );
        assert.isFalse(options1.isLoading, "options1.isLoading");
    });
    it("useWhereMany()", async () => {
        const { result, waitForNextUpdate } = renderHook(
            () => ChildCRUD.hooks.useWhereMany([{ firstName: item0.firstName }, { lastName: item0.lastName }]),
            {
                wrapper,
            },
        );

        const [results0, options0] = result.current;
        assert.deepEqual(results0, [], "result0");
        assert.isTrue(options0.isLoading, "options0.isLoading");

        await waitForNextUpdate();
        const [results1, options1] = result.current;
        assert.deepEqual(
            results1.map((results) => results.map((r) => omit(r, "relatives"))),
            [[item0], [item0]],
            "result1",
        );
        assert.isFalse(options1.isLoading, "options1.isLoading");

        await ChildCRUD.db.add(item1);
        await ChildCRUD.db.add(item2);
        await waitForNextUpdate();
        const [results2, options2] = result.current;
        assert.deepEqual(
            results2.map((results) => results.map((r) => omit(r, "relatives"))),
            [[item0], [item2, item1, item0]],
            "result2",
        );
        assert.isFalse(options2.isLoading, "options1.isLoading");
    });
    it("useWhereAnyOf()", async () => {
        const { result, waitForNextUpdate } = renderHook(
            () => ChildCRUD.hooks.useWhereAnyOf({ firstName: [item0.firstName, item1.firstName, item2.firstName] }),
            {
                wrapper,
            },
        );

        const [results0, options0] = result.current;
        assert.deepEqual(results0, [], "result0");
        assert.isTrue(options0.isLoading, "options0.isLoading");

        await waitForNextUpdate(); //fetch result
        const [results1, options1] = result.current;
        assert.deepEqual(
            results1.map((results) => results.map((r) => omit(r, "relatives"))),
            [[item0], [], []],
            "result1",
        );
        assert.isFalse(options1.isLoading, "options1.isLoading");

        await ChildCRUD.db.add(item1);
        await ChildCRUD.db.add(item2);
        await waitForNextUpdate();
        const [results2, options2] = result.current;
        assert.deepEqual(
            results2.map((results) => results.map((r) => omit(r, "relatives"))),
            [[item0], [item1], [item2]],
            "result2",
        );
        assert.isFalse(options2.isLoading, "options1.isLoading");
    });
});
