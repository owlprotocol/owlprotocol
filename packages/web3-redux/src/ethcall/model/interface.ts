import { T_Encoded_Base } from '@owlprotocol/crud-redux';
import { isUndefined, omitBy } from 'lodash-es';

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

export interface EthCall<Args extends any[] = any[], Ret = any> extends EthCallId, T_Encoded_Base {
    /** Contract Call indexing */
    readonly methodName?: string;
    readonly methodSignature?: string;
    readonly arg0Idx?: string;
    readonly arg1Idx?: string;
    readonly arg2Idx?: string;
    readonly returnValueIdx?: string;

    readonly args?: Args;
    readonly argsHash?: string; //TODO: Remove replace with computing `data` parameter using methodSignature
    /** Return value of call. Can be raw bytes or decoded with a contract ABI. */
    readonly returnValue?: Ret;
    /** Status */
    readonly status?: 'LOADING' | 'SUCCESS' | 'ERROR';
    /** Error Id */
    readonly errorId?: string;
    /** `from` field of call. Some providers may default this to `null` or `ADDRESS_0`. */
    readonly from?: string;
    /** Historical block height to execute call. Defaults to `latest` */
    readonly defaultBlock?: number | 'latest';
    /** Maximum `gas` field for call. */
    readonly gas?: number;
}

//Valid indexes
export type EthCallIndexInput =
    | EthCallId
    //TODO: Remove these
    | { networkId: string; to: string; methodName: string }
    | { networkId: string; to: string; methodName: string; argsHash: string }
    | { networkId: string; methodName: string; argsHash: string }
    | { networkId: string, methodName: string; }
    //Indices
    | { networkId: string, to: string; methodSignature: string; }
    | { networkId: string, to: string; methodSignature: string; arg0Idx: string }
    | { networkId: string, to: string; methodSignature: string; arg1Idx: string }
    | { networkId: string, to: string; methodSignature: string; arg2Idx: string }
    | { networkId: string, to: string; methodSignature: string; returnValueIdx: string }
    | { networkId: string, methodSignature: string; }
    | { networkId: string, methodSignature: string; arg0Idx: string }
    | { networkId: string, methodSignature: string; arg1Idx: string }
    | { networkId: string, methodSignature: string; arg2Idx: string }
    | { networkId: string, methodSignature: string; returnValueIdx: string }

export const EthCallIndex =
    '[networkId+to+data],\
[networkId+to+methodName],\
[networkId+to+methodName+argsHash],\
[networkId+methodName+argsHash],\
[networkId+methodName],\
[networkId+to+methodSignature],\
[networkId+to+methodSignature+arg0Idx],\
[networkId+to+methodSignature+arg1Idx],\
[networkId+to+methodSignature+arg2Idx],\
[networkId+to+methodSignature+returnValueIdx],\
[networkId+methodSignature],\
[networkId+methodSignature+arg0Idx],\
[networkId+methodSignature+arg1Idx],\
[networkId+methodSignature+arg2Idx],\
[networkId+methodSignature+returnValueIdx]';

/** @internal */
export function validateId({ networkId, to, data }: EthCallId): EthCallId {
    return {
        networkId: networkId,
        to: to.toLowerCase(),
        data: data,
    };
}

export function toPrimaryKey({ networkId, to, data }: EthCallId): [string, string, string] {
    return [networkId, to.toLowerCase(), data];
}

export function argToIdx(x: undefined | string | number | object) {
    if (x === undefined) return ''
    else if (typeof x === 'string') return x;
    else if (typeof x === 'number') return `${x}`
    else return JSON.stringify(x)
}

/** @internal */
export function validate(item: EthCall): EthCall {
    const { networkId, to, data } = validateId(item);
    const from = item.from ? item.from.toLowerCase() : undefined;
    const args = item.args ?? [];
    const returnValue = item.returnValue
    const argsHash = JSON.stringify(args);
    const arg0Idx = argToIdx(args[0])
    const arg1Idx = argToIdx(args[1])
    const arg2Idx = argToIdx(args[2])
    const returnValueIdx = argToIdx(returnValue)

    return omitBy(
        {
            ...item,
            networkId,
            to,
            data,
            from,
            args,
            argsHash,
            arg0Idx,
            arg1Idx,
            arg2Idx,
            returnValueIdx
        },
        isUndefined,
    ) as unknown as EthCall;
}

export default EthCall;
