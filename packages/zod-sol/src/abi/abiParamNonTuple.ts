import { z } from "zod";
import { uint256Zod, int256Zod, uint128Zod, uint64Zod, uint32Zod, uint16Zod, uint8Zod, int128Zod, int64Zod, int32Zod, int16Zod, int8Zod, int96Zod, uint96Zod, integerZod } from "../solidity/integer.js";
import { bytes16Zod, bytes32Zod, bytes4Zod, bytes8Zod, bytesZod } from "../solidity/bytes.js";
import { addressZod } from "../solidity/address.js";
import { stringZod } from "../solidity/string.js";
import { boolZod } from "../solidity/bool.js";

//solidity types
export type AddressType = "address"
export type BoolType = "bool";
export type StringType = "string"
export type BytesType = "bytes"
export type UIntType = "uint256" | "uint128" | "uint96" | "uint64" | "uint32" | "uint16" | "uint8"
export type IntType = "int256" | "int128" | "int96" | "int64" | "int32" | "int16" | "int8"
export type BytesFixedType = "bytes32" | "bytes16" | "bytes8" | "bytes4"

//union type
export type NonTupleType = |
    AddressType |
    BoolType |
    StringType |
    BytesType |
    UIntType |
    IntType |
    BytesFixedType
export interface AbiParamNonTuple {
    /** name */
    readonly name: string;
    /** solidity type */
    readonly type: NonTupleType
    /** same as solidity type for non-tuples */
    readonly internalType?: NonTupleType;
}

//Zod validator
export type ZodForNonTupleType<T extends NonTupleType> = |
    T extends BoolType ? z.ZodBoolean :
    T extends AddressType ? z.ZodString :
    T extends StringType ? z.ZodString :
    T extends BytesType ? z.ZodEffects<z.ZodString, string, string> :
    T extends UIntType ? ReturnType<typeof integerZod> :
    T extends IntType ? ReturnType<typeof integerZod> :
    T extends BytesFixedType ? z.ZodEffects<z.ZodString, string, string> :
    never
export function zodForAbiParamNonTuple<T extends NonTupleType>(t: T): ZodForNonTupleType<T> {
    switch (t) {
        case "bool":
            return boolZod as ZodForNonTupleType<T>;
        case "address":
            return addressZod as ZodForNonTupleType<T>;
        case "string":
            return stringZod as ZodForNonTupleType<T>;
        case "bytes":
            return bytesZod as ZodForNonTupleType<T>;
        case "uint256":
            return uint256Zod as ZodForNonTupleType<T>;
        case "uint128":
            return uint128Zod as ZodForNonTupleType<T>;
        case "uint96":
            return uint96Zod as ZodForNonTupleType<T>;
        case "uint64":
            return uint64Zod as ZodForNonTupleType<T>;
        case "uint32":
            return uint32Zod as ZodForNonTupleType<T>;
        case "uint16":
            return uint16Zod as ZodForNonTupleType<T>;
        case "uint8":
            return uint8Zod as ZodForNonTupleType<T>;
        case "int256":
            return int256Zod as ZodForNonTupleType<T>;
        case "int128":
            return int128Zod as ZodForNonTupleType<T>;
        case "int96":
            return int96Zod as ZodForNonTupleType<T>;
        case "int64":
            return int64Zod as ZodForNonTupleType<T>;
        case "int32":
            return int32Zod as ZodForNonTupleType<T>;
        case "int16":
            return int16Zod as ZodForNonTupleType<T>;
        case "int8":
            return int8Zod as ZodForNonTupleType<T>;
        case "bytes32":
            return bytes32Zod as ZodForNonTupleType<T>;
        case "bytes16":
            return bytes16Zod as ZodForNonTupleType<T>;
        case "bytes8":
            return bytes8Zod as ZodForNonTupleType<T>;
        case "bytes4":
            return bytes4Zod as ZodForNonTupleType<T>;
    }

    throw new Error(`zodForAbiParam(${t}) invalid type`)
}
