import type { NFTGenerativeTraitNumber } from '@owlprotocol/nft-sdk';
import { NFTGenerativeCollectionClass, NFTGenerativeTraitNumberClass } from '@owlprotocol/nft-sdk';

export const traitStrokeWidth: NFTGenerativeTraitNumber = {
    name: 'strokeWidth',
    type: 'number',
    min: 0,
    max: 3,
};

export const collectionNumber = NFTGenerativeCollectionClass.fromData({
    name: 'Number Collection',
    traits: { strokeWidth: traitStrokeWidth },
}) as NFTGenerativeCollectionClass<{ strokeWidth: NFTGenerativeTraitNumberClass }>;

export const zeroNumberItem = collectionNumber.create({ attributes: { strokeWidth: 0 } });
export const zeroNumberDna = zeroNumberItem.dna();

export const oneNumberItem = collectionNumber.create({ attributes: { strokeWidth: 1 } });
export const oneNumberDna = oneNumberItem.dna();

export const twoNumberItem = collectionNumber.create({ attributes: { strokeWidth: 2 } });
export const twoNumberDna = twoNumberItem.dna();

export const threeNumberItem = collectionNumber.create({ attributes: { strokeWidth: 3 } });
export const threeNumberDna = threeNumberItem.dna();

export const numberItemChoices = {
    [`${zeroNumberDna} - zero`]: zeroNumberItem,
    [`${oneNumberDna} - one`]: oneNumberItem,
    [`${twoNumberDna} - two`]: twoNumberItem,
    [`${threeNumberDna} - three`]: threeNumberItem,
};
