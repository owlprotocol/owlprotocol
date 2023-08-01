import { ERC165, abiDeterministic } from "@owlprotocol/web3-models";
import { compact, flatten } from "lodash-es";
import { ERC165AbiDexie, ERC165Dexie } from "../crud/index.js";

/**
 * Get contract ABI using IERC165 calls and stored abis for respective interfaces
 * @param networkId
 * @param address
 */
export async function getERC165Abi(networkId: string, address: string) {
    const erc165s = await ERC165Dexie.where({ networkId, address });
    const erc165Abis = await ERC165AbiDexie.bulkGet(
        erc165s.map((iface) => {
            return { interfaceId: iface.interfaceId };
        }),
    );
    const abis = flatten(compact(erc165Abis).map((a) => a.abi));

    return abiDeterministic(abis);
}

export async function getERC165(interfaceId: string | string[], networkId?: string[] | undefined) {
    const interfaceIds = typeof interfaceId == "string" ? [interfaceId] : interfaceId;

    let erc165: ERC165[];
    if (!networkId) {
        erc165 = await ERC165Dexie.anyOf("interfaceId", interfaceIds);
    } else {
        const networkIds = typeof networkId == "string" ? [networkId] : networkId;
        const filters = flatten(
            networkIds.map((n) => {
                return interfaceIds.map((id) => {
                    return [n, id] as [string, string];
                });
            }),
        );
        erc165 = await ERC165Dexie.anyOf("[networkId+interfaceId]", filters);
    }

    return erc165;
}
