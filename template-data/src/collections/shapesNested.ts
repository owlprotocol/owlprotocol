import { traitStrokeWidth } from './number.js';
import { traitColormap } from './colormap.js';
import { traitBgColor, traitFillColor, traitStrokeColor } from './color.js';
import { traitEnum } from './enum.js';
import { traitImageBg, traitImageFg } from './shapes.js';
import {
    NFTGenerativeCollectionClass,
    NFTGenerativeTraitColorClass,
    NFTGenerativeTraitColormapClass,
    NFTGenerativeTraitEnumClass,
    NFTGenerativeTraitImageClass,
    NFTGenerativeTraitNumberClass,
} from '@owlprotocol/nft-sdk';
import type { NFTGenerativeCollection } from '@owlprotocol/nft-sdk';

const collectionshapesNestedChildDef: NFTGenerativeCollection = {
    name: 'shapesNested Child',
    generatedImageType: 'svg',
    traits: {
        colormap: traitColormap,
        imageFg: traitImageFg,
        strokeWidth: traitStrokeWidth,
        fillColor: traitFillColor,
        strokeColor: traitStrokeColor,
    },
};

const collectionShapesNestedDef: NFTGenerativeCollection = {
    name: 'shapesNested Collection',
    generatedImageType: 'svg',
    traits: {
        colormap: traitColormap,
        imageBg: traitImageBg,
        bgColor: traitBgColor,
        faction: traitEnum,
    },
    //@ts-expect-error
    children: {
        fg: collectionshapesNestedChildDef,
    },
};

export const collectionShapesNestedChild = NFTGenerativeCollectionClass.fromData(
    collectionshapesNestedChildDef,
) as NFTGenerativeCollectionClass<{
    colormap: NFTGenerativeTraitColormapClass;
    imageFg: NFTGenerativeTraitImageClass;
    strokeWidth: NFTGenerativeTraitNumberClass;
    fillColor: NFTGenerativeTraitColorClass;
    strokeColor: NFTGenerativeTraitColorClass;
}>;

export const collectionShapesNested = NFTGenerativeCollectionClass.fromData(
    collectionShapesNestedDef,
) as NFTGenerativeCollectionClass<
    {
        colormap: NFTGenerativeTraitColormapClass;
        imageBg: NFTGenerativeTraitImageClass;
        bgColor: NFTGenerativeTraitColorClass;
        faction: NFTGenerativeTraitEnumClass;
    },
    {
        fg: NFTGenerativeCollectionClass<{
            colormap: NFTGenerativeTraitColormapClass;
            imageFg: NFTGenerativeTraitImageClass;
            strokeWidth: NFTGenerativeTraitNumberClass;
            fillColor: NFTGenerativeTraitColorClass;
            strokeColor: NFTGenerativeTraitColorClass;
        }>;
    }
>;

export const circleOnSquareNestedItem = collectionShapesNested.create({
    attributes: {
        colormap: 'white',
        imageBg: 'square',
        bgColor: 255,
        faction: 'earth',
    },
    children: {
        fg: {
            attributes: {
                colormap: 'white',
                imageFg: 'circle',
                strokeWidth: 0,
                fillColor: 0,
                strokeColor: 128,
            },
        },
    },
});

export const circleOnCircleNestedItem = collectionShapesNested.create({
    attributes: {
        colormap: 'white',
        imageBg: 'circle',
        bgColor: 255,
        faction: 'earth',
    },
    children: {
        fg: {
            attributes: {
                colormap: 'white',
                imageFg: 'circle',
                strokeWidth: 0,
                fillColor: 0,
                strokeColor: 128,
            },
        },
    },
});

export const squareOnCircleNestedItem = collectionShapesNested.create({
    attributes: {
        colormap: 'white',
        imageBg: 'circle',
        bgColor: 255,
        faction: 'earth',
    },
    children: {
        fg: {
            attributes: {
                colormap: 'white',
                imageFg: 'square',
                strokeWidth: 0,
                fillColor: 0,
                strokeColor: 128,
            },
        },
    },
});

export const squareOnSquareNestedItem = collectionShapesNested.create({
    attributes: {
        colormap: 'white',
        imageBg: 'square',

        bgColor: 255,
        faction: 'earth',
    },
    children: {
        fg: {
            attributes: {
                colormap: 'white',
                imageFg: 'square',
                strokeWidth: 0,
                fillColor: 0,
                strokeColor: 128,
            },
        },
    },
});

export const shapesNestedItemChoices = {
    [`${circleOnSquareNestedItem.fullDna()} - circleOnSquare`]: circleOnSquareNestedItem,
    [`${circleOnCircleNestedItem.fullDna()} - circleOnCircle`]: circleOnCircleNestedItem,
    [`${squareOnCircleNestedItem.fullDna()} - squareOnCircle`]: squareOnCircleNestedItem,
    [`${squareOnSquareNestedItem.fullDna()} - squareOnSquare`]: squareOnSquareNestedItem,
};
