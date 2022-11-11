import { NFTGenerativeTraitColorClass } from './NFTGenerativeTraitColorClass.js';
import { NFTGenerativeTraitColormapClass } from './NFTGenerativeTraitColormapClass.js';
import { NFTGenerativeTraitEnumClass } from './NFTGenerativeTraitEnumClass.js';
import { NFTGenerativeTraitImageClass } from './NFTGenerativeTraitImageClass.js';
import { NFTGenerativeTraitNumberClass } from './NFTGenerativeTraitNumberClass.js';
import {
    isNFTGenerativeTraitColor,
    isNFTGenerativeTraitColormap,
    isNFTGenerativeTraitEnum,
    isNFTGenerativeTraitImage,
    isNFTGenerativeTraitNumber,
    NFTGenerativeTraitBase,
} from '../../types/index.js';

export type NFTGenerativeTraitClass =
    | NFTGenerativeTraitColorClass
    | NFTGenerativeTraitColormapClass
    | NFTGenerativeTraitEnumClass
    | NFTGenerativeTraitImageClass
    | NFTGenerativeTraitNumberClass;

export function createFromNFTGenerativeGenerativeAttributeBase(attribute: NFTGenerativeTraitBase) {
    if (isNFTGenerativeTraitColor(attribute)) {
        return new NFTGenerativeTraitColorClass(attribute);
    } else if (isNFTGenerativeTraitColormap(attribute)) {
        return new NFTGenerativeTraitColormapClass(attribute);
    } else if (isNFTGenerativeTraitEnum(attribute)) {
        return new NFTGenerativeTraitEnumClass(attribute);
    } else if (isNFTGenerativeTraitImage(attribute)) {
        return new NFTGenerativeTraitImageClass(attribute);
    } else if (isNFTGenerativeTraitNumber(attribute)) {
        return new NFTGenerativeTraitNumberClass(attribute);
    }

    throw new NFTGenerativeTraitClassInvalid();
}

export class NFTGenerativeTraitClassInvalid extends Error {
    constructor(msg?: string) {
        if (!msg) super('Should be Color, Colormap, Enum, Image, or Number');
        else super(msg);
        this.name = 'NFTGenerativeTraitClassInvalid';
    }
}
