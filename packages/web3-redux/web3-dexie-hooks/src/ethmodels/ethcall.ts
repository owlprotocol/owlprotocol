import { createCRUDDexieHooks } from "@owlprotocol/crud-dexie-hooks";
import { web3CallAction } from "@owlprotocol/web3-actions";
import {
    EthCallDexie,
    EthCall,
    EthCallKeyId,
    EthCallKeyIdx,
    EthCallKeyIdEq,
    EthCallKeyIdxEq,
    EthCallKeyIdxEqAny,
} from "@owlprotocol/web3-dexie";
import { EthCallIdPartial, EthCallIdPartialBase, WithArgs } from "@owlprotocol/web3-models";
import { flatten } from "lodash-es";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

export const EthCallDexieHooks = createCRUDDexieHooks<
    EthCall,
    EthCallKeyId,
    EthCallKeyIdx,
    EthCallKeyIdEq,
    EthCallKeyIdxEq,
    EthCallKeyIdxEqAny
>(EthCallDexie);

export function useEthCall<Args extends any[] = any[], Ret = any>(
    id: Partial<EthCallIdPartial<Args>> | undefined,
): [EthCall<Args, Ret> | undefined, { isLoading: boolean }] {
    const dispatch = useDispatch();
    const [result, options] = EthCallDexieHooks.useGet(id);

    //@ts-expect-error
    const { networkId, to, data, args, methodAbi, methodFormatFull } = id ?? {};

    useEffect(() => {
        if (!result) {
            if (networkId && to) {
                if (methodFormatFull && args) {
                    dispatch(web3CallAction({ networkId, to, methodFormatFull, args }));
                } else if (methodAbi && args) {
                    dispatch(web3CallAction({ networkId, to, methodAbi, args }));
                } else if (data) {
                    dispatch(web3CallAction({ networkId, to, data }));
                }
            }
        }
    }, [dispatch, result, networkId, to, data, args, methodAbi, methodFormatFull]);

    return [result, options] as [typeof result, typeof options];
}

export function useEthCallFactory<Args extends any[] = any[], Ret = any>(methodFormatFull: string) {
    return function useEthCall2(id: Partial<EthCallIdPartialBase & WithArgs<Args>> | undefined) {
        return useEthCall<Args, Ret>(id ? { ...id, methodFormatFull } : undefined);
    };
}

export function useEthCallWhere<Args extends any[] = any[], Ret = any>(
    filter: EthCallKeyIdxEq | undefined,
): [EthCall<Args, Ret>[], { isLoading: boolean }] {
    const [results, loading] = EthCallDexieHooks.useWhere(filter);
    return [results, loading];
}

export function useEthCallWhereFactory<Args extends any[] = any[], Ret = any>(methodFormatFull: string) {
    return function useEthCallWhere2(filter: Omit<EthCallKeyIdxEq, "methodFormatFull"> | undefined) {
        return useEthCallWhere<Args, Ret>(filter ? { ...filter, methodFormatFull } : undefined);
    };
}

export function useEthCallWhereAnyOf<Args extends any[] = any[], Ret = any>(
    filter: EthCallKeyIdxEqAny | undefined,
): [EthCall<Args, Ret>[], { isLoading: boolean }] {
    const [resultsNested, loading] = EthCallDexieHooks.useWhereAnyOf(filter);
    const results = flatten(resultsNested);
    return [results, loading];
}

export function useEthCallWhereAnyOfFactory<Args extends any[] = any[], Ret = any>(methodFormatFull: string) {
    return function useEthChallWhereAnyOf2(filter: Omit<EthCallKeyIdxEqAny, "methodFormatFull"> | undefined) {
        return useEthCallWhereAnyOf<Args, Ret>(filter ? { ...filter, methodFormatFull } : undefined);
    };
}
