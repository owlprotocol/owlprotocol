import { T_Encoded_Base } from '@owlprotocol/crud-redux';
import { isUndefined, omitBy } from 'lodash-es';

export interface AssetPickerId {
    readonly id: string;
}

export interface AssetERC20 {
    type: 'ERC20',
    networkId: string,
    address: string,
    amount: string
}

export interface AssetERC721 {
    type: 'ERC721',
    networkId: string,
    address: string,
    tokenId: string
}

export interface AssetERC1155 {
    type: 'ERC1155',
    networkId: string,
    address: string,
    tokenId: string,
    amount: string
}
export type Asset = AssetERC20 | AssetERC721 | AssetERC1155

export interface AssetPicker extends AssetPickerId, T_Encoded_Base {
    readonly status: 'LOADING' | 'SELECTING' | 'SELECTED';
    readonly choices?: Asset[];
    readonly selected?: number[];
}

export const AssetPickerIndex = 'id';

/** @internal */
export function validateId({ id }: AssetPickerId): AssetPickerId {
    return { id };
}

export function toPrimaryKey({ id }: AssetPickerId): [string] {
    return [id];
}

/** @internal */
export function validate(item: AssetPicker): AssetPicker {
    return omitBy(item, isUndefined) as AssetPicker;
}
