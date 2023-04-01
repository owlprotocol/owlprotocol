import { assert } from "chai";
import { testSaga } from "redux-saga-test-plan";
import axios from "axios";
import moxios from "moxios";
import { sleep } from "@owlprotocol/utils";
import util from "util";
import { fetchSaga } from "./fetch.js";
import { createStore, StoreType } from "../../../store.js";

//Actions
import { fetchAction } from "../actions/fetch.js";
import { ConfigCRUD } from "../../../config/crud.js";
import { EthCallAbiName } from "../common.js";
import { EthCallAbiCRUD } from "../crud.js";

//Sagas
describe(`${EthCallAbiName}/sagas/fetch.test.ts`, () => {
    util.inspect.defaultOptions.depth = null;

    const ApprovePreImage = "approve(address,uint256)";
    const ApproveSignature = "0x095ea7b3";
    const expectedResponse = {
        count: 2,
        next: null,
        previous: null,
        results: [
            {
                id: 149,
                created_at: "2016-07-09T03:58:29.617584Z",
                text_signature: "approve(address,uint256)",
                hex_signature: "0x095ea7b3",
                bytes_signature: "\t^§³",
            },
        ],
    };
    const client = axios.create({ baseURL: "https://www.4byte.directory/api/v1" });
    const requestUrl = `/signatures/?hex_signature=${ApproveSignature}`;

    before(async () => {
        //Moxios install
        moxios.install(client);
        moxios.stubRequest(requestUrl, {
            status: 200,
            response: expectedResponse,
        });
    });

    after(() => {
        moxios.uninstall(client);
    });

    it("testSaga()", async () => {
        testSaga(fetchSaga, fetchAction({ methodSighash: ApproveSignature }, "", 0))
            .next()
            .call(EthCallAbiCRUD.db.where, { methodSighash: ApproveSignature }) //Check if exists
            .next([])
            .select(ConfigCRUD.selectors.selectByIdSingle, { id: "0" })
            .next({ _4byteClient: client })
            .call(client.get, requestUrl)
            .next({ data: expectedResponse })
            .put(EthCallAbiCRUD.actions.createBatched([{ methodFormatFull: ApprovePreImage }], "", 0))
            .next();
    });

    describe("integration", () => {
        let store: StoreType;

        beforeEach(() => {
            store = createStore();
            store.dispatch(ConfigCRUD.actions.reduxUpsert({ id: "0", _4byteClient: client }));
        });

        it("fetch()", async () => {
            store.dispatch(fetchAction({ methodSighash: ApproveSignature }));
            await sleep(100);

            const item = await EthCallAbiCRUD.db.get({ methodSighash: ApproveSignature });
            assert.equal(item?.methodFormatFull, ApprovePreImage, "methodFormatFull");
        });
    });
});
