import { utils } from "ethers";
import { flatten } from "lodash-es";
import { ERC20AllowanceCRUD } from "../crud.js";
import {
    ERC20Allowance,
    ERC20AllowanceId,
    ERC20AllowanceIndexInput,
    ERC20AllowanceIndexInputAnyOf,
} from "../model/interface.js";

export function useERC20Allowance(
    id: Partial<ERC20AllowanceId> | undefined,
): [ERC20Allowance | undefined, { isLoading: boolean }] {
    const [result, resultOptions] = ERC20AllowanceCRUD.hooks.useGet(id);
    return [result, resultOptions];
}

export function useERC20AllowanceWhere(
    filter: ERC20AllowanceIndexInput | undefined,
    minBalanceWei?: string,
): [ERC20Allowance[], { isLoading: boolean }] {
    const [resultsNested, resultsOptions] = ERC20AllowanceCRUD.hooks.useWhere(filter);
    const results = flatten(resultsNested);

    if (!minBalanceWei) {
        return [results, resultsOptions];
    }

    const resultsFiltered = results.filter((b) => {
        return utils.parseUnits(b.balance ?? "0", "wei").gte(utils.parseUnits(minBalanceWei, "wei"));
    });
    return [resultsFiltered, resultsOptions];
}

export function useERC20AllowanceWhereAnyOf(
    filter: ERC20AllowanceIndexInputAnyOf | undefined,
    minBalanceWei?: string,
): [ERC20Allowance[], { isLoading: boolean }] {
    const [resultsNested, resultsOptions] = ERC20AllowanceCRUD.hooks.useWhereAnyOf(filter);
    const results = flatten(resultsNested);
    if (!minBalanceWei) {
        return [results, resultsOptions];
    }

    const resultsFiltered = results.filter((b) => {
        return utils.parseUnits(b.balance ?? "0", "wei").gte(utils.parseUnits(minBalanceWei, "wei"));
    });
    return [resultsFiltered, resultsOptions];
}
