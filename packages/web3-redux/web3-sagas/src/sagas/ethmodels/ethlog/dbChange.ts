import { call, put } from "typed-redux-saga";
import { EthLogCRUDActions } from "@owlprotocol/web3-actions";
import { fetchEthLogAbiAction } from "@owlprotocol/web3-actions";
import { EthLogAbiDexie } from "@owlprotocol/web3-dexie";

//Handle contract creation
export function* dbCreatingSaga(action: ReturnType<typeof EthLogCRUDActions.actions.dbCreating>): Generator<any, any> {
    const { payload } = action;
    const { obj } = payload;
    const { topic0, eventFormatFull } = obj;

    if (topic0 && !eventFormatFull) {
        //Store topic0 in signature db
        const ethlogabi = yield* call(EthLogAbiDexie.where, {
            eventSighash: topic0,
        });
        if (ethlogabi.length === 0) yield* put(fetchEthLogAbiAction({ eventSighash: topic0 }));
    }
}

/*
export function* dbUpdatingSaga(
    action: ReturnType<typeof EthLogCRUDActions.actions.dbUpdating>
): Generator<any, any> { }

export function* dbDeletingSaga(
    action: ReturnType<typeof EthLogCRUDActions.actions.dbDeleting>
): Generator<any, any> { }
*/
