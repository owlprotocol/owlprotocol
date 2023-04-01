import { ContractCRUD } from "../crud.js";

export async function getContractsWithInterfaceIds(interfaceIds: string[], networkId?: string) {
    const collection = ContractCRUD.db
        .table()
        .where("interfaceIds")
        .anyOf(...interfaceIds);
    if (networkId) collection.filter((c) => c.networkId === networkId);

    return collection.toArray();
}
