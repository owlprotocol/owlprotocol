import { call, put, select } from "typed-redux-saga";
import { AxiosResponse } from "axios";
import { EthCallAbiCRUDActions } from "@owlprotocol/web3-actions";
import { EthCallAbi, validateEthCallAbi } from "@owlprotocol/web3-models";
import { FetchEthCallAbiAction } from "@owlprotocol/web3-actions";
import { EthCallAbiDexie } from "@owlprotocol/web3-dexie";
import { ConfigSelectors } from "@owlprotocol/web3-redux-orm";
import { compact } from "lodash-es";

interface _4ByteResponseItem {
    id: number;
    created_at: string;
    text_signature?: string;
    hex_signature?: string;
    bytes_signature: string;
}

export function* fetchSaga(action: FetchEthCallAbiAction): Generator<any, EthCallAbi[]> {
    const { payload, meta } = action;
    const { methodSighash } = payload;

    const dbSelected = yield* call(EthCallAbiDexie.where, { methodSighash });
    if (dbSelected.length > 0) return dbSelected;

    //Fetch
    const config = yield* select(ConfigSelectors.selectByIdSingle, { id: "0" });
    const client = config?._4byteClient;
    if (!client) throw new Error("4byte client undefined!");

    const res = yield* call(client.get, `/signatures/?hex_signature=${methodSighash}`);
    const responses: _4ByteResponseItem[] = (res as AxiosResponse).data?.results;
    const methodFormatFullArr = compact(responses.map((e) => e.text_signature))
    const items = methodFormatFullArr.map((e) => {
        return validateEthCallAbi({ methodFormatFull: e });
    });
    if (items.length > 0) {
        yield* put(EthCallAbiCRUDActions.actions.createBatched(items, meta.uuid, meta.ts));
    }

    return items;
}
