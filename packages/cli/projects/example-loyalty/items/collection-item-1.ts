import { collExampleLoyalty } from '../collections.js';

const nftItem = collExampleLoyalty.create({
    attributes: {
        'Member ID': 1009855,
        'Status Tier': 'Silver',
        Background: 'Dark',
        'Tier Badge': 'Silver',
        Points: 123600,
        'Sub Group': 'Yacht Club',
    },
});

export default nftItem;
