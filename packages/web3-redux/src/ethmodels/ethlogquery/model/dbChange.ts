import { put } from "typed-redux-saga";
import { EthLogQueryCRUD } from "../crud.js";

//Handle contract creation
export function* dbCreatingSaga(action: ReturnType<typeof EthLogQueryCRUD.actions.dbCreating>): Generator<any, any> {
    //Handle contract creation
    const { payload } = action;
    const { obj } = payload;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { networkId, address, eventFormatFull, topic0 } = obj;
}

export function* dbUpdatingSaga(action: ReturnType<typeof EthLogQueryCRUD.actions.dbUpdating>): Generator<any, any> {
    //Handle contract creation
    const { payload } = action;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { obj, mods } = payload;
}

export function* dbDeletingSaga(action: ReturnType<typeof EthLogQueryCRUD.actions.dbDeleting>): Generator<any, any> {
    const { payload } = action;
    if (payload.obj) {
        const { networkId, address, topic0, topic1, topic2, topic3, fromBlock, toBlock } = payload.obj;
        yield* put(
            EthLogQueryCRUD.actions.reduxDelete({
                networkId,
                address,
                topic0,
                topic1,
                topic2,
                topic3,
                fromBlock,
                toBlock,
            }),
        );
    }
}
