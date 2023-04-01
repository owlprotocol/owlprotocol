import { assert } from "chai";
import { utils } from "ethers";
import { validateEthCall } from "./interface.js";
import { ADDRESS_0 } from "../../../data.js";
import { EthCallName } from "../common.js";

interface EncodeTest {
    methodFormatFull: string;
    returnData: string;
    expectedReturnValue: any;
    expectedReturnValueIdx: string;
}

const tests: EncodeTest[] = [
    /*
    {
        methodFormatFull: 'getValue()',
        returnData: '',
        expectedReturnValue: '',
        expectedReturnValueIdx: ''
    },
    */
    {
        methodFormatFull: "getValue() returns (bytes32)",
        returnData: "0x000000000000000000000000000000000000000000000000000000000000002a",
        expectedReturnValue: ["0x000000000000000000000000000000000000000000000000000000000000002a"],
        expectedReturnValueIdx: '["0x000000000000000000000000000000000000000000000000000000000000002a"]',
    },
    {
        methodFormatFull: "getValue() returns (bytes16)",
        returnData: utils.defaultAbiCoder.encode(["bytes16"], ["0x0000000000000000000000000000002a"]),
        expectedReturnValue: ["0x0000000000000000000000000000002a"],
        expectedReturnValueIdx: '["0x0000000000000000000000000000002a"]',
    },
    {
        methodFormatFull: "getValue() returns (bytes)",
        returnData: utils.defaultAbiCoder.encode(["bytes"], ["0x68656c6c6f"]),
        expectedReturnValue: ["0x68656c6c6f"],
        expectedReturnValueIdx: '["0x68656c6c6f"]',
    },
    {
        methodFormatFull: "getValue() returns (uint256)",
        returnData: utils.defaultAbiCoder.encode(["uint256"], [42]),
        expectedReturnValue: ["42"],
        expectedReturnValueIdx: '["42"]',
    },
    {
        methodFormatFull: "getValue() returns (string)",
        returnData: utils.defaultAbiCoder.encode(["string"], ["hello"]),
        expectedReturnValue: ["hello"],
        expectedReturnValueIdx: '["hello"]',
    },
    {
        methodFormatFull: "getValue() returns (uint256,uint256)",
        returnData: utils.defaultAbiCoder.encode(["uint256", "uint256"], [42, 41]),
        expectedReturnValue: ["42", "41"],
        expectedReturnValueIdx: '["42","41"]',
    },
    {
        methodFormatFull: "getValue() returns (uint256[])",
        returnData: utils.defaultAbiCoder.encode(["uint256[]"], [[42, 41]]),
        expectedReturnValue: [["42", "41"]],
        expectedReturnValueIdx: '[["42","41"]]',
    },
    {
        methodFormatFull: "getValue() returns (uint256 val)",
        returnData: utils.defaultAbiCoder.encode(["uint256"], [42]),
        expectedReturnValue: { 0: "42", val: "42" },
        expectedReturnValueIdx: '{"0":"42","val":"42"}',
    },
    {
        methodFormatFull: "getValue() view returns (tuple(uint256 val0, uint256 val1))",
        returnData: utils.defaultAbiCoder.encode(["tuple(uint256,uint256)"], [[42, 41]]),
        expectedReturnValue: [{ 0: "42", 1: "41", val0: "42", val1: "41" }],
        expectedReturnValueIdx: '[{"0":"42","1":"41","val0":"42","val1":"41"}]',
    },
];

//TODO: Enums, nested structs
describe(`${EthCallName}/model/interface.ts`, () => {
    describe("validate", () => {
        for (const t of tests) {
            it(t.methodFormatFull, async () => {
                //Selector
                const ethCall = validateEthCall({
                    networkId: "1336",
                    to: ADDRESS_0,
                    methodFormatFull: t.methodFormatFull,
                    returnData: t.returnData,
                    data: "",
                });

                assert.deepEqual(ethCall.returnValue, t.expectedReturnValue, "returnValue");
                assert.equal(ethCall.returnValueIdx, t.expectedReturnValueIdx, "returnValueIdx");
            });
        }
    });
});
