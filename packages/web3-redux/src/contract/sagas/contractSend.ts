import { call } from "typed-redux-saga";

import type { Web3ContractMethodParams } from "@owlprotocol/contracts/lib/types/web3/types.js";
import { BaseContract } from "@owlprotocol/contracts/lib/types/typechain/web3/types.js";
import { utils } from "ethers";
import { omit } from "lodash-es";
import { ContractCallAction } from "../actions/index.js";
import { ContractCRUD } from "../crud.js";
import { web3SendSaga } from "../../ethmodels/ethsend/sagas/web3Send.js";
import { web3SendAction } from "../../ethmodels/ethsend/actions/web3Send.js";

export function* contractSendSaga<T extends BaseContract, K extends keyof T["methods"]>(
    action: ContractCallAction<Web3ContractMethodParams<T, K>>,
): Generator<any, any> {
    const { payload, meta } = action;
    const { networkId, to, method } = payload;

    const contract = yield* call(ContractCRUD.db.get, {
        networkId,
        address: to,
    });
    if (!contract) throw new Error(`Contract ${networkId} ${to} undefined`);

    const abi = contract.abi;
    if (!abi) throw new Error(`Contract ${networkId} ${to} missing abi`);

    const iface = new utils.Interface(abi as any);
    const methodFragment = iface.getFunction(method);
    const methodFormatFull = methodFragment.format(utils.FormatTypes.full);
    const ethsend = yield* call(
        web3SendSaga<Web3ContractMethodParams<T, K>>,
        web3SendAction(omit({ ...payload, methodFormatFull }, "method"), meta.uuid, meta.ts),
    );
    return ethsend;
}
