import { call, put, select } from "typed-redux-saga";
import { AxiosResponse } from "axios";
import { EthCallAbiCRUD } from "../crud.js";
import { EthCallAbi, validate } from "../model/interface.js";
import { ConfigCRUD } from "../../../config/crud.js";
import { FetchAction } from "../actions/fetch.js";

interface _4ByteResponseItem {
    id: number;
    created_at: string;
    text_signature: string;
    hex_signature: string;
    bytes_signature: string;
}

export function* fetchSaga(action: FetchAction): Generator<any, EthCallAbi[]> {
    const { payload, meta } = action;
    const { methodSighash } = payload;

    const dbSelected = yield* call(EthCallAbiCRUD.db.where, { methodSighash });
    if (dbSelected.length > 0) return dbSelected;

    //Fetch
    const config = yield* select(ConfigCRUD.selectors.selectByIdSingle, { id: "0" });
    const client = config?._4byteClient;
    if (!client) throw new Error("4byte client undefined!");

    const res = yield* call(client.get, `/signatures/?hex_signature=${methodSighash}`);
    const methodFormatFullArr: _4ByteResponseItem[] = (res as AxiosResponse).data?.results;
    const items = methodFormatFullArr.map((e) => {
        return validate({ methodFormatFull: e.text_signature });
    });
    if (methodFormatFullArr.length > 0) {
        yield* put(EthCallAbiCRUD.actions.createBatched(items, meta.uuid, meta.ts));
    }

    return items;
}
