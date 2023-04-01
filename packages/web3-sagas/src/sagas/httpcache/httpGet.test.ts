/* eslint-disable */
import { testSaga } from "redux-saga-test-plan";
import axios from "axios";
import { httpGet } from "./httpGet.js";
import { httpGet as httpGetAction, HTTP_GET } from "@owlprotocol/web3-actions";
import { HTTPCacheCRUDActions } from "@owlprotocol/web3-actions";
import { ConfigSelectors } from "@owlprotocol/web3-redux-orm";
import { HTTPCacheDexie } from "@owlprotocol/web3-dexie";

describe("http/sagas/httpGet.test.ts", () => {
    describe("unit", () => {
        it("fetch - normal", () => {
            const url = "https://metadata.veefriends.com/collections/series2/tokens/1";
            const client = axios.create();
            const data = JSON.stringify({ name: "NFT" });

            const action = httpGetAction({ url: "https://metadata.veefriends.com/collections/series2/tokens/1" }, "", 0);
            testSaga(httpGet, action)
                .next()
                .select(ConfigSelectors.selectByIdSingle, { id: "0" })
                .next({ httpClient: client, corsProxy: undefined })
                .call(HTTPCacheDexie.get, { id: url })
                .next(undefined)
                .call(client.get, url)
                .next({ data })
                .put(HTTPCacheCRUDActions.actions.upsert({ id: url, url, data }, "", 0))
                .next()
                .isDone();
        });

        it("fetch - cors error", () => {
            const url = "https://metadata.veefriends.com/collections/series2/tokens/1";
            const client = axios.create();
            const data = JSON.stringify({ name: "NFT" });
            const error = new Error(`Network error ${url}!`);

            const corsProxy = "http://myproxy.com";
            const urlProxied = `${corsProxy}/${url}`;

            const action = httpGetAction({ url: "https://metadata.veefriends.com/collections/series2/tokens/1" }, "", 0);
            testSaga(httpGet, action)
                .next()
                .select(ConfigSelectors.selectByIdSingle, { id: "0" })
                .next({ httpClient: client, corsProxy })
                .call(HTTPCacheDexie.get, { id: url })
                .next(undefined)
                .call(client.get, url)
                .throw(error)
                .call(client.get, urlProxied) //retry with CORS Proxy
                .next({ data })
                .put(HTTPCacheCRUDActions.actions.upsert({ id: url, url, data, corsProxied: true }, "", 0))
                .next()
                .isDone();
        });

        it("fetch - cache error", () => {
            const url = "https://metadata.veefriends.com/collections/series2/tokens/1";
            const client = axios.create();
            const data = JSON.stringify({ name: "NFT" });
            //const HTTP_GET_ERROR = `${HTTP_GET}/ERROR`;
            //const error = new Error(`Http ${url} cached!`);

            const action = httpGetAction({ url: "https://metadata.veefriends.com/collections/series2/tokens/1" });
            testSaga(httpGet, action)
                .next()
                .select(ConfigSelectors.selectByIdSingle, { id: "0" })
                .next({ httpClient: client, corsProxy: undefined })
                .call(HTTPCacheDexie.get, { id: url })
                .next({ data })
                .isDone();
        });
    });
});
