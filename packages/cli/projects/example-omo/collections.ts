import { traitEnumVibe, traitImageBg, traitImageBody, traitImageHats } from './traits.js';

import {
    NFTGenerativeCollection,
    NFTGenerativeCollectionClass,
    NFTGenerativeTraitEnumClass,
    NFTGenerativeTraitImageClass,
} from '@owlprotocol/nft-sdk';

const collHatsChildDef: NFTGenerativeCollection = {
    name: 'Tutorial Example - NFT Hats Sub-Collection',
    description: 'Example from https://docs.owlprotocol.xyz/contracts/tutorials/nft-image-layers',
    external_url: 'https://docs.owlprotocol.xyz/contracts/tutorials/nft-image-layers',
    seller_fee_basis_points: 5000,
    fee_recipient: '0xc2A3cB7d4BF24e456051E3a710057ac61f5dB133',
    generatedImageType: 'png',
    traits: {
        Hats: traitImageHats,
    },
};

const collNestedDef: NFTGenerativeCollection = {
    name: 'Thread Haus - Innovot NFT Collection',
    description: 'Example from https://docs.owlprotocol.xyz/contracts/tutorials/nft-image-layers',
    external_url: 'https://docs.owlprotocol.xyz/contracts/tutorials/nft-image-layers',
    seller_fee_basis_points: 10000,
    fee_recipient: '0xc2A3cB7d4BF24e456051E3a710057ac61f5dB133',
    generatedImageType: 'png',
    traits: {
        Vibe: traitEnumVibe,
        Background: traitImageBg,
        Body: traitImageBody,
    },
    //@ts-ignore
    children: {
        Hats: collHatsChildDef,
    },
};

export const collHatsChild = NFTGenerativeCollectionClass.fromData(collHatsChildDef) as NFTGenerativeCollectionClass<{
    Hats: NFTGenerativeTraitImageClass;
}>;

export const collExample = NFTGenerativeCollectionClass.fromData(collNestedDef) as NFTGenerativeCollectionClass<
    {
        Vibe: NFTGenerativeTraitEnumClass;
        Background: NFTGenerativeTraitImageClass;
        Body: NFTGenerativeTraitImageClass;
    },
    {
        Hats: NFTGenerativeCollectionClass<{
            Hats: NFTGenerativeTraitImageClass;
        }>;
    }
>;

export default collExample;
