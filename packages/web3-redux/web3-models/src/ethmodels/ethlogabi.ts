import { utils } from "ethers";
import type { AbiItem } from "web3-utils";

export interface EthLogAbiId {
    readonly eventFormatFull: string;
}

export interface EthLogAbi extends EthLogAbiId {
    readonly eventSighash: string;
}

export type EthLogAbiPartialWithFormat = { readonly eventFormatFull: string };
export type EthLogAbiPartialWithAbi = { readonly eventAbi: AbiItem };
export type EthLogAbiPartial = EthLogAbiPartialWithFormat | EthLogAbiPartialWithAbi;

export function isEthLogPartialWithAbi(item: EthLogAbiPartial): item is EthLogAbiPartialWithAbi {
    return (item as EthLogAbiPartialWithAbi).eventAbi != undefined;
}

export function validateIdEthLogAbi({ eventFormatFull }: EthLogAbiId): EthLogAbiId {
    return {
        //@ts-expect-error
        eventFormatFull: eventFormatFull
            ? utils.EventFragment.from(eventFormatFull).format(utils.FormatTypes.full).replace("event ", "")
            : undefined,
    };
}

export function toPrimaryKeyEthLogAbi({ eventFormatFull }: EthLogAbiId): string {
    //@ts-expect-error
    return eventFormatFull
        ? utils.EventFragment.from(eventFormatFull).format(utils.FormatTypes.full).replace("event ", "")
        : undefined;
}

/** @internal */
export function validateEthLogAbi(item: EthLogAbiPartial): EthLogAbi {
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
