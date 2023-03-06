import { compact, flatten } from 'lodash-es';
import { utils, BigNumberish, BigNumber } from 'ethers'
import { EthCallCRUD } from "../../../ethcall/crud.js";
import { EthCallIndexInput } from '../../../ethcall/model/interface.js';
import { NetworkCRUD } from '../../../network/crud.js';
import { useNetworkIds } from '../../../network/hooks/useNetworkIds.js';

export interface ERC20TokenBalance {
    networkId: string,
    address: string,
    balance: BigNumber,
}

export function useERC20WithBalance(account: string, networkIds?: string[] | undefined, minBalance: BigNumberish = 0):
    ERC20TokenBalance[] {
    const networkIdsDefined = useNetworkIds(networkIds)
    const balanceOfFilters: EthCallIndexInput[] = networkIdsDefined.map((networkId) => {
        return {
            networkId,
            methodSignature: 'balanceOf(address)',
            arg0Idx: account
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
                balance: utils.parseUnits(returnValue as string, 'wei')
            }
        }).filter(({ balance }) => balance.gt(minBalance))

    return balances
}
