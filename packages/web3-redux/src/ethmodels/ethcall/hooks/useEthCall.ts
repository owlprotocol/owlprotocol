import { flatten } from "lodash-es";
import { EthCallCRUD } from "../crud.js";
import {
    EthCall,
    EthCallIdPartial,
    EthCallIdPartialBase,
    EthCallIndexInput,
    EthCallIndexInputAnyOf,
    WithArgs,
} from "../model/interface.js";

export function useEthCall<Args extends any[] = any[], Ret = any>(
    id: Partial<EthCallIdPartial<Args>> | undefined,
): [EthCall<Args, Ret> | undefined, { isLoading: boolean }] {
    const result = EthCallCRUD.hooks.useGet(id);
    return result;
}

export function useEthCallFactory<Args extends any[] = any[], Ret = any>(methodFormatFull: string) {
    return function useEthCall2(id: Partial<EthCallIdPartialBase & WithArgs<Args>> | undefined) {
        return useEthCall<Args, Ret>(id ? { ...id, methodFormatFull } : undefined);
    };
}

export function useEthCallWhere<Args extends any[] = any[], Ret = any>(
    filter: EthCallIndexInput | undefined,
): [EthCall<Args, Ret>[], { isLoading: boolean }] {
    const [results, loading] = EthCallCRUD.hooks.useWhere(filter);
    return [results, loading];
}

export function useEthCallWhereFactory<Args extends any[] = any[], Ret = any>(methodFormatFull: string) {
    return function useEthCallWhere2(filter: Omit<EthCallIndexInput, "methodFormatFull"> | undefined) {
        return useEthCallWhere<Args, Ret>(filter ? { ...filter, methodFormatFull } : undefined);
    };
}

export function useEthCallWhereAnyOf<Args extends any[] = any[], Ret = any>(
    filter: EthCallIndexInputAnyOf | undefined,
): [EthCall<Args, Ret>[], { isLoading: boolean }] {
    const [resultsNested, loading] = EthCallCRUD.hooks.useWhereAnyOf(filter);
    const results = flatten(resultsNested);
    return [results, loading];
}

export function useEthCallWhereAnyOfFactory<Args extends any[] = any[], Ret = any>(methodFormatFull: string) {
    return function useEthChallWhereAnyOf2(filter: Omit<EthCallIndexInputAnyOf, "methodFormatFull"> | undefined) {
        return useEthCallWhereAnyOf<Args, Ret>(filter ? { ...filter, methodFormatFull } : undefined);
    };
}
