import {
    traitRarityClassEnum,
    traitImageThBg,
    traitImageLight,
    traitImageBase,
    traitImageGlasses,
    traitImageDress,
    traitImageHats,
    traitImageFacialHair,
} from './threadhaus.js';

import {
    NFTGenerativeCollection
} from '../types/index.js';

import {
    NFTGenerativeCollectionClass,
    NFTGenerativeTraitEnumClass,
    NFTGenerativeTraitImageClass,
} from '../classes/index.js';

const collInnovotGlassesChildDef: NFTGenerativeCollection = {
    name: 'Thread Haus - Innovot NFT Glasses Sub-Collection',
    description: '',
    external_url: 'https://linktr.ee/threadhausco',
    seller_fee_basis_points: 10000,
    fee_recipient: '0xCF28F97AbDfE1d0b9c51aDF6cF334f6489e080Fd',
    generatedImageType: 'png',
    traits: {
        glasses: traitImageGlasses,
    },
};

const collInnovotDressChildDef: NFTGenerativeCollection = {
    name: 'Thread Haus - Innovot NFT Dresses/Shirts Sub-Collection',
    description: '',
    external_url: 'https://linktr.ee/threadhausco',
    seller_fee_basis_points: 10000,
    fee_recipient: '0xCF28F97AbDfE1d0b9c51aDF6cF334f6489e080Fd',
    generatedImageType: 'png',
    traits: {
        dress: traitImageDress,
    },
};

const collInnovotHatsChildDef: NFTGenerativeCollection = {
    name: 'Thread Haus - Innovot NFT Hats Sub-Collection',
    description: '',
    external_url: 'https://linktr.ee/threadhausco',
    seller_fee_basis_points: 10000,
    fee_recipient: '0xCF28F97AbDfE1d0b9c51aDF6cF334f6489e080Fd',
    generatedImageType: 'png',
    traits: {
        hats: traitImageHats,
    },
};

const collInnovotFacialHairChildDef: NFTGenerativeCollection = {
    name: 'Thread Haus - Innovot NFT Facial Hair Sub-Collection',
    description: '',
    external_url: 'https://linktr.ee/threadhausco',
    seller_fee_basis_points: 10000,
    fee_recipient: '0xCF28F97AbDfE1d0b9c51aDF6cF334f6489e080Fd',
    generatedImageType: 'png',
    traits: {
        facial_hair: traitImageFacialHair,
    },
};

const collInnovotNestedDef: NFTGenerativeCollection = {
    name: 'Thread Haus - Innovot NFT Collection',
    description:
        'InnoVot is a father x son collaboration and inspired by some of Thread haus Collection and some of the industry top trendsetters in fashion music and film',
    image: 'http://localhost:3000/threadhaus/image.jpg',
    external_url: 'https://tell.ie/threadhausCo/D5RQ6SBsgpAp',
    seller_fee_basis_points: 10000,
    fee_recipient: '0xCF28F97AbDfE1d0b9c51aDF6cF334f6489e080Fd',
    generatedImageType: 'png',
    traits: {
        rarityClass: traitRarityClassEnum,
        background: traitImageThBg,
        light: traitImageLight,
        base: traitImageBase,
    },
    //@ts-ignore
    children: {
        glasses: collInnovotGlassesChildDef,
        dress: collInnovotDressChildDef,
        hats: collInnovotHatsChildDef,
        facial_hair: collInnovotFacialHairChildDef,
    },
};

export const collInnovotThGlassesChild = NFTGenerativeCollectionClass.fromData(
    collInnovotGlassesChildDef,
) as NFTGenerativeCollectionClass<{
    glasses: NFTGenerativeTraitImageClass;
}>;

export const collInnovotThDressChild = NFTGenerativeCollectionClass.fromData(
    collInnovotGlassesChildDef,
) as NFTGenerativeCollectionClass<{
    dress: NFTGenerativeTraitImageClass;
}>;

export const collInnovotThHatsChild = NFTGenerativeCollectionClass.fromData(
    collInnovotGlassesChildDef,
) as NFTGenerativeCollectionClass<{
    hats: NFTGenerativeTraitImageClass;
}>;

export const collInnovotFacialHairChild = NFTGenerativeCollectionClass.fromData(
    collInnovotGlassesChildDef,
) as NFTGenerativeCollectionClass<{
    facial_hair: NFTGenerativeTraitImageClass;
}>;

const collInnovot = NFTGenerativeCollectionClass.fromData(collInnovotNestedDef) as NFTGenerativeCollectionClass<
    {
        rarityClass: NFTGenerativeTraitEnumClass;
        background: NFTGenerativeTraitImageClass;
        light: NFTGenerativeTraitImageClass;
        base: NFTGenerativeTraitImageClass;
    },
    {
        glasses: NFTGenerativeCollectionClass<{
            glasses: NFTGenerativeTraitImageClass;
        }>;
        dress: NFTGenerativeCollectionClass<{
            dress: NFTGenerativeTraitImageClass;
        }>;
        hats: NFTGenerativeCollectionClass<{
            hats: NFTGenerativeTraitImageClass;
        }>;
        facial_hair: NFTGenerativeCollectionClass<{
            facial_hair: NFTGenerativeTraitImageClass;
        }>;
    }
    >;

export default collInnovot;

export const thTestNestedItem = collInnovot.create({
    attributes: {
        rarityClass: 'Designer',
        background: 'Party - Orange',
        light: 'Blue',
        base: 'Base'
    },
    children: {
        glasses: {
            attributes: {
                glasses: 'Designer - Tortoise'
            }
        },
        dress: {
            attributes: {
                dress: 'Party - Shirt Turquoise'
            }
        },
        hats: {
            attributes: {
                hats: 'Party - Fedora White'
            }
        },
        facial_hair: {
            attributes: {
                facial_hair: 'None'
            }
        },
    }
});

export const thTestNestedItemChildGlasses = collInnovotThGlassesChild.create({
    attributes: {
        glasses: 'Designer - Tortoise'
    },
});

export const thTestNestedItemChildDress = collInnovotThDressChild.create({
    attributes: {
        dress: 'Party - Shirt Turquoise'
    },
});

export const thTestNestedItemChildHats = collInnovotThHatsChild.create({
    attributes: {
        hats: 'Party - Fedora White'
    },
});

export const thTestNestedItemChildFacialHair = collInnovotFacialHairChild.create({
    attributes: {
        facial_hair: 'None'
    },
});
