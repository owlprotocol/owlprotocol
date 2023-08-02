import { utils } from "ethers";
import { z } from "zod";

export const bytesZod = z
    .string()
    .refine((a) => utils.isBytesLike(a))
    .describe("An arbitrary length byte array")

//TODO: Length checks
export const bytes32Zod = z
    .string()
    .refine((a) => utils.isBytesLike(a))
    .describe("A solidity bytes32")
export const bytes16Zod = z
    .string()
    .refine((a) => utils.isBytesLike(a))
    .describe("A solidity bytes16")
export const bytes8Zod = z
    .string()
    .refine((a) => utils.isBytesLike(a))
    .describe("A solidity bytes8")
export const bytes4Zod = z
    .string()
    .refine((a) => utils.isBytesLike(a))
    .describe("A solidity bytes4")
