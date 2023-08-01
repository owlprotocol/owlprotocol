import { AbiParamArray, ArrayType, ZodForArrayType, zodForAbiParamArray } from "./abiParamArray.js"
import { AbiParamNonTuple, NonTupleType, ZodForNonTupleType, zodForAbiParamNonTuple } from "./abiParamNonTuple.js"
import { AbiParamTuple, ZodForAbiParamTuple, isAbiParamTuple, zodForAbiParamTuple } from "./abiParamTuple.js"
import { AbiParamTupleArray, ZodForAbiParamTupleArray, isAbiParamTupleArray, zodForAbiParamTupleArray } from "./abiParamTupleArray.js"

/** Abi Function Parameters Tuple */
export type AbiParam = |
    AbiParamNonTuple |
    AbiParamArray |
    AbiParamTuple |
    AbiParamTupleArray

/** Zod for any param */
export type ZodForAbiParam<T extends AbiParam> =
    T extends AbiParamNonTuple ? ZodForNonTupleType<T["type"]> :
    T extends AbiParamArray ? ZodForArrayType<T["type"]> :
    T extends AbiParamTuple ? ZodForAbiParamTuple<T> :
    T extends AbiParamTupleArray ? ZodForAbiParamTupleArray<T> :
    never

export function zodForAbiParam<T extends AbiParam>(t: T): ZodForAbiParam<T> {
    if (isAbiParamTuple(t)) return zodForAbiParamTuple(t) as ZodForAbiParam<T>;
    else if (isAbiParamTupleArray(t)) return zodForAbiParamTupleArray(t) as ZodForAbiParam<T>;
    else if (t.type.endsWith("[]")) return zodForAbiParamArray(t.type as ArrayType) as ZodForAbiParam<T>;
    else return zodForAbiParamNonTuple(t.type as NonTupleType) as ZodForAbiParam<T>
}

// TODO: zodForInputAbiParams
// Needs to replace array

