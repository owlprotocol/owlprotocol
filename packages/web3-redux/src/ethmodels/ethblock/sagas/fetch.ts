import { put, call, select } from "typed-redux-saga";
import { FetchAction } from "../actions/index.js";
import { NetworkCRUD } from "../../../network/crud.js";
import { BlockCRUD } from "../crud.js";
import { EthBlockHeader } from "../model/BlockHeader.js";

/** @category Sagas */
export function* fetchSaga(action: FetchAction): Generator<any, EthBlockHeader> {
    const { payload } = action;
    const { networkId, returnTransactionObjects } = payload;
    const blockNumber = (payload as { blockNumber?: number }).blockNumber;
    const blockHash = (payload as { blockHash?: string }).blockHash;

    const network = yield* select(NetworkCRUD.selectors.selectByIdSingle, networkId);
    if (!network) throw new Error(`Network ${networkId} undefined`);
    const web3 = network?.web3;
    if (!web3) throw new Error(`Network ${networkId} has no web3`);

    if (blockNumber) {
        //Check cache
        const dbSelected = yield* call(BlockCRUD.db.get, {
            networkId,
            number: blockNumber,
        });
        if (dbSelected) return dbSelected;
    } else if (blockHash) {
        const dbSelected = yield* call(BlockCRUD.db.get, {
            networkId,
            hash: blockHash,
        });
        if (dbSelected) return dbSelected;
    }

    //Fetch
    const result = yield* call(web3.eth.getBlock, blockNumber ?? blockHash!, returnTransactionObjects);
    const block = { ...result, networkId };
    yield* put(BlockCRUD.actions.put(block, action.meta.uuid, action.meta.ts));
    return block;
}
