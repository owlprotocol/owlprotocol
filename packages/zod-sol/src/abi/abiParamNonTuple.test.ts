import { expectType } from "ts-expect"
import { assert } from 'chai';
import { boolZod } from "../solidity/bool.js";
import { zodForAbiParamNonTuple } from "./abiParamNonTuple.js";
import { z } from "zod";

describe('abiParamNonTuple', function () {
    it('bool', async () => {
        expectType<z.ZodBoolean>(zodForAbiParamNonTuple("bool"))
        assert.equal(boolZod, zodForAbiParamNonTuple("bool"))
    });
});
