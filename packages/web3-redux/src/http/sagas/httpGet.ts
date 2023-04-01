import { AxiosResponse } from "axios";
import invariant from "tiny-invariant";
import { put, call, select } from "typed-redux-saga";
import { takeEveryBuffered } from "@owlprotocol/crud-redux";
import { ConfigCRUD } from "../../config/crud.js";
import { HttpGetAction, HTTP_GET } from "../actions/index.js";
import { HTTPCacheCRUD } from "../crud.js";
import { HTTPCache } from "../model/interface.js";

/** @category Sagas */
export function* httpGet(action: HttpGetAction) {
    const { payload } = action;
    const { url } = payload;
    invariant(url, "url undefined!");
    const config = yield* select(ConfigCRUD.selectors.selectByIdSingle, { id: "0" });
    const { httpClient, corsProxy } = config ?? {};
    invariant(httpClient, "Http client undefined!");

    const httpCache = (yield* call(HTTPCacheCRUD.db.get, url)) as HTTPCache | undefined;
    if (!httpCache?.data) {
        try {
            const response = (yield* call(httpClient.get, url)) as AxiosResponse;
            yield* put(HTTPCacheCRUD.actions.upsert({ id: url, url, data: response.data }));
        } catch (error) {
            if (corsProxy) {
                //TODO: Handle search params
                //Try with CORS Proxy
                const urlProxied = `${corsProxy}/${url}`;
                const response = (yield* call(httpClient.get, urlProxied)) as AxiosResponse;
                yield* put(HTTPCacheCRUD.actions.upsert({ id: url, url, data: response.data, corsProxied: true }));
            } else {
                throw error;
            }
        }
    } else {
        //throw new Error(`Http ${url} cached!`);
    }
}

export function* watchHttpGetSaga() {
    yield takeEveryBuffered(HTTP_GET, httpGet, {
        bufferSize: 20,
        bufferBatchTimeout: 100,
        bufferCompletionTimeout: 1000,
    });
}
