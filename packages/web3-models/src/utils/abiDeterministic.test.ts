import { assert } from "chai";
import { abiDeterministic } from "./abiDeterministic.js";

describe("abiDeterministic.test.ts", () => {
    it("interface indempodance", () => {
        const abi0 = ["function a() returns (uint256 val)", "function b() returns (uint256 val)"];
        const abi1 = [
            "function b() returns (uint256 val)",
            "function a() returns (uint256 val)",
            "function a() returns (uint256 val)",
        ];

        const abi0Det = abiDeterministic(abi0);
        const abi1Det = abiDeterministic(abi1);
        assert.deepEqual(abi0Det, abi1Det);
    });
});
