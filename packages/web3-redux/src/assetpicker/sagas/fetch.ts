import { AssetPickerCRUD } from '../crud.js';
import { AssetPicker } from '../model/interface.js';

interface AssetPickerEventResponseItem {
    id: number;
    created_at: string;
    text_signature: string;
    hex_signature: string;
    bytes_signature: string;
}

export function* fetchSaga(action: ReturnType<typeof AssetPickerCRUD.actions.fetch>): Generator<
    any,
    {
        signature: AssetPicker;
    }
> {
    const { payload } = action;
    throw new Error('Unimplemented')
}
