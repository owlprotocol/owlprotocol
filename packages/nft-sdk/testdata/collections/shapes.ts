import { traitStrokeWidth } from './number.js';
import { traitColormap } from './colormap.js';
import { traitBgColor, traitFillColor, traitStrokeColor } from './color.js';
import { traitEnum } from './enum.js';
import {
    NFTGenerativeCollectionClass,
    NFTGenerativeTraitColorClass,
    NFTGenerativeTraitColormapClass,
    NFTGenerativeTraitEnumClass,
    NFTGenerativeTraitImageClass,
    NFTGenerativeTraitNumberClass,
} from '../classes/index.js';
import type { NFTGenerativeCollection, NFTGenerativeTraitImage } from '../types/index.js';

//Circle & square Overlay
const bgCircle =
    // eslint-disable-next-line quotes
    "<svg width='100' height='100' viewBox='0 0 100 100' fill='none' xmlns='http://www.w3.org/2000/svg'><circle cx='50' cy='50' r='50' fill='${bgColor}' /></svg>";
const bgSquare =
    // eslint-disable-next-line quotes
    "<svg width='100' height='100' viewBox='0 0 100 100' fill='none' xmlns='http://www.w3.org/2000/svg'><rect width='100' height='100' fill='${bgColor}' /></svg>";
const fgCircle =
    // eslint-disable-next-line quotes
    "<svg width='100' height='100' viewBox='0 0 100 100' fill='none' xmlns='http://www.w3.org/2000/svg'><circle cx='50' cy='50' r='40' fill='${fillColor}' stroke='${strokeColor}' stroke-width='${strokeWidth}' /></svg>";
const fgSquare =
    // eslint-disable-next-line quotes
    "<svg width='100' height='100' viewBox='0 0 100 100' fill='none' xmlns='http://www.w3.org/2000/svg'><rect x='10' y='10' width='80' height='80' fill='${fillColor}' stroke='${strokeColor}' stroke-width='${strokeWidth}' /></svg>";

//image_url can be dummy data
export const traitImageBg: NFTGenerativeTraitImage = {
    name: 'imageBg',
    type: 'image',
    image_type: 'svg',
    options: [
        {
            value: 'circle',
            image: bgCircle,
            image_url: 'bgCircle.svg',
        },
        {
            value: 'square',
            image: bgSquare,
            image_url: 'bgSquare.svg',
        },
    ],
};

export const traitImageFg: NFTGenerativeTraitImage = {
    name: 'imageFg',
    type: 'image',
    image_type: 'svg',
    options: [
        {
            value: 'circle',
            image: fgCircle,
            image_url: 'fgCircle.svg',
        },
        {
            value: 'square',
            image: fgSquare,
            image_url: 'fgSquare.svg',
        },
    ],
};

const collectionShapesDef: NFTGenerativeCollection = {
    name: 'Shapes Collection',
    generatedImageType: 'svg',
    traits: {
        colormap: traitColormap,
        imageBg: traitImageBg,
        imageFg: traitImageFg,
        strokeWidth: traitStrokeWidth,
        bgColor: traitBgColor,
        fillColor: traitFillColor,
        strokeColor: traitStrokeColor,
        faction: traitEnum,
    },
};

export const collectionShapes = NFTGenerativeCollectionClass.fromData(
    collectionShapesDef,
) as NFTGenerativeCollectionClass<{
    colormap: NFTGenerativeTraitColormapClass;
    imageBg: NFTGenerativeTraitImageClass;
    imageFg: NFTGenerativeTraitImageClass;
    strokeWidth: NFTGenerativeTraitNumberClass;
    bgColor: NFTGenerativeTraitColorClass;
    fillColor: NFTGenerativeTraitColorClass;
    strokeColor: NFTGenerativeTraitColorClass;
    faction: NFTGenerativeTraitEnumClass;
}>;

export const circleOnSquareItem = collectionShapes.create({
    attributes: {
        colormap: 'white',
        imageBg: 'square',
        imageFg: 'circle',
        strokeWidth: 0,
        bgColor: 255,
        fillColor: 0,
        strokeColor: 128,
        faction: 'earth',
    },
});

export const circleOnCircleItem = collectionShapes.create({
    attributes: {
        colormap: 'white',
        imageBg: 'circle',
        imageFg: 'circle',
        strokeWidth: 0,
        bgColor: 255,
        fillColor: 0,
        strokeColor: 128,
        faction: 'earth',
    },
});

export const squareOnCircleItem = collectionShapes.create({
    attributes: {
        colormap: 'white',
        imageBg: 'circle',
        imageFg: 'square',
        strokeWidth: 0,
        bgColor: 255,
        fillColor: 0,
        strokeColor: 128,
        faction: 'earth',
    },
});

export const squareOnSquareItem = collectionShapes.create({
    attributes: {
        colormap: 'white',
        imageBg: 'square',
        imageFg: 'square',
        strokeWidth: 0,
        bgColor: 255,
        fillColor: 0,
        strokeColor: 128,
        faction: 'earth',
    },
});

export const shapesItemChoices = {
    [`${circleOnSquareItem.dna()} - circleOnSquare`]: circleOnSquareItem,
    [`${circleOnCircleItem.dna()} - circleOnCircle`]: circleOnCircleItem,
    [`${squareOnCircleItem.dna()} - squareOnCircle`]: squareOnCircleItem,
    [`${squareOnSquareItem.dna()} - squareOnSquare`]: squareOnSquareItem,
};
