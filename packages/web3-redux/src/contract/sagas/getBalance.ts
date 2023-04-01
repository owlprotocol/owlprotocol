import { put, call, select } from "typed-redux-saga";
import { GetBalanceAction } from "../actions/getBalance.js";
import { ContractCRUD } from "../crud.js";
import { NetworkCRUD } from "../../network/crud.js";

/** @category Sagas */
export function* getBalance(action: GetBalanceAction) {
    const { payload } = action;
    const { networkId, address } = payload;

    const network = yield* select(NetworkCRUD.selectors.selectByIdSingle, networkId);
    if (!network) throw new Error(`Network ${networkId} undefined`);

    const web3 = network.web3;
    if (!web3) throw new Error(`Network ${networkId} missing web3`);

    const balance: string = yield* call(web3.eth.getBalance, address);
    yield* put(ContractCRUD.actions.upsert({ networkId, address, balance }, action.meta.uuid));
}
