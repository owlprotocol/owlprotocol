import { put, call, select } from "typed-redux-saga";
import { FetchTransactionAction } from "@owlprotocol/web3-actions";

import { EthTransactionCRUDActions } from "@owlprotocol/web3-actions";
import { EthTransaction } from "@owlprotocol/web3-models";
import { EthTransactionDexie } from "@owlprotocol/web3-dexie";
import { NetworkSelectors } from "@owlprotocol/web3-redux-orm";

export function* fetchSaga(action: FetchTransactionAction): Generator<any, EthTransaction> {
    const { payload } = action;
    const { networkId, hash } = payload;

    const network = yield* select(NetworkSelectors.selectByIdSingle, networkId);
    if (!network) throw new Error(`Network ${networkId} undefined`);

    const web3 = network.web3;
    if (!web3) throw new Error(`Network ${networkId} missing web3`);

    const dbSelected = yield* call(EthTransactionDexie.get, {
        networkId,
        hash,
    });
    if (dbSelected) return dbSelected;

    const transaction = yield* call(web3.eth.getTransaction, hash);
    const newTransaction = { ...transaction, networkId } as EthTransaction;
    yield* put(EthTransactionCRUDActions.actions.put(newTransaction));
    return newTransaction;
}
