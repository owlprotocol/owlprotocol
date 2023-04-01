// db.ts
import Dexie, { Table } from "dexie";
import { isClient } from "@owlprotocol/utils";
import { interfaces } from "@owlprotocol/contracts";
import { utils } from "ethers";
import { flatten } from "lodash-es";
import { ReduxError, ReduxErrorIndex, ReduxErrorName } from "@owlprotocol/crud-redux";
import { REDUX_ROOT } from "./common.js";
//Configs
import { Config, ConfigIndex } from "./config/model/interface.js";
import { Network, NetworkIndex } from "./network/model/interface.js";
//Web3 Data
import { EthBlockTransaction, EthBlockIndex } from "./ethmodels/ethblock/model/index.js";
import { EthCall, EthCallIndex } from "./ethmodels/ethcall/model/interface.js";
import { EthCallAbi, EthCallAbiIndex } from "./ethmodels/ethcallabi/model/interface.js";
import { EthLog, EthLogIndex } from "./ethmodels/ethlog/model/interface.js";
import { EthLogAbi, EthLogAbiIndex } from "./ethmodels/ethlogabi/model/interface.js";
import { EthLogQuery, EthLogQueryIndex } from "./ethmodels/ethlogquery/model/interface.js";
import { EthLogSubscribe, EthLogSubscribeIndex } from "./ethmodels/ethlogsubscribe/model/interface.js";
import { EthSend, EthSendIndex } from "./ethmodels/ethsend/model/interface.js";
import { EthTransaction, EthTransactionIndex } from "./ethmodels/ethtransaction/model/interface.js";
//Contract
import { Contract, ContractIndex } from "./contract/model/interface.js";
//Contract Abstractions
import { ERC20, ERC20Index } from "./contractmodels/erc20/model/interface.js";
import { ERC20Allowance, ERC20AllowanceIndex } from "./contractmodels/erc20allowance/model/interface.js";
import { ERC20Balance, ERC20BalanceIndex } from "./contractmodels/erc20balance/model/interface.js";

import { ERC165, ERC165Index } from "./contractmodels/erc165/model/interface.js";
import { ERC165Abi, ERC165AbiIndex } from "./contractmodels/erc165abi/model/interface.js";
import { ERC721, ERC721Index } from "./contractmodels/erc721/model/interface.js";
import { ERC1155, ERC1155Index } from "./contractmodels/erc1155/model/interface.js";
import { ERC1155Balance, ERC1155BalanceIndex } from "./contractmodels/erc1155balance/model/interface.js";
import {
    AssetRouterInputBasket,
    AssetRouterInputBasketIndex,
} from "./contractmodels/assetrouterinputbasket/model/interface.js";
import {
    AssetRouterOutputBasket,
    AssetRouterOutputBasketIndex,
} from "./contractmodels/assetrouteroutputbasket/model/interface.js";
import { AssetRouterPath, AssetRouterPathIndex } from "./contractmodels/assetrouterpath/model/interface.js";
import { AssetPicker, AssetPickerIndex } from "./assetpicker/model/interface.js";
//Metadata
import { HTTPCache, HTTPCacheIndex } from "./http/model/interface.js";
import { Ipfs, IpfsIndex } from "./ipfs/model/interface.js";

import { Sync, SyncIndex } from "./sync/model/index.js";

import { AssetPickerName } from "./assetpicker/common.js";
import { ConfigName } from "./config/common.js";
import { ContractName } from "./contract/common.js";

import { EthBlock } from "./ethmodels/ethblock/common.js";
import { EthLogName } from "./ethmodels/ethlog/common.js";
import { EthLogQueryName } from "./ethmodels/ethlogquery/common.js";
import { EthLogSubscribeName } from "./ethmodels/ethlogsubscribe/common.js";
import { EthCallName } from "./ethmodels/ethcall/common.js";
import { EthCallAbiName } from "./ethmodels/ethcallabi/common.js";
import { EthLogAbiName } from "./ethmodels/ethlogabi/common.js";
import { EthSendName } from "./ethmodels/ethsend/common.js";
import { EthTransactionName } from "./ethmodels/ethtransaction/common.js";

import { ERC20Name } from "./contractmodels/erc20/common.js";
import { ERC20BalanceName } from "./contractmodels/erc20balance/common.js";
import { ERC20AllowanceName } from "./contractmodels/erc20allowance/common.js";
import { ERC165Name } from "./contractmodels/erc165/common.js";
import { ERC165AbiName } from "./contractmodels/erc165abi/common.js";
import { ERC721Name } from "./contractmodels/erc721/common.js";
import { ERC1155Name } from "./contractmodels/erc1155/common.js";
import { ERC1155BalanceName } from "./contractmodels/erc1155balance/common.js";
import { AssetRouterInputBasketName } from "./contractmodels/assetrouterinputbasket/common.js";
import { AssetRouterOutputBasketName } from "./contractmodels/assetrouteroutputbasket/common.js";
import { AssetRouterPathName } from "./contractmodels/assetrouterpath/common.js";

import { HTTPCacheName } from "./http/common.js";
import { IPFSCacheName } from "./ipfs/common.js";
import { NetworkName } from "./network/common.js";
import { SyncName } from "./sync/common.js";
import { getERC165AbiCRUD } from "./contractmodels/erc165abi/crudGet.js";
import { getEthCallAbiCRUD } from "./ethmodels/ethcallabi/crudGet.js";
import { getEthLogAbiCRUD } from "./ethmodels/ethlogabi/crudGet.js";

export class Web3ReduxDexie extends Dexie {
    [ReduxErrorName]!: Table<ReduxError>;
    [AssetPickerName]!: Table<AssetPicker>;
    [ConfigName]!: Table<Config>;
    [ContractName]!: Table<Contract>;
    //Eth models
    [EthBlock]!: Table<EthBlockTransaction>;
    [EthCallName]!: Table<EthCall>;
    [EthCallAbiName]!: Table<EthCallAbi>;
    [EthLogName]!: Table<EthLog>;
    [EthLogAbiName]!: Table<EthLogAbi>;
    [EthLogQueryName]!: Table<EthLogQuery>;
    [EthLogSubscribeName]!: Table<EthLogSubscribe>;
    [EthSendName]!: Table<EthSend>;
    [EthTransactionName]!: Table<EthTransaction>;
    //Abstractions
    [ERC20Name]!: Table<ERC20>;
    [ERC20AllowanceName]!: Table<ERC20Allowance>;
    [ERC20BalanceName]!: Table<ERC20Balance>;
    [ERC165Name]!: Table<ERC165>;
    [ERC165AbiName]!: Table<ERC165Abi>;
    [ERC721Name]!: Table<ERC721>;
    [ERC1155Name]!: Table<ERC1155>;
    [ERC1155BalanceName]!: Table<ERC1155Balance>;
    [AssetRouterInputBasketName]!: Table<AssetRouterInputBasket>;
    [AssetRouterOutputBasketName]!: Table<AssetRouterOutputBasket>;
    [AssetRouterPathName]!: Table<AssetRouterPath>;
    [HTTPCacheName]!: Table<HTTPCache>;
    [IPFSCacheName]!: Table<Ipfs>;
    [NetworkName]!: Table<Network>;
    [SyncName]!: Table<Sync>;

    constructor() {
        super(REDUX_ROOT);
        this.version(1).stores({
            [ReduxErrorName]: ReduxErrorIndex,
            [AssetPickerName]: AssetPickerIndex,
            [ConfigName]: ConfigIndex,
            [ContractName]: ContractIndex,
            //ethmodels
            [EthBlock]: EthBlockIndex,
            [EthCallName]: EthCallIndex,
            [EthCallAbiName]: EthCallAbiIndex,
            [EthLogName]: EthLogIndex,
            [EthLogQueryName]: EthLogQueryIndex,
            [EthLogSubscribeName]: EthLogSubscribeIndex,
            [EthLogAbiName]: EthLogAbiIndex,
            [EthSendName]: EthSendIndex,
            [EthTransactionName]: EthTransactionIndex,
            //contractmodels
            [ERC20Name]: ERC20Index,
            [ERC20AllowanceName]: ERC20AllowanceIndex,
            [ERC20BalanceName]: ERC20BalanceIndex,
            [ERC165Name]: ERC165Index,
            [ERC165AbiName]: ERC165AbiIndex,
            [ERC721Name]: ERC721Index,
            [ERC1155Name]: ERC1155Index,
            [ERC1155BalanceName]: ERC1155BalanceIndex,
            [AssetRouterInputBasketName]: AssetRouterInputBasketIndex,
            [AssetRouterOutputBasketName]: AssetRouterOutputBasketIndex,
            [AssetRouterPathName]: AssetRouterPathIndex,
            [HTTPCacheName]: HTTPCacheIndex,
            [IPFSCacheName]: IpfsIndex,
            [NetworkName]: NetworkIndex,
            [SyncName]: SyncIndex,
        });
    }

    async clear() {
        const promises = [
            this[ReduxErrorName].clear(),
            this[AssetPickerName].clear(),
            this[ConfigName].clear(),
            this[ContractName].clear(),
            this[ERC165AbiName].clear(),
            //ethmodels
            this[EthBlock].clear(),
            this[EthCallName].clear(),
            this[EthCallAbiName].clear(),
            this[EthLogName].clear(),
            this[EthLogAbiName].clear(),
            this[EthLogQueryName].clear(),
            this[EthLogSubscribeName].clear(),
            this[EthSendName].clear(),
            this[EthTransactionName].clear(),
            //contractmodels
            this[ERC20Name].clear(),
            this[ERC20AllowanceName].clear(),
            this[ERC20BalanceName].clear(),
            this[ERC165Name].clear(),
            this[ERC721Name].clear(),
            this[ERC1155Name].clear(),
            this[ERC1155BalanceName].clear(),
            this[AssetRouterInputBasketName].clear(),
            this[AssetRouterOutputBasketName].clear(),
            this[AssetRouterPathName].clear(),
            this[HTTPCacheName].clear(),
            this[IPFSCacheName].clear(),
            this[NetworkName].clear(),
            this[SyncName].clear(),
        ];
        return Promise.all(promises);
    }
}

let db: Web3ReduxDexie;
interface GetDBOptions {
    fake: boolean;
}

export function setDB(newDb: Web3ReduxDexie) {
    db = newDb;
}

export function getDB(options?: GetDBOptions) {
    if (db) return db;

    db = createDB(options);
    db.on("ready", async () => {
        //Insert default interfaces
        console.debug(`${REDUX_ROOT} Database ready`);
        await initData(db);
        console.debug(`${REDUX_ROOT} Init Data inserted`);
    });
    db.on("close", () => {
        console.debug(`${REDUX_ROOT} Database closed`);
    });
    return db;
}

export function initData(db: Web3ReduxDexie) {
    const erc165abis: ERC165Abi[] = Object.entries(interfaces).map(([k, v]) => {
        return {
            interfaceId: v.interfaceId,
            name: k,
            abi: JSON.parse(v.interface.format(utils.FormatTypes.json) as string),
        };
    });

    const ethlogabis: EthLogAbi[] = flatten(
        Object.entries(interfaces).map(([, v]) => {
            return Object.values(v.interface.events).map((e) => {
                return {
                    eventFormatFull: e.format(utils.FormatTypes.full),
                    eventSighash: v.interface.getEventTopic(e),
                };
            });
        }),
    );

    const ethcallabis: EthCallAbi[] = flatten(
        Object.entries(interfaces).map(([, v]) => {
            return Object.values(v.interface.functions).map((e) => {
                return {
                    methodFormatFull: e.format(utils.FormatTypes.full),
                    methodSighash: v.interface.getSighash(e),
                };
            });
        }),
    );

    return Promise.all([
        getERC165AbiCRUD(db).db.bulkAdd(erc165abis),
        getEthLogAbiCRUD(db).db.bulkAdd(ethlogabis),
        getEthCallAbiCRUD(db).db.bulkAdd(ethcallabis),
    ]);
}

export function createDB(options?: GetDBOptions) {
    if (!isClient() || options?.fake) {
        console.debug("Creating Dexie with fake-indexeddb");
    } else {
        console.debug("Creating Dexie with real indexeddb");
    }
    return new Web3ReduxDexie();
}
