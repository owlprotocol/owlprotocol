import {
    traitEnumName,
    traitEnumSignificance,
    traitImageBg,
    traitImageLight,
    traitImageBase,
    traitImageOutfit,
    traitImageGlasses,
    traitImageHat,
    traitImageFacialHair,
} from './traits.js';

import {
    NFTGenerativeCollection,
    NFTGenerativeCollectionClass,
    NFTGenerativeTraitEnumClass,
    NFTGenerativeTraitImageClass,
} from '@owlprotocol/nft-sdk';

const collOutfitChildDef: NFTGenerativeCollection = {
    name: 'The Vision of InnoVot - Outfits Sub-Collection',
    description: `InnoVot is a father x son collaboration and inspired by some of Thread haus Collection and some of the industry top trendsetters in fashion music and film.
The Vision of InnoVot was inspired by my son at the age 14. A representation of his dad through his eyes on his own life's journey.

This is the Outfit "Sub-Collection" which can be worn by the Base Collection: The Vision of InnoVot.

Follow the journey at: https://tell.ie/threadhausCo/D5RQ6SBsgpAp
    `,
    external_url: 'https://tell.ie/threadhausCo/D5RQ6SBsgpAp',
    seller_fee_basis_points: 5000,
    fee_recipient: '0xCF28F97AbDfE1d0b9c51aDF6cF334f6489e080Fd',
    generatedImageType: 'png',
    traits: {
        Outfit: traitImageOutfit,
    },
};

const collGlassesChildDef: NFTGenerativeCollection = {
    name: 'The Vision of InnoVot - Glasses Sub-Collection',
    description: `InnoVot is a father x son collaboration and inspired by some of Thread haus Collection and some of the industry top trendsetters in fashion music and film.
The Vision of InnoVot was inspired by my son at the age 14. A representation of his dad through his eyes on his own life's journey.

This is the Glasses "Sub-Collection" which can be worn by the Base Collection: The Vision of InnoVot.

Follow the journey at: https://tell.ie/threadhausCo/D5RQ6SBsgpAp
    `,
    external_url: 'https://tell.ie/threadhausCo/D5RQ6SBsgpAp',
    seller_fee_basis_points: 5000,
    fee_recipient: '0xCF28F97AbDfE1d0b9c51aDF6cF334f6489e080Fd',
    generatedImageType: 'png',
    traits: {
        Glasses: traitImageGlasses,
    },
};

const collHatChildDef: NFTGenerativeCollection = {
    name: 'The Vision of InnoVot - Hats Sub-Collection',
    description: `InnoVot is a father x son collaboration and inspired by some of Thread haus Collection and some of the industry top trendsetters in fashion music and film.
The Vision of InnoVot was inspired by my son at the age 14. A representation of his dad through his eyes on his own life's journey.

This is the Hats "Sub-Collection" which can be worn by the Base Collection: The Vision of InnoVot.

Follow the journey at: https://tell.ie/threadhausCo/D5RQ6SBsgpAp
    `,
    external_url: 'https://tell.ie/threadhausCo/D5RQ6SBsgpAp',
    seller_fee_basis_points: 5000,
    fee_recipient: '0xCF28F97AbDfE1d0b9c51aDF6cF334f6489e080Fd',
    generatedImageType: 'png',
    traits: {
        Hat: traitImageHat,
    },
};

const collFacialHairChildDef: NFTGenerativeCollection = {
    name: 'The Vision of InnoVot - Hats Sub-Collection',
    description: `InnoVot is a father x son collaboration and inspired by some of Thread haus Collection and some of the industry top trendsetters in fashion music and film.
The Vision of InnoVot was inspired by my son at the age 14. A representation of his dad through his eyes on his own life's journey...

This is the Hats "Sub-Collection" which can be worn by the Base Collection: The Vision of InnoVot.

Follow the journey at: https://tell.ie/threadhausCo/D5RQ6SBsgpAp
    `,
    external_url: 'https://tell.ie/threadhausCo/D5RQ6SBsgpAp',
    seller_fee_basis_points: 5000,
    fee_recipient: '0xCF28F97AbDfE1d0b9c51aDF6cF334f6489e080Fd',
    generatedImageType: 'png',
    traits: {
        'Facial Hair': traitImageFacialHair,
    },
};

export const collNestedDef: NFTGenerativeCollection = {
    name: 'The Vision of InnoVot - Base Collection',
    description: `InnoVot is a father x son collaboration and inspired by some of Thread haus Collection and some of the industry top trendsetters in fashion music and film.
The Vision of InnoVot was inspired by my son at the age 14. A representation of his dad through his eyes on his own life's journey.

The Outfit InnVoT is wearing signifies one of the 3 out of 5 symptoms that correlates with that mental illness:
- Inattention - Designer
— Impulsivity — Party
— Hyperactivity — Thread Haus

This collection features detachable clothing and accessories by connecting your wallet at https://owlprotocol.xyz.

Follow the journey at: https://tell.ie/threadhausCo/D5RQ6SBsgpAp
    `,
    external_url: 'https://docs.owlprotocol.xyz/contracts/tutorials/nft-image-layers',
    seller_fee_basis_points: 10000,
    fee_recipient: '0xc2A3cB7d4BF24e456051E3a710057ac61f5dB133',
    generatedImageType: 'png',
    traits: {
        Name: traitEnumName,
        Significance: traitEnumSignificance,
        Background: traitImageBg,
        'Light Bulb': traitImageLight,
        Base: traitImageBase,
    },
    //@ts-ignore
    children: {
        Outfit: collOutfitChildDef,
        Glasses: collGlassesChildDef,
        Hat: collHatChildDef,
        'Facial Hair': collFacialHairChildDef,
    },
};

export const collOutfitChild = NFTGenerativeCollectionClass.fromData(
    collOutfitChildDef,
) as NFTGenerativeCollectionClass<{
    Outfit: NFTGenerativeTraitImageClass;
}>;

export const collGlassesChild = NFTGenerativeCollectionClass.fromData(
    collGlassesChildDef,
) as NFTGenerativeCollectionClass<{
    Glasses: NFTGenerativeTraitImageClass;
}>;

export const collHatChild = NFTGenerativeCollectionClass.fromData(collHatChildDef) as NFTGenerativeCollectionClass<{
    Hat: NFTGenerativeTraitImageClass;
}>;

export const collFacialHairChild = NFTGenerativeCollectionClass.fromData(
    collFacialHairChildDef,
) as NFTGenerativeCollectionClass<{
    'Facial Hair': NFTGenerativeTraitImageClass;
}>;

export const collInnovotExample = NFTGenerativeCollectionClass.fromData(collNestedDef) as NFTGenerativeCollectionClass<
    {
        Name: NFTGenerativeTraitEnumClass;
        Significance: NFTGenerativeTraitEnumClass;
        Background: NFTGenerativeTraitImageClass;
        'Light Bulb': NFTGenerativeTraitImageClass;
        Base: NFTGenerativeTraitImageClass;
    },
    {
        Outfit: NFTGenerativeCollectionClass<{
            Outfit: NFTGenerativeTraitImageClass;
        }>;
        Glasses: NFTGenerativeCollectionClass<{
            Glasses: NFTGenerativeTraitImageClass;
        }>;
        Hat: NFTGenerativeCollectionClass<{
            Hat: NFTGenerativeTraitImageClass;
        }>;
        'Facial Hair': NFTGenerativeCollectionClass<{
            'Facial Hair': NFTGenerativeTraitImageClass;
        }>;
    }
>;

export default collInnovotExample;
