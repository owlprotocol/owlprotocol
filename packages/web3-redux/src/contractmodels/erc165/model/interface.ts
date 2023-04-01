import { isUndefined, omitBy } from "lodash-es";

/** ERC165 id components */
export interface ERC165Id {
    /** Blockchain network id.
     * See [chainlist](https://chainlist.org/) for a list of networks. */
    readonly networkId: string;
    readonly address: string;
    readonly interfaceId: string;
}

export type ERC165 = ERC165Id;

//Valid indexes
export type ERC165IndexInput =
    | ERC165Id
    //Indices
    | { networkId: string; address: string }
    | { networkId: string; interfaceId: string }
    | { interfaceId: string };

export type ERC165IndexInputAnyOf =
    | {
          networkId: string[] | string;
          address: string[] | string;
          interfaceId: string[] | string;
      }
    | { networkId: string[] | string; address: string[] | string }
    | { networkId: string[] | string; interfaceId: string[] | string }
    | { interfaceId: string[] | string };

export const ERC165Index =
    "[networkId+address+interfaceId],\
[networkId+address],\
[networkId+interfaceId],\
interfaceId";

/** @internal */
export function validateId({ networkId, address, interfaceId }: ERC165Id): ERC165Id {
    return {
        networkId: networkId,
        address: address.toLowerCase(),
        interfaceId,
    };
}

export function toPrimaryKey({ networkId, address, interfaceId }: ERC165Id): [string, string, string] {
    return [networkId, address.toLowerCase(), interfaceId];
}

/** @internal */
export function validate(item: ERC165): ERC165 {
    const item2: ERC165 = {
        ...item,
        ...validateId(item),
    };
    return omitBy(item2, isUndefined) as ERC165;
}
