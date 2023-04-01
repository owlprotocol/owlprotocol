import { createCRUDDexieHooks } from "@owlprotocol/crud-dexie-hooks";
import {
    Web3Dexie,
    NetworkDexie,
    Network,
    NetworkKeyId,
    NetworkKeyIdx,
    NetworkKeyIdEq,
    NetworkKeyIdxEq,
    NetworkKeyIdxEqAny,
} from "@owlprotocol/web3-dexie";
import { useLiveQuery } from "dexie-react-hooks";

export const NetworkDexieHooks = createCRUDDexieHooks<
    Network,
    NetworkKeyId,
    NetworkKeyIdx,
    NetworkKeyIdEq,
    NetworkKeyIdxEq,
    NetworkKeyIdxEqAny
>(NetworkDexie);

/** @category Hooks */
export function useLatestBlock(networkId: string | undefined) {
    //https://dexie.org/docs/Compound-Index#using-with-orderby
    //TODO: Test
    const response = useLiveQuery(
        () => {
            return networkId ? Web3Dexie.EthBlock.where("networkId").equals(networkId).last() : undefined;
        },
        [networkId],
        "loading",
    );

    const isLoading = response === "loading";
    const result = isLoading ? undefined : response;
    const returnOptions = { isLoading };
    return [result, returnOptions] as [typeof result, typeof returnOptions];
}

/** @category Hooks */
export function useLatestBlockNumber(networkId: string | undefined) {
    const [block, { isLoading }] = useLatestBlock(networkId);
    return [block?.number, { isLoading }] as [number | undefined, { isLoading: boolean }];
}
