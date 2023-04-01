import { assert } from "chai";
import axios from "axios";
import moxios from "moxios";
import { sleep } from "@owlprotocol/utils";
import { utils } from "ethers";

//Actions
import { fetchEthCallAbiAction, ConfigCRUDActions } from "@owlprotocol/web3-actions";
import { EthCallAbiName } from "@owlprotocol/web3-models";
import { EthCallAbiDexie } from "@owlprotocol/web3-dexie";
import { ConfigSelectors } from "@owlprotocol/web3-redux-orm";
import util from "util";
import { createStore, StoreType } from "../../store.js";

//Sagas
describe(`${EthCallAbiName}/fetch.test.ts`, () => {
    util.inspect.defaultOptions.depth = null;

    const ApproveFragment = utils.FunctionFragment.from("approve(address,uint256)");
    const ApproveFunctionFormatFull = ApproveFragment.format(utils.FormatTypes.full).replace("function ", "");
    const ApproveSignature = new utils.Interface([ApproveFragment]).getSighash(ApproveFragment);
    const expectedResponse = {
        count: 2,
        next: null,
        previous: null,
        results: [
            {
                id: 149,
                created_at: "",
                text_signature: ApproveFunctionFormatFull,
                hex_signature: ApproveSignature,
                bytes_signature: "",
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

    let store: StoreType;

    beforeEach(() => {
        store = createStore();
        store.dispatch(ConfigCRUDActions.actions.reduxUpsert({ id: "0", _4byteClient: client }));
    });

    it("fetch()", async () => {
        const config = ConfigSelectors.selectByIdSingle(store.getState(), "0");
        console.debug({ client: !!config?._4byteClient });
        store.dispatch(fetchEthCallAbiAction({ methodSighash: ApproveSignature }));
        await sleep(100);

        const results = await EthCallAbiDexie.where({ methodSighash: ApproveSignature });
        const item = results[0];
        assert.equal(item?.methodFormatFull, ApproveFunctionFormatFull, "methodFormatFull");
    });
});
