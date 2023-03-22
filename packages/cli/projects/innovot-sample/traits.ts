import { NFTGenerativeTraitEnum, NFTGenerativeTraitImage } from '@owlprotocol/nft-sdk';

export const traitEnumName: NFTGenerativeTraitEnum = {
    name: 'Name',
    type: 'enum',
    options: ['Unnamed', 'Hussle', 'Mann', 'NerD', 'PaC'],
    abi: 'uint16',
};

/*
Based on the Outfit
—Inattention—  Designer
—Impulsivity— Party
—Hyperactivity — Thread Haus
 */
export const traitEnumSignificance: NFTGenerativeTraitEnum = {
    name: 'Significance',
    type: 'enum',
    options: ['N/A', 'Inattention', 'Impulsivity', 'Hyperactivity'],
};

export const traitImageBg: NFTGenerativeTraitImage = {
    name: 'Background',
    type: 'image',
    image_type: 'png',
    options: [
        {
            value: 'None',
            image_url: 'ipfs://QmeYhQsx2PGeKoCco8Ck4gUcoSNN7ecShKcZaXDsHardQL',
        },
        {
            value: 'Orange',
            image_url: 'ipfs://QmdKp4SD14hTVFqbhRBgN24qzLwFG5v1xW7FdGLQVo4TCT',
        },
    ],
};

export const traitImageLight: NFTGenerativeTraitImage = {
    name: 'Light Bulb',
    type: 'image',
    image_type: 'png',
    options: [
        {
            value: 'Blue',
            image_url: 'ipfs://Qmb2Bh7UPRMjhF8naZJZZWpE13dts2taRt5hL7KFwJEqVS/light/Blue-Medication.png',
        },
        {
            value: 'Yellow',
            image_url: 'ipfs://Qmb2Bh7UPRMjhF8naZJZZWpE13dts2taRt5hL7KFwJEqVS/light/Yellow-Mindful_Meditation.png',
        },
    ],
};

export const traitImageBase: NFTGenerativeTraitImage = {
    name: 'Base',
    type: 'image',
    image_type: 'png',
    options: [
        {
            value: 'Default',
            image_url: 'ipfs://Qmb2Bh7UPRMjhF8naZJZZWpE13dts2taRt5hL7KFwJEqVS/base/1.png',
        },
    ],
};

export const traitImageOutfit: NFTGenerativeTraitImage = {
    name: 'Outfit',
    type: 'image',
    image_type: 'png',
    options: [
        {
            value: 'Party - Suit 2',
            image_url: 'ipfs://Qmb2Bh7UPRMjhF8naZJZZWpE13dts2taRt5hL7KFwJEqVS/outfit/Party-Suit_2.png',
        },
        {
            value: 'TH - Blue Hoodie',
            image_url: 'ipfs://Qmb2Bh7UPRMjhF8naZJZZWpE13dts2taRt5hL7KFwJEqVS/outfit/ThreadHaus-Blue_Hoodie.png',
        },
    ],
};

export const traitImageGlasses: NFTGenerativeTraitImage = {
    name: 'Glasses',
    type: 'image',
    image_type: 'png',
    options: [
        {
            value: 'Party - Glasses 17',
            image_url: 'ipfs://Qmb2Bh7UPRMjhF8naZJZZWpE13dts2taRt5hL7KFwJEqVS/glasses/Party-Glasses_17.png',
        },
        {
            value: 'TH - Kani Glasses',
            image_url: 'ipfs://Qmb2Bh7UPRMjhF8naZJZZWpE13dts2taRt5hL7KFwJEqVS/glasses/ThreadHaus-Kani_Glasses.png',
        },
    ],
};

export const traitImageHat: NFTGenerativeTraitImage = {
    name: 'Hat',
    type: 'image',
    image_type: 'png',
    options: [
        {
            value: 'Sport - Blue Baseball Cap',
            image_url: 'ipfs://Qmb2Bh7UPRMjhF8naZJZZWpE13dts2taRt5hL7KFwJEqVS/hat/Sport-Blue_Baseball_Cap.png',
        },
        {
            value: 'Military - R3 Crew Cap Camo',
            image_url: 'ipfs://Qmb2Bh7UPRMjhF8naZJZZWpE13dts2taRt5hL7KFwJEqVS/hat/Military-R3_Crew_Cap_Camo.png',
        },
    ],
};

export const traitImageFacialHair: NFTGenerativeTraitImage = {
    name: 'Facial Hair',
    type: 'image',
    image_type: 'png',
    options: [
        {
            value: 'Facial Hair 1',
            image_url: 'ipfs://Qmb2Bh7UPRMjhF8naZJZZWpE13dts2taRt5hL7KFwJEqVS/facial_hair/Facial_Hair_1.png',
        },
        {
            value: 'Flat Beard 2',
            image_url: 'ipfs://Qmb2Bh7UPRMjhF8naZJZZWpE13dts2taRt5hL7KFwJEqVS/facial_hair/Flat_Beard_2.png',
        },
    ],
};
