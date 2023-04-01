import { Web3ContractMethodCall, Web3ContractMethodParams } from "@owlprotocol/contracts/lib/types/web3/types.js";
import { utils } from "ethers";
import { useContract } from "./useContract.js";

import { BaseWeb3Contract } from "../model/index.js";
import { useEthCall } from "../../ethmodels/ethcall/hooks/useEthCall.js";

//Contract Call
/**
 * Create a contract call and return value.
 * @category Hooks
 */
export function useContractCall<T extends BaseWeb3Contract = BaseWeb3Contract, K extends keyof T["methods"] = string>(
    networkId: string | undefined,
    address: string | undefined,
    method: K | undefined,
    args: Web3ContractMethodParams<T, K> = [] as any,
) {
    const [contract] = useContract({ networkId, address });
    const abi = contract?.abi;

    const iface = abi ? new utils.Interface(abi as any) : undefined;
    const methodFormatFull = iface
        ? iface
              .getFunction(method as string)
              .format(utils.FormatTypes.full)
              .replace("function ", "")
        : undefined;

    return useEthCall<Web3ContractMethodParams<T, K>, Web3ContractMethodCall<T, K>>(
        abi ? { networkId, to: address, methodFormatFull, args } : undefined,
    );
}
