import { ORM } from "redux-orm";
import { NetworkORMModel } from "./orm/network.js";
import { EthLogSubscribeORMModel } from "./orm/ethlogsubscribe.js";
import { ConfigORMModel } from "./orm/config.js";

export function createReduxORM() {
    const orm = new ORM({
        stateSelector: (state: any) => state.web3Redux,
    });
    orm.register(NetworkORMModel);
    orm.register(EthLogSubscribeORMModel);
    orm.register(ConfigORMModel);

    return orm;
}
//Fix undefined import issue
export const orm = createReduxORM();

/** @internal */
export const initializeState = (orm: any) => {
    const state = orm.getEmptyState();
    return state;
};
