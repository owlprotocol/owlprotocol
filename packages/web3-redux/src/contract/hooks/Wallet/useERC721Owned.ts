import { IERC721TransferEvent } from '@owlprotocol/contracts/lib/types/web3/types.js';
import { flatten, isEqual, uniq, uniqWith } from 'lodash-es';
import { TransferERC721 } from "../../../contractevent/constants.js";
import { ContractEventCRUD } from "../../../contractevent/crud.js";
import { ContractEvent } from '../../../contractevent/model/interface.js';
import { getEventFilter } from "../../../contractevent/sagas/getEventFilter.js";
import { EthCallCRUD } from "../../../ethcall/crud.js";
import { EthCallIndexInput } from '../../../ethcall/model/interface.js';

export function useERC721Owned(account: string, networkId?: string) {
    const { index: TransferFilter } = getEventFilter({ networkId, filter: { to: account } }, TransferERC721)
    const [TransferEvents] = ContractEventCRUD.hooks.useWhere(TransferFilter) as [ContractEvent<IERC721TransferEvent['returnValues']>[], any]
    const tokenSingle = TransferEvents
        .filter((e) => e.returnValues)
        .map((e) => { return { networkId: e.networkId, address: e.address, tokenId: e.returnValues!.tokenId } })
    const tokens = uniqWith(tokenSingle, isEqual)
    console.debug({ tokens })

    const ownerOfFilters: EthCallIndexInput[] = tokens.map(({ networkId, address, tokenId }) => {
        return {
            networkId,
            to: address,
            methodName: 'ownerOf',
            argsHash: JSON.stringify([tokenId])
        }
    })
    //networkId, address, balanceOf(account, tokenId)
    const [ownerOf] = EthCallCRUD.hooks.useWhereMany(ownerOfFilters);
    const balances = flatten((ownerOf ?? []))
        .filter((c) => c.returnValue)
        .filter(({ returnValue }) => returnValue.toLowerCase() == account.toLowerCase())
        .map(({ networkId, to, args }) => {
            return {
                networkId,
                address: to,
                tokenId: args![0],
            }
        })

    return balances
}
