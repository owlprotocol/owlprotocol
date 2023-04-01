import { isUndefined, omitBy } from "lodash-es";
import type { AbiItem } from "web3-utils";

export interface ERC165AbiId {
    readonly interfaceId: string;
}

export interface ERC165Abi extends ERC165AbiId {
    readonly abi: AbiItem[];
    readonly name?: string;
}

export function validateIdERC165Abi({ interfaceId }: ERC165AbiId): ERC165AbiId {
    return { interfaceId };
}
export function validateERC165Abi({ interfaceId, abi, name }: ERC165Abi): ERC165Abi {
    return omitBy({ interfaceId, abi, name }, isUndefined) as unknown as ERC165Abi;
}

export function toPrimaryKeyERC165Abi({ interfaceId }: ERC165AbiId): string {
    return interfaceId;
}
