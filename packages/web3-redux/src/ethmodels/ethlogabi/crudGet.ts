import { createCRUDModel } from "@owlprotocol/crud-redux";
import { EthLogAbiName } from "./common.js";
import {
    validate,
    validateId,
    toPrimaryKey,
    EthLogAbi,
    EthLogAbiId,
    EthLogAbiIndexInput,
    EthLogAbiPartial,
} from "./model/interface.js";
import type { Web3ReduxDexie } from "../../db.js";

export function getEthLogAbiCRUD(db: Web3ReduxDexie) {
    return createCRUDModel<
        typeof EthLogAbiName,
        EthLogAbiId,
        EthLogAbi,
        Web3ReduxDexie,
        EthLogAbiIndexInput,
        EthLogAbiIndexInput,
        EthLogAbiPartial
    >({
        name: EthLogAbiName,
        getDB: () => db,
        validators: {
            validate,
            validateId,
            toPrimaryKey,
        },
    });
}
