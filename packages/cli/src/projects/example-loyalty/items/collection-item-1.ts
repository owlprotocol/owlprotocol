import { collExampleLoyalty } from '../collections.js';

const nftItem = collExampleLoyalty.create({
    attributes: {
        'Member ID': 1009855,
        'Status Tier': 'Silver',
        'Background': 'Tunnels',
        'Tier Badge': 'Silver',
        'Points': 123600,
        'Country': 'Belgium',
        'Sub Group': 'Yacht Club',
        'Last Transferred': 1678831284
    }
})

export default nftItem;
