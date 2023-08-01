import { interfaceIdNames } from "@owlprotocol/contracts";
import { Action } from "redux";
import { all, put, call } from "typed-redux-saga";
import { fetchContractActions, ERC165CRUDActions } from "@owlprotocol/web3-actions";
import { ERC165 } from "@owlprotocol/web3-models";
import { ConfigDexie } from "@owlprotocol/web3-dexie";

//Handle contract creation
export function* dbCreatingSaga(action: ReturnType<typeof ERC165CRUDActions.actions.dbCreating>): Generator<any, any> {
    const { payload } = action;
    const { obj } = payload;
    const config = yield* call(ConfigDexie.get, { id: "0" });
    const account = config?.account;

    yield* call(handleERC165Change, [obj], account);
}

export function* dbUpdatingSaga(action: ReturnType<typeof ERC165CRUDActions.actions.dbUpdating>): Generator<any, any> {
    const { payload } = action;
    const { obj, mods } = payload;
    const config = yield* call(ConfigDexie.get, { id: "0" });
    const account = config?.account;

    yield* call(handleERC165Change, [{ ...obj, ...mods }], account);
}

//Handle contract creation
// eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-empty-function
export function* dbDeletingSaga(action: ReturnType<typeof ERC165CRUDActions.actions.dbDeleting>): Generator<any, any> {}

export function* handleERC165Change(items: ERC165[], account: string | null | undefined) {
    const actions: Action[] = [];
    items.forEach((c) => {
        const ifaceName = interfaceIdNames[c.interfaceId];
        const result = fetchContractActions(c.networkId, c.address, account, ifaceName);
        actions.push(...result);
    });

    yield* all(actions.map((a) => put(a)));
}
