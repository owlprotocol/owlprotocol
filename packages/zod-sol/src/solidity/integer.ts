import { z } from "zod";

const baseZod = z.string().transform((s) => BigInt(s))

export function integerZod(name: string) {
    const signed = name.startsWith("int");
    const bitLenStr = signed ? name.replace("int", "") : name.replace("uint", "")
    const bitLen = BigInt(bitLenStr)

    const max = signed ? 2n ** (bitLen - 1n) : 2n ** bitLen - 1n
    const min = signed ? 0n - 2n ** (bitLen - 1n) : 0n
    /*z.preprocess((p) => {
            if (typeof p === "string") return p;
            else if (typeof p === "number") return `${p}`;
            else if ((p as any).toString) return (p as any).toString();
            else throw new Error(`${p} cannot be converted to string`);
        }, z.string())
        */
    return z.coerce.string()
        .transform((s) => BigInt(s))
        .refine((x) => {
            return min <= x && x <= max;
        })
        .transform((x) => x.toString())
        .describe(`A solidity ${name}`)
}

export const uint256Zod = integerZod("uint256")
export const uint128Zod = integerZod("uint128")
export const uint96Zod = integerZod("uint96")
export const uint64Zod = integerZod("uint64")
export const uint32Zod = integerZod("uint32")
export const uint16Zod = integerZod("uint16")
export const uint8Zod = integerZod("uint8")

export const int256Zod = integerZod("int256")
export const int128Zod = integerZod("int128")
export const int96Zod = integerZod("int96")
export const int64Zod = integerZod("int64")
export const int32Zod = integerZod("int32")
export const int16Zod = integerZod("int16")
export const int8Zod = integerZod("int8")
