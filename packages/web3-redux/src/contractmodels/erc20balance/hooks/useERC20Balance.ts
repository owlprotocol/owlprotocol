import { utils } from "ethers";
import { flatten } from "lodash-es";
import { ERC20BalanceCRUD } from "../crud.js";
import {
    ERC20Balance,
    ERC20BalanceId,
    ERC20BalanceIndexInput,
    ERC20BalanceIndexInputAnyOf,
} from "../model/interface.js";

export function useERC20Balance(
    id: Partial<ERC20BalanceId> | undefined,
): [ERC20Balance | undefined, { isLoading: boolean }] {
    const [result, resultOptions] = ERC20BalanceCRUD.hooks.useGet(id);
    return [result, resultOptions];
}

export function useERC20BalanceWhere(
    filter: ERC20BalanceIndexInput | undefined,
    minBalanceWei?: string,
): [ERC20Balance[], { isLoading: boolean }] {
    const [resultsNested, resultsOptions] = ERC20BalanceCRUD.hooks.useWhere(filter);
    const results = flatten(resultsNested);

    if (!minBalanceWei) {
        return [results, resultsOptions];
    }

    const resultsFiltered = results.filter((b) => {
        return utils.parseUnits(b.balance ?? "0", "wei").gte(utils.parseUnits(minBalanceWei, "wei"));
    });
    return [resultsFiltered, resultsOptions];
}

export function useERC20BalanceWhereAnyOf(
    filter: ERC20BalanceIndexInputAnyOf | undefined,
    minBalanceWei?: string,
): [ERC20Balance[], { isLoading: boolean }] {
    const [resultsNested, resultsOptions] = ERC20BalanceCRUD.hooks.useWhereAnyOf(filter);
    const results = flatten(resultsNested);
    if (!minBalanceWei) {
        return [results, resultsOptions];
    }

    const resultsFiltered = results.filter((b) => {
        return utils.parseUnits(b.balance ?? "0", "wei").gte(utils.parseUnits(minBalanceWei, "wei"));
    });
    return [resultsFiltered, resultsOptions];
}
