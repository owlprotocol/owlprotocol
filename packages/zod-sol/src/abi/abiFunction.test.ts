import { expectType } from "ts-expect"
import { AbiFunction, ZodForAbiFunction, zodForAbiFunction } from "./abiFunction.js";
import { ZodTypeAny, z } from "zod";
import { mapValues } from "../lodash.js";

describe('abiParamArrayTest', function () {

    const fnAbis = {
        empty: {
            inputs: [],
            name: "myFunction",
            outputs: [],
            stateMutability: "view",
            type: "function",
        },
        uint256: {
            inputs: [
                {
                    name: "from",
                    type: "uint256",
                    internalType: "uint256",
                },
            ],
            name: "myFunction",
            outputs: [],
            stateMutability: "view",
            type: "function",
        },
        nonTuple: {
            inputs: [
                {
                    name: "from",
                    type: "address",
                    internalType: "address",
                },
            ],
            name: "myFunction",
            outputs: [],
            stateMutability: "view",
            type: "function",
        },
        nonTupleUnnamed: {
            inputs: [
                {
                    name: "",
                    type: "address",
                    internalType: "address",
                },
            ],
            name: "myFunction",
            outputs: [],
            stateMutability: "view",
            type: "function",
        },
        nonTupleArray: {
            inputs: [
                {
                    name: "from",
                    type: "address[]",
                    internalType: "address[]",
                },
            ],
            name: "myFunction",
            outputs: [],
            stateMutability: "view",
            type: "function",
        },
        tuple: {
            inputs: [
                {
                    name: "target",
                    type: "tuple",
                    internalType: "struct Target",
                    components: [
                        {
                            name: "from",
                            type: "address",
                            internalType: "address",
                        },
                    ]
                },

            ],
            name: "myFunction",
            outputs: [],
            stateMutability: "view",
            type: "function",
        },
        tupleArray: {
            inputs: [
                {
                    name: "target",
                    type: "tuple[]",
                    internalType: "struct Target[]",
                    components: [
                        {
                            name: "from",
                            type: "address",
                            internalType: "address",
                        },
                    ]
                },

            ],
            name: "myFunction",
            outputs: [],
            stateMutability: "view",
            type: "function",
        }
    } as const

    it("typecheck fn abis", () => {
        expectType<AbiFunction>(fnAbis.empty)
        expectType<AbiFunction>(fnAbis.nonTuple)
        expectType<AbiFunction>(fnAbis.nonTupleUnnamed)
        expectType<AbiFunction>(fnAbis.nonTupleArray)
        expectType<AbiFunction>(fnAbis.tuple)
        expectType<AbiFunction>(fnAbis.tupleArray)
    })

    it("empty", () => {
        const fnZod = zodForAbiFunction(fnAbis.empty);
        type X = typeof fnZod.inputsZod
        type NameType = z.ZodLiteral<"myFunction">
        type MutabilityType = z.ZodLiteral<"view">
        type InputType = z.ZodObject<{}, "strip", ZodTypeAny, {}, {}>
        type OutputType = z.ZodObject<{}, "strip", ZodTypeAny, {}, {}>
        expectType<NameType>(fnZod.nameZod)
        expectType<MutabilityType>(fnZod.stateMutabilityZod)
        expectType<InputType>(fnZod.inputsZod)
        expectType<OutputType>(fnZod.outputsZod)
        expectType<{
            nameZod: NameType,
            stateMutabilityZod: MutabilityType,
            inputsZod: InputType,
            outputsZod: OutputType
        }
        >(fnZod)
    })

    it("non-tuple", () => {
        const fnZod = zodForAbiFunction(fnAbis.nonTuple);
        type X = typeof fnZod.inputsZod
        type NameType = z.ZodLiteral<"myFunction">
        type MutabilityType = z.ZodLiteral<"view">
        type InputType = z.ZodObject<{ from: z.ZodString }, "strip", ZodTypeAny, { from: string }, { from: string }>
        type OutputType = z.ZodObject<{}, "strip", ZodTypeAny, {}, {}>
        expectType<NameType>(fnZod.nameZod)
        expectType<MutabilityType>(fnZod.stateMutabilityZod)
        expectType<InputType>(fnZod.inputsZod)
        expectType<OutputType>(fnZod.outputsZod)
        expectType<{
            nameZod: NameType,
            stateMutabilityZod: MutabilityType,
            inputsZod: InputType,
            outputsZod: OutputType
        }
        >(fnZod)
    })

    it("non-tuple unnamed", () => {
        const fnZod = zodForAbiFunction(fnAbis.nonTupleUnnamed);
        type NameType = z.ZodLiteral<"myFunction">
        type MutabilityType = z.ZodLiteral<"view">
        type InputType = z.ZodObject<{ "": z.ZodString }, "strip", ZodTypeAny, { "": string }, { "": string }>
        type OutputType = z.ZodObject<{}, "strip", ZodTypeAny, {}, {}>
        expectType<NameType>(fnZod.nameZod)
        expectType<MutabilityType>(fnZod.stateMutabilityZod)
        expectType<InputType>(fnZod.inputsZod)
        expectType<OutputType>(fnZod.outputsZod)
        expectType<{
            nameZod: NameType,
            stateMutabilityZod: MutabilityType,
            inputsZod: InputType,
            outputsZod: OutputType
        }
        >(fnZod)
    })

    it("non-tuple array", () => {
        const fnZod = zodForAbiFunction(fnAbis.nonTupleArray);
        type NameType = z.ZodLiteral<"myFunction">
        type MutabilityType = z.ZodLiteral<"view">
        type InputType = z.ZodObject<{ from: z.ZodArray<z.ZodString> }, "strip", ZodTypeAny, { from: string[] }, { from: string[] }>
        type OutputType = z.ZodObject<{}, "strip", ZodTypeAny, {}, {}>
        expectType<NameType>(fnZod.nameZod)
        expectType<MutabilityType>(fnZod.stateMutabilityZod)
        expectType<InputType>(fnZod.inputsZod)
        expectType<OutputType>(fnZod.outputsZod)
        expectType<{
            nameZod: NameType,
            stateMutabilityZod: MutabilityType,
            inputsZod: InputType,
            outputsZod: OutputType
        }
        >(fnZod)
    })

    // TODO: wait for tuple parsing to be fixed
    // it("tuple", () => {
    //     const fnZod = zodForAbiFunction(fnAbis.tuple);
    //     type NameType = z.ZodLiteral<"myFunction">
    //     type MutabilityType = z.ZodLiteral<"view">

    //     const InputZod = z.object({ target: z.object({ from: z.string(), "0": z.string() }) })
    //     type InputType = typeof InputZod
    //     type OutputType = z.ZodObject<{}, "strip", ZodTypeAny, {}, {}>

    //     type Input = typeof fnZod.inputsZod;

    //     expectType<NameType>(fnZod.nameZod)
    //     expectType<MutabilityType>(fnZod.stateMutabilityZod)
    //     expectType<InputType>(fnZod.inputsZod)
    //     expectType<OutputType>(fnZod.outputsZod)
    //     expectType<{
    //         nameZod: NameType,
    //         stateMutabilityZod: MutabilityType,
    //         inputsZod: InputType,
    //         outputsZod: OutputType
    //     }
    //     >(fnZod)
    // })

    // TODO: fix
    // it("tuple array", () => {
    //     const fnZod = zodForAbiFunction(fnAbis.nonTupleArray);
    //     type NameType = z.ZodLiteral<"myFunction">
    //     type MutabilityType = z.ZodLiteral<"view">
    //     type InputType = z.ZodObject<{ from: z.ZodArray<z.ZodString> }, "strip", ZodTypeAny, { from: string[] }, { from: string[] }>
    //     type OutputType = z.ZodObject<{}, "strip", ZodTypeAny, {}, {}>
    //     expectType<NameType>(fnZod.nameZod)
    //     expectType<MutabilityType>(fnZod.stateMutabilityZod)
    //     expectType<InputType>(fnZod.inputsZod)
    //     expectType<OutputType>(fnZod.outputsZod)
    //     expectType<{
    //         nameZod: NameType,
    //         stateMutabilityZod: MutabilityType,
    //         inputsZod: InputType,
    //         outputsZod: OutputType
    //     }
    //     >(fnZod)
    // })
});
