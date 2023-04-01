import { compact } from "lodash-es";
import { useERC165WhereAnyOf } from "../../contractmodels/erc165/hooks/useERC165.js";
import { ContractCRUD } from "../crud.js";
import { Contract } from "../model/interface.js";
import { ERC165IndexInputAnyOf } from "../../contractmodels/erc165/model/interface.js";

export function useContractsWithInterfaceIds(
    interfaceIds: string[],
    networkIds?: string[] | undefined,
    implementation?: boolean,
): [Contract[], { isLoading: boolean }] {
    let filter: ERC165IndexInputAnyOf = { interfaceId: interfaceIds };
    if (networkIds) filter = { interfaceId: interfaceIds, networkId: networkIds };

    const [interfaces, interfacesOptions] = useERC165WhereAnyOf(filter);

    console.debug({ interfaces, interfaceIds, networkIds, implementation });

    const [results, resultsOptions] = ContractCRUD.hooks.useGetBulk(interfaces);

    const resultsFiltered = compact(results).filter((c) => {
        const tags = new Set(c.tags);
        if (implementation) {
            return tags.has("Implementation") == true;
        } else {
            return tags.has("Implementation") == false;
        }
    });

    const isLoading = interfacesOptions.isLoading || resultsOptions.isLoading;
    return [resultsFiltered, { isLoading }];
}

export function contractsWithInterfaceIdsHookFactory(interfaceId: string) {
    return function useContractsWithInterfaceIds2(networkIds?: string[]) {
        return useContractsWithInterfaceIds([interfaceId], networkIds);
    };
}
