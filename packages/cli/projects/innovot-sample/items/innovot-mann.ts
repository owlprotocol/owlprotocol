import { collInnovotExample } from '../collections.js';

const nftItem = collInnovotExample.create({
    attributes: {
        Name: 'Mann',
        Significance: 'Impulsivity',
        Background: 'Orange',
        'Light Bulb': 'Yellow',
        Base: 'Default',
    },
    children: {
        Outfit: {
            attributes: {
                Outfit: 'Party - Suit 2',
            },
        },
        Glasses: {
            attributes: {
                Glasses: 'Party - Glasses 17',
            },
        },
        Hat: {
            attributes: {
                Hat: 'Military - R3 Crew Cap Camo',
            },
        },
        'Facial Hair': {
            attributes: {
                'Facial Hair': 'Facial Hair 1',
            },
        },
    },
});

export default nftItem;
