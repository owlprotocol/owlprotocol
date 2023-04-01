import { call, put, select } from "typed-redux-saga";
import { AxiosResponse } from "axios";
import { EthLogAbiCRUD } from "../crud.js";
import { EthLogAbi, validate } from "../model/interface.js";
import { ConfigCRUD } from "../../../config/crud.js";
import { FetchAction } from "../actions/fetch.js";

interface _4ByteResponseItem {
    id: number;
    created_at: string;
    text_signature: string;
    hex_signature: string;
    bytes_signature: string;
}

export function* fetchSaga(action: FetchAction): Generator<any, EthLogAbi[]> {
    const { payload, meta } = action;
    const { eventSighash } = payload;

    const dbSelected = yield* call(EthLogAbiCRUD.db.where, { eventSighash });
    if (dbSelected.length > 0) return dbSelected;

    //Fetch
    const config = yield* select(ConfigCRUD.selectors.selectByIdSingle, {
        id: "0",
    });
    const client = config?._4byteClient;
    if (!client) throw new Error("4byte client undefined!");

    const res = yield* call(client.get, `/event-signatures/?hex_signature=${eventSighash}`);
    const eventFormatFullArr: _4ByteResponseItem[] = (res as AxiosResponse).data?.results;
    const items = eventFormatFullArr.map((e) => {
        return validate({ eventFormatFull: e.text_signature });
    });
    if (eventFormatFullArr.length > 0) {
        yield* put(EthLogAbiCRUD.actions.createBatched(items, meta.uuid, meta.ts));
    }

    return items;
}
