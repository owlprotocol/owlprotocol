import type { AbiItem } from "web3-utils";

export interface ERC165AbiId {
    readonly interfaceId: string;
}

export interface ERC165Abi extends ERC165AbiId {
    readonly abi: AbiItem[];
    readonly name?: string;
}

export function validateId({ interfaceId }: ERC165AbiId): ERC165AbiId {
    return { interfaceId };
}

export function toPrimaryKey({ interfaceId }: ERC165AbiId): [string] {
    return [interfaceId];
}

export const ERC165AbiIndex = "interfaceId,name";
