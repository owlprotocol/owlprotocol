import { compact } from "lodash-es";
import { NetworkCRUD } from "../crud.js";

/**
 * Take list of networkIds or empty and return defined networkIds.
 * @param networkIds
 */
export function useNetworkIds(networkIds?: string[] | undefined): string[] {
    const [networksByFilter] = NetworkCRUD.hooks.useGetBulk(networkIds);
    const [networksAll] = NetworkCRUD.hooks.useAll();
    const networkIdsDefined = networkIds
        ? compact(networksByFilter).map((n) => n.networkId)
        : networksAll.map((n) => n.networkId);
    return networkIdsDefined;
}
