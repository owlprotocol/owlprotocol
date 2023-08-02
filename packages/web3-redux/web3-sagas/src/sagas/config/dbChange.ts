import { Action } from "redux";
import { all, put, select } from "typed-redux-saga";
import { EthLogSubscribeCRUDActions, ConfigCRUDActions, web3GetPastLogsAction } from "@owlprotocol/web3-actions";
import { NetworkSelectors } from "@owlprotocol/web3-redux-orm";
import { utils } from "ethers";

//Handle contract creation
export function* dbCreatingSaga(action: ReturnType<typeof ConfigCRUDActions.actions.dbCreating>): Generator<any, any> {
    //Handle contract creation
    const { payload } = action;
    const { networkId, account } = payload.obj;
    const actions: Action[] = [];

    if (networkId && account) {
        const network = yield* select(NetworkSelectors.selectByIdSingle, networkId);
        if (network?.web3) {
            actions.push(...startAssetSubscribe(networkId, account).actions);
        }
    }

    if (actions.length > 0) {
        yield* all(actions.map((a) => put(a)));
    }
}

export function* dbUpdatingSaga(action: ReturnType<typeof ConfigCRUDActions.actions.dbUpdating>): Generator<any, any> {
    //Handle contract creation
    const { payload } = action;
    const { obj, mods } = payload;
    const actions: Action[] = [];

    const networkId = mods.networkId ?? obj.networkId;
    const account = mods.account ?? obj.account;

    if (networkId && account && (mods.networkId || mods.account)) {
        if (obj.networkId && obj.account) {
            actions.push(...stopAssetSubscribe(networkId, account).actions);
        }

        const network = yield* select(NetworkSelectors.selectByIdSingle, networkId);
        if (network?.web3) {
            actions.push(...startAssetSubscribe(networkId, account).actions);
        }
    }

    yield* all(actions.map((a) => put(a)));
}

export function* dbDeletingSaga(action: ReturnType<typeof ConfigCRUDActions.actions.dbDeleting>): Generator<any, any> {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { payload } = action;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    //const { networkId, account } = payload.obj;
    /*
    const actions: Action[] = [];

    if (networkId && account) {
        actions.push(...stopAssetSubscribe(networkId, account).actions);
    }
    yield* all(actions.map((a) => put(a)));
    */
}

export function stopAssetSubscribe(
    networkId: string,
    account: string,
): {
    actions: Action[];
} {
    const actions: Action[] = [];
    const addressTopic = utils.defaultAbiCoder.encode(["address"], [account]);

    actions.push(
        EthLogSubscribeCRUDActions.actions.delete({
            networkId,
            address: "*",
            topic0: "*",
            topic1: addressTopic,
            topic2: "*",
            topic3: "*",
        }),
        EthLogSubscribeCRUDActions.actions.delete({
            networkId,
            address: "*",
            topic0: "*",
            topic1: "*",
            topic2: addressTopic,
            topic3: "*",
        }),
        EthLogSubscribeCRUDActions.actions.delete({
            networkId,
            address: "*",
            topic0: "*",
            topic1: "*",
            topic2: "*",
            topic3: addressTopic,
        }),
    );
    return { actions };
}

export function startAssetSubscribe(
    networkId: string,
    account: string,
): {
    actions: Action[];
} {
    const actions: Action[] = [];
    const addressTopic = utils.defaultAbiCoder.encode(["address"], [account]);

    actions.push(
        EthLogSubscribeCRUDActions.actions.create({
            networkId,
            address: null,
            topics: [null, addressTopic, null, null],
            active: true,
        }),
        EthLogSubscribeCRUDActions.actions.create({
            networkId,
            address: null,
            topics: [null, null, addressTopic, null],
            active: true,
        }),
        EthLogSubscribeCRUDActions.actions.create({
            networkId,
            address: null,
            topics: [null, null, null, addressTopic],
            active: true,
        }),
        web3GetPastLogsAction({
            networkId,
            address: null,
            topics: [null, addressTopic, null, null],
        }),
        web3GetPastLogsAction({
            networkId,
            address: null,
            topics: [null, null, addressTopic, null],
        }),
        web3GetPastLogsAction({
            networkId,
            address: null,
            topics: [null, null, null, addressTopic],
        }),
    );
    return { actions };
}
