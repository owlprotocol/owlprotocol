import type { NFTGenerativeTraitEnum } from '../types/index.js';
import { NFTGenerativeCollectionClass, NFTGenerativeTraitEnumClass } from '../classes/index.js';

export const traitEnum: NFTGenerativeTraitEnum = {
    name: 'faction',
    type: 'enum',
    options: ['earth', 'wind', 'fire', 'water'],
};

export const collectionEnum = NFTGenerativeCollectionClass.fromData({
    name: 'Enum Collection',
    traits: { faction: traitEnum },
}) as NFTGenerativeCollectionClass<{ faction: NFTGenerativeTraitEnumClass }>;

export const earthEnumItem = collectionEnum.create({ attributes: { faction: 'earth' } });
export const earthEnumDna = earthEnumItem.dna();

export const windEnumItem = collectionEnum.create({ attributes: { faction: 'wind' } });
export const windEnumDna = windEnumItem.dna();

export const fireEnumItem = collectionEnum.create({ attributes: { faction: 'fire' } });
export const fireEnumDna = fireEnumItem.dna();

export const waterEnumItem = collectionEnum.create({ attributes: { faction: 'water' } });
export const waterEnumDna = waterEnumItem.dna();

export const enumItemChoices = {
    [`${earthEnumDna} - earth`]: earthEnumItem,
    [`${windEnumDna} - wind`]: windEnumItem,
    [`${fireEnumDna} - fire`]: fireEnumItem,
    [`${waterEnumDna} - water`]: waterEnumItem,
};
