import { Web3Dexie } from "@owlprotocol/web3-dexie";
import { call } from "typed-redux-saga";

export function* clearSaga(): Generator<any, any, any> {
    yield* call([Web3Dexie, Web3Dexie.clear]);
}
