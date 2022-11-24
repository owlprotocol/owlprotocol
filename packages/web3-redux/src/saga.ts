import { all, spawn } from 'typed-redux-saga';

import { ReduxError } from '@owlprotocol/crud-redux';

import { rootSaga as _4ByteSaga } from './4byte/sagas/index.js';
import { rootSaga as assetPickerSaga } from './assetpicker/sagas/index.js';
import { rootSaga as blockSaga } from './block/sagas/index.js';
import { rootSaga as configSaga } from './config/sagas/index.js';
import { rootSaga as contractSaga } from './contract/sagas/index.js';
import { rootSaga as contractEventSaga } from './contractevent/sagas/index.js';
import { rootSaga as contractEventQuerySaga } from './contracteventquery/sagas/index.js';
import { rootSaga as contractSendSaga } from './contractsend/sagas/index.js';
import { rootSaga as contractInterfaceSaga } from './contractinterface/sagas/index.js';
import { rootSaga as ethCallSaga } from './ethcall/sagas/index.js';
import { HTTPCacheSaga } from './http/sagas/index.js';
import { rootSaga as IPFSCacheSaga } from './ipfs/sagas/index.js';
import { rootSaga as networkSaga } from './network/sagas/index.js';
import { rootSaga as syncSaga } from './sync/sagas/index.js';
import { rootSaga as transactionSaga } from './transaction/sagas/index.js';

//Abstractions
import { rootSaga as nftGenerativeCollectionSaga } from './nftgenerativecollection/sagas/index.js';
import { rootSaga as nftGenerativeItemSaga } from './nftgenerativeitem/sagas/index.js';

import Web3ReduxSaga from './web3Redux/sagas/index.js';

//https://typed-redux-saga.js.org/docs/advanced/RootSaga.html
export function* rootSaga() {
    yield* all([
        spawn(_4ByteSaga),
        spawn(assetPickerSaga),
        spawn(blockSaga),
        spawn(configSaga),
        spawn(contractSaga),
        spawn(contractEventSaga),
        spawn(contractEventQuerySaga),
        spawn(contractSendSaga),
        spawn(contractInterfaceSaga),
        spawn(ReduxError.sagas.rootSaga),
        spawn(ethCallSaga),
        spawn(HTTPCacheSaga),
        spawn(IPFSCacheSaga),
        spawn(networkSaga),
        spawn(syncSaga),
        spawn(transactionSaga),
        spawn(nftGenerativeCollectionSaga),
        spawn(nftGenerativeItemSaga),
        spawn(Web3ReduxSaga),
    ]);
}
