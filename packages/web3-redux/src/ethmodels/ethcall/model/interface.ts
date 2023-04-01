/* eslint-disable @typescript-eslint/ban-types */
import { utils } from "ethers";
import { isUndefined, omitBy } from "lodash-es";
import type { AbiItem } from "web3-utils";
import { mapDeepBigNumberToString } from "../../../utils/mapDeepBigNumberToString.js";

export interface WithData {
    readonly data: string;
}
export interface WithArgs<Args = any> {
    readonly args: Args;
}
export interface WithMethodAbi {
    readonly methodAbi: AbiItem;
}
export interface WithMethodFormat {
    readonly methodFormatFull: string;
}
export interface WithReturnValue<Ret = any> {
    readonly returnValue: Ret;
}
export interface WithReturnData {
    readonly returnData: string;
}

/** EthCall id components */
export interface EthCallId {
    /** Blockchain network id.
     * See [chainlist](https://chainlist.org/) for a list of networks. */
    readonly networkId: string;
    /** `to` field of call */
    readonly to: string;
    /** `data` field for call */
    readonly data: string;
}

export interface EthCallIdPartialBase {
    readonly networkId: string;
    readonly to: string;
}

export type EthCallIdPartial<Args = any> =
    | (EthCallIdPartialBase & WithData)
    | (EthCallIdPartialBase & WithArgs<Args> & WithMethodAbi)
    | (EthCallIdPartialBase & WithArgs<Args> & WithMethodFormat);

export enum EthCallStatus {
    LOADING = "LOADING",
    SUCCESS = "SUCCESS",
    ERROR = "ERROR",
}

export interface EthCallPartialBase {
    /* See [chainlist](https://chainlist.org/) for a list of networks. */
    readonly networkId: string;
    /** `to` field of call */
    readonly to: string;
    /** Error Id */
    readonly errorId?: string;
    /** `from` field of call. Some providers may default this to `null` or `ADDRESS_0`. */
    readonly from?: string;
    /** Historical block height to execute call. Defaults to `latest` */
    readonly defaultBlock?: number | "latest";
    /** Maximum `gas` field for call. */
    readonly gas?: number;
    /** Status */
    readonly status?: EthCallStatus;
}

export function isWithData(item: any): item is WithData {
    return !!(item as WithData).data;
}
export function isWithArgs(item: any): item is WithArgs {
    return !!(item as WithArgs).args;
}
export function isWithMethodFormat(item: any): item is WithMethodFormat {
    return !!(item as WithMethodFormat).methodFormatFull;
}
export function isWithMethodAbi(item: any): item is WithMethodAbi {
    return !!(item as WithMethodAbi).methodAbi;
}
export function isWithReturnData(item: any): item is WithReturnData {
    return !!(item as WithReturnData).returnData;
}
export function isWithReturnValue(item: any): item is WithReturnValue {
    return !!(item as WithReturnValue).returnValue;
}

export type EthCallPartial<Args = any, Ret = any> =
    | (EthCallPartialBase &
          WithData &
          (WithMethodAbi | WithMethodFormat | {}) &
          (WithReturnValue<Ret> | WithReturnData | {}))
    | (EthCallPartialBase &
          WithArgs<Args> &
          (WithMethodAbi | WithMethodFormat) &
          (WithReturnValue<Ret> | WithReturnData | {}));

export interface EthCall<Args = any, Ret = any> extends EthCallId {
    //Used to index by abi
    readonly methodFormatFull?: string;
    readonly arg0Idx: string;
    readonly arg1Idx: string;
    readonly arg2Idx: string;
    readonly returnValueIdx: string;
    readonly args: Args;

    /** Return value of call. Can be raw bytes or decoded with a contract ABI. */
    readonly returnValue?: Ret;
    readonly returnData?: string;
    /** Status */
    readonly status?: EthCallStatus;
    /** Error Id */
    readonly errorId?: string;
    /** `from` field of call. Some providers may default this to `null` or `ADDRESS_0`. */
    readonly from?: string;
    /** Historical block height to execute call. Defaults to `latest` */
    readonly defaultBlock?: number | "latest";
    /** Maximum `gas` field for call. */
    readonly gas?: number;
    /** Updated At */
    readonly updatedAt?: number;
}

//Valid indexes
export type EthCallIndexInput =
    | EthCallId
    //Indices
    | { networkId: string; to: string; methodFormatFull: string }
    | {
          networkId: string;
          to: string;
          methodFormatFull: string;
          arg0Idx: string;
      }
    | {
          networkId: string;
          to: string;
          methodFormatFull: string;
          arg1Idx: string;
      }
    | {
          networkId: string;
          to: string;
          methodFormatFull: string;
          arg2Idx: string;
      }
    | {
          networkId: string;
          to: string;
          methodFormatFull: string;
          returnValueIdx: string;
      }
    | { networkId: string; methodFormatFull: string }
    | { networkId: string; methodFormatFull: string; arg0Idx: string }
    | { networkId: string; methodFormatFull: string; arg1Idx: string }
    | { networkId: string; methodFormatFull: string; arg2Idx: string }
    | { networkId: string; methodFormatFull: string; returnValueIdx: string };

export type EthCallIndexInputAnyOf =
    | { networkId: string[] | string; to: string[] | string; data: string }
    | {
          networkId: string[] | string;
          to: string[] | string;
          methodFormatFull: string[] | string;
      }
    | {
          networkId: string[] | string;
          to: string[] | string;
          methodFormatFull: string[] | string;
          arg0Idx: string[] | string;
      }
    | {
          networkId: string[] | string;
          to: string[] | string;
          methodFormatFull: string[] | string;
          arg1Idx: string[] | string;
      }
    | {
          networkId: string[] | string;
          to: string[] | string;
          methodFormatFull: string[] | string;
          arg2Idx: string[] | string;
      }
    | {
          networkId: string[] | string;
          to: string[] | string;
          methodFormatFull: string[] | string;
          returnValueIdx: string[] | string;
      }
    | { networkId: string[] | string; methodFormatFull: string[] | string }
    | {
          networkId: string[] | string;
          methodFormatFull: string[] | string;
          arg0Idx: string[] | string;
      }
    | {
          networkId: string[] | string;
          methodFormatFull: string[] | string;
          arg1Idx: string[] | string;
      }
    | {
          networkId: string[] | string;
          methodFormatFull: string[] | string;
          arg2Idx: string[] | string;
      }
    | {
          networkId: string[] | string;
          methodFormatFull: string[] | string;
          returnValueIdx: string[] | string;
      };

export const EthCallIndex =
    "[networkId+to+data],\
[networkId+to+methodFormatFull],\
[networkId+to+methodFormatFull+arg0Idx],\
[networkId+to+methodFormatFull+arg1Idx],\
[networkId+to+methodFormatFull+arg2Idx],\
[networkId+to+methodFormatFull+returnValueIdx],\
[networkId+methodFormatFull],\
[networkId+methodFormatFull+arg0Idx],\
[networkId+methodFormatFull+arg1Idx],\
[networkId+methodFormatFull+arg2Idx],\
[networkId+methodFormatFull+returnValueIdx]";

/** @internal */
export function validateIdEthCall({ networkId, to, data }: EthCallId): EthCallId {
    return {
        networkId: networkId,
        to: to.toLowerCase(),
        data: data,
    };
}

export function toPrimaryKeyEthCall({ networkId, to, data }: EthCallId): [string, string, string] {
    return [networkId, to.toLowerCase(), data];
}

export function argToIdx(x: undefined | string | number | object) {
    if (x === undefined) return "";
    else if (typeof x === "string") return x;
    else if (typeof x === "number") return `${x}`;
    else return JSON.stringify(x);
}

interface getEthCallAbiAndFormatFullReturn {
    methodAbi: AbiItem;
    methodFormatFull: string;
    methodFragment: utils.FunctionFragment;
    methodIface: utils.Interface;
}
export function getEthCallAbiAndFormatFull(methodAbi: AbiItem): getEthCallAbiAndFormatFullReturn;
export function getEthCallAbiAndFormatFull(methodFormatFull: string): getEthCallAbiAndFormatFullReturn;
export function getEthCallAbiAndFormatFull(methodAbiOrFormatFull: AbiItem | string): getEthCallAbiAndFormatFullReturn {
    let methodAbi: AbiItem;
    let methodFormatFull: string;
    if (typeof methodAbiOrFormatFull === "string") methodFormatFull = methodAbiOrFormatFull;
    else {
        methodAbi = methodAbiOrFormatFull;
        methodFormatFull = utils.FunctionFragment.from(methodAbi as any).format(utils.FormatTypes.full);
    }

    methodFormatFull = methodFormatFull.replace("function ", "");
    const methodFragment = utils.FunctionFragment.from(methodFormatFull as any);
    const methodIface = new utils.Interface([methodFragment]);
    methodAbi = JSON.parse(methodFragment.format(utils.FormatTypes.json)) as AbiItem;

    return {
        methodAbi,
        methodFormatFull,
        methodFragment,
        methodIface,
    };
}

/** @internal */
export function validateIdPartialEthCall(item: EthCallIdPartial): EthCallId {
    const { networkId, to } = item;

    //Interface
    let results: ReturnType<typeof getEthCallAbiAndFormatFull>;
    if (isWithMethodAbi(item)) {
        results = getEthCallAbiAndFormatFull(item.methodAbi);
    } else if (isWithMethodFormat(item)) {
        results = getEthCallAbiAndFormatFull(item.methodFormatFull);
    } else {
        //Regular Id
        return item;
    }

    const methodFragment = results.methodFragment;
    const methodIface = results.methodIface;

    //Args
    let data: string;
    if (isWithData(item)) {
        data = item.data;
    } else {
        data = methodIface.encodeFunctionData(methodFragment, item.args);
    }

    return { networkId, to, data };
}

/** @internal */
export function validateEthCall<Args = any, Ret = any>(item: EthCallPartial<Args>): EthCall {
    const { networkId, to } = item;
    const from = item.from ? item.from.toLowerCase() : undefined;

    //Interface
    let results: ReturnType<typeof getEthCallAbiAndFormatFull> | undefined;
    if (isWithMethodAbi(item)) {
        results = getEthCallAbiAndFormatFull(item.methodAbi);
    } else if (isWithMethodFormat(item)) {
        results = getEthCallAbiAndFormatFull(item.methodFormatFull);
    }

    const methodFormatFull = results?.methodFormatFull;
    const methodFragment = results?.methodFragment;
    const methodIface = results?.methodIface;

    //Args
    let data: string;
    let args: Args | undefined;
    if (isWithData(item)) {
        data = item.data;
        args = methodIface?.decodeFunctionData(methodFragment!, data) as Args | undefined;
    } else {
        data = methodIface!.encodeFunctionData(methodFragment!, item.args as any);
        args = item.args ?? ([] as Args);
    }

    args = args ? mapDeepBigNumberToString(args) : undefined;
    const arg0Idx = args ? argToIdx((args as any)[0]) : "";
    const arg1Idx = args ? argToIdx((args as any)[1]) : "";
    const arg2Idx = args ? argToIdx((args as any)[2]) : "";

    //Return Data
    let returnData: string | undefined;
    let returnValue: Ret | undefined;
    if (isWithReturnData(item)) {
        returnData = item.returnData;
        if (methodIface && methodFragment) {
            const returnValueRaw = methodIface.decodeFunctionResult(methodFragment, returnData);
            returnValue = mapDeepBigNumberToString(returnValueRaw);
            /*
            if (
                methodFragment.outputs?.length === 1 &&
                methodFragment.outputs[0].name === null
            ) {
                returnValue = (returnValue as any)[0];
            }
            */
        }
    } else if (isWithReturnValue(item)) {
        returnValue = item.returnValue;
        returnData = methodIface!.encodeFunctionResult(methodFragment!, item.returnValue);
    }

    const returnValueIdx = argToIdx(returnValue as any);
    const item2: EthCall = {
        ...item,
        networkId,
        to,
        data,
        methodFormatFull,
        from,
        args,
        arg0Idx,
        arg1Idx,
        arg2Idx,
        returnValue,
        returnData,
        returnValueIdx,
    };
    return omitBy(item2, isUndefined) as EthCall;
}

export async function preWriteBulkDBEthCall(items: EthCall[]): Promise<EthCall[]> {
    return items.map((item) => {
        return { ...item, updatedAt: Date.now() };
    });
}

export function createEthCallFactory<Args extends any[] = any[], Ret = any>(methodFormatFull: string) {
    return (e: Omit<EthCall, "methodFormatFull" | "data" | "args"> & { args: Args }) => {
        return validateEthCall({
            ...e,
            methodFormatFull,
        } as any) as EthCall<Args, Ret>;
    };
}
