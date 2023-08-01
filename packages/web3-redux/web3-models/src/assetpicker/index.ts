import { isUndefined, omitBy } from "lodash-es";

export interface AssetPickerId {
    readonly id: string;
}

export interface AssetERC20 {
    type: "ERC20";
    networkId: string;
    address: string;
    amount: string;
}

export interface AssetERC721 {
    type: "ERC721";
    networkId: string;
    address: string;
    tokenId: string;
}

export interface AssetERC1155 {
    type: "ERC1155";
    networkId: string;
    address: string;
    tokenId: string;
    amount: string;
}
export type Asset = AssetERC20 | AssetERC721 | AssetERC1155;

export interface AssetPicker extends AssetPickerId {
    readonly status: "LOADING" | "SELECTING" | "SELECTED";
    readonly choices?: Asset[];
    readonly selected?: number[];
}

/** @internal */
export function validateIdAssetPicker({ id }: AssetPickerId): AssetPickerId {
    return { id };
}

export function toPrimaryKeyAssetPicker({ id }: AssetPickerId): [string] {
    return [id];
}

/** @internal */
export function validateAssetPicker(item: AssetPicker): AssetPicker {
    return omitBy(item, isUndefined) as AssetPicker;
}
