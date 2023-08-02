import { ContractFactory, Signer } from "ethers";
import { mapValues } from "../lodash.js";
import { CustomFactory } from "../utils/ERC1167Factory/factory.js";

//Connect general KV object of factories
export function connectFactories<F extends { [k: string]: ContractFactory | CustomFactory }>(factories: F, signer: Signer) {
    return mapValues(factories, (f) => f.connect(signer)) as typeof factories;
}
