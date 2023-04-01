import { utils } from "ethers";
import { AbiItem } from "../../utils/web3-utils/index.js";
import { ContractName } from "../common.js";
import { web3DeployAction, Web3DeployActionInput, Web3DeployType } from "../../ethmodels/ethsend/actions/web3Deploy.js";

/** @internal */
export const CONTRACT_DEPLOY = `${ContractName}/CONTRACT_DEPLOY`;

export interface WithContractAbi {
    readonly abi: AbiItem[];
}

/*
export interface ContractDeployActionInputBase<Args = any> extends Web3DeployActionInputBase {
    readonly abi?: AbiItem[];
    //readonly label?: string;
    //readonly tags?: string[];
}
*/

export type ContractDeployActionInput<Args = any> = Web3DeployActionInput<Args> & WithContractAbi;

export function validateContractDeployAction<Args = any>(payload: ContractDeployActionInput<Args>) {
    const iface = new utils.Interface(payload.abi as any);
    let methodFormatName: "initialize" | "proxyInitialize";

    if (payload.deployType === Web3DeployType.INITIALIZE) methodFormatName = "initialize";
    else if (payload.deployType === Web3DeployType.INITIALIZE_PROXY_1167) methodFormatName = "initialize";
    else methodFormatName = "proxyInitialize";
    const methodFragment = iface.getFunction(methodFormatName);
    const methodFormatFull = methodFragment.format(utils.FormatTypes.full).replace("function ", "");

    return {
        ...payload,
        methodFormatFull,
    };
}

//Pseudo-action. Creates Web3DeployAction => Web3SendAction
export function contractDeployAction<Args = any>(
    payload: ContractDeployActionInput<Args>,
    uuid?: string | undefined,
    ts?: number | undefined,
) {
    const payload2 = validateContractDeployAction(payload);
    return web3DeployAction(payload2, uuid, ts);
}
