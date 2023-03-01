import { compact, flatten } from 'lodash-es';
import { utils, BigNumberish, BigNumber } from 'ethers'
import { EthCallCRUD } from "../../../ethcall/crud.js";
import { EthCallIndexInput } from '../../../ethcall/model/interface.js';
import { NetworkCRUD } from '../../../network/crud.js';

export interface ERC20TokenBalance {
    networkId: string,
    address: string,
    balance: BigNumber,
}

export function useERC20WithBalance(account: string, networkIds?: string[] | undefined, minBalance: BigNumberish = 0):
    ERC20TokenBalance[] {
    const [networksByFilter] = NetworkCRUD.hooks.useGetBulk(networkIds)
    const [networksAll] = NetworkCRUD.hooks.useAll()
    const networkIdsDefined = networkIds ?
        compact(networksByFilter).map((n) => n.networkId)
        : networksAll.map((n) => n.networkId)

    const balanceOfFilters: EthCallIndexInput[] = networkIdsDefined.map((networkId) => {
        return {
            networkId,
            methodName: 'balanceOf',
            argsHash: JSON.stringify([account])
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
