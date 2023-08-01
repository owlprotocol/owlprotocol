import { put, call, select } from "typed-redux-saga";
import { FetchBlockAction } from "@owlprotocol/web3-actions";
import { EthBlockCRUDActions } from "@owlprotocol/web3-actions";
import { EthBlockHeader, EthBlockTransaction } from "@owlprotocol/web3-models";
import { NetworkSelectors } from "@owlprotocol/web3-redux-orm";
import { EthBlockDexie } from "@owlprotocol/web3-dexie";

/** @category Sagas */
export function* fetchSaga(action: FetchBlockAction): Generator<any, EthBlockHeader> {
    const { payload } = action;
    const { networkId, returnTransactionObjects } = payload;
    const blockNumber = (payload as { blockNumber?: number }).blockNumber;
    const blockHash = (payload as { blockHash?: string }).blockHash;

    const network = yield* select(NetworkSelectors.selectByIdSingle, networkId);
    if (!network) throw new Error(`Network ${networkId} undefined`);
    const web3 = network?.web3;
    if (!web3) throw new Error(`Network ${networkId} has no web3`);

    if (blockNumber) {
        //Check cache
        const dbSelected = yield* call(EthBlockDexie.get, {
            networkId,
            number: blockNumber,
        });
        if (dbSelected) return dbSelected;
    } else if (blockHash) {
        const dbSelected = (yield* call(EthBlockDexie.where, {
            networkId,
            hash: blockHash,
        }))[0] as EthBlockTransaction | undefined;
        if (dbSelected) return dbSelected;
    }

    //Fetch
    const result = yield* call(web3.eth.getBlock, blockNumber ?? blockHash!, returnTransactionObjects);
    const block = { ...result, networkId };
    yield* put(EthBlockCRUDActions.actions.put(block, action.meta.uuid, action.meta.ts));
    return block;
}
