import { EthBlockId } from "./id.js";

export type { EthBlockHeader } from "./BlockHeader.js";

export type EthBlockIndexInput = EthBlockId | { networkId: string } | { hash: string } | { timestamp: string };
export const EthBlockIndex = "[networkId+number], networkId, hash, timestamp";
