import { utils } from "ethers";
import { AbiItem } from "web3-utils";

export interface EthCallAbiId {
    readonly methodFormatFull: string;
}

export interface EthCallAbi extends EthCallAbiId {
    readonly methodSighash: string;
}

export type EthCallAbiPartialWithFormat = { readonly methodFormatFull: string };
export type EthCallAbiPartialWithAbi = { readonly methodAbi: AbiItem };
export type EthCallAbiPartial = EthCallAbiPartialWithFormat | EthCallAbiPartialWithAbi;

export const EthCallAbiIndex = "methodFormatFull,methodSighash";
export type EthCallAbiIndexInput = EthCallAbiId | { methodSighash: string };

export function isEthLogPartialWithAbi(item: EthCallAbiPartial): item is EthCallAbiPartialWithAbi {
    return (item as EthCallAbiPartialWithAbi).methodAbi != undefined;
}

export function validateId({ methodFormatFull }: EthCallAbiId): EthCallAbiId {
    return { methodFormatFull };
}

export function toPrimaryKey({ methodFormatFull }: EthCallAbiId): [string] {
    return [methodFormatFull];
}

/** @internal */
export function validate(item: EthCallAbiPartial): EthCallAbi {
    let methodAbi: AbiItem;
    let methodFormatFull: string;
    let methodSighash: string;
    if (isEthLogPartialWithAbi(item)) {
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
