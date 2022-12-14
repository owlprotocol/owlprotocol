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

export interface EthCall extends EthCallId, T_Encoded_Base {
    /** Contract Call indexing */
    readonly methodName?: string;
    readonly methodSignature?: string;
    readonly args?: any[];
    readonly argsHash?: string;
    /** Return value of call. Can be raw bytes or decoded with a contract ABI. */
    readonly returnValue?: any;
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
    | { networkId: string; to: string }
    | { networkId: string }
    | { networkId: string; to: string; methodName: string; argsHash: string }
    | { networkId: string; to: string; methodName: string }
    | { networkId: string; methodName: string }
    | { methodName: string };

export const EthCallIndex =
    '[networkId+to+data], [networkId+to+methodName+argsHash], [networkId+methodName], methodName';

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

/** @internal */
export function validate(item: EthCall): EthCall {
    const { networkId, to, data } = validateId(item);
    const from = item.from ? item.from.toLowerCase() : undefined;
    const args = item.args ?? [];
    const argsHash = JSON.stringify(args);

    return omitBy(
        {
            ...item,
            networkId,
            to,
            data,
            from,
            args,
            argsHash,
        },
        isUndefined,
    ) as unknown as EthCall;
}

export default EthCall;
