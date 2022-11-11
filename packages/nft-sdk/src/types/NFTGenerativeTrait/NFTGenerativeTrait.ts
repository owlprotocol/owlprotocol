import { NFTGenerativeTraitColor, NFTGenerativeTraitColorOption } from './NFTGenerativeTraitColor.js';
import { NFTGenerativeTraitColormap, NFTGenerativeTraitColormapOption } from './NFTGenerativeTraitColormap.js';
import { NFTGenerativeTraitEnum, NFTGenerativeTraitEnumOption } from './NFTGenerativeTraitEnum.js';
import { NFTGenerativeTraitImage, NFTGenerativeTraitImageOption } from './NFTGenerativeTraitImage.js';
import { NFTGenerativeTraitNumber, NFTGenerativeTraitNumberOption } from './NFTGenerativeTraitNumber.js';

export type NFTGenerativeTrait =
    | NFTGenerativeTraitColor
    | NFTGenerativeTraitColormap
    | NFTGenerativeTraitEnum
    | NFTGenerativeTraitImage
    | NFTGenerativeTraitNumber;

type NFTGenerativeTraitOptionAny =
    | NFTGenerativeTraitColorOption
    | NFTGenerativeTraitColormapOption
    | NFTGenerativeTraitEnumOption
    | NFTGenerativeTraitImageOption
    | NFTGenerativeTraitNumberOption;

export type NFTGenerativeTraitOption<T extends NFTGenerativeTrait = NFTGenerativeTrait> =
    T extends NFTGenerativeTraitColor
    ? NFTGenerativeTraitColorOption
    : T extends NFTGenerativeTraitColormap
    ? NFTGenerativeTraitColormap
    : T extends NFTGenerativeTraitEnum
    ? NFTGenerativeTraitEnumOption
    : T extends NFTGenerativeTraitImage
    ? NFTGenerativeTraitImageOption
    : T extends NFTGenerativeTraitNumber
    ? NFTGenerativeTraitNumberOption
    : NFTGenerativeTraitOptionAny;

export type AttributeValue = number | string;
export type AttributeFormatted = NFTGenerativeTraitOption;
