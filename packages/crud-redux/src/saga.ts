import { all, spawn } from 'typed-redux-saga';

import { rootSaga as ReduxErrorSaga } from './error/sagas/index.js';

//https://typed-redux-saga.js.org/docs/advanced/RootSaga.html
export function* rootSaga() {
    yield* all([
        spawn(ReduxErrorSaga)
    ]);
}
