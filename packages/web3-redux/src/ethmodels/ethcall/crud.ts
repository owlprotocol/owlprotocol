import { createCRUDModel } from "@owlprotocol/crud-redux";
import { EthCallName } from "./common.js";
import {
    EthCallId,
    EthCall,
    validateIdEthCall,
    validateEthCall,
    EthCallIndexInput,
    toPrimaryKeyEthCall,
    preWriteBulkDBEthCall,
    EthCallPartial,
    EthCallIndexInputAnyOf,
} from "./model/interface.js";
import { postWriteBulkDBEthCall } from "./model/postWriteBulkDB.js";
import { getDB, Web3ReduxDexie } from "../../db.js";
import { ERC20Name } from "../../contractmodels/erc20/common.js";
import { ERC20BalanceName } from "../../contractmodels/erc20balance/common.js";
import { ERC721Name } from "../../contractmodels/erc721/common.js";
import { ERC1155Name } from "../../contractmodels/erc1155/common.js";
import { ERC1155BalanceName } from "../../contractmodels/erc1155balance/common.js";
import { ERC165Name } from "../../contractmodels/erc165/common.js";
import { AssetRouterInputBasketName } from "../../contractmodels/assetrouterinputbasket/common.js";
import { AssetRouterOutputBasketName } from "../../contractmodels/assetrouteroutputbasket/common.js";
import { AssetRouterPathName } from "../../contractmodels/assetrouterpath/common.js";
import { ContractName } from "../../contract/common.js";

export const EthCallCRUD = createCRUDModel<
    typeof EthCallName,
    EthCallId,
    EthCall,
    Web3ReduxDexie,
    EthCallIndexInput,
    EthCallIndexInputAnyOf,
    EthCallPartial
>({
    name: EthCallName,
    getDB,
    validators: {
        validateId: validateIdEthCall,
        validate: validateEthCall,
        toPrimaryKey: toPrimaryKeyEthCall,
        preWriteBulkDB: preWriteBulkDBEthCall,
        postWriteBulkDB: postWriteBulkDBEthCall,
    },
    tables: [
        ContractName,
        ERC165Name,
        ERC20Name,
        ERC20BalanceName,
        ERC721Name,
        ERC1155Name,
        ERC1155BalanceName,
        AssetRouterInputBasketName,
        AssetRouterOutputBasketName,
        AssetRouterPathName,
    ],
});
