import { utils } from "ethers";
import { flatten } from "lodash-es";
import { ERC1155BalanceCRUD } from "../crud.js";
import { ERC1155Balance, ERC1155BalanceIndexInputAnyOf } from "../model/interface.js";

export function useERC1155Balance(
    filter: ERC1155BalanceIndexInputAnyOf | undefined,
    minBalanceWei?: string,
): [ERC1155Balance[], { isLoading: boolean }] {
    const [resultsNested, loading] = ERC1155BalanceCRUD.hooks.useWhereAnyOf(filter);
    const results = flatten(resultsNested);
    if (!minBalanceWei) {
        return [results, loading];
    }

    const resultsFiltered = results.filter((b) => {
        return utils.parseUnits(b.balance ?? "0", "wei").gte(utils.parseUnits(minBalanceWei, "wei"));
    });

    return [resultsFiltered, loading];
}
