import { expectType } from "ts-expect"
import { AbiParamTuple, zodForAbiParamTuple } from "./abiParamTuple.js";
import { z } from "zod";
import { integerZod } from "../solidity/integer.js";

describe('abiParamArrayTest', function () {
    const tuple = {
        name: "target",
        type: "tuple",
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
        internalType: "struct Target",
    } as const; // satisfies AbiParamTuple;

    it('tuple', async () => {
        const zodTuple = zodForAbiParamTuple(tuple)
        expectType<z.ZodObject<{
            to: z.ZodString,
            amount: ReturnType<typeof integerZod>
        }>>(zodTuple)
    });

    /*
    const tupleNested = {
        name: "receipt",
        type: "tuple",
        components: [
            {
                name: "id",
                type: "uint256",
            },
            ...tuple
        ],
        internalType: "struct Receipt",
    } as const satisfies AbiParamTuple

    it('tuple nested', async () => {
        const zodTuple = zodForAbiParamTuple(tuple)
        expectType<z.ZodObject<{ to: z.ZodString, amount: z.ZodEffects<z.ZodBigInt, string, bigint> }>>(zodTuple)
    });
    */
});
