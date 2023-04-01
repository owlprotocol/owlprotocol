import { createCRUDModel } from "@owlprotocol/crud-redux";
import { EthLogSubscribeName } from "./common.js";
import {
    validateEthLogSubscribe,
    validateIdEthLogSubscribe,
    toPrimaryKeyEthLogSubcribe,
    validateWithReduxEthLogSubscribe,
    EthLogSubscribeId,
    EthLogSubscribe,
    EthLogSubscribeIndexInput,
    encodeEthLogSubscribe,
    EthLogSubscribeWithObjects,
    EthLogSubscribePartial,
} from "./model/index.js";
import { getDB, Web3ReduxDexie } from "../../db.js";
import { getOrm } from "../../orm.js";

export const EthLogSubscribeCRUD = createCRUDModel<
    typeof EthLogSubscribeName,
    EthLogSubscribeId,
    EthLogSubscribe,
    Web3ReduxDexie,
    EthLogSubscribeIndexInput,
    EthLogSubscribeIndexInput,
    EthLogSubscribePartial,
    EthLogSubscribeWithObjects
>({
    name: EthLogSubscribeName,
    getDB,
    validators: {
        validate: validateEthLogSubscribe,
        validateId: validateIdEthLogSubscribe,
        toPrimaryKey: toPrimaryKeyEthLogSubcribe,
        encode: encodeEthLogSubscribe,
        validateWithRedux: validateWithReduxEthLogSubscribe,
    },
    orm: getOrm(),
});
