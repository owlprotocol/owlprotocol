import { interfaces } from '@owlprotocol/contracts';
import { useLiveQuery } from 'dexie-react-hooks';
import { ContractCRUD } from '../crud.js';

export function useContractsWithInterfaceIds(interfaceIds: string[], networkIds?: string[] | undefined, implementation?: boolean) {
    const networkIdsSet = new Set(networkIds)
    const response = useLiveQuery(
        () => {
            let collection = ContractCRUD.db.table()
                .where('interfaceIds')
                .anyOf(...interfaceIds)
            if (networkIds && networkIds.length > 0) collection.filter((c) => networkIdsSet.has(c.networkId))

            //Filter out implementation contracts by default
            if (implementation) {
                collection.filter((c) => new Set(c.tags).has('Implementation') == true);
            } else {
                collection.filter((c) => new Set(c.tags).has('Implementation') == false);
            }

            return collection.toArray();
        },
        [JSON.stringify(interfaceIds), JSON.stringify(networkIds)],
        'loading' as const,
    );
    const isLoading = response === 'loading';
    const result = isLoading ? [] : response;
    const returnOptions = { isLoading };
    return [result, returnOptions] as [typeof result, typeof returnOptions];
}

export function useERC20Contracts(networkIds?: string[]) {
    return useContractsWithInterfaceIds([interfaces.IERC20.interfaceId], networkIds)
}

export function useERC721Contracts(networkIds?: string[]) {
    return useContractsWithInterfaceIds([interfaces.IERC721.interfaceId], networkIds)
}

export function useERC1155Contracts(networkIds?: string[]) {
    return useContractsWithInterfaceIds([interfaces.IERC1155.interfaceId], networkIds)
}

export function useAccessControlContracts(networkIds?: string[]) {
    return useContractsWithInterfaceIds([interfaces.IAccessControl.interfaceId], networkIds)
}

export function useAssetRouterCraftContracts(networkId?: string[]) {
    return useContractsWithInterfaceIds([interfaces.IAssetRouterCraft.interfaceId], networkId)
}

export function useAssetRouterInputContracts(networkIds?: string[]) {
    return useContractsWithInterfaceIds([interfaces.IAssetRouterInput.interfaceId], networkIds)
}

export function useAssetRouterOutputContracts(networkId?: string[]) {
    return useContractsWithInterfaceIds([interfaces.IAssetRouterOutput.interfaceId], networkId)
}
