import { all, spawn } from "typed-redux-saga";

import { configSaga } from "./config/index.js";
import { contractSaga } from "./contract/index.js";

//ethmodels
import { ethBlockSaga } from "./ethmodels/ethblock/index.js";
import { ethCallSaga } from "./ethmodels/ethcall/index.js";
import { ethCallAbiSaga } from "./ethmodels/ethcallabi/index.js";
import { ethLogSaga } from "./ethmodels/ethlog/index.js";
import { ethLogAbiSaga } from "./ethmodels/ethlogabi/index.js";
import { ethLogQuerySaga } from "./ethmodels/ethlogquery/index.js";
import { ethLogSubscribeSaga } from "./ethmodels/ethlogsubscribe/index.js";
import { ethSendSaga } from "./ethmodels/ethsend/index.js";
import { ethTransactionSaga } from "./ethmodels/ethtransaction/index.js";

//contractmodels
import { assetRouterInputBasketSaga } from "./contractmodels/assetrouterinputbasket/index.js";
import { assetRouterOuputBasketSaga } from "./contractmodels/assetrouteroutputbasket/index.js";
//import { assetRouterPathSaga } from "./contractmodels/assetrouterpath/index.js";
//import { erc20Saga } from "./contractmodels/erc20/index.js";
import { erc20AllowanceSaga } from "./contractmodels/erc20allowance/index.js";
import { erc20BalanceSaga } from "./contractmodels/erc20balance/index.js";
import { erc165Saga } from "./contractmodels/erc165/index.js";
//import { erc165AbiSaga } from "./contractmodels/erc165abi/index.js";
import { erc721Saga } from "./contractmodels/erc721/index.js";
import { erc1155Saga } from "./contractmodels/erc1155/index.js";
import { erc1155BalanceSaga } from "./contractmodels/erc1155balance/index.js";
//metadata
import { HTTPCacheSaga } from "./httpcache/index.js";
import { IPFSCacheSaga } from "./ipfscache/index.js";
//global
import { networkSaga as networkSaga } from "./network/index.js";

//Abstractions
import { web3ReduxSaga as Web3ReduxSaga } from "./web3Redux/index.js";

//https://typed-redux-saga.js.org/docs/advanced/RootSaga.html
export function* customRootSaga() {
    yield* all([
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
        spawn(erc20AllowanceSaga),
        spawn(erc20BalanceSaga),
        spawn(erc165Saga),
        spawn(erc721Saga),
        spawn(erc1155Saga),
        spawn(erc1155BalanceSaga),
        //metadata
        spawn(configSaga),
        spawn(contractSaga),
        spawn(HTTPCacheSaga),
        spawn(IPFSCacheSaga),
        spawn(networkSaga),
        spawn(Web3ReduxSaga),
    ]);
}
