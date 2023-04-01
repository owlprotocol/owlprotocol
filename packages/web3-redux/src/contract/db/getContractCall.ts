import { Web3ContractMethodParams, Web3ContractMethodCall } from "@owlprotocol/contracts/lib/types/web3/types.js";
import { utils } from "ethers";
import { ContractCRUD } from "../crud.js";
import { BaseWeb3Contract } from "../model/index.js";
import { getEthCall, getEthCallWhere } from "../../ethmodels/ethcall/db/getEthCall.js";

/**
 * Recursively searches for CID at file at <BASE_CID>/path/to/file
 */
export async function getContractCall<
    T extends BaseWeb3Contract = BaseWeb3Contract,
    K extends keyof T["methods"] = string,
>(networkId: string, address: string, method: K, args: Web3ContractMethodParams<T, K> = [] as any) {
    const contract = await ContractCRUD.db.get({ networkId, address });
    const abi = contract?.abi;
    if (!abi) return undefined;

    const iface = new utils.Interface(abi as any);
    const methodFormatFull = iface
        .getFunction(method as string)
        .format(utils.FormatTypes.full)
        .replace("function ", "");
    return getEthCall<Web3ContractMethodParams<T, K>, Web3ContractMethodCall<T, K>>(
        networkId,
        address,
        methodFormatFull,
        args,
    );
}

export function getContractCallFactory<
    T extends BaseWeb3Contract = BaseWeb3Contract,
    K extends keyof T["methods"] = string,
>(method: K) {
    return async (networkId: string, address: string, args: Web3ContractMethodParams<T, K> = [] as any) => {
        return (await getContractCall<T, K>(networkId, address, method, args))?.returnValue;
    };
}

export async function getContractCallWhere<
    T extends BaseWeb3Contract = BaseWeb3Contract,
    K extends keyof T["methods"] = string,
>(
    networkId: string,
    address: string,
    method: K,
    idx?:
        | { arg0: Web3ContractMethodParams<T, K>[0] }
        | { arg1: Web3ContractMethodParams<T, K>[0] }
        | { arg2: Web3ContractMethodParams<T, K>[0] }
        | { returnValue: Web3ContractMethodCall<T, K> },
) {
    const contract = await ContractCRUD.db.get({ networkId, address });
    const abi = contract?.abi;
    if (!abi) return undefined;

    const iface = new utils.Interface(abi as any);
    const methodFragment = iface.getFunction(method as string);
    const methodFormatFull = methodFragment.format(utils.FormatTypes.full);

    return getEthCallWhere<Web3ContractMethodParams<T, K>, Web3ContractMethodCall<T, K>>(
        networkId,
        address,
        methodFormatFull,
        idx,
    );
}

export function getContractCallWhereFactory<
    T extends BaseWeb3Contract = BaseWeb3Contract,
    K extends keyof T["methods"] = string,
>(method: K) {
    return async (
        networkId: string,
        address: string,
        idx?:
            | { arg0: Web3ContractMethodParams<T, K>[0] }
            | { arg1: Web3ContractMethodParams<T, K>[0] }
            | { arg2: Web3ContractMethodParams<T, K>[0] }
            | { returnValue: Web3ContractMethodCall<T, K> },
    ) => {
        return await getContractCallWhere<T, K>(networkId, address, method, idx);
    };
}
