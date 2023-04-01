import { assert } from "chai";
import { renderHook, act } from "@testing-library/react-hooks";
import { Provider } from "react-redux";

import { sleep } from "@owlprotocol/utils";
import { useConfig } from "./useConfig.js";
import { ADDRESS_0, ADDRESS_1, networkId } from "../../test/data.js";
import { ConfigName } from "../common.js";
import { createStore, StoreType } from "../../store.js";
import { ConfigCRUD } from "../crud.js";
import { expectThrowsAsync } from "../../test/expectThrowsAsync.js";

describe(`${ConfigName}/hooks/useConfig.test.tsx`, () => {
    const account = ADDRESS_0;

    let store: StoreType;
    let wrapper: any;

    beforeEach(() => {
        store = createStore();
        wrapper = ({ children }: any) => <Provider store={store}> {children} </Provider>;
    });

    describe("useConfig", () => {
        it("()", async () => {
            store.dispatch(
                ConfigCRUD.actions.create({
                    id: "0",
                    networkId,
                    account,
                }),
            );
            await sleep(1000);

            const { result, waitForNextUpdate } = renderHook(() => useConfig(), {
                wrapper,
            });

            const result0 = result.current;
            assert.equal(result0[1].isLoading, true, "result0[1].isLoading");
            assert.deepEqual(result0[0], undefined, "result0[0]");

            await waitForNextUpdate();

            const result1 = result.current;
            assert.equal(result1[1].isLoading, false, "result1[1].isLoading");
            assert.deepEqual(result1[0], { id: "0", networkId, account }, "result1[0]");

            act(() => {
                result1[1].setAccount(ADDRESS_1);
            });

            await waitForNextUpdate();

            const result2 = result.current;
            assert.deepEqual(result2[0], { id: "0", networkId, account: ADDRESS_1 }, "result2[0]");

            act(() => {
                result2[1].setNetworkId("1335");
            });

            await waitForNextUpdate();

            const result3 = result.current;
            assert.deepEqual(result3[0], { id: "0", networkId: "1335", account: ADDRESS_1 }, "result3[0]");

            //No additional re-renders from background tasks
            await expectThrowsAsync(waitForNextUpdate, "Timed out in waitForNextUpdate after 1000ms.");
        });
    });
});
