import { Utils, Web3 } from '@owlprotocol/contracts';
import { compact, flatten, uniq } from 'lodash-es';
import { ContractEventCRUD } from '../../../contractevent/crud';
import { ContractEvent } from '../../../contractevent/model';

export async function getERC1155TokenIds(
    networkId: string,
    address: string,
) {
    const [TransferSingle, TransferBatch] = await Promise.all([
        ContractEventCRUD.db.where({ networkId, address, topic0: Utils.IERC1155.TransferSingle }),
        ContractEventCRUD.db.where({ networkId, address, topic0: Utils.IERC1155.TransferBatch })
    ]) as [ContractEvent<Web3.IERC1155TransferSingleEvent['returnValues']>[], ContractEvent<Web3.IERC1155TransferBatchEvent['returnValues']>[]]

    const tokenIds = compact(uniq([...TransferSingle.map((e) => e.returnValues?.id), ...flatten(TransferBatch.map((e) => e.returnValues?.ids))]))
    return tokenIds
}
