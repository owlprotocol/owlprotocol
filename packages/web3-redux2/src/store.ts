import { createStore as createReduxStore, applyMiddleware, compose } from "redux";
import createSagaMiddleware from "redux-saga";
import { isClient } from "@owlprotocol/utils";

import { rootReducer } from "@owlprotocol/web3-redux-orm";
import { web3RootSaga } from "@owlprotocol/web3-sagas";
import { crashReporter } from "@owlprotocol/crud-redux-2";
const defaultMiddleware: any[] = [crashReporter];

/** @internal */
interface CreateStoreOptions {
    middleware?: any[];
    rootSaga?: any;
}
/** @internal */
export const createStore = (options?: CreateStoreOptions) => {
    const { middleware, rootSaga } = options ?? {};

    //Enable redux-devtools support, tracing
    const reduxDevToolsExists = isClient() && (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
    const composeEnhancers = reduxDevToolsExists
        ? (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
            trace: true,
            traceLimit: 10,
            actionsBlacklist: [],
        })
        : compose;
    const sagaMiddleware = createSagaMiddleware();
    const rootMiddleware = applyMiddleware(...(middleware ?? defaultMiddleware), sagaMiddleware);

    const store = createReduxStore(rootReducer, composeEnhancers(rootMiddleware));
    sagaMiddleware.run(rootSaga ?? web3RootSaga);

    //Broadcast channel dispatch
    /*
    channel.onmessage = (e) => {
        log.debug(e);
        store.dispatch(e);
    };
    */

    return store;
};

export type StoreType = ReturnType<typeof createStore>;
export type DispatchType = StoreType["dispatch"];
export const store = createStore();
