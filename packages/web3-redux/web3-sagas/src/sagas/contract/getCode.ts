import { put, call, select } from "typed-redux-saga";
import { GetCodeAction } from "@owlprotocol/web3-actions";
import { ContractCRUDActions } from "@owlprotocol/web3-actions";
import { ContractDexie } from "@owlprotocol/web3-dexie";
import { NetworkSelectors } from "@owlprotocol/web3-redux-orm";

/** @category Sagas */
export function* getCodeSaga(action: GetCodeAction): Generator<any, { code: string }> {
    const { payload } = action;
    const { networkId, address } = payload;

    const contract = yield* call(ContractDexie.get, { networkId, address });
    if (contract?.code) return { code: contract.code }; //code is static

    const network = yield* select(NetworkSelectors.selectByIdSingle, networkId);
    if (!network) throw new Error(`Network ${networkId} undefined`);

    const web3 = network.web3;
    if (!web3) throw new Error(`Network ${networkId} missing web3`);

    const code: string = yield* call([web3, web3.eth.getCode], address);
    yield* put(ContractCRUDActions.actions.upsert({ networkId, address, code }, action.meta.uuid));

    return { code };
}
