import { put, call, select } from "typed-redux-saga";

import { NetworkCRUD } from "../../../network/crud.js";
import { FetchAction } from "../actions/fetch.js";

import { EthTransactionCRUD } from "../crud.js";
import { EthTransaction } from "../model/interface.js";

export function* fetchSaga(action: FetchAction): Generator<any, EthTransaction> {
    const { payload } = action;
    const { networkId, hash } = payload;

    const network = yield* select(NetworkCRUD.selectors.selectByIdSingle, networkId);
    if (!network) throw new Error(`Network ${networkId} undefined`);

    const web3 = network.web3;
    if (!web3) throw new Error(`Network ${networkId} missing web3`);

    const dbSelected = yield* call(EthTransactionCRUD.db.get, {
        networkId,
        hash,
    });
    if (dbSelected) return dbSelected;

    const transaction = yield* call(web3.eth.getTransaction, hash);
    const newTransaction = { ...transaction, networkId } as EthTransaction;
    yield* put(EthTransactionCRUD.actions.put(newTransaction));
    return newTransaction;
}
