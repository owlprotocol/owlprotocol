import { NetworkCRUD } from '../crud.js';
import { NetworkWithObjects } from '../model/index.js';

/**
 * @category Hooks
 * Return network if exists.
 * Create/hydrate depending on db state.
 */
export function useNetwork(
    networkId?: string,
    defaultNetwork?: Partial<NetworkWithObjects> | undefined) {
    return NetworkCRUD.hooks.useFetch({ networkId }, defaultNetwork, Number.MAX_SAFE_INTEGER, true)
}
