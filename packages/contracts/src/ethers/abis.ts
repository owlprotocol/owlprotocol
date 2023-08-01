import { contractFactoriesWithZod } from "@owlprotocol/zod-sol";
import { factoryClasses, factoriesAll } from "./factories.js";
import { omit, merge } from "../lodash.js";

const abisWithZodBase = contractFactoriesWithZod(
    omit(factoryClasses, "AssetRouterCraft", "AssetRouterInput", "AssetRouterOutput"),
);

export const abisWithZod = merge(
    abisWithZodBase,
    omit(factoriesAll, "AssetRouterCraft", "AssetRouterInput", "AssetRouterOutput"),
);
