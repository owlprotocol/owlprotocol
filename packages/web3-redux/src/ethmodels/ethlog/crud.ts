import { createCRUDModel } from "@owlprotocol/crud-redux";
import { EthLogName } from "./common.js";
import {
    EthLogId,
    EthLog,
    validateEthLog,
    EthLogIndexInput,
    validateId,
    toPrimaryKey,
    EthLogPartial,
    EthLogIndexInputAnyOf,
} from "./model/interface.js";
import { preWriteBulkDB } from "./model/preWriteBulkDB.js";
import { postWriteBulkDB } from "./model/postWriteBulkDB.js";
import { getDB, Web3ReduxDexie } from "../../db.js";
import { ContractName } from "../../contract/common.js";
import { ERC20AllowanceName } from "../../contractmodels/erc20allowance/common.js";
import { ERC20BalanceName } from "../../contractmodels/erc20balance/common.js";
import { ERC721Name } from "../../contractmodels/erc721/common.js";
import { ERC1155Name } from "../../contractmodels/erc1155/common.js";
import { AssetRouterInputBasketName } from "../../contractmodels/assetrouterinputbasket/common.js";
import { AssetRouterOutputBasketName } from "../../contractmodels/assetrouteroutputbasket/common.js";
import { EthLogAbiName } from "../ethlogabi/common.js";

export const EthLogCRUD = createCRUDModel<
    typeof EthLogName,
    EthLogId,
    EthLog,
    Web3ReduxDexie,
    EthLogIndexInput,
    EthLogIndexInputAnyOf,
    EthLogPartial
>({
    name: EthLogName,
    getDB,
    validators: {
        validate: validateEthLog,
        validateId,
        toPrimaryKey,
        preWriteBulkDB,
        postWriteBulkDB,
    },
    tables: [
        EthLogAbiName,
        ContractName,
        ERC20AllowanceName,
        ERC20BalanceName,
        ERC721Name,
        ERC1155Name,
        AssetRouterInputBasketName,
        AssetRouterOutputBasketName,
    ],
});
