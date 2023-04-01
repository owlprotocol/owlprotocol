import { flatten } from "lodash-es";
import { EthLogCRUD } from "../crud.js";
import {
    EthLog,
    EthLogContractFilter,
    EthLogContractFilterBase,
    EthLogId,
    EthLogIndexInput,
    EthLogIndexInputAnyOf,
    validateEthLogContractFilter,
    WithFilter,
} from "../model/interface.js";

export function useEthLog<Ret = any>(id: EthLogId): [EthLog<Ret> | undefined, { isLoading: boolean }] {
    const result = EthLogCRUD.hooks.useGet(id);
    return result;
}

export function useEthLogWhere<Ret = any>(filter: EthLogIndexInput): [EthLog<Ret>[], { isLoading: boolean }] {
    const [resultsNested, loading] = EthLogCRUD.hooks.useWhere(filter);
    const results = flatten(resultsNested);
    return [results, loading];
}

export function useEthLogWhereFactory<Ret = any>(eventFormatFull: string) {
    return function useEthLogWhere2(filter: Omit<EthLogIndexInput, "methodFormatFull">) {
        return useEthLogWhere<Ret>({ ...filter, eventFormatFull });
    };
}

export function useEthLogWhereAnyOf<Ret = any>(filter: EthLogIndexInputAnyOf): [EthLog<Ret>[], { isLoading: boolean }] {
    const [resultsNested, loading] = EthLogCRUD.hooks.useWhereAnyOf(filter);
    const results = flatten(resultsNested);
    return [results, loading];
}

export function useEthLogWhereAnyOfFactory<Ret = any>(eventFormatFull: string) {
    return function useEthLogWhereAnyOf2(filter: Omit<EthLogIndexInputAnyOf, "methodFormatFull">) {
        return useEthLogWhereAnyOf<Ret>({ ...filter, eventFormatFull });
    };
}

//Contract-specific
export function useEvents<Ret = any>(idx: EthLogContractFilter<Ret>): [EthLog<Ret>[], { isLoading: boolean }] {
    const result = EthLogCRUD.hooks.useWhere(validateEthLogContractFilter(idx));
    return result;
}

export function useEventsFactory<Ret = any>(eventFormatFull: string) {
    return function useEvents2(idx: EthLogContractFilterBase & Partial<WithFilter<Ret>>) {
        return useEvents<Ret>({ ...idx, eventFormatFull });
    };
}
