import { ORM } from "redux-orm";
import { NetworkORMModel } from "./network/model/orm.js";
import { EthLogSubscribeORMModel } from "./ethmodels/ethlogsubscribe/model/orm.js";
import { ConfigORMModel } from "./config/model/orm.js";

//Fix undefined import issue
let orm: any;
/** @internal */
export function getOrm(): any {
    if (orm) return orm;

    orm = new ORM({
        stateSelector: (state: any) => state.web3Redux,
    });
    orm.register(NetworkORMModel);
    orm.register(EthLogSubscribeORMModel);
    orm.register(ConfigORMModel);

    return orm;
}

/** @internal */
export const initializeState = (orm: any) => {
    const state = orm.getEmptyState();
    return state;
};
