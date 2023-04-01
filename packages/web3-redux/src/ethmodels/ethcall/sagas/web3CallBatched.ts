import { put, all, select } from "typed-redux-saga";
import { zip } from "lodash-es";
import { utils } from "ethers";
import { Utils, IMulticall2Interface } from "@owlprotocol/contracts";

import { EthCallCRUD } from "../crud.js";
import { NetworkCRUD } from "../../../network/crud.js";
import { EthCall, EthCallStatus, validateEthCall } from "../model/interface.js";
import type { Web3CallBatchedAction } from "../actions/web3CallBatched.js";
import { Web3CallActionInput } from "../actions/web3Call.js";

export function* web3CallBatchedSaga(action: Web3CallBatchedAction): Generator<any, EthCall[]> {
    const { payload } = action;
    const { networkId, multicall, calls } = payload;
    if (multicall) {
        //Batch with multicall
        const to = Utils.IMulticall2.multicall2Address;
        const callData = IMulticall2Interface.encodeFunctionData(
            //@ts-expect-error
            "aggregate",
            calls.map((c) => {
                return { target: c.to, callData: c.data };
            }),
        );
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const ethCall: Web3CallActionInput = {
            networkId,
            to,
            data: callData,
            //@ts-ignore
            methodFormatFull: IMulticall2Interface.functions["aggregate(tuple[])"].format(utils.FormatTypes.full),
        };

        //TODO: Implement later
        return [];
    } else {
        //Batch web3.js calls
        const network = yield* select(NetworkCRUD.selectors.selectByIdSingle, networkId);
        if (!network) throw new Error(`Network ${networkId} undefined`);
        const web3 = network?.web3;
        if (!web3) throw new Error(`Network ${networkId} missing web3`);

        //TODO: Implement caching

        //Regular Web3.js batching
        const batchGas = new web3.eth.BatchRequest();
        //Estimate gas
        const callsGas = calls.filter((c) => !!c.gas);
        const callsNoGas = calls.filter((c) => !c.gas);
        const callsNoGasPromises: Promise<number>[] = callsNoGas.map((c) => {
            return new Promise((resolve) => {
                //@ts-expect-error
                batchGas.add(web3.eth.estimateGas.request(c), resolve);
            });
        });
        batchGas.execute();
        const callsNoGasValues = (yield* all(callsNoGasPromises)) as number[];
        const callsNoGasWithGas = zip(callsNoGas, callsNoGasValues).map(([c, g]) => {
            return { ...c!, gas: g! };
        });

        const callsAll = [...callsGas, ...callsNoGasWithGas];
        const batchCall = new web3.eth.BatchRequest();
        const callPromises: Promise<string>[] = callsAll.map((c) => {
            return new Promise((resolve) => {
                //@ts-expect-error
                batchGas.add(web3.eth.call.request(c, c.defaultBlock), resolve);
            });
        });
        batchCall.execute();
        const callValues = (yield* all(callPromises)) as string[];
        const callsAllWithData: EthCall[] = zip(callsAll, callValues).map(([c, v]) => {
            return validateEthCall({
                ...c!,
                networkId,
                returnData: v!,
                status: EthCallStatus.SUCCESS,
            });
        });

        yield* put(EthCallCRUD.actions.upsertBatched(callsAllWithData, action.meta.uuid));

        return callsAllWithData;
    }
}
