import { traitImagePNGBg, traitImagePNGFg } from './shapesPNG.js';
import { NFTGenerativeCollectionClass, NFTGenerativeTraitImageClass } from '@owlprotocol/nft-sdk';
import type { NFTGenerativeCollection, NFTGenerativeTraitImage } from '@owlprotocol/nft-sdk';

const collectionShapesPNGNestedDef: NFTGenerativeCollection<
    { imageBg: NFTGenerativeTraitImage },
    { imageFg: NFTGenerativeCollection }
> = {
    name: 'Shapes PNG Nested Collection',
    generatedImageType: 'png',
    traits: {
        imageBg: traitImagePNGBg,
    },
    children: {
        imageFg: {
            name: 'Shapes PNG Nested Collection - Foreground',
            generatedImageType: 'png',
            traits: {
                imageFg: traitImagePNGFg,
            },
        },
    },
};

export const collectionShapesPNGNested = NFTGenerativeCollectionClass.fromData(
    //@ts-expect-error
    collectionShapesPNGNestedDef,
) as NFTGenerativeCollectionClass<
    { imageBg: NFTGenerativeTraitImageClass },
    { imageFg: NFTGenerativeCollectionClass<{ imageFg: NFTGenerativeTraitImageClass }> }
>;

export const circleOnSquarePNGNestedItem = collectionShapesPNGNested.create({
    attributes: {
        imageBg: 'square',
    },
    children: {
        imageFg: {
            attributes: {
                imageFg: 'circle',
            },
        },
    },
});
export const circleOnSquarePNGNestedDna = circleOnSquarePNGNestedItem.dnaWithChildren();

export const circleOnCirclePNGNestedItem = collectionShapesPNGNested.create({
    attributes: {
        imageBg: 'circle',
    },
    children: {
        imageFg: {
            attributes: {
                imageFg: 'circle',
            },
        },
    },
});
export const circleOnCirclePNGNestedDna = circleOnCirclePNGNestedItem.dnaWithChildren();

export const squareOnCirclePNGNestedItem = collectionShapesPNGNested.create({
    attributes: {
        imageBg: 'circle',
    },
    children: {
        imageFg: {
            attributes: {
                imageFg: 'square',
            },
        },
    },
});
export const squareOnCirclePNGNestedDna = squareOnCirclePNGNestedItem.dnaWithChildren();

export const squareOnSquarePNGNestedItem = collectionShapesPNGNested.create({
    attributes: {
        imageBg: 'square',
    },
    children: {
        imageFg: {
            attributes: {
                imageFg: 'square',
            },
        },
    },
});
export const squareOnSquarPNGNestedDna = squareOnSquarePNGNestedItem.dnaWithChildren();

export const shapesPNGNestedDNAChoices = {
    ['circleOnSquare']: circleOnSquarePNGNestedDna,
    ['circleOnCircle']: circleOnCirclePNGNestedDna,
    ['squareOnCircle']: squareOnCirclePNGNestedDna,
    ['squareOnSquare']: squareOnSquarPNGNestedDna,
};

export const shapesPNGNestedItemChoices = {
    [' circleOnSquare']: circleOnSquarePNGNestedItem,
    ['circleOnCircle']: circleOnCirclePNGNestedItem,
    ['squareOnCircle']: squareOnCirclePNGNestedItem,
    ['squareOnSquare']: squareOnSquarePNGNestedItem,
};
