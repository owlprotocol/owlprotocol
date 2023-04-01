import { all, spawn } from "typed-redux-saga";

import { getReduxErrorCRUD } from "@owlprotocol/crud-redux";

import { assetPickerSaga } from "./assetpicker/sagas/index.js";
import { configSaga } from "./config/sagas/index.js";
import { contractSaga } from "./contract/sagas/index.js";
import { contractInterfaceSaga } from "./contractmodels/erc165abi/sagas/index.js";

import { ethBlockSaga } from "./ethmodels/ethblock/sagas/index.js";
import { ethCallSaga } from "./ethmodels/ethcall/sagas/index.js";
import { ethCallAbiSaga } from "./ethmodels/ethcallabi/sagas/index.js";
import { ethLogSaga } from "./ethmodels/ethlog/sagas/index.js";
import { ethLogAbiSaga } from "./ethmodels/ethlogabi/sagas/index.js";
import { ethLogQuerySaga } from "./ethmodels/ethlogquery/sagas/index.js";
import { ethLogSubscribeSaga } from "./ethmodels/ethlogsubscribe/sagas/index.js";
import { ethSendSaga } from "./ethmodels/ethsend/sagas/index.js";
import { ethTransactionSaga } from "./ethmodels/ethtransaction/sagas/index.js";

import { assetRouterInputBasketSaga } from "./contractmodels/assetrouterinputbasket/sagas/index.js";
import { assetRouterOuputBasketSaga } from "./contractmodels/assetrouteroutputbasket/sagas/index.js";
import { assetRouterPathSaga } from "./contractmodels/assetrouterpath/sagas/index.js";
import { erc20Saga } from "./contractmodels/erc20/sagas/index.js";
import { erc20AllowanceSaga } from "./contractmodels/erc20allowance/sagas/index.js";
import { erc20BalanceSaga } from "./contractmodels/erc20balance/sagas/index.js";
import { erc165Saga } from "./contractmodels/erc165/sagas/index.js";
import { erc721Saga } from "./contractmodels/erc721/sagas/index.js";
import { erc1155Saga } from "./contractmodels/erc1155/sagas/index.js";
import { erc1155BalanceSaga } from "./contractmodels/erc1155balance/sagas/index.js";

import { HTTPCacheSaga } from "./http/sagas/index.js";
import { ipfsCacheSaga as IPFSCacheSaga } from "./ipfs/sagas/index.js";
import { networkSaga as networkSaga } from "./network/sagas/index.js";
import { syncSaga as syncSaga } from "./sync/sagas/index.js";

//Abstractions
import { web3ReduxSaga as Web3ReduxSaga } from "./web3Redux/sagas/index.js";
import { getDB } from "./db.js";

//https://typed-redux-saga.js.org/docs/advanced/RootSaga.html
export function* rootSaga() {
    yield* all([
        //crud-redux
        spawn(getReduxErrorCRUD(getDB).sagas.crudRootSaga),
        //ethmodels
        spawn(ethBlockSaga),
        spawn(ethCallSaga),
        spawn(ethCallAbiSaga),
        spawn(ethLogSaga),
        spawn(ethLogAbiSaga),
        spawn(ethLogQuerySaga),
        spawn(ethLogSubscribeSaga),
        spawn(ethSendSaga),
        spawn(ethTransactionSaga),
        //contractmodels
        spawn(assetRouterInputBasketSaga),
        spawn(assetRouterOuputBasketSaga),
        spawn(assetRouterPathSaga),
        spawn(erc20Saga),
        spawn(erc20AllowanceSaga),
        spawn(erc20BalanceSaga),
        spawn(erc165Saga),
        spawn(erc721Saga),
        spawn(erc1155Saga),
        spawn(erc1155BalanceSaga),
        //metadata
        spawn(assetPickerSaga),
        spawn(configSaga),
        spawn(contractSaga),
        spawn(contractInterfaceSaga),
        spawn(HTTPCacheSaga),
        spawn(IPFSCacheSaga),
        spawn(networkSaga),
        spawn(syncSaga),
        spawn(Web3ReduxSaga),
    ]);
}
