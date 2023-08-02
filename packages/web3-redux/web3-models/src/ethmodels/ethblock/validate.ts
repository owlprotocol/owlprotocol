import type { EthBlockTransaction } from "./BlockTransaction.js";
import type { EthBlockId } from "./id.js";

/** @internal */
export function validateIdEthBlock({ networkId, number }: EthBlockId) {
    return { networkId, number };
}

export function toPrimaryKeyEthBlock({ networkId, number }: EthBlockId): [string, number] {
    return [networkId, number];
}

/** @internal */
export function validateEthBlock(item: EthBlockTransaction): EthBlockTransaction {
    return item;
}
