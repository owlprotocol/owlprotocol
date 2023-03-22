import { collInnovotExample } from '../collections.js';

const nftItem = collInnovotExample.create({
    attributes: {
        Name: 'Hussle',
        Significance: 'Hyperactivity',
        Background: 'Orange',
        'Light Bulb': 'Blue',
        Base: 'Default',
    },
    children: {
        Outfit: {
            attributes: {
                Outfit: 'TH - Blue Hoodie',
            },
        },
        Glasses: {
            attributes: {
                Glasses: 'TH - Kani Glasses',
            },
        },
        Hat: {
            attributes: {
                Hat: 'Sport - Blue Baseball Cap',
            },
        },
        'Facial Hair': {
            attributes: {
                'Facial Hair': 'Flat Beard 2',
            },
        },
    },
});

export default nftItem;
