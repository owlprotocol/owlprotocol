import { flatten } from "lodash-es";
import { ContractCRUD } from "../crud.js";
import { Contract, ContractId, ContractIndexInput, ContractIndexInputAnyOf } from "../model/interface.js";

export function useContract(id: Partial<ContractId> | undefined): [Contract | undefined, { isLoading: boolean }] {
    const [result, loading] = ContractCRUD.hooks.useGet(id);
    return [result, loading];
}

export function useContractWhere(filter: ContractIndexInput | undefined): [Contract[], { isLoading: boolean }] {
    const [results, loading] = ContractCRUD.hooks.useWhere(filter);
    return [results, loading];
}

export function useContractWhereAnyOf(
    filter: ContractIndexInputAnyOf | undefined,
): [Contract[], { isLoading: boolean }] {
    const [resultsNested, loading] = ContractCRUD.hooks.useWhereAnyOf(filter);
    const results = flatten(resultsNested);
    return [results, loading];
}
