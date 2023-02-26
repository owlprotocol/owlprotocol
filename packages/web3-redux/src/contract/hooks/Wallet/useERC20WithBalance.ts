import { IERC20TransferEvent } from '@owlprotocol/contracts/lib/types/web3/types.js';
import { flatten, uniq } from 'lodash-es';
import { utils, BigNumberish } from 'ethers'

import { TransferERC721 } from "../../../contractevent/constants.js";
import { ContractEventCRUD } from "../../../contractevent/crud.js";
import { ContractEvent } from '../../../contractevent/model/interface.js';
import { getEventFilter } from "../../../contractevent/sagas/getEventFilter.js";
import { EthCallCRUD } from "../../../ethcall/crud.js";

export function useERC20WithBalance(account: string, networkId?: string, minBalance: BigNumberish = 0) {
    const { index: TransferFilter } = getEventFilter({ networkId, filter: { to: account } }, TransferERC721)
    const [TransferEvents] = ContractEventCRUD.hooks.useWhere(TransferFilter) as [ContractEvent<IERC20TransferEvent['returnValues']>[], any]
    const tokenSingle = TransferEvents.map((e) => { return { networkId: e.networkId, address: e.address } })
    const tokens = uniq([...tokenSingle])

    const balanceOfFilters = tokens.map(({ networkId, address }) => {
        return {
            networkId,
            address,
            methodName: 'balanceOf',
            argsHash: JSON.stringify({ account })
        }
    })
    //networkId, address, balanceOf(account, tokenId)
    const [balanceOf] = EthCallCRUD.hooks.useWhereMany(balanceOfFilters);
    const balances = flatten((balanceOf ?? [])).map(({ networkId, to, returnValue, args }) => {
        return {
            networkId,
            address: to,
            balance: utils.parseUnits(returnValue as string, 'wei')
        }
    }).filter(({ balance }) => balance.gt(minBalance))

    return balances
}
