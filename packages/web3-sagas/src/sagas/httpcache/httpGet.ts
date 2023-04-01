import { AxiosResponse } from "axios";
import invariant from "tiny-invariant";
import { put, call, select } from "typed-redux-saga";
import { takeEveryBuffered } from "@owlprotocol/saga-utils";
import { HttpGetAction, HTTP_GET } from "@owlprotocol/web3-actions";
import { HTTPCacheCRUDActions } from "@owlprotocol/web3-actions";
import { HTTPCache } from "@owlprotocol/web3-models";
import { HTTPCacheDexie } from "@owlprotocol/web3-dexie";
import { ConfigSelectors } from "@owlprotocol/web3-redux-orm";

/** @category Sagas */
export function* httpGet(action: HttpGetAction) {
    const { payload, meta } = action;
    const { url } = payload;
    invariant(url, "url undefined!");
    const config = yield* select(ConfigSelectors.selectByIdSingle, { id: "0" });
    const { httpClient, corsProxy } = config ?? {};
    invariant(httpClient, "Http client undefined!");

    const httpCache = (yield* call(HTTPCacheDexie.get, { id: url })) as HTTPCache | undefined;
    if (!httpCache?.data) {
        try {
            const response = (yield* call(httpClient.get, url)) as AxiosResponse;
            yield* put(HTTPCacheCRUDActions.actions.upsert({ id: url, url, data: response.data }, meta.uuid, meta.ts));
        } catch (error) {
            if (corsProxy) {
                //TODO: Handle search params
                //Try with CORS Proxy
                const urlProxied = `${corsProxy}/${url}`;
                const response = (yield* call(httpClient.get, urlProxied)) as AxiosResponse;
                yield* put(
                    HTTPCacheCRUDActions.actions.upsert(
                        { id: url, url, data: response.data, corsProxied: true },
                        meta.uuid,
                        meta.ts,
                    ),
                );
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
