//Get filter like saga
import { matches, omitBy } from "lodash-es";
import { useMemo } from "react";
import { ContractEventCRUD } from "../crud.js";
import { useEventFilter } from "./useEventFilter.js";

export function useEventsFiltered(
    networkId: string | undefined,
    address: string | undefined,
    name: string | undefined,
    filter?: Record<string, any>,
    options?: {
        reverse?: boolean;
        offset?: number;
        limit?: number;
    }) {

    const eventFilter = useEventFilter(networkId, address, name, filter)
    let [events, returnOptions] = ContractEventCRUD.hooks.useWhere(eventFilter?.index, options)

    const eventsFiltered = useMemo(() => {
        if (events && eventFilter?.filter) return events.filter((e) => matches(eventFilter.filter)(e.returnValues))

        return events;
    }, [events, eventFilter?.filter])

    return [eventsFiltered, returnOptions] as [typeof eventsFiltered, typeof returnOptions]
}
