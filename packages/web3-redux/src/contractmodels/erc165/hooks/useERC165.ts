import { flatten } from "lodash-es";
import { ERC165CRUD } from "../crud.js";
import { ERC165, ERC165Id, ERC165IndexInput, ERC165IndexInputAnyOf } from "../model/interface.js";

export function useERC165(id: Partial<ERC165Id> | undefined): [ERC165Id | undefined, { isLoading: boolean }] {
    const result = ERC165CRUD.hooks.useGet(id);
    return result;
}

export function useERC165Where(filter: ERC165IndexInput | undefined): [ERC165[], { isLoading: boolean }] {
    const [results, loading] = ERC165CRUD.hooks.useWhere(filter);
    return [results, loading];
}

export function useERC165WhereAnyOf(filter: ERC165IndexInputAnyOf | undefined): [ERC165[], { isLoading: boolean }] {
    const [resultsNested, loading] = ERC165CRUD.hooks.useWhereAnyOf(filter);
    const results = flatten(resultsNested);
    return [results, loading];
}
