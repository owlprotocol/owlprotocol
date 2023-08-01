import { ContractFactory } from "ethers";
import type { AbiParam, } from "./abiParam.js";
import { filter, mapValues } from "../lodash.js";
import { AbiFunction, AbiWithZod, abiWithZod } from "./abiFunction.js";

/** Abi Event Item  */
export interface AbiEvent {
    /** Abi item type, defines if this is a function, event, or special function (eg. constructor) */
    readonly type: "event"
    /** Event name */
    readonly name: string;
    /** Event input parameters */
    readonly inputs: readonly AbiParam[];
}

/** Abi Error Item  */
export interface AbiError {
    /** Abi item type, defines if this is a function, event, or special function (eg. constructor) */
    readonly type: "error"
    /** Event name */
    readonly name: string;
    /** Event input parameters */
    readonly inputs: readonly AbiParam[];
}

/** Abi Contractor Item */
export interface AbiConstructor {
    /** Abi item type, defines if this is a function, event, or special function (eg. constructor) */
    readonly type: "constructor"
    /** State mutability (payable/nonpayable) */
    readonly stateMutability: "payable" | "nonpayable";
    /** Constructor input parameters */
    readonly inputs: readonly AbiParam[];
}

export interface AbiFallback {
    /** Abi item type, defines if this is a function, event, or special function (eg. constructor) */
    readonly type: "fallback"
    /** State mutability (payable/nonpayable) */
    readonly stateMutability: "payable" | "nonpayable";
    /** Fallback input parameters */
    readonly inputs?: readonly AbiParam[];
}

/** Abi */
export type AbiItem = AbiFunction | AbiEvent | AbiError | AbiConstructor | AbiFallback
export type Abi = readonly AbiItem[]

export type AbiFunctionsOnly<T extends readonly AbiItem[]> = {
    [Idx in keyof T]: T[Idx] extends AbiFunction ? T[Idx] : never
}
export function abiWithFunctionsOnly<T extends readonly AbiItem[]>(abi: T): AbiFunctionsOnly<T> {
    return filter(abi, (a) => a.type === "function") as any;
}

export type TypechainContractFactory<T extends Abi = Abi> = (typeof ContractFactory) & {
    readonly abi: T,
    readonly bytecode: string
}

export type TypechainFactoryWithZod<T extends Abi = Abi> = {
    factory: InstanceType<TypechainContractFactory<T>>
    methods: AbiWithZod<AbiFunctionsOnly<T>>
}
export function contractFactoryWithZod<
    T extends Abi = Abi
>(f: TypechainContractFactory<T>): TypechainFactoryWithZod<T> {
    //@ts-expect-error initialized with default params
    const factory = new f()
    const abiFunctions = abiWithFunctionsOnly<T>(f.abi)
    const abiZod = abiWithZod(abiFunctions)

    return { factory, methods: abiZod }
}

export function contractFactoriesWithZod<T extends Record<string, TypechainContractFactory>>(factories: T) {
    return mapValues(factories, (f) => contractFactoryWithZod(f)) as {
        [K in keyof T]: ReturnType<typeof contractFactoryWithZod<T[K]["abi"]>>
    }
}
