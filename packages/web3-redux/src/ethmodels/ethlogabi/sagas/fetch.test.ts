import { assert } from "chai";
import { testSaga } from "redux-saga-test-plan";
import axios from "axios";
import moxios from "moxios";
//import util from 'util';
import { sleep } from "@owlprotocol/utils";
import { fetchSaga } from "./fetch.js";
import { createStore, StoreType } from "../../../store.js";

//Actions
import { fetchAction } from "../actions/fetch.js";
import { ConfigCRUD } from "../../../config/crud.js";
import { EthLogAbiName } from "../common.js";
import { EthLogAbiCRUD } from "../crud.js";

//Sagas
describe(`${EthLogAbiName}/sagas/fetch.test.ts`, () => {
    //util.inspect.defaultOptions.depth = null;

    const TransferPreImage = "Transfer(address,address,uint256)";
    const TransferSignature = "0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef";
    const expectedResponse = {
        count: 1,
        next: null,
        previous: null,
        results: [
            {
                id: 1,
                created_at: "2020-11-30T22:38:00.801049Z",
                text_signature: "Transfer(address,address,uint256)",
                hex_signature: "0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef",
                bytes_signature: "ÝòR­\u001bâÈiÂ°hü7ª+§ñcÄ¡\u0016(õZMõ#³ï",
            },
        ],
    };
    const client = axios.create({ baseURL: "https://www.4byte.directory/api/v1" });
    const requestUrl = `/event-signatures/?hex_signature=${TransferSignature}`;

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
        testSaga(fetchSaga, fetchAction({ eventSighash: TransferSignature }, "", 0))
            .next()
            .call(EthLogAbiCRUD.db.where, { eventSighash: TransferSignature }) //Check if exists
            .next([])
            .select(ConfigCRUD.selectors.selectByIdSingle, { id: "0" })
            .next({ _4byteClient: client })
            .call(client.get, requestUrl)
            .next({ data: expectedResponse })
            .put(EthLogAbiCRUD.actions.createBatched([{ eventFormatFull: TransferPreImage }], "", 0))
            .next();
    });

    describe("integration", () => {
        let store: StoreType;

        beforeEach(() => {
            store = createStore();
            store.dispatch(ConfigCRUD.actions.reduxUpsert({ id: "0", _4byteClient: client }));
        });

        it("fetch()", async () => {
            store.dispatch(fetchAction({ eventSighash: TransferSignature }));
            await sleep(100);

            const item = await EthLogAbiCRUD.db.get({ eventSighash: TransferSignature });
            assert.equal(item?.eventFormatFull, TransferPreImage, "eventFormatFull");
        });
    });
});
