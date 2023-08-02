import { select, put, call } from "typed-redux-saga";
import { AxiosResponse } from "axios";
import type { AbiItem } from "web3-utils";
import { FetchAbiAction } from "@owlprotocol/web3-actions";
import { ContractCRUDActions } from "@owlprotocol/web3-actions";
import { NetworkSelectors } from "@owlprotocol/web3-redux-orm";

/** @category Sagas */
export function* fetchAbi(action: FetchAbiAction) {
    const { payload } = action;
    const { networkId, address } = payload;

    const network = yield* select(NetworkSelectors.selectByIdSingle, networkId);
    if (!network) throw new Error(`Network ${networkId} undefined`);

    const apiClient = network?.explorerApiClient;
    if (!apiClient) throw new Error(`Network ${networkId} missing apiClient`);

    const options = {
        params: {
            module: "contract",
            action: "getabi",
            address,
        },
    };

    const response = (yield* call(apiClient.get as any, "/", options)) as AxiosResponse;
    const abi = JSON.parse(response.data?.result) as AbiItem[];

    yield* put(ContractCRUDActions.actions.update({ networkId, address, abi }));
}
