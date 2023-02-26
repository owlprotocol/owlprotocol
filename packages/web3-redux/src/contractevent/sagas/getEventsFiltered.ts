import { matches } from "lodash-es";
import { call } from "typed-redux-saga";
import { ContractEventCRUD } from "../crud.js";
import { ContractEvent } from "../model/interface.js";
import { getEventFilterSaga, GetEventFilterSagaParams } from "./getEventFilter.js";

export function* getEventsFilteredSaga({ networkId, address, name, filter }: GetEventFilterSagaParams): Generator<
    any,
    ContractEvent[]
> {

    const { index, filter: filter2 } = yield* call(getEventFilterSaga, { networkId, address, name, filter })
    let events = yield* call(ContractEventCRUD.db.where, index)
    if (filter2) events = events.filter((e) => matches(filter2)(e.returnValues))
    return events
}
