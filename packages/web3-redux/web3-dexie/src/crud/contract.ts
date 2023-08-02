import { createCRUDDB } from "@owlprotocol/crud-dexie";
import { Contract, ContractName, validateIdContract, toPrimaryKeyContract } from "@owlprotocol/web3-models";
import {
    ContractKeyId,
    ContractKeyIdEq,
    ContractKeyIdx,
    ContractKeyIdxEq,
    ContractKeyIdxEqAny,
} from "../tables/contract.js";
import { Web3Dexie } from "../dbIndex.js";

export function getContractDexie() {
    return createCRUDDB<
        typeof ContractName,
        Contract,
        ContractKeyId,
        ContractKeyIdEq,
        ContractKeyIdx,
        ContractKeyIdxEq,
        ContractKeyIdxEqAny
    >(Web3Dexie, Web3Dexie[ContractName], {
        validateId: validateIdContract,
        toPrimaryKey: toPrimaryKeyContract,
        preWriteBulkDB: (items) => Promise.resolve(items),
        postWriteBulkDB: () => Promise.resolve(),
    });
}
export const ContractDexie = getContractDexie();
