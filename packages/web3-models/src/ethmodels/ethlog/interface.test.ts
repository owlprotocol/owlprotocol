import { assert } from "chai";
import { utils } from "ethers";
import { validateEthLog } from "./interface.js";
import { ADDRESS_0, ADDRESS_1 } from "../../data.js";
import { EthLogName } from "../../common.js";

interface EncodeTest {
    eventFormatFull: string;
    topics: string[];
    data: string;
    expectedReturnValues: any;
}

const ADDRES_1_BYTES32 = "0x0000000000000000000000000000000000000000000000000000000000000001";
const TransferFragment = utils.EventFragment.from("Transfer(address indexed from, address indexed to, uint256 value)");
const TransferEventFormatFull = TransferFragment.format(utils.FormatTypes.full).replace("event ", "");
const TransferSignature = new utils.Interface([TransferFragment]).getEventTopic(TransferFragment);
const data = utils.defaultAbiCoder.encode(["uint256"], [42])

const tests: EncodeTest[] = [
    {
        eventFormatFull: TransferEventFormatFull,
        topics: [TransferSignature, ADDRES_1_BYTES32, ADDRES_1_BYTES32],
        data,
        expectedReturnValues: {
            0: ADDRESS_1,
            1: ADDRESS_1,
            2: "42",
            from: ADDRESS_1,
            to: ADDRESS_1,
            value: "42",
        },
    },
];

describe(`${EthLogName}/model/interface.ts`, () => {
    describe("validate", () => {
        for (const t of tests) {
            it(t.eventFormatFull, async () => {
                const ethLog = validateEthLog({
                    networkId: "1336",
                    address: ADDRESS_0,
                    eventFormatFull: t.eventFormatFull,
                    topics: t.topics,
                    data: t.data,
                } as any);

                assert.deepEqual(ethLog.returnValues, t.expectedReturnValues, "returnValues");
            });
        }
    });
});
