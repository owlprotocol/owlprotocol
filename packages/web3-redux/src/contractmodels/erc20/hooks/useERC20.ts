import { flatten } from "lodash-es";
import { ERC20CRUD } from "../crud.js";
import { ERC20, ERC20Id, ERC20IndexInput, ERC20IndexInputAnyOf } from "../model/interface.js";

export function useERC20(id: ERC20Id): [ERC20 | undefined, { isLoading: boolean }] {
    const [result, resultOptions] = ERC20CRUD.hooks.useGet(id);
    return [result, resultOptions];
}

export function useERC20Where(filter: ERC20IndexInput): [ERC20[], { isLoading: boolean }] {
    const [resultsNested, resultsOptions] = ERC20CRUD.hooks.useWhere(filter);
    const results = flatten(resultsNested);

    return [results, resultsOptions];
}

export function useERC20WhereAnyOf(filter: ERC20IndexInputAnyOf): [ERC20[], { isLoading: boolean }] {
    const [resultsNested, resultsOptions] = ERC20CRUD.hooks.useWhereAnyOf(filter);
    const results = flatten(resultsNested);
    return [results, resultsOptions];
}
