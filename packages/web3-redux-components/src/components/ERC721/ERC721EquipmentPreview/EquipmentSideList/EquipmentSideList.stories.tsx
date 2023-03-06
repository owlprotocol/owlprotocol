import { ComponentStory, ComponentMeta } from '@storybook/react';
import { TestData } from '@owlprotocol/web3-redux';
import { networkIdArgType } from '../../../../test/storybookArgs.js';
import EquipmentSideList from '.';

export default {
    title: 'ERC721/ERC721Equipment/EquipmentSideList',
    component: EquipmentSideList,
} as ComponentMeta<typeof EquipmentSideList>;

const Template: ComponentStory<typeof EquipmentSideList> = (args: any) => <EquipmentSideList {...args} />;

export const Main = Template.bind({});

Main.args = {
    tokens: [
        {
            //@ts-expect-error
            networkId: networkIdArgType.options[0],
            address: TestData.OZ_TEAM,
            tokenId: '1',
        },
        {
            //@ts-expect-error
            networkId: networkIdArgType.options[0],
            address: TestData.OZ_TEAM,
            tokenId: '2',
        },
    ],
};
