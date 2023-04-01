import { testSaga } from "redux-saga-test-plan";
import axios from "axios";

//Actions
import { fetchEthLogAbiAction } from "@owlprotocol/web3-actions";
import { EthLogAbiName } from "@owlprotocol/web3-models";
import { EthLogAbiCRUDActions } from "@owlprotocol/web3-actions";
import { EthLogAbiDexie } from "@owlprotocol/web3-dexie";
import { ConfigSelectors } from "@owlprotocol/web3-redux-orm";
import util from "util";
import { fetchSaga } from "./fetch.js";

//Sagas
describe(`${EthLogAbiName}/fetch.test.ts`, () => {
    util.inspect.defaultOptions.depth = null;

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

    it("testSaga()", async () => {
        testSaga(fetchSaga, fetchEthLogAbiAction({ eventSighash: TransferSignature }, "", 0))
            .next()
            .call(EthLogAbiDexie.where, { eventSighash: TransferSignature }) //Check if exists
            .next([])
            .select(ConfigSelectors.selectByIdSingle, { id: "0" })
            .next({ _4byteClient: client })
            .call(client.get, requestUrl)
            .next({ data: expectedResponse })
            .put(EthLogAbiCRUDActions.actions.createBatched([{ eventFormatFull: TransferPreImage }], "", 0))
            .next();
    });
});
