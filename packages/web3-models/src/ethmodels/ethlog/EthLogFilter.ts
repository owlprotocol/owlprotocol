import {
    WithEventAbi,
    WithEventFormat,
    WithFilter,
    WithTopicsArr,
    getEthLogAbiAndFormatFull,
    inferEthLogFormatFull,
    isWithEventAbi,
    isWithEventFormat,
    isWithTopics,
    isWithFilter,
} from "./interface.js";

export type EthLogFilterPartial<Filter = any> = { networkId: string; address: string | null } & (
    | WithTopicsArr
    | (WithTopicsArr & (WithEventFormat | WithEventAbi))
    | (WithFilter<Filter> & (WithEventFormat | WithEventAbi))
    //only topic0
    | (WithEventFormat | WithEventAbi)
);

export type EthLogFilter = { networkId: string; address: string | null } & (
    | WithTopicsArr
    | (WithTopicsArr & WithEventFormat)
);

export function validateEthLogFilter(item: EthLogFilterPartial): EthLogFilter {
    let results: ReturnType<typeof getEthLogAbiAndFormatFull> | undefined;
    if (isWithEventAbi(item)) {
        results = getEthLogAbiAndFormatFull(item.eventAbi);
    } else if (isWithEventFormat(item)) {
        results = getEthLogAbiAndFormatFull(item.eventFormatFull);
    } else {
        const eventFormatFull = inferEthLogFormatFull(item.topics);
        if (eventFormatFull) {
            results = getEthLogAbiAndFormatFull(eventFormatFull);
        }
    }
    const eventFormatFull = results?.eventFormatFull;
    const eventFragment = results?.eventFragment;
    const eventIface = results?.eventIface;

    //Topics
    let topics: (string | null)[];
    if (isWithTopics(item)) {
        topics = item.topics;
        if ((topics[0] === null || topics === undefined) && eventFragment && eventIface) {
            topics[0] = eventIface.getEventTopic(eventFragment);
        }
    } else if (isWithFilter(item)) {
        //Event interface MUST be defined if topics not specified
        const filterTopics = results!.eventFragment.inputs
            .filter((input) => input.indexed)
            .map((input, i) => {
                return item.filter[input.name] ?? Object.values(item.filter)[i];
            });
        //Filter
        topics = results?.eventIface.encodeFilterTopics(results.eventFragment, filterTopics) as string[];
    } else if (eventFragment && eventIface) {
        topics = [eventIface.getEventTopic(eventFragment)];
    } else {
        throw new Error("Invalid EthLogFilter Required one of topics, eventFormatFull, eventAbi");
    }

    const { networkId } = item;
    const address = item.address?.toLowerCase() ?? null;
    if (eventFormatFull) {
        return { networkId, address, topics, eventFormatFull };
    }
    return {
        networkId,
        address,
        topics,
        eventFormatFull,
    };
}
