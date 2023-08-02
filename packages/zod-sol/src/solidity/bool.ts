import { z } from "zod";

export const boolZod = z
    .boolean()
    .describe("An solidity boolean");
