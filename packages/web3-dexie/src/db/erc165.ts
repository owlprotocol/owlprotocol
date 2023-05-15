import { abiDeterministic } from "@owlprotocol/web3-models";
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
