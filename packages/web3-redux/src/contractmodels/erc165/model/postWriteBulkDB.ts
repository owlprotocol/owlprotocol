/* eslint-disable @typescript-eslint/no-unused-vars */
import { interfaceIds } from "@owlprotocol/contracts";
import { compact, flatten, isEqual, omit, zip } from "lodash-es";

import { ERC165 } from "./interface.js";
import { Contract } from "../../../contract/model/interface.js";
import { ContractCRUD } from "../../../contract/crud.js";
import { abiDeterministic } from "../../../utils/abiDeterministic.js";

export async function postWriteBulkDB(items: ERC165[]): Promise<any> {
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

    //console.debug({ ContractUpserts })

    return Promise.all([ContractCRUD.db.bulkPutUnchained(ContractUpserts)]);
    */
}
