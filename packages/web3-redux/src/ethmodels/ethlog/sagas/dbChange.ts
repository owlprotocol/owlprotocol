import { call, put } from "typed-redux-saga";
import { EthLogCRUD } from "../crud.js";
import { EthLogAbiCRUD } from "../../ethlogabi/crud.js";
import { fetchAction as fetchEthLogAbi } from "../../ethlogabi/actions/index.js";

//Handle contract creation
export function* dbCreatingSaga(action: ReturnType<typeof EthLogCRUD.actions.dbCreating>): Generator<any, any> {
    const { payload } = action;
    const { obj } = payload;
    const { topic0, eventFormatFull } = obj;

    if (topic0 && !eventFormatFull) {
        //Store topic0 in signature db
        const ethlogabi = yield* call(EthLogAbiCRUD.db.get, {
            eventSighash: topic0,
        });
        if (!ethlogabi) yield* put(fetchEthLogAbi({ eventSighash: topic0 }));
    }
}

/*
export function* dbUpdatingSaga(
    action: ReturnType<typeof EthLogCRUD.actions.dbUpdating>
): Generator<any, any> { }

export function* dbDeletingSaga(
    action: ReturnType<typeof EthLogCRUD.actions.dbDeleting>
): Generator<any, any> { }
*/
