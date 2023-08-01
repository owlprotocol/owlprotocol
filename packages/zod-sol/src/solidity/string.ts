import { z } from "zod";

export const stringZod = z
    .string()
    .describe("A string");
