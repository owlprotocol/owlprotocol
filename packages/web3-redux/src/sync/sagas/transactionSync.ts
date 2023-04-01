import { put, call, all } from "typed-redux-saga";
import { Action } from "redux";
import { actionDecode, TransactionSync } from "../model/index.js";
import type { EthTransactionCRUD } from "../../ethmodels/ethtransaction/crud.js";
import { SyncCRUD } from "../crud.js";

//Handle on transaction update
export function* transactionSync({ payload }: ReturnType<typeof EthTransactionCRUD.actions.create>) {
    const syncs = (yield* call(SyncCRUD.db.where, {
        type: "Transaction",
    })) as TransactionSync[];
    const actions: Action[] = []; //triggered actions
    console.debug({ syncs });

    syncs.map((s) => {
        console.debug({ s, payload });
        if (s.networkId === payload.networkId && (s.matchFrom === payload.from || s.matchTo === payload.to)) {
            actions.push(...s.actions.map(actionDecode));
        }
    });

    //TODO: Should we instead use fork() or spawn()?
    //Note these are arbitrary actions
    const tasks = actions.map((a) => put(a));
    yield* all(tasks);
}
