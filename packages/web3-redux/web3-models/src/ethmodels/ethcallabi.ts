import { utils } from "ethers";
import type { AbiItem } from "web3-utils";
import { isWithMethodAbi } from "./ethcall.js";

export interface EthCallAbiId {
    readonly methodFormatFull: string;
}

export interface EthCallAbi extends EthCallAbiId {
    readonly methodSighash: string;
}

export type EthCallAbiPartialWithFormat = { readonly methodFormatFull: string };
export type EthCallAbiPartialWithAbi = { readonly methodAbi: AbiItem };
export type EthCallAbiPartial = EthCallAbiPartialWithFormat | EthCallAbiPartialWithAbi;

export function validateIdEthCallAbi({ methodFormatFull }: EthCallAbiId): EthCallAbiId {
    return {
        //@ts-expect-error
        methodFormatFull: methodFormatFull
            ? utils.FunctionFragment.from(methodFormatFull).format(utils.FormatTypes.full).replace("function ", "")
            : undefined,
    };
}

export function toPrimaryKeyEthCallAbi({ methodFormatFull }: EthCallAbiId): string {
    //@ts-expect-error
    return methodFormatFull
        ? utils.FunctionFragment.from(methodFormatFull).format(utils.FormatTypes.full).replace("function ", "")
        : undefined;
}

/** @internal */
export function validateEthCallAbi(item: EthCallAbiPartial): EthCallAbi {
    let methodAbi: AbiItem;
    let methodFormatFull: string;
    let methodSighash: string;
    if (isWithMethodAbi(item)) {
        methodAbi = item.methodAbi;
        const fragment = utils.FunctionFragment.from(methodAbi as any);
        //rewrite to standardize format
        methodAbi = JSON.parse(fragment.format(utils.FormatTypes.json));
        methodSighash = new utils.Interface([fragment]).getSighash(fragment);
        methodFormatFull = fragment.format(utils.FormatTypes.full);
    } else {
        methodFormatFull = item.methodFormatFull;
        const fragment = utils.FunctionFragment.from(methodFormatFull);
        //rewrite to standardize format
        methodFormatFull = fragment.format(utils.FormatTypes.full);
        methodSighash = new utils.Interface([fragment]).getSighash(fragment);
        methodAbi = JSON.parse(fragment.format(utils.FormatTypes.json));
    }

    methodFormatFull = methodFormatFull.replace("function ", "");

    return { methodFormatFull, methodSighash };
}
