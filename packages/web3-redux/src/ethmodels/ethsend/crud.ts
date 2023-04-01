import { createCRUDModel } from "@owlprotocol/crud-redux";
import { EthSendName } from "./common.js";
import {
    EthSendId,
    EthSend,
    validate,
    validateId,
    toPrimaryKey,
    EthSendIndexInput,
    EthSendPartial,
} from "./model/index.js";
import { getDB, Web3ReduxDexie } from "../../db.js";

export const EthSendCRUD = createCRUDModel<
    typeof EthSendName,
    EthSendId,
    EthSend,
    Web3ReduxDexie,
    EthSendIndexInput,
    EthSendIndexInput,
    EthSendPartial
>({
    name: EthSendName,
    getDB,
    validators: {
        validate,
        validateId,
        toPrimaryKey,
    },
});
