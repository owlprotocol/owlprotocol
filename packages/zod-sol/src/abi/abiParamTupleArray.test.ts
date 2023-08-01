import { expectType } from "ts-expect"
import { z } from "zod";
import { zodForAbiParamTupleArray } from "./abiParamTupleArray.js";
import { integerZod } from "../solidity/integer.js";

describe('abiParamArrayTest', function () {
    const tuple1D = {
        name: "target",
        type: "tuple[]",
        components: [
            {
                name: "to",
                type: "address",
            },
            {
                name: "amount",
                type: "uint256",
            },
        ],
        internalType: "struct Target[]",
    } as const; // satisfies AbiParamTupleArray;

    it('tuple[]', async () => {
        const zodTuple = zodForAbiParamTupleArray(tuple1D)
        expectType<
            z.ZodArray<
                z.ZodObject<{
                    to: z.ZodString,
                    amount: ReturnType<typeof integerZod>
                }>
            >
        >(zodTuple)
    });

    const tuple2D = {
        name: "target",
        type: "tuple[][]",
        components: [
            {
                name: "to",
                type: "address",
            },
            {
                name: "amount",
                type: "uint256",
            },
        ],
        internalType: "struct Target[]",
    } as const; // satisfies AbiParamTupleArray;

    it('tuple[][]', async () => {
        const zodTuple = zodForAbiParamTupleArray(tuple2D)
        expectType<
            z.ZodArray<
                z.ZodArray<
                    z.ZodObject<{
                        to: z.ZodString,
                        amount: ReturnType<typeof integerZod>
                    }>
                >
            >
        >(zodTuple)
    });
});
