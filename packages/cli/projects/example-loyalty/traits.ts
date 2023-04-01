import { NFTGenerativeTraitImage, NFTGenerativeTraitEnum, NFTGenerativeTraitNumber } from '@owlprotocol/nft-sdk';

export const attrMemberIdNumber: NFTGenerativeTraitNumber = {
    name: 'Member ID',
    type: 'number',
    description: `Owner's membership ID`,
    min: 1000000,
    max: 99999999999,
    abi: 'uint48',
};

export const attrTierEnum: NFTGenerativeTraitEnum = {
    name: 'Status Tier',
    type: 'enum',
    description: 'Status tier in the loyalty program, can be one of: Bronze, Silver or Gold',
    options: ['Bronze', 'Silver', 'Gold'],
};

export const attrTierBgImage: NFTGenerativeTraitImage = {
    name: 'Background',
    type: 'image',
    image_type: 'png',
    options: [
        {
            value: 'Basic',
            image_url:
                'https://leovigna.mypinata.cloud/ipfs/QmTeQUXNbaXZctrhfztbWsvfrz1vBNvaqHui6LVbDp14YV/bg-blue.png',
        },
        {
            value: 'Facets',
            image_url:
                'https://leovigna.mypinata.cloud/ipfs/QmTeQUXNbaXZctrhfztbWsvfrz1vBNvaqHui6LVbDp14YV/bg-silver.png',
        },
        {
            value: 'Dark',
            image_url:
                'https://leovigna.mypinata.cloud/ipfs/QmTeQUXNbaXZctrhfztbWsvfrz1vBNvaqHui6LVbDp14YV/bg-dark.png',
        },
    ],
};

export const attrTierIconImage: NFTGenerativeTraitImage = {
    name: 'Tier Badge',
    type: 'image',
    image_type: 'png',
    options: [
        {
            value: 'Bronze',
            image_url:
                'https://leovigna.mypinata.cloud/ipfs/QmTeQUXNbaXZctrhfztbWsvfrz1vBNvaqHui6LVbDp14YV/tier-bronze.png',
        },
        {
            value: 'Silver',
            image_url:
                'https://leovigna.mypinata.cloud/ipfs/QmTeQUXNbaXZctrhfztbWsvfrz1vBNvaqHui6LVbDp14YV/tier-silver.png',
        },
        {
            value: 'Gold',
            image_url:
                'https://leovigna.mypinata.cloud/ipfs/QmTeQUXNbaXZctrhfztbWsvfrz1vBNvaqHui6LVbDp14YV/tier-gold.png',
        },
    ],
};

export const attrPointsNumber: NFTGenerativeTraitNumber = {
    name: 'Points',
    type: 'number',
    description: 'Points collected from participation',
    min: 0,
    max: 16777215,
    abi: 'uint24',
};

export const attrSubGroupEnum: NFTGenerativeTraitEnum = {
    name: 'Sub Group',
    type: 'enum',
    description: 'The special subgroup the user is part of, if any',
    options: ['None', 'Yacht Club', 'Car Club', 'Diving Club'],
    abi: 'uint16', // overrides the 'uint8' default
};
