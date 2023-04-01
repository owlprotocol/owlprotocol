import { assert } from "chai";
import axios from "axios";
import moxios from "moxios";
//import util from 'util';
import { sleep } from "@owlprotocol/utils";

//Actions
import { fetchEthLogAbiAction } from "@owlprotocol/web3-actions";
import { ConfigCRUDActions } from "@owlprotocol/web3-actions";
import { EthLogAbiName } from "@owlprotocol/web3-models";
import { EthLogAbiDexie } from "@owlprotocol/web3-dexie";
import { utils } from "ethers";
import { createStore, StoreType } from "../../store.js";

//Sagas
describe(`${EthLogAbiName}/sagas/fetch.test.ts`, () => {
    //util.inspect.defaultOptions.depth = null;

    const TransferFragment = utils.EventFragment.from("Transfer(address,address,uint256)");
    const TransferEventFormatFull = TransferFragment.format(utils.FormatTypes.full).replace("event ", "");
    const TransferSignature = new utils.Interface([TransferFragment]).getEventTopic(TransferFragment);
    const expectedResponse = {
        count: 1,
        next: null,
        previous: null,
        results: [
            {
                id: 1,
                created_at: "",
                text_signature: TransferEventFormatFull,
                hex_signature: TransferSignature,
                bytes_signature: "",
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

    describe("integration", () => {
        let store: StoreType;

        beforeEach(() => {
            store = createStore();
            store.dispatch(ConfigCRUDActions.actions.reduxUpsert({ id: "0", _4byteClient: client }));
        });

        it("fetch()", async () => {
            store.dispatch(fetchEthLogAbiAction({ eventSighash: TransferSignature }));
            await sleep(100);

            const items = await EthLogAbiDexie.where({ eventSighash: TransferSignature });
            const item = items[0]
            assert.equal(item?.eventFormatFull, TransferEventFormatFull, "eventFormatFull");
        });
    });
});
