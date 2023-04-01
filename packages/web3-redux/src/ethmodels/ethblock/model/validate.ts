import { EthBlockTransaction } from "./BlockTransaction.js";
import { EthBlockId } from "./id.js";

/** @internal */
export function validateId({ networkId, number }: EthBlockId) {
    return { networkId, number };
}

export function toPrimaryKey({ networkId, number }: EthBlockId): [string, number] {
    return [networkId, number];
}

/** @internal */
export function validate(item: EthBlockTransaction): EthBlockTransaction {
    return item;
}
