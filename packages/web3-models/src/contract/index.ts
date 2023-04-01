import type { AbiItem } from "web3-utils";
import { isUndefined, omitBy } from "lodash-es";
import { abiDeterministic } from "../utils/abiDeterministic.js";

/**
 * Contract Id object.
 *
 */
export interface ContractId {
    /** Blockchain network id.
     * See [chainlist](https://chainlist.org/) for a list of networks. */
    readonly networkId: string;
    /** Contract ethereum address */
    readonly address: string;
}

/** @internal */
export interface ContractMetadata {
    readonly name?: string;
    readonly image?: string;
    [k: string]: any;
}

/**
 * Contract object.
 * @typeParam T
 * [TypeChain](https://github.com/dethcrypto/TypeChain) web3.js contract. Enables getting type inference for calls and events. Defaults to standard Contracts.Web3.js contract interface.
 */
export interface Contract extends ContractId {
    /** Contract ABI */
    readonly abi?: AbiItem[];
    /** Account balance in wei */
    readonly balance?: string;
    /** Account nonce aka number of transactions sent. */
    readonly nonce?: number;
    /** Code stored at address */
    readonly code?: string;
    /** Ens domain associated with address */
    readonly ens?: string;
    /** Custom label set by user for address */
    readonly label?: string;
    /** Custom tags set to index address */
    readonly tags?: string[];
    /** Metadata */
    readonly metadataURI?: string;
    /** Metadata JSON */
    readonly metadata?: ContractMetadata;
    /** Interface was checked */
    readonly interfaceCheckedAt?: number;
}

/** @internal */
export function validateIdContract({ networkId, address }: ContractId): ContractId {
    return {
        networkId,
        address: address.toLowerCase(),
    };
}

export function toPrimaryKeyContract({ networkId, address }: ContractId): [string, string] {
    return [networkId, address.toLowerCase()];
}

/** @internal */
export function validateContract(contract: Contract): Contract {
    const abi = contract.abi;

    const item: Contract = {
        ...contract,
        address: contract.address.toLowerCase(),
        abi: abi ? abiDeterministic(abi) : undefined,
    };
    return omitBy(item, isUndefined) as Contract;
}
