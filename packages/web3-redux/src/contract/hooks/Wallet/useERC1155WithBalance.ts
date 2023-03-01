import { IERC1155TransferBatchEvent, IERC1155TransferSingleEvent } from '@owlprotocol/contracts/lib/types/web3/types.js';
import { flatMap, flatten, isEqual, uniqWith } from 'lodash-es';
import { utils, BigNumberish } from 'ethers'

import { TransferSingleERC1155, TransferBatchERC1155 } from "../../../contractevent/constants.js";
import { ContractEventCRUD } from "../../../contractevent/crud.js";
import { ContractEvent } from '../../../contractevent/model/interface.js';
import { getEventFilter } from "../../../contractevent/sagas/getEventFilter.js";
import { EthCallCRUD } from "../../../ethcall/crud.js";
import { EthCallIndexInput } from '../../../ethcall/model/interface.js';

export function useERC1155WithBalance(account: string, networkId?: string, minBalance: BigNumberish = 0) {
    const { index: TransferSingleFilter } = getEventFilter({ networkId, filter: { to: account } }, TransferSingleERC1155)
    const { index: TransferBatchFilter } = getEventFilter({ networkId, filter: { to: account } }, TransferBatchERC1155)
    const [TransferSingleEvents] = ContractEventCRUD.hooks.useWhere(TransferSingleFilter) as [ContractEvent<IERC1155TransferSingleEvent['returnValues']>[], any]
    const [TransferBatchEvents] = ContractEventCRUD.hooks.useWhere(TransferBatchFilter) as [ContractEvent<IERC1155TransferBatchEvent['returnValues']>[], any]
    const tokenSingle = TransferSingleEvents
        .filter((e) => e.returnValues)
        .map((e) => { return { networkId: e.networkId, address: e.address, id: e.returnValues!.id } })
    const tokensMany = flatMap(TransferBatchEvents.map((e) => {
        return (e.returnValues?.ids ?? []).map((id) => {
            return {
                networkId: e.networkId,
                address: e.address,
                id
            }
        })
    }))
    const tokensAll = [...tokenSingle, ...tokensMany]
    const tokens = uniqWith(tokensAll, isEqual)

    const balanceOfFilters: EthCallIndexInput[] = tokens.map(({ networkId, address, id }) => {
        return {
            networkId,
            to: address,
            methodName: 'balanceOf',
            argsHash: JSON.stringify([account, id])
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
        }).filter(({ balance }) => balance.gt(minBalance))

    return balances
}
