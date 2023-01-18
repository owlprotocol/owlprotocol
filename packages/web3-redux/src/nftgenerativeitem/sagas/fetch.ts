import { put, call, all, select } from 'typed-redux-saga';
import * as Contracts from '@owlprotocol/contracts';
import { NFTGenerativeItemCRUD } from '../crud.js';
import { fetchSaga as fetchCollectionSaga } from '../../nftgenerativecollection/sagas/fetch.js';
import { coder } from '../../utils/web3-eth-abi/index.js';
import { NFTGenerativeCollectionCRUD } from '../../nftgenerativecollection/crud.js';
import { ContractWithObjects } from '../../contract/model/interface.js';
import { NetworkWithObjects } from '../../network/index.js';
import { NFTGenerativeItem } from '../model/interface.js';
import { NFTGenerativeCollection } from '../../nftgenerativecollection/model/interface.js';
import { callBatched as callBatchedAction } from '../../contract/actions/callBatched.js';
import { callBatched } from '../../contract/sagas/callBatched.js';

export function* fetchSaga(action: ReturnType<typeof NFTGenerativeItemCRUD.actions.fetch>): Generator<
    any,
    {
        network: NetworkWithObjects;
        contract: ContractWithObjects<Contracts.Web3.ERC721TopDownDna>;
        collection: NFTGenerativeCollection;
        item: NFTGenerativeItem;
    }
> {
    const { payload } = action;
    const { networkId, address, tokenId, status } = payload;

    const { network, contract, collection } = yield* call(
        fetchCollectionSaga,
        NFTGenerativeCollectionCRUD.actions.fetch(
            {
                networkId,
                address,
                status: 'onchain' as const,
            },
            action.meta.uuid,
        ),
    );

    if (status === 'onchain') {
        //Fetch from network
        const callActionInputs = [
            { networkId, address, method: 'getDna', args: [tokenId], maxCacheAge: 0 },
            { networkId, address, method: 'childTokenIdsOf', args: [tokenId], maxCacheAge: 0 }
        ]
        const results = yield* call(callBatched, callBatchedAction({ calls: callActionInputs }, action.meta.uuid))
        const fullDna = results[0].ethcall.returnValue! as string
        const childTokenIds = results[1].ethcall.returnValue! as string[]
        const { '0': inherentDna, '1': childDna } = coder.decodeParameters(['bytes', 'bytes[]'], fullDna);
        const item = {
            networkId,
            address,
            tokenId,
            status: 'onchain' as const,
            fullDna,
            inherentDna,
            childDna,
            childTokenIds,
        };

        const dbSelected = yield* call(NFTGenerativeItemCRUD.db.get, {
            networkId,
            address,
            tokenId,
            status,
        });
        if (dbSelected &&
            dbSelected.fullDna == fullDna &&
            JSON.stringify(dbSelected.childTokenIds) === JSON.stringify(childTokenIds)) {
            return { network, contract, collection, item: dbSelected };
        }

        yield* put(NFTGenerativeItemCRUD.actions.upsert(item, action.meta.uuid));
        return { network, contract, collection, item };
    } else if (status === 'draft') {
        const dbSelected = yield* call(NFTGenerativeItemCRUD.db.get, {
            networkId,
            address,
            tokenId,
            status,
        });
        if (dbSelected && dbSelected.fullDna && dbSelected.childTokenIds) {
            return { network, contract, collection, item: dbSelected };
        }

        //Load from existing or on-chain
        const { item: onchain } = yield* call(
            fetchSaga,
            NFTGenerativeItemCRUD.actions.fetch({ networkId, address, tokenId, status: 'onchain' }),
        );
        //Copy on-chain version
        const item = { ...onchain, status: 'draft' as const } as NFTGenerativeItem;
        yield* put(NFTGenerativeItemCRUD.actions.upsert(item, action.meta.uuid));
        const selected = yield* select(NFTGenerativeItemCRUD.selectors.selectByIdSingle, {
            networkId,
            address,
            tokenId,
            status,
        });
        if (!selected?.fullDna) throw new Error(`No item ${networkId} ${address} ${tokenId}`);
        return { network, contract, collection, item: selected };
    }

    throw new Error(`No item ${networkId} ${address} ${tokenId}`);
}
