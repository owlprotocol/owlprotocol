import { flatten } from "lodash-es";
import { AssetRouterOutputBasketCRUD } from "../crud.js";
import { AssetRouterOutputBasket, AssetRouterOutputBasketIndexInputAnyOf } from "../model/interface.js";

export function useAssetRouterOutputBasket(
    filter: AssetRouterOutputBasketIndexInputAnyOf,
): [AssetRouterOutputBasket[], { isLoading: boolean }] {
    const [resultsNested, loading] = AssetRouterOutputBasketCRUD.hooks.useWhereAnyOf(filter);
    const results = flatten(resultsNested);
    return [results, loading];
}
