import { ComponentStory, ComponentMeta } from '@storybook/react';
import TransactionsTable, { Props, ItemProps } from '.';

export default {
    title: 'Tables/TransactionsTable',
    component: TransactionsTable,
    argTypes: {
        type: {
            options: ['DEFAULT', 'NFT_TXS'],
            control: { type: 'select' },
        },
    },
} as ComponentMeta<typeof TransactionsTable>;

const Template: ComponentStory<typeof TransactionsTable> = (args: any) => <TransactionsTable {...args} />;
export const Main = Template.bind({});

const EVENT_ITEMS = ['Sale', 'Offer', 'Transfer', 'List'];
const getDummyItem = () => ({
    txHash: '0xe7f8f22...',
    method: 'Approve',
    blockNumber: 14724278,
    age: '3 days 22 hrs ago',
    from: '0x35b0d11...',
    to: 'USDC: USDC Token',
    value: '0 Ether',
    fee: '0.002669500796',
    event: EVENT_ITEMS[Math.floor(Math.random() * EVENT_ITEMS.length)],
    tokenId: 1,
    price: 1.5,
    date: Date.now() - Math.random() * 999999,
});

// @ts-ignore
const mainArgs: Props = {
    items: [getDummyItem(), getDummyItem(), getDummyItem(), getDummyItem(), getDummyItem(), getDummyItem()],
};

// @ts-ignore
Main.args = mainArgs;
