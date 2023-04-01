import { createCRUDModel } from "@owlprotocol/crud-redux";
import { ERC165AbiName } from "./common.js";
import { ERC165AbiId, ERC165Abi, validateId, toPrimaryKey } from "./model/index.js";
import type { Web3ReduxDexie } from "../../db.js";

export function getERC165AbiCRUD(db: any) {
    return createCRUDModel<typeof ERC165AbiName, ERC165AbiId, ERC165Abi, Web3ReduxDexie>({
        name: ERC165AbiName,
        getDB: () => db,
        validators: {
            validateId,
            toPrimaryKey,
        },
    });
}
