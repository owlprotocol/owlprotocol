import {
    attrMemberIdNumber,
    attrTierEnum,
    attrTierBgImage,
    attrTierIconImage,
    attrPointsNumber,
    attrCountryEnum,
    attrLastTransferTimestampNumber,
    attrSubGroupEnum
} from './traits.js';

import {
    NFTGenerativeCollection,
    NFTGenerativeCollectionClass,
    NFTGenerativeTraitNumberClass,
    NFTGenerativeTraitEnumClass,
    NFTGenerativeTraitImageClass,
} from '@owlprotocol/nft-sdk';

const collExampleLoyaltyDef: NFTGenerativeCollection = {
    name: 'Tutorial Example - Loyalty Program',
    description: 'Example from https://docs.owlprotocol.xyz/contracts/tutorial-nftdata',
    external_url: 'https://docs.owlprotocol.xyz/contracts/tutorial-nftdata',
    seller_fee_basis_points: 0,
    fee_recipient: '0xc2A3cB7d4BF24e456051E3a710057ac61f5dB133',
    generatedImageType: 'png',
    traits: {
        'Member ID': attrMemberIdNumber,
        'Status Tier': attrTierEnum,
        'Background': attrTierBgImage,
        'Tier Badge': attrTierIconImage,
        'Points': attrPointsNumber,
        'Country': attrCountryEnum,
        'Sub Group': attrSubGroupEnum,
        'Last Transferred': attrLastTransferTimestampNumber
    }
};

export const collExampleLoyalty = NFTGenerativeCollectionClass.fromData(collExampleLoyaltyDef) as NFTGenerativeCollectionClass<
    {
        'Member ID': NFTGenerativeTraitNumberClass,
        'Status Tier': NFTGenerativeTraitEnumClass,
        'Background': NFTGenerativeTraitImageClass,
        'Tier Badge': NFTGenerativeTraitImageClass,
        'Points': NFTGenerativeTraitNumberClass,
        'Country': NFTGenerativeTraitEnumClass,
        'Sub Group': NFTGenerativeTraitEnumClass
        'Last Transferred': NFTGenerativeTraitNumberClass
    }
>;

export default collExampleLoyaltyDef;
