import { testSaga } from "redux-saga-test-plan";
import { EthLogQueryName, ADDRESS_0 } from "@owlprotocol/web3-models";

import { web3GetPastLogsAction, getBlockNumberAction } from "@owlprotocol/web3-actions";
import { eventGetPastSaga } from "./web3GetPastLogs.js";
import { getBlockNumberSaga } from "../../network/getBlockNumber.js";

const networkId = "1336";

describe(`${EthLogQueryName}/web3GetPastLogs.test.ts`, () => {
    const eventFormatFull = "NewValue(uint256 indexed value)";

    describe("unit", () => {
        const address = ADDRESS_0;
        it("eventGetPast - latestBlock", async () => {
            const action = web3GetPastLogsAction(
                {
                    networkId,
                    address,
                    eventFormatFull,
                    fromBlock: 0,
                },
                "",
                0,
            );

            /*
            const a = web3GetPastLogsRawAction(
                {
                    networkId,
                    address,
                    eventFormatFull,
                    filter: undefined,
                    fromBlock: 0,
                    toBlock: 5,
                },
                action.meta.uuid,
                action.meta.ts
            );
            //const expected = call(web3GetPastLogRawSaga, a);
            //log.debug(expected)
            */
            testSaga(eventGetPastSaga, action)
                .next()
                .call(getBlockNumberSaga, getBlockNumberAction({ networkId }, action.meta.uuid, action.meta.ts))
                .next({ latestBlockNumber: 5 });
            //.all(call(web3GetPastLogRawSaga, a));
        });
    });
});
