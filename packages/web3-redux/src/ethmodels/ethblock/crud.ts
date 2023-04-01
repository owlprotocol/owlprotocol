import { createCRUDModel } from "@owlprotocol/crud-redux";
import { EthBlock } from "./common.js";
import { EthBlockId, EthBlockIndexInput, EthBlockTransaction, toPrimaryKey, validateId } from "./model/index.js";
import { getDB, Web3ReduxDexie } from "../../db.js";

export const BlockCRUD = createCRUDModel<
    typeof EthBlock,
    EthBlockId,
    EthBlockTransaction,
    Web3ReduxDexie,
    EthBlockIndexInput,
    EthBlockIndexInput
>({
    name: EthBlock,
    getDB,
    validators: {
        validateId,
        toPrimaryKey,
    },
});
