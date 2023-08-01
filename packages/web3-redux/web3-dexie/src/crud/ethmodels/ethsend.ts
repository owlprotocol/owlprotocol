import { createCRUDDB } from "@owlprotocol/crud-dexie";
import { EthSend, EthSendName, validateIdEthSend, toPrimaryKeyEthSend } from "@owlprotocol/web3-models";
import {
    EthSendKeyId,
    EthSendKeyIdEq,
    EthSendKeyIdx,
    EthSendKeyIdxEq,
    EthSendKeyIdxEqAny,
} from "../../tables/ethmodels/ethsend.js";
import { Web3Dexie } from "../../dbIndex.js";

export function getEthSendDexie() {
    return createCRUDDB<
        typeof EthSendName,
        EthSend,
        EthSendKeyId,
        EthSendKeyIdEq,
        EthSendKeyIdx,
        EthSendKeyIdxEq,
        EthSendKeyIdxEqAny
    >(Web3Dexie, Web3Dexie[EthSendName], {
        validateId: validateIdEthSend,
        toPrimaryKey: toPrimaryKeyEthSend,
        preWriteBulkDB: (items) => Promise.resolve(items),
        postWriteBulkDB: () => Promise.resolve(),
    });
}
export const EthSendDexie = getEthSendDexie();
