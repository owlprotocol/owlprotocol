import { flatten } from 'lodash-es';
import { utils, BigNumberish } from 'ethers'
import { EthCallCRUD } from "../../../ethcall/crud.js";
import { EthCallIndexInput } from '../../../ethcall/model/interface.js';
import { useNetworkIds } from '../../../network/hooks/useNetworkIds.js';

export function useERC1155WithBalance(account: string, networkIds?: string[], minBalance: BigNumberish = 0) {
    const networkIdsDefined = useNetworkIds(networkIds)
    const balanceOfFilters: EthCallIndexInput[] = networkIdsDefined.map((networkId) => {
        return {
            networkId,
            methodSignature: 'balanceOf(address,uint256)',
            arg0Idx: account.toLowerCase()
        }
    })
    //networkId, address, balanceOf(account, tokenId)
    const [balanceOf] = EthCallCRUD.hooks.useWhereMany(balanceOfFilters);
    const balances = flatten((balanceOf ?? []))
        .filter((c) => c.returnValue)
        .map(({ networkId, to, returnValue, args }) => {
            return {
                networkId,
                address: to,
                tokenId: args![1],
                balance: utils.parseUnits(returnValue as string, 'wei')
            }
        })
        .filter(({ balance }) => balance.gt(minBalance))

    return balances
}
