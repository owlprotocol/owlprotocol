export {};
/*
import { assert } from "chai";
import { renderHook } from "@testing-library/react-hooks";
import { Provider } from "react-redux";

import { AssetPickerName } from "../common.js";
import { createStore, StoreType } from "../../store.js";
import { useAssetPicker } from "../hooks/index.js";
import { Asset } from "../model/interface.js";

describe(`${AssetPickerName}/hooks/useAssetPicker.test.tsx`, () => {
    let store: StoreType;
    let wrapper: any;

    beforeEach(() => {
        store = createStore();
        wrapper = ({ children }: any) => (
            <Provider store={store}> {children} </Provider>
        );
    });

    describe("useAssetPicker", () => {
        it("(networkId, number, true)", async () => {
            const choices = [
                { type: "ERC20", networkId: "1", address: "0x1", amount: "1" },
            ] as Asset[];
            const { result, waitForNextUpdate } = renderHook(
                () => useAssetPicker("1", choices),
                {
                    wrapper,
                }
            );

            await waitForNextUpdate();
            await waitForNextUpdate();

            const current0 = result.current;
            assert.equal(current0.picker?.status, "SELECTED");
            assert.deepEqual(current0.picker?.selected, [], "selected = []");
            current0.setSelected([0]);
            await waitForNextUpdate();

            const current1 = result.current;
            assert.equal(current1.picker?.status, "SELECTED");
            assert.deepEqual(
                current1.selected,
                choices,
                "selected = [choices[0]]"
            );

            current1.toggleSelected();
            await waitForNextUpdate();
            const current2 = result.current;
            assert.equal(current2.picker?.status, "SELECTING");
        });
    });
});
*/
