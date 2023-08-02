import { createCRUDDexieHooks } from "@owlprotocol/crud-dexie-hooks";
import {
    EthLogDexie,
    EthLog,
    EthLogKeyId,
    EthLogKeyIdx,
    EthLogKeyIdEq,
    EthLogKeyIdxEq,
    EthLogKeyIdxEqAny,
} from "@owlprotocol/web3-dexie";
import {
    EthLogContractFilter,
    EthLogContractFilterBase,
    WithFilter,
    validateEthLogContractFilter,
} from "@owlprotocol/web3-models";
import { flatten } from "lodash-es";

export const EthLogDexieHooks = createCRUDDexieHooks<
    EthLog,
    EthLogKeyId,
    EthLogKeyIdx,
    EthLogKeyIdEq,
    EthLogKeyIdxEq,
    EthLogKeyIdxEqAny
>(EthLogDexie);

export function useEthLog<Ret = any>(id: EthLogKeyIdEq): [EthLog<Ret> | undefined, { isLoading: boolean }] {
    const result = EthLogDexieHooks.useGet(id);
    return result;
}

export function useEthLogWhere<Ret = any>(filter: EthLogKeyIdxEq): [EthLog<Ret>[], { isLoading: boolean }] {
    const [resultsNested, loading] = EthLogDexieHooks.useWhere(filter);
    const results = flatten(resultsNested);
    return [results, loading];
}

export function useEthLogWhereFactory<Ret = any>(eventFormatFull: string) {
    return function useEthLogWhere2(filter: Omit<EthLogKeyIdxEq, "methodFormatFull">) {
        return useEthLogWhere<Ret>({ ...filter, eventFormatFull });
    };
}

export function useEthLogWhereAnyOf<Ret = any>(filter: EthLogKeyIdxEqAny): [EthLog<Ret>[], { isLoading: boolean }] {
    const [resultsNested, loading] = EthLogDexieHooks.useWhereAnyOf(filter);
    const results = flatten(resultsNested);
    return [results, loading];
}

export function useEthLogWhereAnyOfFactory<Ret = any>(eventFormatFull: string) {
    return function useEthLogWhereAnyOf2(filter: Omit<EthLogKeyIdxEqAny, "methodFormatFull">) {
        return useEthLogWhereAnyOf<Ret>({ ...filter, eventFormatFull });
    };
}

//Contract-specific
export function useEvents<Ret = any>(idx: EthLogContractFilter<Ret>): [EthLog<Ret>[], { isLoading: boolean }] {
    return EthLogDexieHooks.useWhere(validateEthLogContractFilter(idx));
}

export function useEventsFactory<Ret = any>(eventFormatFull: string) {
    return function useEvents2(idx: EthLogContractFilterBase & Partial<WithFilter<Ret>>) {
        return useEvents<Ret>({ ...idx, eventFormatFull });
    };
}
