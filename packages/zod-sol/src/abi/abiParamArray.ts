import { z } from "zod";
import type { RepeatString } from "@owlprotocol/utils"
import type { NonTupleType, ZodForNonTupleType } from "./abiParamNonTuple.js"
import { zodForAbiParamNonTuple } from "./abiParamNonTuple.js"

//Array types
export type ArrayTypeN<T extends NonTupleType = NonTupleType, N extends number = 1> = |
    `${T}${RepeatString<"[]", N>}`
export type ArrayType<T extends NonTupleType = NonTupleType> = |
    ArrayTypeN<T, 1> |
    ArrayTypeN<T, 2> |
    ArrayTypeN<T, 3> |
    ArrayTypeN<T, 4> |
    ArrayTypeN<T, 5>
export interface AbiParamArray {
    /** name */
    readonly name: string;
    /** solidity type */
    readonly type: ArrayType
    /** same as solidity type for non-tuples */
    readonly internalType?: ArrayType;
}

//Zod validator
export type ZodForArrayType<T extends ArrayType> = |
    T extends ArrayTypeN<infer U, 1> ? z.ZodArray<ZodForNonTupleType<U>> :
    T extends ArrayTypeN<infer U, 2> ? z.ZodArray<ZodForArrayType<ArrayTypeN<U, 1>>> :
    T extends ArrayTypeN<infer U, 3> ? z.ZodArray<ZodForArrayType<ArrayTypeN<U, 2>>> :
    T extends ArrayTypeN<infer U, 4> ? z.ZodArray<ZodForArrayType<ArrayTypeN<U, 3>>> :
    T extends ArrayTypeN<infer U, 5> ? z.ZodArray<ZodForArrayType<ArrayTypeN<U, 4>>> :
    never
export function zodForAbiParamArray<T extends ArrayType>(t: T): ZodForArrayType<T> {
    if (!t.endsWith("[]")) throw new Error(`${t} not array!`)

    //Nested array
    if (t.endsWith("[][]")) return z.array(zodForAbiParamArray(t.replace("[]", "") as ArrayType)) as ZodForArrayType<T>;

    //Single array
    //TODO: Change here 2 functions ArrayJSON, Array
    return z.array(zodForAbiParamNonTuple(t.replace("[]", "") as NonTupleType)) as ZodForArrayType<T>
}

//String encode
export type ZodForArrayStringType<T extends ArrayType> = |
    T extends ArrayTypeN<infer U, 1> ? z.ZodArray<ZodForNonTupleType<U>> :
    T extends ArrayTypeN<infer U, 2> ? z.ZodArray<ZodForArrayType<ArrayTypeN<U, 1>>> :
    T extends ArrayTypeN<infer U, 3> ? z.ZodArray<ZodForArrayType<ArrayTypeN<U, 2>>> :
    T extends ArrayTypeN<infer U, 4> ? z.ZodArray<ZodForArrayType<ArrayTypeN<U, 3>>> :
    T extends ArrayTypeN<infer U, 5> ? z.ZodArray<ZodForArrayType<ArrayTypeN<U, 4>>> :
    never
export function zodForAbiParamArrayString<T extends ArrayType>(t: T): ZodForArrayType<T> {
    if (!t.endsWith("[]")) throw new Error(`${t} not array!`)

    //Nested array
    //TODO: Fix for nested
    if (t.endsWith("[][]")) return z.array(zodForAbiParamArray(t.replace("[]", "") as ArrayType)) as ZodForArrayType<T>;

    //Single array
    //Zod for parsing elements of the array (eg. string[] => z.ZodString)
    const zodArrayElement = zodForAbiParamNonTuple(t.replace("[]", "") as NonTupleType)
    return z.string().transform((s) => {
        return JSON.parse(s).map((x: NonTupleType) => zodArrayElement.parse(x))
    }) as any

    //DEPRECATED: Zod OpenAPI not support zod array
    //Single array
    //TODO: Change here 2 functions ArrayJSON, Array
    //return z.array(zodForAbiParamNonTuple(t.replace("[]", "") as NonTupleType)) as ZodForArrayType<T>
}
