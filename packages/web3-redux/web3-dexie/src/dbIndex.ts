import { Ethers, interfaces, Utils } from "@owlprotocol/contracts";
import { CRUDDexie, createCRUDDexie, indexedDBShimMemory, indexedDBShimSQLite } from "@owlprotocol/crud-dexie";
import { isClient } from "@owlprotocol/utils";
import {
    ConfigName,
    EthBlockName,
    EthCallName,
    EthCallAbiName,
    EthLogQueryName,
    EthLogSubscribeName,
    EthSendName,
    EthTransactionName,
    EthLogName,
    EthLogAbiName,
    AssetRouterInputBasketName,
    AssetRouterOutputBasketName,
    AssetRouterPathName,
    ERC20Name,
    ERC20AllowanceName,
    ERC20BalanceName,
    ERC165Name,
    ERC165AbiName,
    ERC721Name,
    ERC1155Name,
    ERC1155BalanceName,
    ContractName,
    NetworkName,
    HTTPCacheName,
    IPFSCacheName,
    ERC165Abi,
    EthLogAbi,
    EthCallAbi,
    defaultNetworks,
    Network,
    Contract,
    ERC165,
} from "@owlprotocol/web3-models";
import { Dexie } from "dexie";
import { utils } from "ethers";
import { flatten } from "lodash-es";
import log from "loglevel";
import { homedir } from "os";
import {
    AssetRouterInputBasketIdx,
    AssetRouterInputBasketTable,
    AssetRouterOutputBasketIdx,
    AssetRouterOutputBasketTable,
    AssetRouterPathIdx,
    AssetRouterPathTable,
    ConfigIdx,
    ConfigTable,
    ContractIdx,
    ContractTable,
    ERC1155BalanceTable,
    ERC1155Idx,
    ERC1155Table,
    ERC165AbiIdx,
    ERC165AbiTable,
    ERC165Idx,
    ERC165Table,
    ERC20AllowanceIdx,
    ERC20AllowanceTable,
    ERC20BalanceIdx,
    ERC20BalanceTable,
    ERC20Idx,
    ERC20Table,
    ERC721Idx,
    ERC721Table,
    EthBlockIdx,
    EthBlockTable,
    EthCallAbiIdx,
    EthCallAbiTable,
    EthCallIdx,
    EthCallTable,
    EthLogAbiIdx,
    EthLogAbiTable,
    EthLogIdx,
    EthLogQueryIdx,
    EthLogQueryTable,
    EthLogSubscribeIdx,
    EthLogSubscribeTable,
    EthLogTable,
    EthSendIdx,
    EthSendTable,
    EthTransactionIdx,
    EthTransactionTable,
    HTTPCacheIdx,
    HTTPCacheTable,
    IPFSCacheIdx,
    IPFSCacheTable,
    NetworkIdx,
    NetworkTable,
} from "./tables/index.js";
import { NODE_ENV } from "@owlprotocol/envvars";
import { initDemoData } from "./demoData.js";

export type Web3Tables = {
    [ConfigName]: ConfigTable;
    [NetworkName]: NetworkTable;
    [ContractName]: ContractTable;
    //ethmodels
    [EthBlockName]: EthBlockTable;
    [EthCallName]: EthCallTable;
    [EthCallAbiName]: EthCallAbiTable;
    [EthLogName]: EthLogTable;
    [EthLogAbiName]: EthLogAbiTable;
    [EthLogQueryName]: EthLogQueryTable;
    [EthLogSubscribeName]: EthLogSubscribeTable;
    [EthSendName]: EthSendTable;
    [EthTransactionName]: EthTransactionTable;
    //contractmodels
    [AssetRouterInputBasketName]: AssetRouterInputBasketTable;
    [AssetRouterOutputBasketName]: AssetRouterOutputBasketTable;
    [AssetRouterPathName]: AssetRouterPathTable;
    [ERC20Name]: ERC20Table;
    [ERC20AllowanceName]: ERC20AllowanceTable;
    [ERC20BalanceName]: ERC20BalanceTable;
    [ERC165Name]: ERC165Table;
    [ERC165AbiName]: ERC165AbiTable;
    [ERC721Name]: ERC721Table;
    [ERC1155Name]: ERC1155Table;
    [ERC1155BalanceName]: ERC1155BalanceTable;
    //metadata
    [HTTPCacheName]: HTTPCacheTable;
    [IPFSCacheName]: IPFSCacheTable;
};
const stores = {
    [ConfigName]: ConfigIdx,
    [ContractName]: ContractIdx,
    [NetworkName]: NetworkIdx,
    //ethmodels
    [EthBlockName]: EthBlockIdx,
    [EthCallName]: EthCallIdx,
    [EthCallAbiName]: EthCallAbiIdx,
    [EthLogName]: EthLogIdx,
    [EthLogAbiName]: EthLogAbiIdx,
    [EthLogQueryName]: EthLogQueryIdx,
    [EthLogSubscribeName]: EthLogSubscribeIdx,
    [EthSendName]: EthSendIdx,
    [EthTransactionName]: EthTransactionIdx,
    //contractmodels
    [AssetRouterInputBasketName]: AssetRouterInputBasketIdx,
    [AssetRouterOutputBasketName]: AssetRouterOutputBasketIdx,
    [AssetRouterPathName]: AssetRouterPathIdx,
    [ERC20Name]: ERC20Idx,
    [ERC20AllowanceName]: ERC20AllowanceIdx,
    [ERC20BalanceName]: ERC20BalanceIdx,
    [ERC165Name]: ERC165Idx,
    [ERC165AbiName]: ERC165AbiIdx,
    [ERC721Name]: ERC721Idx,
    [ERC1155Name]: ERC1155Idx,
    [ERC1155BalanceName]: ERC1155Idx,
    //metadata
    [HTTPCacheName]: HTTPCacheIdx,
    [IPFSCacheName]: IPFSCacheIdx,
};

export function createWeb3Dexie() {
    /* IndexedDBShim Type
        - Client        : IndexedDB
        - NodeJS Testing: In-memory
        - NodeJS        : SQLite
    */
    if (!isClient()) {
        if (process.env.NODE_ENV === "test") {
            indexedDBShimMemory("Web3Dexie");
        } else {
            const home = homedir();
            const path = `${home}/owlprotocol`;
            indexedDBShimSQLite(path);
        }
    }

    const db = createCRUDDexie<Web3Tables>("Web3Dexie", stores);
    db.on("ready", async () => {
        //Insert default interfaces
        await initData(db);
        log.debug(`Web3 Init Data inserted`);
    });

    return db;
}

export function initNetwork(db: Web3Tables) {
    const networks: Network[] = Object.values(defaultNetworks);
    const txNetwork = db.Network.bulkAdd(networks).catch(Dexie.BulkError, (e) => {
        log.error(e.message);
    });
    return txNetwork;
}

export function initContract(db: Web3Tables) {
    const contract: Contract[][] = Object.values(defaultNetworks).map((v) => {
        const networkId = v.networkId;
        //Interface is marked as checked
        const contractsImplementation = Object.entries(Ethers.implementationFactories).map(([k, f]) => {
            return {
                networkId,
                address: f.getAddress().toLowerCase(),
                label: `${k}Implementation`,
                tags: ["Implementation"],
                interfaceCheckedAt: Number.MAX_SAFE_INTEGER,
            };
        });
        const contracts = [
            {
                networkId,
                address: Utils.ERC1820.registryAddress.toLowerCase(),
                interfaceCheckedAt: Number.MAX_SAFE_INTEGER,
                label: "ERC1820",
            },
            {
                networkId,
                address: Utils.ERC1167Factory.ERC1167FactoryAddress.toLowerCase(),
                interfaceCheckedAt: Number.MAX_SAFE_INTEGER,
                label: "ERC1167Factory",
            },
            ...contractsImplementation,
        ];

        return contracts;
    });

    const txContract = db.Contract.bulkAdd(flatten(contract)).catch(Dexie.BulkError, (e) => {
        log.error(e.message);
    });
    return txContract;
}

export function initERC165(db: Web3Tables) {
    const erc165: ERC165[][] = Object.values(defaultNetworks).map((v) => {
        const networkId = v.networkId;
        //Interface is marked as checked
        const erc165ForNetwork = [
            {
                networkId,
                address: Utils.ERC1820.registryAddress.toLowerCase(),
                interfaceId: interfaces.IERC1820.interfaceId,
            },
            {
                networkId,
                address: Utils.ERC1167Factory.ERC1167FactoryAddress.toLowerCase(),
                interfaceId: interfaces.IERC1167Factory.interfaceId,
            },
        ];

        return erc165ForNetwork;
    });

    const txERC165 = db.ERC165.bulkAdd(flatten(erc165)).catch(Dexie.BulkError, (e) => {
        log.error(e.message);
    });
    return txERC165;
}

export function initERC165Abi(db: Web3Tables) {
    const erc165abi: ERC165Abi[] = Object.entries(interfaces).map(([k, v]) => {
        return {
            interfaceId: v.interfaceId,
            name: k,
            abi: JSON.parse(v.interface.format(utils.FormatTypes.json) as string),
        };
    });
    const txERC165Abi = db.ERC165Abi.bulkAdd(erc165abi).catch(Dexie.BulkError, (e) => {
        log.error(e.message);
    });
    return txERC165Abi;
}

export function initEthLogAbi(db: Web3Tables) {
    const ethlogabi: EthLogAbi[] = flatten(
        Object.entries(interfaces).map(([, v]) => {
            return Object.values(v.interface.events).map((e) => {
                return {
                    eventFormatFull: e.format(utils.FormatTypes.full).replace("event ", ""),
                    eventSighash: v.interface.getEventTopic(e),
                };
            });
        }),
    );
    const txEthLogAbi = db.EthLogAbi.bulkAdd(ethlogabi).catch(Dexie.BulkError, (e) => {
        log.error(e.message);
    });
    return txEthLogAbi;
}
export function initEthCallAbi(db: Web3Tables) {
    const ethcallabi: EthCallAbi[] = flatten(
        Object.entries(interfaces).map(([, v]) => {
            return Object.values(v.interface.functions).map((e) => {
                return {
                    methodFormatFull: e.format(utils.FormatTypes.full).replace("function ", ""),
                    methodSighash: v.interface.getSighash(e),
                };
            });
        }),
    );

    const txEthCallAbi = db.EthCallAbi.bulkAdd(ethcallabi).catch(Dexie.BulkError, (e) => {
        log.error(e.message);
    });
    return txEthCallAbi;
}

export function initData(db: Web3Tables) {
    console.debug("AAAAAAAAAAAAAAAAA")
    const promises: Promise<any>[] = [
        initERC165Abi(db),
        initEthLogAbi(db),
        initEthCallAbi(db),
        initNetwork(db),
        initContract(db),
        initERC165(db),
    ];
    console.debug(NODE_ENV);
    if (NODE_ENV === "development") {
        promises.push(initDemoData(db));
    }
    return Promise.all(promises);
}

export const Web3Dexie = createWeb3Dexie() as CRUDDexie<
    | ConfigTable
    | NetworkTable
    | ContractTable
    | EthBlockTable
    | EthCallTable
    | EthCallAbiTable
    | EthLogTable
    | EthLogAbiTable
    | EthLogQueryTable
    | EthLogSubscribeTable
    | EthSendTable
    | EthTransactionTable
    | AssetRouterInputBasketTable
    | AssetRouterOutputBasketTable
    | AssetRouterPathTable
    | ERC20Table
    | ERC20AllowanceTable
    | ERC20BalanceTable
    | ERC165Table
    | ERC165AbiTable
    | ERC721Table
    | ERC1155Table
    | ERC1155Table
    | HTTPCacheTable
    | IPFSCacheTable
> &
    Web3Tables & { clear(): Promise<any> };
