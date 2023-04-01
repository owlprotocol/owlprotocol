import { call } from "typed-redux-saga";

import type { Web3ContractMethodCall, Web3ContractMethodParams } from "@owlprotocol/contracts/lib/types/web3/types.js";
import { BaseContract } from "@owlprotocol/contracts/lib/types/typechain/web3/types.js";
import { utils } from "ethers";
import { omit } from "lodash-es";
import { ContractCallAction } from "../actions/index.js";
import { ContractCRUD } from "../crud.js";
import { EthCall } from "../../ethmodels/ethcall/model/interface.js";
import { web3CallSaga } from "../../ethmodels/ethcall/sagas/web3Call.js";
import { web3CallAction } from "../../ethmodels/ethcall/actions/web3Call.js";

export function* contractCallSaga<T extends BaseContract, K extends keyof T["methods"]>(
    action: ContractCallAction<Web3ContractMethodParams<T, K>>,
): Generator<any, EthCall> {
    const { payload, meta } = action;
    const { networkId, to, method } = payload;

    const contract = yield* call(ContractCRUD.db.get, { networkId, address: to });
    if (!contract) throw new Error(`Contract ${networkId} ${to} undefined`);

    const abi = contract.abi;
    if (!abi) throw new Error(`Contract ${networkId} ${to} missing abi`);

    const iface = new utils.Interface(abi as any);
    const methodFragment = iface.getFunction(method);
    const methodFormatFull = methodFragment.format(utils.FormatTypes.full);
    const ethcall = yield* call(
        web3CallSaga<Web3ContractMethodParams<T, K>, Web3ContractMethodCall<T, K>>,
        web3CallAction(omit({ ...payload, methodFormatFull }, "method"), meta.uuid, meta.ts),
    );
    return ethcall;
}

export function contractCallSagaFactory<T extends BaseContract, K extends keyof T["methods"]>(method: K) {
    return (action: ContractCallAction<Web3ContractMethodParams<T, K>>) => {
        const payload = { ...action.payload, method } as ContractCallAction<Web3ContractMethodParams<T, K>>["payload"];
        return contractCallSaga<T, K>({ type: action.type, payload, meta: { ...action.meta } });
    };
}
