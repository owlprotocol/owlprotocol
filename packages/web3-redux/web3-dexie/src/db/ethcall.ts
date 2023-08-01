import { utils } from "ethers";
import { EthCall, argToIdx } from "@owlprotocol/web3-models";
import { EthCallDexie } from "../crud/index.js";

/**
 * Recursively searches for CID at file at <BASE_CID>/path/to/file
 */
export async function getEthCall<Args extends any[] = any[], Ret = any>(
    networkId: string,
    address: string,
    methodFormatFull: string,
    args: Args = [] as any,
) {
    const methodFragment = utils.FunctionFragment.from(methodFormatFull.replace("function ", ""));
    const iface = new utils.Interface([methodFragment]);
    const data = iface.encodeFunctionData(methodFragment, args);

    const ethCall = (await EthCallDexie.get({
        networkId,
        to: address.toLowerCase(),
        data,
    })) as EthCall<Args, Ret> | undefined;
    return ethCall;
}

export function getEthCallFactory<Args extends any[] = any[], Ret = any>(methodFormatFull: string) {
    return async function (networkId: string, address: string, args: Args = [] as any) {
        const ethCall = await getEthCall<Args, Ret>(networkId, address, methodFormatFull, args);
        return ethCall?.returnValue;
    };
}

export async function getEthCallWhere<Args extends any[] = any[], Ret = any>(
    networkId: string,
    address: string,
    methodFormatFull: string,
    idx?: { arg0: Args[0] } | { arg1: Args[1] } | { arg2: Args[2] } | { returnValue: Ret },
) {
    methodFormatFull = utils.FunctionFragment.from(methodFormatFull)
        .format(utils.FormatTypes.full)
        .replace("function ", "");
    let filter: //eslint-disable-next-line @typescript-eslint/ban-types
    {} | { arg0Idx: string } | { arg1Idx: string } | { arg2Idx: string } | { returnValueIdx: string } = {};
    if ((idx as any).arg0) filter = { arg0Idx: argToIdx((idx as any).arg0) };
    else if ((idx as any).arg1) filter = { arg1Idx: argToIdx((idx as any).arg1) };
    else if ((idx as any).arg2) filter = { arg2Idx: argToIdx((idx as any).arg2) };
    else if ((idx as any).returnValue) filter = { returnValueIdx: argToIdx((idx as any).returnValue) };

    const ethCalls = (await EthCallDexie.where({
        networkId,
        to: address,
        methodFormatFull,
        ...filter,
    })) as EthCall<Args, Ret>[];
    return ethCalls;
}

export function getEthCallWhereFactory<Args extends any[] = any[], Ret = any>(methodFormatFull: string) {
    return async (
        networkId: string,
        address: string,
        idx?: { arg0: Args[0] } | { arg1: Args[1] } | { arg2: Args[2] } | { returnValue: Ret },
    ) => {
        const results = await getEthCallWhere<Args, Ret>(networkId, address, methodFormatFull, idx);
        return results;
    };
}
