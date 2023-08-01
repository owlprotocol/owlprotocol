import { testSaga } from "redux-saga-test-plan";
import axios from "axios";

//Actions
import { fetchEthCallAbiAction } from "@owlprotocol/web3-actions";
import { EthCallAbiName } from "@owlprotocol/web3-models";
import { EthCallAbiCRUDActions } from "@owlprotocol/web3-actions";
import { ConfigSelectors } from "@owlprotocol/web3-redux-orm";
import { EthCallAbiDexie } from "@owlprotocol/web3-dexie";
import util from "util";
import { fetchSaga } from "./fetch.js";

//Sagas
describe(`${EthCallAbiName}/fetch.test.ts`, () => {
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

    it("testSaga()", async () => {
        testSaga(fetchSaga, fetchEthCallAbiAction({ methodSighash: ApproveSignature }, "", 0))
            .next()
            .call(EthCallAbiDexie.where, { methodSighash: ApproveSignature }) //Check if exists
            .next([])
            .select(ConfigSelectors.selectByIdSingle, { id: "0" })
            .next({ _4byteClient: client })
            .call(client.get, requestUrl)
            .next({ data: expectedResponse })
            .put(EthCallAbiCRUDActions.actions.createBatched([{ methodFormatFull: ApprovePreImage }], "", 0))
            .next();
    });
});
