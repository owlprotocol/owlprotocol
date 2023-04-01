import { utils } from "ethers";
import { AbiItem } from "web3-utils";

export interface EthLogAbiId {
    readonly eventFormatFull: string;
}

export interface EthLogAbi extends EthLogAbiId {
    readonly eventSighash: string;
}

export type EthLogAbiPartialWithFormat = { readonly eventFormatFull: string };
export type EthLogAbiPartialWithAbi = { readonly eventAbi: AbiItem };
export type EthLogAbiPartial = EthLogAbiPartialWithFormat | EthLogAbiPartialWithAbi;

export const EthLogAbiIndex = "eventFormatFull,eventSighash";
export type EthLogAbiIndexInput = EthLogAbiId | { eventSighash: string };

export function isEthLogPartialWithAbi(item: EthLogAbiPartial): item is EthLogAbiPartialWithAbi {
    return (item as EthLogAbiPartialWithAbi).eventAbi != undefined;
}

export function validateId({ eventFormatFull }: EthLogAbiId): EthLogAbiId {
    return { eventFormatFull };
}

export function toPrimaryKey({ eventFormatFull }: EthLogAbiId): [string] {
    return [eventFormatFull];
}

/** @internal */
export function validate(item: EthLogAbiPartial): EthLogAbi {
    let eventAbi: AbiItem;
    let eventFormatFull: string;
    let eventSighash: string;
    if (isEthLogPartialWithAbi(item)) {
        eventAbi = item.eventAbi;
        const fragment = utils.EventFragment.from(eventAbi as any);
        //rewrite to standardize format
        eventAbi = JSON.parse(fragment.format(utils.FormatTypes.json));
        eventSighash = new utils.Interface([fragment]).getEventTopic(fragment);
        eventFormatFull = fragment.format(utils.FormatTypes.full);
    } else {
        eventFormatFull = item.eventFormatFull;
        const fragment = utils.EventFragment.from(eventFormatFull);
        //rewrite to standardize format
        eventFormatFull = fragment.format(utils.FormatTypes.full);
        eventSighash = new utils.Interface([fragment]).getEventTopic(fragment);
        eventAbi = JSON.parse(fragment.format(utils.FormatTypes.json));
    }

    eventFormatFull = eventFormatFull.replace("event ", "");

    return { eventFormatFull, eventSighash };
}
