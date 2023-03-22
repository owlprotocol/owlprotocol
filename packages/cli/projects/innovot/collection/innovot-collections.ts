import {
    traitRarityClassEnum,
    traitImageThBg,
    traitImageLight,
    traitImageBase,
    traitImageGlasses,
    traitImageDress,
    traitImageHats,
    traitImageFacialHair,
} from './innovot-traits.js';

import {
    NFTGenerativeCollection,
    NFTGenerativeCollectionClass,
    NFTGenerativeTraitEnumClass,
    NFTGenerativeTraitImageClass,
} from '@owlprotocol/nft-sdk';

const collInnovotGlassesChildDef: NFTGenerativeCollection = {
    name: 'Thread Haus - Innovot NFT Glasses Sub-Collection',
    description: '',
    external_url: 'https://linktr.ee/threadhausco',
    seller_fee_basis_points: 10000,
    fee_recipient: '0xCF28F97AbDfE1d0b9c51aDF6cF334f6489e080Fd',
    generatedImageType: 'png',
    traits: {
        Glasses: traitImageGlasses,
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
        Dress: traitImageDress,
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
        Hat: traitImageHats,
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
        Facial_Hair: traitImageFacialHair,
    },
};

const collInnovotNestedDef: NFTGenerativeCollection = {
    name: 'Thread Haus - Innovot NFT Collection',
    description:
        'InnoVot is a father x son collaboration and inspired by some of Thread haus Collection and some of the industry top trendsetters in fashion music and film',
    image: 'https://leovigna.mypinata.cloud/ipfs/QmPEtHYcZSdjQEePGUWfT9U9XSR16DAqmqNKCrENj8EZQn',
    external_url: 'https://tell.ie/threadhausCo/D5RQ6SBsgpAp',
    seller_fee_basis_points: 10000,
    fee_recipient: '0xCF28F97AbDfE1d0b9c51aDF6cF334f6489e080Fd',
    generatedImageType: 'png',
    traits: {
        Rarity_Class: traitRarityClassEnum,
        Background: traitImageThBg,
        Light: traitImageLight,
        Base: traitImageBase,
    },
    //@ts-ignore
    children: {
        Glasses: collInnovotGlassesChildDef,
        Dress: collInnovotDressChildDef,
        Hat: collInnovotHatsChildDef,
        Facial_Hair: collInnovotFacialHairChildDef,
    },
};

export const collInnovotThGlassesChild = NFTGenerativeCollectionClass.fromData(
    collInnovotGlassesChildDef,
) as NFTGenerativeCollectionClass<{
    Glasses: NFTGenerativeTraitImageClass;
}>;

export const collInnovotThDressChild = NFTGenerativeCollectionClass.fromData(
    collInnovotDressChildDef,
) as NFTGenerativeCollectionClass<{
    Dress: NFTGenerativeTraitImageClass;
}>;

export const collInnovotThHatsChild = NFTGenerativeCollectionClass.fromData(
    collInnovotHatsChildDef,
) as NFTGenerativeCollectionClass<{
    Hat: NFTGenerativeTraitImageClass;
}>;

export const collInnovotFacialHairChild = NFTGenerativeCollectionClass.fromData(
    collInnovotFacialHairChildDef,
) as NFTGenerativeCollectionClass<{
    Facial_Hair: NFTGenerativeTraitImageClass;
}>;

export const collInnovot = NFTGenerativeCollectionClass.fromData(collInnovotNestedDef) as NFTGenerativeCollectionClass<
    {
        Rarity_Class: NFTGenerativeTraitEnumClass;
        Background: NFTGenerativeTraitImageClass;
        Light: NFTGenerativeTraitImageClass;
        Base: NFTGenerativeTraitImageClass;
    },
    {
        Glasses: NFTGenerativeCollectionClass<{
            glasses: NFTGenerativeTraitImageClass;
        }>;
        Dress: NFTGenerativeCollectionClass<{
            dress: NFTGenerativeTraitImageClass;
        }>;
        Hat: NFTGenerativeCollectionClass<{
            hats: NFTGenerativeTraitImageClass;
        }>;
        Facial_Hair: NFTGenerativeCollectionClass<{
            facial_hair: NFTGenerativeTraitImageClass;
        }>;
    }
>;

export default collInnovot;
