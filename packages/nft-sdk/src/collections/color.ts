import { traitColormap } from './colormap.js';
import type { NFTGenerativeTraitColor } from '../types/index.js';
import {
    NFTGenerativeCollectionClass,
    NFTGenerativeTraitColorClass,
    NFTGenerativeTraitColormapClass,
} from '../classes/index.js';

export const traitBgColor: NFTGenerativeTraitColor = {
    name: 'bgColor',
    type: 'color',
    min: 0,
    max: 255,
    colormap: 'colormap',
};

export const traitFillColor: NFTGenerativeTraitColor = {
    name: 'fillColor',
    type: 'color',
    min: 0,
    max: 255,
    colormap: 'colormap',
};

export const traitStrokeColor: NFTGenerativeTraitColor = {
    name: 'strokeColor',
    type: 'color',
    min: 0,
    max: 255,
    colormap: 'colormap',
};

export const collectionColor = NFTGenerativeCollectionClass.fromData({
    name: 'Color Collection',
    traits: { colormap: traitColormap, bgColor: traitBgColor },
}) as NFTGenerativeCollectionClass<{
    colormap: NFTGenerativeTraitColormapClass;
    bgColor: NFTGenerativeTraitColorClass;
}>;

export const whiteColorItem = collectionColor.create({ attributes: { colormap: 'white', bgColor: 0 } });
export const whiteColorDna = whiteColorItem.dna();

export const blackColorItem = collectionColor.create({ attributes: { colormap: 'white', bgColor: 255 } });
export const blackColorDna = blackColorItem.dna();

export const colorItemChoices = {
    [`${blackColorDna} - black`]: blackColorItem,
    [`${whiteColorDna} - white`]: whiteColorItem,
};
