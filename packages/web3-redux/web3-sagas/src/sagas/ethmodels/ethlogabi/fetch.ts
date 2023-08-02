import { call, put, select } from "typed-redux-saga";
import { AxiosResponse } from "axios";
import { EthLogAbiCRUDActions } from "@owlprotocol/web3-actions";
import { EthLogAbi, validateEthLogAbi } from "@owlprotocol/web3-models";
import { FetchEthLogAbiAction } from "@owlprotocol/web3-actions";
import { ConfigSelectors } from "@owlprotocol/web3-redux-orm";
import { EthLogAbiDexie } from "@owlprotocol/web3-dexie";
import { compact } from "lodash-es";

interface _4ByteResponseItem {
    id: number;
    created_at: string;
    text_signature?: string;
    hex_signature?: string;
    bytes_signature: string;
}

export function* fetchSaga(action: FetchEthLogAbiAction): Generator<any, EthLogAbi[]> {
    const { payload, meta } = action;
    const { eventSighash } = payload;

    const dbSelected = yield* call(EthLogAbiDexie.where, { eventSighash });
    if (dbSelected.length > 0) return dbSelected;

    //Fetch
    const config = yield* select(ConfigSelectors.selectByIdSingle, {
        id: "0",
    });
    const client = config?._4byteClient;
    if (!client) throw new Error("4byte client undefined!");

    const res = yield* call(client.get, `/event-signatures/?hex_signature=${eventSighash}`);
    const responses: _4ByteResponseItem[] = (res as AxiosResponse).data?.results;
    const eventFormatFullArr = compact(responses.map((e) => e.text_signature))
    const items = eventFormatFullArr.map((e) => {
        return validateEthLogAbi({ eventFormatFull: e });
    });
    if (items.length > 0) {
        yield* put(EthLogAbiCRUDActions.actions.createBatched(items, meta.uuid, meta.ts));
    }

    return items;
}
