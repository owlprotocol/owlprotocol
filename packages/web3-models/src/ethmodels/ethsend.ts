import { isUndefined, omitBy } from "lodash-es";
import type { AbiItem } from "web3-utils";
import { v4 as uuidv4 } from "uuid";
import {
    argToIdx,
    getEthCallAbiAndFormatFull,
    isWithData,
    isWithMethodAbi,
    isWithMethodFormat,
    WithArgs,
    WithData,
    WithMethodAbi,
    WithMethodFormat,
} from "./ethcall.js";
import { mapDeepBigNumberToString } from "../utils/mapDeepBigNumberToString.js";

/** EthSend id components */
export interface EthSendId {
    /** unique uuid identifying send action */
    readonly uuid: string;
}

export enum EthSendStatus {
    /** Pending wallet signature. No transaction hash. */
    PENDING_SIGNATURE = "PENDING_SIGNATURE",
    /** Errored. Wallet rejection or network error. */
    ERROR = "ERROR",
    /** Pending blockchain confirmation. Hash created but 0 confirmations. */
    PENDING_CONFIRMATION = "PENDING_CONFIRMATION",
    /** Transaction confirmations > 0. */
    CONFIRMED = "CONFIRMED",
}

export interface EthSendPartialBase {
    readonly uuid?: string;
    /* See [chainlist](https://chainlist.org/) for a list of networks. */
    readonly networkId: string;
    /** `to` field of call */
    readonly to: string;
    /** `value` field for send */
    readonly value: string;
    /** Error Id */
    readonly errorId?: string;
    /** `from` field of call. Some providers may default this to `null` or `ADDRESS_0`. */
    readonly from?: string;
    /** Historical block height to execute call. Defaults to `latest` */
    readonly defaultBlock?: number | "latest";
    /** Maximum `gas` field for call. */
    readonly gas?: number;
    /** Status */
    readonly status?: EthSendStatus;
    /** hash */
    readonly hash?: string;
}

export type EthSendPartial<Args = any> =
    | (EthSendPartialBase & WithData)
    | (EthSendPartialBase & WithData & WithMethodAbi)
    | (EthSendPartialBase & WithData & WithMethodFormat)
    | (EthSendPartialBase & WithArgs<Args> & WithMethodAbi)
    | (EthSendPartialBase & WithArgs<Args> & WithMethodFormat);

export interface EthSend<Args = any> extends EthSendId {
    /** Blockchain network id.
     * See [chainlist](https://chainlist.org/) for a list of networks. */
    readonly networkId: string;
    /** `from` filed of send */
    readonly from?: string;
    /** `to` field of send */
    readonly to: string;
    /** `data` field for send */
    readonly data: string;
    /** `value` field for send */
    readonly value: string;

    //Takes precendence over methodFormatFull
    readonly methodAbi?: AbiItem;
    //Used to index by abi
    readonly methodFormatFull?: string | undefined;
    readonly arg0Idx?: string;
    readonly arg1Idx?: string;
    readonly arg2Idx?: string;

    readonly args?: Args;
    /** Return value of call. Can be raw bytes or decoded with a contract ABI. */
    /** Status */
    readonly status?: EthSendStatus;
    /** Error Id */
    readonly errorId?: string;
    /** Maximum `gas` field for call. */
    readonly gas?: number | undefined;
    readonly hash?: string;
}

export function validateIdEthSend({ uuid }: EthSendId): EthSendId {
    return { uuid };
}

export function toPrimaryKeyEthSend({ uuid }: EthSendId): [string] {
    return [uuid];
}

/** @internal */
export function validateEthSend<Args = any>(item: EthSendPartial<Args>): EthSend {
    //Interface
    let results: ReturnType<typeof getEthCallAbiAndFormatFull> | undefined;
    if (isWithMethodAbi(item)) {
        results = getEthCallAbiAndFormatFull(item.methodAbi);
    } else if (isWithMethodFormat(item)) {
        results = getEthCallAbiAndFormatFull(item.methodFormatFull);
    }

    const methodAbi = results?.methodAbi;
    const methodFormatFull = results?.methodFormatFull;
    const methodFragment = results?.methodFragment;
    const methodIface = results?.methodIface;

    //Args
    let data: string;
    let args: Args;
    if (isWithData(item)) {
        data = item.data;
        args = methodIface?.decodeFunctionData(methodFragment!, data) as Args;
    } else {
        //Interface MUST be defined if Args
        data = methodIface!.encodeFunctionData(methodFragment!, item.args as any);
        args = item.args;
    }

    //TODO: Index by array index or keys
    args = args ? mapDeepBigNumberToString(args) : undefined;
    const arg0Idx = argToIdx((args as any)[0]);
    const arg1Idx = argToIdx((args as any)[1]);
    const arg2Idx = argToIdx((args as any)[2]);

    const { networkId } = item;
    const uuid = item.uuid ?? uuidv4();
    const to = item.to.toLowerCase();
    const from = item.from ? item.from.toLowerCase() : undefined;

    const item2: EthSend = {
        ...item,
        uuid,
        networkId,
        from,
        to,
        data,
        methodAbi,
        methodFormatFull,
        args,
        arg0Idx,
        arg1Idx,
        arg2Idx,
    };
    return omitBy(item2, isUndefined) as EthSend;
}

export function createEthSendFactory<Args extends any[] = any[]>(methodFormatFull: string) {
    return (e: Omit<EthSend, "methodFormatFull" | "data" | "args"> & { args: Args }) => {
        return validateEthSend({
            ...e,
            methodFormatFull,
        } as any) as EthSend<Args>;
    };
}

export const ethSendERC20TransferFactory = createEthSendFactory<[string, string]>("transfer(address,uint256)");
