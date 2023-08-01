import { createCRUDDB } from "@owlprotocol/crud-dexie";
import { Network, NetworkName, validateIdNetwork, toPrimaryKeyNetwork } from "@owlprotocol/web3-models";
import { NetworkKeyId, NetworkKeyIdEq, NetworkKeyIdx, NetworkKeyIdxEq, NetworkKeyIdxEqAny } from "../tables/network.js";
import { Web3Dexie } from "../dbIndex.js";

export function getNetworkDexie() {
    return createCRUDDB<
        typeof NetworkName,
        Network,
        NetworkKeyId,
        NetworkKeyIdEq,
        NetworkKeyIdx,
        NetworkKeyIdxEq,
        NetworkKeyIdxEqAny
    >(Web3Dexie, Web3Dexie[NetworkName], {
        validateId: validateIdNetwork,
        toPrimaryKey: toPrimaryKeyNetwork,
        preWriteBulkDB: preWriteBulkDBNetwork,
        postWriteBulkDB: () => Promise.resolve(),
    });
}
export const NetworkDexie = getNetworkDexie();

export async function preWriteBulkDBNetwork(items: Network[]): Promise<Network[]> {
    return items.map((item) => {
        return { ...item, updatedAt: Date.now() };
    });
}
