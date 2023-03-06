import { Utils, Web3 } from '@owlprotocol/contracts';
import { compact, uniq } from 'lodash-es';
import { ContractEventCRUD } from '../../../contractevent/crud';
import { ContractEvent } from '../../../contractevent/model';

export async function getERC721TokenIds(
    networkId: string,
    address: string,
) {
    const events = await ContractEventCRUD.db.where({ networkId, address, topic0: Utils.IERC721.TransferTopic }) as ContractEvent<Web3.IERC721TransferEvent['returnValues']>[]
    const tokenIds = compact(uniq(events.map((e) => e.returnValues?.tokenId)))
    return tokenIds
}
