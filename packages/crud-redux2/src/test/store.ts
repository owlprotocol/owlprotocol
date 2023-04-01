import { createStore as createReduxStore, applyMiddleware, compose } from "redux";
import createSagaMiddleware from "redux-saga";
import { isClient } from "@owlprotocol/utils";

import { testRootReducer } from "@owlprotocol/crud-redux-orm/test";
import { childCRUDSaga } from "@owlprotocol/crud-sagas/test";
import { crashReporter } from "../middleware/index.js";
const defaultMiddleware: any[] = [crashReporter];

/** @internal */
interface CreateStoreOptions {
    middleware?: any[];
    rootSaga?: any;
}
/** @internal */
export const createTestStore = (options?: CreateStoreOptions) => {
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
    //@ts-ignore
    const sagaMiddleware = createSagaMiddleware();
    const rootMiddleware = applyMiddleware(...(middleware ?? defaultMiddleware), sagaMiddleware);

    const store = createReduxStore(testRootReducer, composeEnhancers(rootMiddleware));
    sagaMiddleware.run(rootSaga ?? childCRUDSaga);

    return store;
};

export type TestStoreType = ReturnType<typeof createTestStore>;
export type TestDispatchType = TestStoreType["dispatch"];
export const testStore = createTestStore();
