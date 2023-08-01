import { contractFactoriesWithZod } from "@owlprotocol/zod-sol";
import { merge } from "../lodash.js"
import { factoryClasses } from "./factories.js";
import { factoriesAll } from "./index.js";

const abisWithZodBase = contractFactoriesWithZod(factoryClasses)
export const abisWithZod = merge(abisWithZodBase, factoriesAll)
