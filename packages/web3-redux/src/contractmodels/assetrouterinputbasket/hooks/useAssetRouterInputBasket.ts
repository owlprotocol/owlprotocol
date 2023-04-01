import { flatten } from "lodash-es";
import { AssetRouterInputBasketCRUD } from "../crud.js";
import { AssetRouterInputBasket, AssetRouterInputBasketIndexInputAnyOf } from "../model/interface.js";

export function useAssetRouterInputBasket(
    filter: AssetRouterInputBasketIndexInputAnyOf,
): [AssetRouterInputBasket[], { isLoading: boolean }] {
    const [resultsNested, loading] = AssetRouterInputBasketCRUD.hooks.useWhereAnyOf(filter);
    const results = flatten(resultsNested);
    return [results, loading];
}
