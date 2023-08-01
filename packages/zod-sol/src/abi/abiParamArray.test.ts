import { expectType } from "ts-expect"
//import { assert } from 'chai';
//import { boolZod } from "../solidity/bool.js";
import { zodForAbiParamArray } from "./abiParamArray.js";
import { z } from "zod";

describe('abiParamArrayTest', function () {
    it('bool[]', async () => {
        expectType<z.ZodArray<z.ZodBoolean>>(zodForAbiParamArray("bool[]"))
        //assert.equal(z.array(boolZod), zodForAbiParamArray("bool[]"))
    });
    it('bool[][]', async () => {
        expectType<z.ZodArray<z.ZodArray<z.ZodBoolean>>>(zodForAbiParamArray("bool[][]"))
    });
});
