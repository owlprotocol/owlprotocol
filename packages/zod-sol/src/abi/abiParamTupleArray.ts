import { z } from "zod";
import type { RepeatString } from "@owlprotocol/utils"
import type { AbiParamTuple, TupleComponents, TupleType, ZodForAbiParamTuple } from "./abiParamTuple.js";
import { zodForAbiParamTuple } from "./abiParamTuple.js";

//Array types
export type TupleArrayTypeN<N extends number = 1> = |
    `${TupleType}${RepeatString<"[]", N>}`
export type TupleArrayType = |
    TupleArrayTypeN<1> |
    TupleArrayTypeN<2> |
    TupleArrayTypeN<3> |
    TupleArrayTypeN<4> |
    TupleArrayTypeN<5>
export interface AbiParamTupleArray<N extends TupleArrayType = TupleArrayType, T extends TupleComponents = TupleComponents> {
    /** name */
    readonly name: string;
    /** solidity type */
    readonly type: N;
    /** for tuples */
    readonly components: T;
    /** for custom structs, name of struct */
    readonly internalType?: string;
}
export function isAbiParamTupleArray(t: { type: string }): t is AbiParamTuple {
    return t.type.startsWith("tuple[]")
}

/** Abi Function Parameters Non Tuple */
export type ZodForAbiParamTupleArray<T extends AbiParamTupleArray> = |
    T extends AbiParamTupleArray<infer N, infer U> ?
    N extends TupleArrayTypeN<1> ? z.ZodArray<ZodForAbiParamTuple<AbiParamTuple<U>>> :
    N extends TupleArrayTypeN<2> ? z.ZodArray<ZodForAbiParamTupleArray<AbiParamTupleArray<TupleArrayTypeN<1>, U>>> :
    N extends TupleArrayTypeN<3> ? z.ZodArray<ZodForAbiParamTupleArray<AbiParamTupleArray<TupleArrayTypeN<2>, U>>> :
    N extends TupleArrayTypeN<4> ? z.ZodArray<ZodForAbiParamTupleArray<AbiParamTupleArray<TupleArrayTypeN<3>, U>>> :
    N extends TupleArrayTypeN<5> ? z.ZodArray<ZodForAbiParamTupleArray<AbiParamTupleArray<TupleArrayTypeN<4>, U>>> :
    never : never

export function zodForAbiParamTupleArray<T extends AbiParamTupleArray>(t: T): ZodForAbiParamTupleArray<T> {
    if (!t.type.endsWith("[]")) throw new Error(`${t} not array!`)

    //Nested array
    if (t.type.endsWith("[][]")) return z.array(zodForAbiParamTupleArray({
        ...t,
        type: t.type.replace("[]", "")
    })) as ZodForAbiParamTupleArray<T>;

    //TODO: Fix for tuple array
    //Single array
    return z.array(zodForAbiParamTuple({
        ...t,
        type: "tuple" as const
    })) as any as ZodForAbiParamTupleArray<T>
}
