import { flatten } from "lodash-es";
import { ERC721CRUD } from "../crud.js";
import { ERC721, ERC721Id, ERC721IndexInput, ERC721IndexInputAnyOf } from "../model/interface.js";

export function useERC721(id: Partial<ERC721Id> | undefined): [ERC721 | undefined, { isLoading: boolean }] {
    const [result, resultOptions] = ERC721CRUD.hooks.useGet(id);
    return [result, resultOptions];
}

export function useERC721Where(filter: ERC721IndexInput | undefined): [ERC721[], { isLoading: boolean }] {
    const [resultsNested, resultsOptions] = ERC721CRUD.hooks.useWhere(filter);
    const results = flatten(resultsNested);

    return [results, resultsOptions];
}

export function useERC721WhereAnyOf(filter: ERC721IndexInputAnyOf | undefined): [ERC721[], { isLoading: boolean }] {
    const [resultsNested, resultsOptions] = ERC721CRUD.hooks.useWhereAnyOf(filter);
    const results = flatten(resultsNested);
    return [results, resultsOptions];
}
