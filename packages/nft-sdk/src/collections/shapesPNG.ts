import { readFileSync } from 'fs';
import { join } from 'path';
import { NFTGenerativeCollectionClass, NFTGenerativeTraitImageClass } from '../classes/index.js';
import type { NFTGenerativeCollection, NFTGenerativeTraitImage } from '../types/index.js';

//Circle & square Overlay
const path = './testdata/shapesPNG/input';
export const bgCirclePNG = readFileSync(join(path, 'bgCircle.png'), 'base64');
export const bgSquarePNG = readFileSync(join(path, 'bgSquare.png'), 'base64');
export const fgCirclePNG = readFileSync(join(path, 'fgCircle.png'), 'base64');
export const fgSquarePNG = readFileSync(join(path, 'fgSquare.png'), 'base64');

//image_url can be dummy data
export const traitImagePNGBg: NFTGenerativeTraitImage = {
    name: 'imageBg',
    type: 'image',
    image_type: 'png',
    options: [
        {
            value: 'circle',
            image: bgCirclePNG,
            image_url: 'bgCircle.png',
        },
        {
            value: 'square',
            image: bgSquarePNG,
            image_url: 'bgSquare.png',
        },
    ],
};

export const traitImagePNGFg: NFTGenerativeTraitImage = {
    name: 'imageFg',
    type: 'image',
    image_type: 'png',
    options: [
        {
            value: 'circle',
            image: fgCirclePNG,
            image_url: 'fgCircle.png',
        },
        {
            value: 'square',
            image: fgSquarePNG,
            image_url: 'fgSquare.png',
        },
    ],
};

const collectionShapesPNGDef: NFTGenerativeCollection = {
    name: 'Shapes PNG Collection',
    generatedImageType: 'png',
    traits: {
        imageBg: traitImagePNGBg,
        imageFg: traitImagePNGFg,
    },
};

export const collectionShapesPNG = NFTGenerativeCollectionClass.fromData(
    collectionShapesPNGDef,
) as NFTGenerativeCollectionClass<{
    imageBg: NFTGenerativeTraitImageClass;
    imageFg: NFTGenerativeTraitImageClass;
}>;

export const circleOnSquarePNGItem = collectionShapesPNG.create({
    attributes: {
        imageBg: 'square',
        imageFg: 'circle',
    },
});
export const circleOnSquarePNGDna = circleOnSquarePNGItem.dna();

export const circleOnCirclePNGItem = collectionShapesPNG.create({
    attributes: {
        imageBg: 'circle',
        imageFg: 'circle',
    },
});
export const circleOnCirclePNGDna = circleOnCirclePNGItem.dna();

export const squareOnCirclePNGItem = collectionShapesPNG.create({
    attributes: {
        imageBg: 'circle',
        imageFg: 'square',
    },
});
export const squareOnCirclePNGDna = squareOnCirclePNGItem.dna();

export const squareOnSquarePNGItem = collectionShapesPNG.create({
    attributes: {
        imageBg: 'square',
        imageFg: 'square',
    },
});
export const squareOnSquarPNGDna = squareOnSquarePNGItem.dna();

export const shapesPNGChoices = {
    [`${circleOnSquarePNGDna} - circleOnSquare`]: circleOnSquarePNGDna,
    [`${circleOnCirclePNGDna} - circleOnCircle`]: circleOnCirclePNGDna,
    [`${squareOnCirclePNGDna} - squareOnCircle`]: squareOnCirclePNGDna,
    [`${squareOnSquarPNGDna} - squareOnSquare`]: squareOnSquarPNGDna,
};

export const shapesPNGItemChoices = {
    [`${circleOnSquarePNGDna} - circleOnSquare`]: circleOnSquarePNGItem,
    [`${circleOnCirclePNGDna} - circleOnCircle`]: circleOnCirclePNGItem,
    [`${squareOnCirclePNGDna} - squareOnCircle`]: squareOnCirclePNGItem,
    [`${squareOnSquarPNGDna} - squareOnSquare`]: squareOnSquarePNGItem,
};
