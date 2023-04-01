import { createCRUDModel } from "@owlprotocol/crud-redux";
import { EthCallAbiName } from "./common.js";
import {
    validate,
    validateId,
    toPrimaryKey,
    EthCallAbi,
    EthCallAbiId,
    EthCallAbiIndexInput,
    EthCallAbiPartial,
} from "./model/interface.js";
import type { Web3ReduxDexie } from "../../db.js";

export function getEthCallAbiCRUD(db: Web3ReduxDexie) {
    return createCRUDModel<
        typeof EthCallAbiName,
        EthCallAbiId,
        EthCallAbi,
        Web3ReduxDexie,
        EthCallAbiIndexInput,
        EthCallAbiIndexInput,
        EthCallAbiPartial
    >({
        name: EthCallAbiName,
        getDB: () => db,
        validators: {
            validate,
            validateId,
            toPrimaryKey,
        },
    });
}
