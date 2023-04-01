import { flatten } from "lodash-es";
import { ERC1155CRUD } from "../crud.js";
import { ERC1155, ERC1155Id, ERC1155IndexInput, ERC1155IndexInputAnyOf } from "../model/interface.js";

export function useERC1155(id: ERC1155Id | undefined): [ERC1155 | undefined, { isLoading: boolean }] {
    const [result, resultOptions] = ERC1155CRUD.hooks.useGet(id);
    return [result, resultOptions];
}

export function useERC1155Where(filter: ERC1155IndexInput | undefined): [ERC1155[], { isLoading: boolean }] {
    const [resultsNested, resultsOptions] = ERC1155CRUD.hooks.useWhere(filter);
    const results = flatten(resultsNested);

    return [results, resultsOptions];
}

export function useERC1155WhereAnyOf(filter: ERC1155IndexInputAnyOf | undefined): [ERC1155[], { isLoading: boolean }] {
    const [resultsNested, resultsOptions] = ERC1155CRUD.hooks.useWhereAnyOf(filter);
    const results = flatten(resultsNested);
    return [results, resultsOptions];
}
