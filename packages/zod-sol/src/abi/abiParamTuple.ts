import { z } from "zod";
import { type ZodForArrayType, type AbiParamArray, zodForAbiParamArray, ArrayType } from "./abiParamArray.js";
import { zodForAbiParamNonTuple, type AbiParamNonTuple, type ZodForNonTupleType, NonTupleType } from "./abiParamNonTuple.js";
import { fromPairs, map } from "../lodash.js";

//Tuple type (used for structs)
export type TupleType = "tuple"
export type TupleComponents = readonly (AbiParamNonTuple | AbiParamArray)[]
export interface AbiParamTuple<T extends TupleComponents = TupleComponents> {
    /** name */
    readonly name: string;
    /** solidity type */
    readonly type: TupleType;
    /** for tuples */
    readonly components: T;
    /** for custom structs, name of struct */
    readonly internalType?: string;
}
export function isAbiParamTuple(t: { type: string }): t is AbiParamTuple {
    return t.type === "tuple"
}

export type ZodForAbiParamTuple<T extends AbiParamTuple> = ReturnType<typeof z.object<{ [Idx in T["components"][number]as Idx["name"]]:
    Idx extends AbiParamNonTuple ? ZodForNonTupleType<Idx["type"]> :
    Idx extends AbiParamArray ? ZodForArrayType<Idx["type"]> :
    never
}>>

export function zodForAbiParamTuple<T extends AbiParamTuple>(t: T): ZodForAbiParamTuple<T> {
    //Tuple or tuple array
    return z.object(fromPairs(map(t.components, (p) => {
        if (p.type.endsWith("[]")) return [p.name, zodForAbiParamArray(p.type as ArrayType)]
        return [p.name, zodForAbiParamNonTuple(p.type as NonTupleType)]
    }))) as ZodForAbiParamTuple<T>
}
