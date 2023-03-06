import { flatten } from 'lodash-es';
import { EthCallCRUD } from "../../../ethcall/crud.js";
import { EthCallIndexInput } from '../../../ethcall/model/interface.js';
import { useNetworkIds } from '../../../network/hooks/useNetworkIds.js';

export function useERC721Owned(account: string, networkIds?: string[]) {
    const networkIdsDefined = useNetworkIds(networkIds)
    const ownerOfFilters: EthCallIndexInput[] = networkIdsDefined.map((networkId) => {
        return {
            networkId,
            methodSignature: 'ownerOf(uint256)',
            returnValueIdx: account.toLowerCase()
        }
    })
    //networkId, address, balanceOf(account, tokenId)
    const [ownerOf] = EthCallCRUD.hooks.useWhereMany(ownerOfFilters);
    const balances = flatten((ownerOf ?? []))
        .map(({ networkId, to, args }) => {
            return {
                networkId,
                address: to,
                tokenId: args![0],
            }
        })

    return balances
}
