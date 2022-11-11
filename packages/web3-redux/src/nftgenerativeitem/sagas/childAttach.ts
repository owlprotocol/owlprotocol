import { put, call, all } from 'typed-redux-saga';
import coder from 'web3-eth-abi';
import { map, zip } from 'lodash-es';
import { Web3 } from '@owlprotocol/contracts';
import { fetchSaga } from './fetch.js';
import { fetchSaga as fetchCollectionSaga } from '../../nftgenerativecollection/sagas/fetch.js';
import { ChildAttachAction } from '../actions/index.js';
import { NFTGenerativeItemCRUD } from '../crud.js';
import { NFTGenerativeCollectionCRUD } from '../../nftgenerativecollection/crud.js';
import Contract from '../../contract/index.js';
import { NFTGenerativeCollection } from '../../nftgenerativecollection/model/interface.js';
import { NFTGenerativeItem } from '../model/interface.js';
import { NFTGenerativeCollectionClass } from '@owlprotocol/nft-sdk';

export function* childAttachSaga(action: ChildAttachAction) {
    const { payload } = action;
    const { networkId, address, tokenId, from, status, children } = payload;
    console.debug(payload);
    if (status === 'draft') {
        const { collection, item: currDraft } = yield* call(
            fetchSaga,
            NFTGenerativeItemCRUD.actions.fetch({ networkId, address, tokenId, status }, action.meta.uuid),
        );
        if (!currDraft) throw new Error(`No item ${JSON.stringify({ networkId, address, tokenId })}`);

        const childContracts = collection.childContracts!;
        children.map((c) => {
            if (!childContracts.includes(c.address)) {
                throw new Error(`Invalid address ${c.address} not in childContracts ${childContracts}`);
            }
        });
        const childTokenIds = currDraft.childTokenIds!;
        const childDna = currDraft.childDna!;

        const tasks = children.map((c) => {
            if (c.tokenId === 0) {
                return call(
                    fetchCollectionSaga,
                    NFTGenerativeCollectionCRUD.actions.fetch({ networkId, address: c.address, status: 'onchain' }),
                    action.meta.uuid,
                );
            } else {
                return call(fetchSaga, NFTGenerativeItemCRUD.actions.fetch(c), action.meta.uuid);
            }
        });
        const childItemsFetch = (yield* all(tasks)) as unknown as [
            { collection: NFTGenerativeCollection; item?: NFTGenerativeItem },
        ];

        const newChildTokenIds = [...childTokenIds];
        const newChildDna = [...childDna];

        childItemsFetch.map((c) => {
            const idx = childContracts.indexOf(c.collection.address);
            if (!c.item) {
                newChildTokenIds[idx] = '0';
                newChildDna[idx] = '0x';
            } else {
                newChildTokenIds[idx] = `${c.item.tokenId}`;
                newChildDna[idx] = c.item.fullDna!;
            }
        });

        console.debug({ inherentDna: currDraft.inherentDna, newChildDna, childDna });
        const fullDna = coder.encodeParameters(['bytes', 'bytes[]'], [currDraft.inherentDna, newChildDna]);

        yield put(
            NFTGenerativeItemCRUD.actions.put(
                { ...currDraft, childTokenIds: newChildTokenIds, fullDna, childDna: newChildDna },
                action.meta.uuid,
            ),
        );
    } else if (status === 'onchain') {
        const { collection, item: currOnchain } = yield* call(
            fetchSaga,
            NFTGenerativeItemCRUD.actions.fetch({ networkId, address, tokenId, status: 'onchain' }, action.meta.uuid),
        );

        const childContracts = collection.childContracts!;
        const childTokenIds = currOnchain.childTokenIds!;
        const childTokenIdsDiff: (string | undefined)[] = [...childTokenIds];

        children.forEach((c) => {
            if (!childContracts.includes(c.address)) {
                throw new Error(`Invalid address ${c.address} not in childContracts ${childContracts}`);
            }

            const idx = childContracts.indexOf(c.address);
            const currTokenId = childTokenIds[idx];
            if (`${c.tokenId}` == currTokenId) childTokenIdsDiff[idx] = undefined;
            else childTokenIdsDiff[idx] = `${c.tokenId}`;
        });

        const childTokensDiff = map(childTokenIdsDiff, (tokenId, i) => {
            if (tokenId) return { address: childContracts[i], tokenId };
        });
        console.debug({ childTokenIdsDiff });
        let i = 0;
        for (const token of childTokensDiff) {
            if (token != undefined) {
                if (token.tokenId == '0') {
                    //Detach
                    const args: Parameters<Web3.IERC721TopDown['methods']['detachChild']> = [
                        tokenId,
                        token.address,
                        childTokenIds[i],
                    ];
                    const send = Contract.actions.send(
                        { networkId, address, method: 'detachChild', from, args },
                        action.meta.uuid,
                    );
                    yield* call(Contract.sagas.send, send);
                } else {
                    //Attach
                    const args: Parameters<Web3.IERC721TopDown['methods']['attachChild']> = [
                        tokenId,
                        token.address,
                        token.tokenId,
                    ];
                    const send = Contract.actions.send(
                        { networkId, address, method: 'attachChild', from, args },
                        action.meta.uuid,
                    );
                    yield* call(Contract.sagas.send, send);
                }
            }
            i++;
        }
    }
}
