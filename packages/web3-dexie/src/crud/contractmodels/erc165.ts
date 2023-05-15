import { createCRUDDB } from "@owlprotocol/crud-dexie";
import { ERC165, ERC165Name, validateIdERC165, toPrimaryKeyERC165 } from "@owlprotocol/web3-models";
import {
    ERC165KeyId,
    ERC165KeyIdEq,
    ERC165KeyIdx,
    ERC165KeyIdxEq,
    ERC165KeyIdxEqAny,
} from "../../tables/contractmodels/erc165.js";
import { Web3Dexie } from "../../dbIndex.js";

export function getERC165Dexie() {
    return createCRUDDB<
        typeof ERC165Name,
        ERC165,
        ERC165KeyId,
        ERC165KeyIdEq,
        ERC165KeyIdx,
        ERC165KeyIdxEq,
        ERC165KeyIdxEqAny
    >(Web3Dexie, Web3Dexie[ERC165Name], {
        validateId: validateIdERC165,
        toPrimaryKey: toPrimaryKeyERC165,
        preWriteBulkDB: (items) => Promise.resolve(items),
        postWriteBulkDB: postWriteBulkDBERC165,
    });
}
export const ERC165Dexie = getERC165Dexie();

//TODO: Additional decoding on change?
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function postWriteBulkDBERC165(items: ERC165[]): Promise<any> {
    return;

    /*
    const ContractUpserts: Contract[] = [];

    //Merge Abis
    const contractAbis: { [networkId: string]: { [address: string]: any[] } } = {};
    items.forEach((c) => {
        const { networkId, address, interfaceId } = c;
        const ifaceAbi = interfaceIds[interfaceId];
        if (!contractAbis[networkId]) contractAbis[networkId] = {};
        if (!contractAbis[networkId][address]) contractAbis[networkId][address] = [];
        contractAbis[networkId][address] = [...contractAbis[networkId][address], ...ifaceAbi];
    });

    //Update ABIs
    const newContracts = flatten(
        Object.entries(contractAbis).map(([networkId, contracts]) => {
            return Object.entries(contracts).map(([address, abi]) => {
                return { networkId, address, abi };
            });
        }),
    );
    const contracts = await ContractCRUD.db.bulkGet(newContracts.map((c) => omit(c, "abi")));
    ContractUpserts.push(
        ...compact(
            zip(newContracts, contracts).map(([newContract, contract]) => {
                const abi = contract?.abi;
                const newAbi = abiDeterministic([...newContract!.abi, ...(contract?.abi ?? [])]);
                if (newAbi.length > 0 && (!abi || !isEqual(newAbi, contract?.abi))) {
                    return {
                        networkId: newContract!.networkId,
                        address: newContract!.address,
                        abi: newAbi,
                    };
                }
            }),
        ),
    );

    //log.debug({ ContractUpserts })

    return Promise.all([ContractCRUD.db.bulkPutUnchained(ContractUpserts)]);
    */
}
