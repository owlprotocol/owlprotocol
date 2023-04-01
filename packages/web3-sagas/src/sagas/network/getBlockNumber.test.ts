import { testSaga } from "redux-saga-test-plan";
import { NetworkSelectors } from "@owlprotocol/web3-redux-orm";
import { getBlockNumberAction } from "@owlprotocol/web3-actions";
import { NetworkName } from "@owlprotocol/web3-models";
import { NetworkCRUDActions } from "@owlprotocol/web3-actions";
import { getBlockNumberSaga } from "./getBlockNumber.js";
import { getTestNetwork } from "../../test/getWeb3Provider.js";

const network1336 = getTestNetwork();
const networkId = network1336.networkId;
const web3 = network1336.web3;
const action = getBlockNumberAction({ networkId }, "", 0);

describe(`${NetworkName}/sagas/getBlockNumber.test.ts`, () => {
    describe("unit", () => {
        it("getBlockNumber", async () => {
            testSaga(getBlockNumberSaga, action)
                .next()
                .select(NetworkSelectors.selectByIdSingle, networkId)
                .next({ networkId, web3 })
                .call(web3!.eth.getBlockNumber)
                .next(1)
                .put(NetworkCRUDActions.actions.upsert({ networkId, latestBlockNumber: 1 }, "", 0))
                .next()
                .isDone();
        });
    });
});
