import { z } from "zod";

export const addressRegex = /0x([a-fA-F0-9]){40}/;
export const addressZod = z
    .string()
    .regex(addressRegex)
    .describe("An ethereum address");
