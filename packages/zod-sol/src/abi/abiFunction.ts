import { ZodEffects, z } from "zod";
import type { AbiParam, ZodForAbiParam } from "./abiParam.js";
import { zodForAbiParam } from "./abiParam.js"
import { TupleIndices } from "../types/TupleIndices.js";
import { fromPairs, map } from "../lodash.js";

export type StateMutabilityType = 'pure' | 'view' | 'nonpayable' | 'payable';

/** Abi Function Item */
export interface AbiFunction {
    /** Abi item type, defines if this is a function, event, or special function (eg. constructor) */
    readonly type: "function"
    /** Function name */
    readonly name: string;
    /** State mutability for function, read (pure/view) or write (payable/nonpayable) */
    readonly stateMutability: StateMutabilityType;
    /** For pure functions */
    readonly constant?: boolean;
    /** For payable functions */
    readonly payable?: boolean;
    /** Function input parameters */
    readonly inputs: readonly AbiParam[];
    /** Function output parameters */
    readonly outputs: readonly AbiParam[];
}

export type AbiParamsNamedToZod<T extends readonly AbiParam[]> = ReturnType<typeof z.object<{
    [Idx in T[number]as Idx["name"]]: ZodForAbiParam<Idx>
}>>
export type AbiParamsIdxToZod<T extends readonly AbiParam[]> = ReturnType<typeof z.object<{
    [Idx in TupleIndices<T> as Idx]: ZodForAbiParam<T[Idx]>
}>>

//Fix this with indexed params
export type AbiParamsToZod<T extends readonly AbiParam[]> = AbiParamsNamedToZod<T>

/*
z.ZodObject<z.objectUtil.extendShape<
    AbiParamsNamedToZod<T>, AbiParamsIdxToZod<T>["shape"]
>>
*/
//AbiParamsNamedToZod<T>
//ZodUnion<[AbiParamsNamedToZod<T>, AbiParamsIdxToZod<T>]>

//TODO: Test this with named, unnamed, mixed params
export function zodForAbiParams<T extends readonly AbiParam[]>(params: T): AbiParamsToZod<T> {
    const named = z.object(fromPairs(map(params, (a) => {
        return [a.name, zodForAbiParam(a).optional()]
    })))

    const indexed = z.object(fromPairs(map(params, (a, idx) => {
        return [idx, zodForAbiParam(a).optional()]
    })))

    //return named as any;
    return named.extend(indexed.shape) as any;
    //return z.union([named, indexed]) as any
}


export type ZodForAbiFunction<T extends AbiFunction> = {
    readonly nameZod: z.ZodLiteral<T["name"]>
    readonly stateMutabilityZod: z.ZodLiteral<T["stateMutability"]>
    readonly inputsZod: ReturnType<typeof zodForAbiParams<T["inputs"]>>
    readonly outputsZod: ReturnType<typeof zodForAbiParams<T["outputs"]>>
}
export function zodForAbiFunction<T extends AbiFunction>(item: T): ZodForAbiFunction<T> {
    const nameZod = z.literal(item.name).describe("function name");
    const stateMutabilityZod = z.literal(item.stateMutability).describe("function mutability")

    // TODO: use zodForInputAbiParams
    const inputsZod = zodForAbiParams<T["inputs"]>(item.inputs)
    const outputsZod = zodForAbiParams<T["outputs"]>(item.outputs);

    return { nameZod, stateMutabilityZod, inputsZod, outputsZod }
}

export type AbiFunctionWithZod<T extends AbiFunction = AbiFunction> = T & ZodForAbiFunction<T>
export function abiFunctionWithZod<T extends AbiFunction>(item: T): AbiFunctionWithZod<T> {
    return { ...item, ...zodForAbiFunction(item) }
}

export type AbiWithZod<T extends readonly AbiFunction[] = AbiFunction[]> = {
    [Idx in T[number]as Idx["name"]]: ReturnType<typeof abiFunctionWithZod<Idx>>
}
export function abiWithZod<T extends readonly AbiFunction[]>(abi: T): AbiWithZod<T> {
    return fromPairs(map(abi, (a) => {
        return [a.name, abiFunctionWithZod(a)]
    })) as any
}
