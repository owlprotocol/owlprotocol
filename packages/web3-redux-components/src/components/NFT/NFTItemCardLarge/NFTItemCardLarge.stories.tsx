import { ComponentStory, ComponentMeta } from '@storybook/react';
import NFTItemCardLarge from '.';

const Wrapper = (props: any) => {
    return <NFTItemCardLarge {...props} />;
};

export default {
    title: 'NFT/NFTItemCardLarge',
    component: NFTItemCardLarge,
} as ComponentMeta<typeof NFTItemCardLarge>;

const Template: ComponentStory<typeof NFTItemCardLarge> = (args: any) => <Wrapper {...args} />;

export const Main = Template.bind({});

Main.args = {
    itemName: 'The amazing art #2102  Reforming and evolving (Citymap)',
    favoriteAmount: 6,
    viewsAmount: 420,
    assetPreviewSrc:
        'https://static01.nyt.com/images/2021/02/27/arts/24beeple-2/merlin_184196679_acecafff-affa-490c-b202-348d20c9c1b2-mobileMasterAt3x.jpg',
};
