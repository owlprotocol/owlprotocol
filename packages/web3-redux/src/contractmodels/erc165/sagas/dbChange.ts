import { interfaceIdNames } from "@owlprotocol/contracts";
import { Action } from "redux";
import { all, put, call } from "typed-redux-saga";
import { ConfigCRUD } from "../../../config/crud.js";
import { fetchContractActions } from "../../actions/index.js";
import { ERC165CRUD } from "../crud.js";
import { ERC165 } from "../model/interface.js";

//Handle contract creation
export function* dbCreatingSaga(action: ReturnType<typeof ERC165CRUD.actions.dbCreating>): Generator<any, any> {
    const { payload } = action;
    const config = yield* call(ConfigCRUD.db.get, "0");
    const account = config?.account;

    yield* call(handleERC165Change, [payload.obj], account);
}

export function* dbUpdatingSaga(action: ReturnType<typeof ERC165CRUD.actions.dbUpdating>): Generator<any, any> {
    const { payload } = action;
    const config = yield* call(ConfigCRUD.db.get, "0");
    const account = config?.account;

    yield* call(handleERC165Change, [payload.obj], account);
}

//Handle contract creation
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function* dbDeletingSaga(action: ReturnType<typeof ERC165CRUD.actions.dbDeleting>): Generator<any, any> { }

export function* handleERC165Change(items: ERC165[], account: string | undefined) {
    const actions: Action[] = [];
    items.forEach((c) => {
        const ifaceName = interfaceIdNames[c.interfaceId];
        const result = fetchContractActions(c.networkId, c.address, account, ifaceName);
        actions.push(...result);
    });

    yield* all(actions.map((a) => put(a)));
}
