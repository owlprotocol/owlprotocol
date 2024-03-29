import type { NFTGenerativeTraitColormap } from '@owlprotocol/nft-sdk';
import {
    NFTGenerativeCollectionClass,
    NFTGenerativeTraitColormapClass,
    blackGradient,
    whiteGradient
} from '@owlprotocol/nft-sdk';

export const traitColormap: NFTGenerativeTraitColormap = {
    name: 'colormap',
    type: 'colormap',
    options: [
        { value: 'white', colors: whiteGradient },
        { value: 'black', colors: blackGradient },
    ],
};

export const collectionColormap = NFTGenerativeCollectionClass.fromData({
    name: 'Colormap Collection',
    traits: { colormap: traitColormap },
}) as NFTGenerativeCollectionClass<{ colormap: NFTGenerativeTraitColormapClass }>;

//White
export const whiteColormapItem = collectionColormap.create({ attributes: { colormap: 'white' } });
export const whiteColormapDna = whiteColormapItem.dna();

//Black
export const blackColormapItem = collectionColormap.create({ attributes: { colormap: 'black' } });
export const blackColormapDna = blackColormapItem.dna();

export const colormapItemChoices = {
    [`${whiteColormapDna} - whiteColormap`]: whiteColormapItem,
    [`${blackColormapDna} - blackColormap`]: blackColormapItem,
};
