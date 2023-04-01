export * from "./contractmodels/index.js";
export * from "./ethmodels/index.js";
export * from "./config.js";
export * from "./contract.js";
export * from "./httpcache.js";
export * from "./ipfscache.js";
export * from "./network.js";

import { all, spawn } from "typed-redux-saga";
import {
    AssetRouterInputBasketCRUDSagas,
    AssetRouterOutputBasketCRUDSagas,
    AssetRouterPathCRUDSagas,
    ERC1155CRUDSagas,
    ERC165AbiCRUDSagas,
    ERC165CRUDSagas,
    ERC20AllowanceCRUDSagas,
    ERC20BalanceCRUDSagas,
    ERC20CRUDSagas,
    ERC721CRUDSagas,
    ERC1155BalanceCRUDSagas,
} from "./contractmodels/index.js";
import {
    EthBlockCRUDSagas,
    EthCallAbiCRUDSagas,
    EthCallCRUDSagas,
    EthLogAbiCRUDSagas,
    EthLogCRUDSagas,
    EthLogQueryCRUDSagas,
    EthLogSubscribeCRUDSagas,
    EthSendCRUDSagas,
    EthTransactionCRUDSagas,
} from "./ethmodels/index.js";
import { HTTPCacheCRUDSagas } from "./httpcache.js";
import { IPFSCacheCRUDSagas } from "./ipfscache.js";
import { ConfigCRUDSagas } from "./config.js";
import { NetworkCRUDSagas } from "./network.js";
import { ContractCRUDSagas } from "./contract.js";

export function* crudRootSaga() {
    yield all([
        //contractmodels
        spawn(AssetRouterInputBasketCRUDSagas.crudRootSaga),
        spawn(AssetRouterOutputBasketCRUDSagas.crudRootSaga),
        spawn(AssetRouterPathCRUDSagas.crudRootSaga),
        spawn(ERC20CRUDSagas.crudRootSaga),
        spawn(ERC20AllowanceCRUDSagas.crudRootSaga),
        spawn(ERC20BalanceCRUDSagas.crudRootSaga),
        spawn(ERC165CRUDSagas.crudRootSaga),
        spawn(ERC165AbiCRUDSagas.crudRootSaga),
        spawn(ERC721CRUDSagas.crudRootSaga),
        spawn(ERC1155CRUDSagas.crudRootSaga),
        spawn(ERC1155BalanceCRUDSagas.crudRootSaga),
        //ethmodels
        spawn(EthBlockCRUDSagas.crudRootSaga),
        spawn(EthCallCRUDSagas.crudRootSaga),
        spawn(EthCallAbiCRUDSagas.crudRootSaga),
        spawn(EthLogCRUDSagas.crudRootSaga),
        spawn(EthLogAbiCRUDSagas.crudRootSaga),
        spawn(EthLogQueryCRUDSagas.crudRootSaga),
        spawn(EthLogSubscribeCRUDSagas.crudRootSaga),
        spawn(EthSendCRUDSagas.crudRootSaga),
        spawn(EthTransactionCRUDSagas.crudRootSaga),
        //metadata
        spawn(HTTPCacheCRUDSagas.crudRootSaga),
        spawn(IPFSCacheCRUDSagas.crudRootSaga),
        //global
        spawn(ConfigCRUDSagas.crudRootSaga),
        spawn(NetworkCRUDSagas.crudRootSaga),
        spawn(ContractCRUDSagas.crudRootSaga),
    ]);
}
