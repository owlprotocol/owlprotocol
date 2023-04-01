import { EthSendCRUD } from "../crud.js";
import { EthSend } from "../model/interface.js";

export function useEthSend<Args extends any[] = any[]>(id: string) {
    const result = EthSendCRUD.hooks.useGet(id);
    return result as [EthSend<Args> | undefined, (typeof result)[1]];
}

export function useEthSendFactory<Args extends any[] = any[]>() {
    return function useEthSend2(id: string) {
        return useEthSend<Args>(id);
    };
}
