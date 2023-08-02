import { createCRUDDexieHooks } from "@owlprotocol/crud-dexie-hooks";
import {
    EthSendDexie,
    EthSend,
    EthSendKeyId,
    EthSendKeyIdx,
    EthSendKeyIdEq,
    EthSendKeyIdxEq,
    EthSendKeyIdxEqAny,
} from "@owlprotocol/web3-dexie";

export const EthSendDexieHooks = createCRUDDexieHooks<
    EthSend,
    EthSendKeyId,
    EthSendKeyIdx,
    EthSendKeyIdEq,
    EthSendKeyIdxEq,
    EthSendKeyIdxEqAny
>(EthSendDexie);

export function useEthSend<Args extends any[] = any[]>(
    id: string,
): [EthSend<Args> | undefined, { isLoading: boolean }] {
    return EthSendDexieHooks.useGet({ uuid: id });
}

export function useEthSendFactory<Args extends any[] = any[]>() {
    return function useEthSend2(id: string) {
        return useEthSend<Args>(id);
    };
}
