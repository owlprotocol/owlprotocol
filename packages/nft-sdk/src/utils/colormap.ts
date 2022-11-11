import { NFTGenerativeTraitColormapClass } from '../classes/NFTGenerativeTrait/NFTGenerativeTraitColormapClass.js';
import { RGB } from '../types/RGB.js';

/**
 * Standard Owl Protocol Colormap Trait
 * Stored in 2bits
 */

const greyPalette = new Array(256).fill([0, 0, 0]).map(([r, g, b], i) => [r + i, g + i, b + i]) as RGB[];
const rgPalette = new Array(256).fill([0, 0, 0]).map(([r, g], i) => [r + 1, g + i, 0]) as RGB[];
const rbPalette = new Array(256).fill([0, 0, 0]).map(([r, , b], i) => [r + i, 0, b + i]) as RGB[];
const gbPalette = new Array(256).fill([0, 0, 0]).map(([, g, b], i) => [0, g + i, b + i]) as RGB[];

export const defaultColormapOptions = {
    grey: greyPalette,
    rg: rgPalette,
    rb: rbPalette,
    gb: gbPalette,
} as { [k: string]: RGB[] };

export const defaultColormap = new NFTGenerativeTraitColormapClass({
    name: 'colormap',
    type: 'colormap',
    options: [
        { value: 'grey', colors: greyPalette },
        { value: 'rg', colors: rgPalette },
        { value: 'rb', colors: rbPalette },
        { value: 'gb', colors: gbPalette },
    ],
});
