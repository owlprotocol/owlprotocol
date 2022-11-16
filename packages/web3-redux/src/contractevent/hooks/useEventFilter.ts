import { useMemo } from "react";
import { useContract } from "../../contract/hooks/useContract.js";
import { getEventFilter } from "../sagas/getEventFilter.js";

export function useEventFilter(
    networkId: string | undefined,
    address: string | undefined,
    name: string | undefined,
    filter?: Record<string, any>) {
    const [contract] = useContract(networkId, address)
    const event = contract?.abi!.find((a) => a.type === 'event' && a.name === name)!

    const result = useMemo(() => {
        if (networkId && address && event) {
            return getEventFilter({ networkId, address, filter }, event)
        }
    }, [networkId, address, JSON.stringify(filter), JSON.stringify(event)])

    return result
}
