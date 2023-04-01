/* eslint-disable */
import { useCallback, useEffect } from "react";
import { useDispatch } from "react-redux";
import { AssetPickerCRUD } from "../crud.js";
import { AssetPicker } from "../model/interface.js";

export const useAssetPicker = (id: string, choices: AssetPicker["choices"]) => {
    const choicesStr = JSON.stringify(choices);

    const dispatch = useDispatch();
    const [picker, { isLoading }] = AssetPickerCRUD.hooks.useGet({ id });
    const pickerStatus = picker?.status;
    const pickerChoices = JSON.stringify(picker?.choices ?? []);

    useEffect(() => {
        //Update asset picker
        if (!isLoading && pickerChoices != choicesStr) {
            dispatch(
                AssetPickerCRUD.actions.upsert({
                    id,
                    status: pickerStatus ?? "SELECTED",
                    choices,
                    selected: [],
                }),
            );
        }
    }, [id, choicesStr, isLoading, pickerStatus, pickerChoices]);

    const setSelected = useCallback(
        (selected: AssetPicker["selected"]) => {
            dispatch(
                AssetPickerCRUD.actions.update({
                    id,
                    status: "SELECTED",
                    selected,
                }),
            );
        },
        [id],
    );

    const toggleSelected = useCallback(() => {
        if (pickerStatus == "SELECTED") {
            dispatch(
                AssetPickerCRUD.actions.update({
                    id,
                    status: "SELECTING",
                }),
            );
        } else if (pickerStatus == "SELECTING") {
            dispatch(
                AssetPickerCRUD.actions.update({
                    id,
                    status: "SELECTED",
                }),
            );
        }
    }, [id, pickerStatus]);

    const selected = (picker?.selected ?? []).map((idx) => (picker?.choices ?? [])[idx]);
    const result = { selected, picker, isLoading, setSelected, toggleSelected };
    return result;
};
