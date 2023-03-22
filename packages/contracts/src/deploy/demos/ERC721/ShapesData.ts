import {
    blackGradient,
    NFTGenerativeCollection,
    NFTGenerativeCollectionClass, NFTGenerativeTraitColor, NFTGenerativeTraitColorClass, NFTGenerativeTraitColormap,
    NFTGenerativeTraitColormapClass, NFTGenerativeTraitEnum, NFTGenerativeTraitEnumClass, NFTGenerativeTraitImage,
    NFTGenerativeTraitImageClass, NFTGenerativeTraitNumber, NFTGenerativeTraitNumberClass, whiteGradient,
} from '@owlprotocol/nft-sdk';

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

export const traitColormap: NFTGenerativeTraitColormap = {
    name: 'colormap',
    type: 'colormap',
    options: [
        { value: 'white', colors: whiteGradient },
        { value: 'black', colors: blackGradient },
    ],
};

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

export const traitBgColor: NFTGenerativeTraitColor = {
    name: 'bgColor',
    type: 'color',
    min: 0,
    max: 255,
    colormap: 'colormap',
};

export const traitEnum: NFTGenerativeTraitEnum = {
    name: 'faction',
    type: 'enum',
    options: ['earth', 'wind', 'fire', 'water'],
};

export const traitStrokeWidth: NFTGenerativeTraitNumber = {
    name: 'strokeWidth',
    type: 'number',
    min: 0,
    max: 3,
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

export const collectionShapesNestedChild = NFTGenerativeCollectionClass.fromData(
    collectionshapesNestedChildDef,
) as NFTGenerativeCollectionClass<{
    colormap: NFTGenerativeTraitColormapClass;
    imageFg: NFTGenerativeTraitImageClass;
    strokeWidth: NFTGenerativeTraitNumberClass;
    fillColor: NFTGenerativeTraitColorClass;
    strokeColor: NFTGenerativeTraitColorClass;
}>;

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
